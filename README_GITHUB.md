# 🚀 Trego - Sistema de Liquidaciones

Sistema automático para calcular saldos de clientes y generar reportes para WhatsApp/email.

Diseñado para empresas de mensajería con pago contra entrega (COD).

## ✨ Características

- ✅ Sincronizar datos automáticamente desde Monday.com
- ✅ Calcular saldos por cliente en tiempo real
- ✅ Gestión de clientes sin código (agregar/editar/eliminar)
- ✅ Dashboard intuitivo
- ✅ API REST completa
- ✅ Base de datos SQLite local

## 🛠️ Stack Tecnológico

- **Backend:** Node.js + Express
- **Base de Datos:** SQLite3
- **Frontend:** React (HTML puro)
- **API:** Monday.com integration
- **Deploy:** Railway.app

## 📋 Requisitos

- Node.js 18+
- NPM
- API Key de Monday.com
- (Opcional) Cuenta en Railway para deployment

## 🚀 Quick Start Local

### 1. Clonar y preparar

```bash
git clone https://github.com/TU_USER/trego.git
cd trego
npm install
```

### 2. Configurar variables de entorno

Crea archivo `.env`:
```env
MONDAY_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY3NjA3MjY1MCwiYWFpIjoxMSwidWlkIjoxMDY1MDM4MzAsImlhZCI6IjIwMjYtMDYtMjdUMTY6MjY6NDguMDAwWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjM1NzIxNjYxLCJyZ24iOiJ1c2UxIn0.ZjoCepGV2-ml_zDKMNGWLCqANaPsl7LDaxfPKSm3Zbo
PORT=3001
NODE_ENV=development
```

### 3. Ejecutar backend

```bash
npm start
```

Deberías ver:
```
✓ BD conectada
✓ Cliente Natural Shop cargado
✓ Cliente Decoplate 1 cargado
...
🚀 Trego Backend corriendo en puerto 3001
```

### 4. Abrir dashboard

Abre en tu navegador:
```
file:///path/to/dashboard-v2.html
```

O sirve con un servidor local:
```bash
npx http-server .
# Abre http://localhost:8080/dashboard-v2.html
```

## 📦 Clientes incluidos

- Natural Shop (18419421965)
- Decoplate (18419032424, 18425989533)
- Panchos Kitchen (268678715)
- La Belle Parfum (18427952419)

Se cargan automáticamente en primer inicio.

## 🌐 Deploy en Railway

### Opción 1: Deploy automático desde GitHub

1. Conecta tu repo en [Railway.app](https://railway.app)
2. Railway auto-detecta `package.json` y `Procfile`
3. Configura variable de entorno `MONDAY_API_KEY`
4. Deploy automático en cada push

### Opción 2: Deploy manual con Railway CLI

```bash
# Instalar CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Variables de entorno en Railway

En dashboard de Railway, agrega:
```
MONDAY_API_KEY = tu_api_key
NODE_ENV = production
```

### URL en Railway

Después de deploy, tu URL será:
```
https://trego-production.up.railway.app
```

Actualiza en `dashboard-v2.html`:
```javascript
const API_URL = 'https://trego-production.up.railway.app/api';
```

## 📊 API Endpoints

```
GET  /api/clientes              → Listar todos
GET  /api/clientes/:id          → Detalles de uno
POST /api/clientes              → Crear
PUT  /api/cliente/:id           → Editar
DEL  /api/cliente/:id           → Eliminar

POST /api/sincronizar           → Sincronizar con Monday
GET  /health                    → Health check
```

## 🔒 Seguridad

⚠️ **Nunca commits tu `.env` con datos sensibles**

El `.gitignore` ya excluye:
- `.env`
- `*.db` (base de datos)
- `node_modules/`

## 📁 Estructura de archivos

```
trego/
├── trego-backend.js         # Backend principal
├── dashboard-v2.html        # Frontend
├── .env                     # Variables de entorno (NO COMMITEAR)
├── .gitignore              # Archivos a ignorar
├── package.json            # Dependencias
├── Procfile                # Config para Railway
├── trego.db                # BD SQLite (se crea sola)
└── README.md               # Este archivo
```

## 🆘 Troubleshooting

### "EADDRINUSE: address already in use :::3001"
Otro proceso usa el puerto. Cambia en `.env`:
```env
PORT=3002
```

### "Cannot find module 'express'"
Reinstala dependencias:
```bash
rm -rf node_modules
npm install
```

### "Monday API error"
Verifica:
- API Key en `.env` es correcta
- Board IDs existen en Monday
- Tienes grupo "Completo" en cada Board

### Dashboard en blanco
1. Abre consola (F12)
2. Verifica que backend está corriendo
3. Comprueba que API_URL es correcta

## 🚀 Próximas mejoras

- [ ] Exportar a Excel/PDF
- [ ] Integración WhatsApp API
- [ ] Mobile app
- [ ] Historial de liquidaciones
- [ ] Gráficos de cobranza
- [ ] Autenticación de usuarios

## 📞 Soporte

Para reportar bugs o pedir features, abre un issue en GitHub.

## 📄 Licencia

MIT

---

**Hecho con ❤️ para Trego**
