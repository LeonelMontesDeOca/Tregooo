# 🚀 Guía Completa: GitHub → Railway para Trego

## PARTE 1: Crear Repositorio en GitHub

### Paso 1: Ir a GitHub y crear repositorio

1. Abre https://github.com/new (o inicia sesión si no lo estás)
2. Llena el formulario:
   - **Repository name:** `trego`
   - **Description:** `Sistema de liquidaciones para mensajería`
   - **Visibility:** Public
   - **NO marques** "Initialize with README" (ya tenemos commits locales)
3. Click **"Create repository"**

Verás una página con instrucciones. Cópiala mental o en una nota.

### Paso 2: Conectar tu repositorio local con GitHub

En tu terminal, en la carpeta `/Users/leonelmontesdeoca/Desktop/Trego`:

```bash
git remote add origin https://github.com/TU_USUARIO/trego.git
git branch -M main
git push -u origin main
```

⚠️ **Reemplaza `TU_USUARIO` con tu nombre de usuario en GitHub**

Ejemplo:
```bash
git remote add origin https://github.com/leonelmontesdeoca/trego.git
git branch -M main
git push -u origin main
```

### Paso 3: Verificar que subió

- Ve a https://github.com/TU_USUARIO/trego
- Deberías ver tus archivos (trego-backend.js, dashboard-v2.html, package.json, etc)
- El `.env` NO debe estar (porque está en .gitignore ✓)
- El `node_modules/` NO debe estar (porque está en .gitignore ✓)

---

## PARTE 2: Railway Setup

### Paso 1: Crear cuenta Railway

1. Abre https://railway.app
2. Click **"Get Started"** o **"Sign Up"**
3. Conecta con GitHub (recomendado)
4. Autoriza Railway a acceder a tu GitHub

### Paso 2: Crear nuevo proyecto

En tu Railway Dashboard:

1. Click **"New Project"**
2. Selecciona **"Deploy from GitHub"**
3. Busca tu repositorio **"trego"**
4. Click **"Select repository"**
5. Railway pedirá permisos en GitHub - autoriza

### Paso 3: Configura variables de entorno

En el dashboard de Railway (después de que autoricemos GitHub):

1. Pestaña **"Variables"** (lado izquierdo)
2. Click **"Add Variable"**
3. Agrega estas dos variables:

**Variable 1:**
- Name: `MONDAY_API_KEY`
- Value: `eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY3NjA3MjY1MCwiYWFpIjoxMSwidWlkIjoxMDY1MDM4MzAsImlhZCI6IjIwMjYtMDYtMjdUMTY6MjY6NDguMDAwWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjM1NzIxNjYxLCJyZ24iOiJ1c2UxIn0.ZjoCepGV2-ml_zDKMNGWLCqANaPsl7LDaxfPKSm3Zbo`

**Variable 2:**
- Name: `NODE_ENV`
- Value: `production`

4. Click **"Save"**

Railway automáticamente hará deploy cuando guardes las variables.

### Paso 4: Esperar deployment

En pestaña **"Deployments"**:
- Ves estado "Building..." → "Deploying..." → "✓ Success"
- Espera 2-3 minutos
- Cuando esté ✓ Success, Railway te da una URL pública

La URL se verá así:
```
https://trego-xxxxx.up.railway.app
```

**CÓPIALA** (la necesitas abajo)

### Paso 5: Verificar que funciona

En tu navegador:

**Test 1 - Health Check:**
```
https://tu-url-railway.app/health
```
Debe devolver:
```json
{"status":"ok","timestamp":"2024-..."}
```

**Test 2 - API de clientes:**
```
https://tu-url-railway.app/api/clientes
```
Debe devolver un array con tus clientes.

---

## PARTE 3: Actualizar Dashboard

### Paso 1: Abrir dashboard-v2.html

En tu editor favorito (VS Code, Sublime, etc):
1. Abre el archivo `dashboard-v2.html` (está en tu carpeta Trego)
2. Busca esta línea (está al inicio):

```javascript
const API_URL = 'http://localhost:3001/api';
```

### Paso 2: Reemplazar URL

Cámbiala a tu URL de Railway:

```javascript
const API_URL = 'https://tu-url-railway.app/api';
```

Ejemplo real:
```javascript
const API_URL = 'https://trego-xyz123.up.railway.app/api';
```

### Paso 3: Guardar y subir a GitHub

```bash
cd /Users/leonelmontesdeoca/Desktop/Trego
git add dashboard-v2.html
git commit -m "Update API URL to Railway production"
git push origin main
```

Railway automáticamente redeploya.

---

## PARTE 4: Usar en Producción

### Opción A: Abrir dashboard localmente

1. Descarga el archivo `dashboard-v2.html` a tu computadora
2. Doble-click para abrirlo en el navegador
3. El dashboard conectará con Railway automáticamente

### Opción B: Compartir con tu equipo

Puedes compartir directamente:
1. El archivo `dashboard-v2.html` (via email, Drive, Dropbox)
2. O compartir directamente la URL si alojas el HTML en algún lado

Tu equipo abre el HTML y automáticamente conecta con Railway.

---

## Workflow Futuro (Updates)

Para hacer cambios:

```bash
# 1. Edita los archivos (backend, dashboard, etc)
# 2. Prueba localmente si quieres
# 3. Luego:

cd /Users/leonelmontesdeoca/Desktop/Trego
git add .
git commit -m "Tu descripción del cambio"
git push origin main

# 4. Railway automáticamente redeploya
# 5. Los cambios están vivos en https://tu-url-railway.app
```

---

## ❓ Ayuda Rápida

### "¿Dónde está mi URL de Railway?"
En https://railway.app → Tu proyecto → Pestaña "Deployments" → Última línea dice "Service URL"

### "¿Cómo veo los logs?"
En https://railway.app → Tu proyecto → Pestaña "Logs"

### "¿Qué pasa si hay un error?"
Mira los logs en Railway. Si es .env, asegúrate de que MONDAY_API_KEY esté configurada.

### "¿Puedo volver a cambiar la URL del dashboard?"
Sí. Abre dashboard-v2.html, cambia const API_URL, git push. Railway redeploya.

---

## ✅ Checklist Final

- [ ] Creé repositorio en GitHub llamado "trego"
- [ ] Hice `git push origin main` exitosamente
- [ ] Vi mis archivos en github.com/mi-usuario/trego
- [ ] Creé cuenta en Railway
- [ ] Conecté GitHub con Railway
- [ ] Configuré MONDAY_API_KEY en Railway
- [ ] Deployment está en estado "✓ Success"
- [ ] Tengo URL de Railway (https://trego-xxxxx.up.railway.app)
- [ ] Actualicé API_URL en dashboard-v2.html
- [ ] Hice git push de dashboard-v2.html
- [ ] Probé /health endpoint en navegador
- [ ] Probé /api/clientes endpoint
- [ ] Dashboard conecta y sincroniza correctamente

---

**¡Trego en producción! 🎉**
