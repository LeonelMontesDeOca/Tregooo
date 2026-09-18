// Trego Backend - Lee Monday, calcula saldos por cliente
// npm install express sqlite3 axios dotenv cors

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// ============ CONFIG ============
const MONDAY_API_URL = 'https://api.monday.com/v2';
const MONDAY_TOKEN = process.env.MONDAY_API_KEY; // Exportar esto desde .env

// ============ BD SQLite ============
const db = new sqlite3.Database('./trego.db', (err) => {
  if (err) console.error('Error BD:', err);
  else {
    console.log('✓ BD conectada');
    initDB();
  }
});

function initDB() {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY,
      nombre TEXT UNIQUE,
      board_id TEXT,
      email TEXT,
      saldo_actual REAL DEFAULT 0,
      fecha_actualizado DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS liquidaciones (
      id INTEGER PRIMARY KEY,
      cliente_id INTEGER,
      monto REAL,
      fecha_entrega DATETIME,
      tipo TEXT, -- 'pendiente' | 'liquidado'
      notas TEXT,
      fecha_creado DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    )
  `);
}

// ============ QUERIES A MONDAY ============

// Query para obtener items de un board (grupo "Completo" + con fecha)
const QUERY_ITEMS = `
  query($board_id: String!) {
    boards(ids: [$board_id]) {
      items_page(query_params: {rules: [{column_id: "project_status", compare_value: ["Completo"]}]}) {
        items {
          id
          name
          column_values {
            id
            text
            value
          }
        }
      }
    }
  }
`;

// ============ FUNCIONES ============

async function obtenerItemsDelBoard(boardId) {
  try {
    const response = await axios.post(
      MONDAY_API_URL,
      { query: QUERY_ITEMS, variables: { board_id: boardId } },
      { headers: { Authorization: `Bearer ${MONDAY_TOKEN}` } }
    );

    if (response.data.errors) {
      console.error(`Error en board ${boardId}:`, response.data.errors);
      return [];
    }

    return response.data.data.boards[0]?.items_page?.items || [];
  } catch (error) {
    console.error(`Error fetching board ${boardId}:`, error.message);
    return [];
  }
}

function extraerMontoLiquidar(columnValues) {
  // Buscar la columna de monto (formula_mm4n1nkb)
  const montoCol = columnValues.find(col => col.id === 'formula_mm4n1nkb');
  return montoCol ? parseFloat(montoCol.text || montoCol.value) || 0 : 0;
}

function extraerFecha(columnValues) {
  // Buscar la columna de fecha (date_mm4kbb00)
  const fechaCol = columnValues.find(col => col.id === 'date_mm4kbb00');
  return fechaCol ? fechaCol.text : 'Sin fecha';
}

async function sincronizarCliente(clienteNombre, boardId) {
  console.log(`📊 Sincronizando cliente: ${clienteNombre} (Board ${boardId})`);
  
  // Obtener items del board
  const items = await obtenerItemsDelBoard(boardId);
  
  if (items.length === 0) {
    console.log(`  ⚠ Sin items para liquidar`);
    return;
  }

  // Calcular total a liquidar (sumar todos los "Monto a Liquidar")
  let totalLiquidar = 0;
  items.forEach(item => {
    const monto = extraerMontoLiquidar(item.column_values);
    totalLiquidar += monto;
    console.log(`  📦 ${item.name} → Q${monto}`);
  });

  console.log(`  ✓ Total a liquidar: Q${totalLiquidar}`);

  // Guardar en BD
  db.run(
    `INSERT OR REPLACE INTO clientes (nombre, board_id, saldo_actual) VALUES (?, ?, ?)`,
    [clienteNombre, boardId, totalLiquidar],
    function(err) {
      if (err) console.error(`Error guardando ${clienteNombre}:`, err);
    }
  );

  return { cliente: clienteNombre, monto: totalLiquidar, items: items.length };
}

// ============ ENDPOINTS ============

// Leer lista de clientes + Board IDs desde archivo
app.get('/api/config', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync('./clientes.json', 'utf8'));
    res.json(config);
  } catch {
    res.status(404).json({ error: 'Archivo clientes.json no encontrado' });
  }
});

// Guardar configuración de clientes
app.post('/api/config', (req, res) => {
  const { clientes } = req.body;
  fs.writeFileSync('./clientes.json', JSON.stringify(clientes, null, 2));
  res.json({ success: true });
});

// Sincronizar TODOS los clientes
app.post('/api/sincronizar', async (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync('./clientes.json', 'utf8'));
    const resultados = [];

    for (const cliente of config.clientes) {
      const resultado = await sincronizarCliente(cliente.nombre, cliente.board_id);
      if (resultado) resultados.push(resultado);
    }

    res.json({ 
      success: true, 
      resultados,
      total_clientes: resultados.length,
      fecha: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener saldos actuales de TODOS los clientes
app.get('/api/clientes', (req, res) => {
  db.all(
    `SELECT nombre, saldo_actual, fecha_actualizado FROM clientes ORDER BY nombre`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows || []);
    }
  );
});

// Obtener detalle de un cliente específico
app.get('/api/cliente/:nombre', (req, res) => {
  const { nombre } = req.params;
  db.get(
    `SELECT * FROM clientes WHERE nombre = ?`,
    [nombre],
    (err, cliente) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

      // Obtener historial de liquidaciones
      db.all(
        `SELECT * FROM liquidaciones WHERE cliente_id = ? ORDER BY fecha_creado DESC`,
        [cliente.id],
        (err, liquidaciones) => {
          res.json({ cliente, liquidaciones: liquidaciones || [] });
        }
      );
    }
  );
});

// Marcar como liquidado
app.post('/api/liquidar/:nombre', (req, res) => {
  const { nombre } = req.params;
  const { monto, notas } = req.body;

  db.get(
    `SELECT id FROM clientes WHERE nombre = ?`,
    [nombre],
    (err, cliente) => {
      if (err || !cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      db.run(
        `INSERT INTO liquidaciones (cliente_id, monto, tipo, notas) VALUES (?, ?, ?, ?)`,
        [cliente.id, monto, 'liquidado', notas],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          
          // Actualizar saldo a 0
          db.run(
            `UPDATE clientes SET saldo_actual = 0 WHERE id = ?`,
            [cliente.id],
            (err) => {
              res.json({ success: true, liquidacion_id: this.lastID });
            }
          );
        }
      );
    }
  );
});

// ============ INICIALIZAR CLIENTES ============
function cargarClientesIniciales() {
  const clientesIniciales = [
    { nombre: 'Natural Shop', board_id: '18419421965', email: 'naturalshop@example.com' },
    { nombre: 'Decoplate 1', board_id: '18419032424', email: 'decoplate1@example.com' },
    { nombre: 'Decoplate 2', board_id: '18425989533', email: 'decoplate2@example.com' },
    { nombre: 'Panchos Kitchen', board_id: '268678715', email: 'panchos@example.com' },
    { nombre: 'La Belle Parfum', board_id: '18427952419', email: 'belle@example.com' }
  ];

  clientesIniciales.forEach(cliente => {
    db.run(
      `INSERT OR IGNORE INTO clientes (nombre, board_id, email) VALUES (?, ?, ?)`,
      [cliente.nombre, cliente.board_id, cliente.email],
      (err) => {
        if (!err) console.log(`✓ Cliente ${cliente.nombre} cargado`);
      }
    );
  });
}

// ============ SERVE DASHBOARD ============
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dashboard-v2.html');
});

// ============ HEALTH CHECK ============
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ============ START ============
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Escucha en todas las interfaces (necesario para Railway)

app.listen(PORT, () => {
  console.log(`\n🚀 Trego Backend corriendo en puerto ${PORT}`);
  console.log(`📋 GET  /api/clientes`);
  console.log(`🔄 POST /api/sincronizar`);
  console.log(`➕ POST /api/cliente (agregar)`);
  console.log(`✏️  PUT  /api/cliente/:id (editar)`);
  console.log(`❌ DEL  /api/cliente/:id (eliminar)`);
  console.log(`💚 Health: /health\n`);
  
  setTimeout(() => cargarClientesIniciales(), 1000);
});

module.exports = app;
