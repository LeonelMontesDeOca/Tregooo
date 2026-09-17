# 🚀 Trego - Guía Rápida

## Instalación (5 minutos)

### 1. Instalar Node.js
Descarga e instala de: https://nodejs.org

### 2. Descargar archivos Trego
Descarga todos los archivos `.js`, `.json`, `.html` que te di

### 3. Instalar dependencias
```bash
npm install express sqlite3 axios dotenv cors
```

### 4. Ejecutar backend
```bash
node trego-backend.js
```

Deberías ver:
```
✓ BD conectada
✓ Cliente Natural Shop cargado
✓ Cliente Decoplate 1 cargado
✓ Cliente Decoplate 2 cargado
✓ Cliente Panchos Kitchen cargado
✓ Cliente La Belle Parfum cargado
🚀 Trego Backend corriendo en http://localhost:3001
```

### 5. Abrir Dashboard
Abre **`dashboard-v2.html`** en tu navegador

---

## Cómo usar

### 📊 Tab: Dashboard
- **Ver saldos** de todos los clientes en tiempo real
- **Estadísticas**: Total a liquidar, Deuda, Saldo a favor
- Actualiza datos con botón **"🔄 Sincronizar"**

### 👥 Tab: Gestión de Clientes
- **Ver listado** completo de clientes
- **Agregar nuevo** cliente: ➕ Nuevo Cliente
- **Editar** cliente: ✏️ Botón
- **Eliminar** cliente: ❌ Botón

---

## Flujo típico (día a día)

### 1. Por la mañana
```
1. Abre dashboard-v2.html
2. Click "🔄 Sincronizar"
3. Espera a que lea todos los Boards de Monday
4. Ves tabla con saldos actualizados
```

### 2. Liquidar clientes
```
1. Busca cliente en tabla
2. Ve el monto a liquidar (Q...)
3. (Próximamente) Genera reporte para WhatsApp
```

### 3. Agregar nuevo cliente
```
1. Click "➕ Nuevo Cliente"
2. Completa:
   - Nombre: Natural Shop
   - Board ID: 18419421965
   - Email: opcional
3. Click "Agregar"
4. Cliente aparece en tabla
5. Sincroniza para ver saldos
```

### 4. Editar cliente
```
1. Tab "👥 Gestión de Clientes"
2. Busca el cliente
3. Click "✏️ Editar"
4. Modifica lo que quieras
5. Click "Actualizar"
```

### 5. Eliminar cliente
```
1. Tab "👥 Gestión de Clientes"
2. Busca el cliente
3. Click "❌ Eliminar"
4. Confirma
```

---

## 🔑 Datos de tus clientes

```
Natural Shop      → Board ID: 18419421965
Decoplate (1)     → Board ID: 18419032424
Decoplate (2)     → Board ID: 18425989533
Panchos Kitchen   → Board ID: 268678715
La Belle Parfum   → Board ID: 18427952419
```

Estos ya están cargados automáticamente en el primer inicio.

---

## ⚙️ Cambiar API Key de Monday

Si quieres cambiar la API key:

1. Abre archivo `.env`
2. Reemplaza la línea:
   ```
   MONDAY_API_KEY=tu_token_nuevo
   ```
3. Guarda
4. Reinicia backend (`node trego-backend.js`)

---

## 📁 Archivos importantes

```
trego-backend.js      ← Backend (no modificar a menos que sepas qué haces)
dashboard-v2.html     ← Interfaz (abre en navegador)
.env                  ← API Key y configuración
trego.db              ← BD (se crea sola, no modificar)
```

---

## 🐛 Si algo no funciona

### Error: "Cannot find module 'express'"
```bash
npm install express sqlite3 axios dotenv cors
```

### Error: "EADDRINUSE: address already in use :::3001"
Otro proceso usa puerto 3001. Cierra otras ventanas del terminal o cambia PORT en .env

### Error: "Monday API error"
Verifica que:
1. API Key es correcta (.env)
2. Board IDs existen (mira Monday)
3. Tienes grupo "Completo" en cada Board

### Dashboard no carga
1. Verifica que backend está corriendo (`node trego-backend.js`)
2. Abre navegador en `http://localhost:3001/api/clientes`
3. Si ves JSON, backend funciona
4. Si no, reinicia backend

---

## 📞 Próximas mejoras

- [ ] Exportar saldos a Excel
- [ ] Generar PDF con detalle de liquidación
- [ ] Integración WhatsApp API (envíos automáticos)
- [ ] Historial de pagos registrados
- [ ] Gráficos de cobranza
- [ ] Mobile app para registrar pagos en terreno

---

## 💡 Tips

- **Sincroniza después de cada cambio** en Monday para ver datos actualizados
- **Guarda Board IDs** en un lugar seguro
- **Revisa la consola** (F12 en navegador) si hay errores
- **Reinicia backend** si cambias .env

---

¡Listo! Ya tienes tu sistema funcionando. 🎉
