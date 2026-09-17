# 🚀 Deployment en Railway - Guía Paso a Paso

Railway es super fácil y te cuesta poco. Aquí te muestro cómo.

## 📋 Requisitos

- [ ] Repo en GitHub (creado)
- [ ] Cuenta en [railway.app](https://railway.app)
- [ ] API Key de Monday.com

## ✅ Paso 1: Subir a GitHub

### Opción A: Desde terminal (recomendado)

```bash
# 1. Inicializar repo local
git init

# 2. Agregar archivos
git add .

# 3. Commit
git commit -m "Initial commit: Trego sistema de liquidaciones"

# 4. Agregar origen remoto
git remote add origin https://github.com/TU_USER/trego.git

# 5. Push
git branch -M main
git push -u origin main
```

### Opción B: Desde GitHub.com

1. Crea nuevo repo en GitHub.com
2. Copia los comandos que GitHub te da
3. Ejecuta en tu terminal

## 🔐 Paso 2: Configurar Railway

### 1. Crear proyecto en Railway

1. Ve a [railway.app/dashboard](https://railway.app/dashboard)
2. Click en "New Project"
3. Selecciona "Deploy from GitHub"
4. Conecta tu cuenta GitHub
5. Selecciona repo "trego"
6. Click "Deploy"

Railway detectará automáticamente `package.json` y `Procfile`.

### 2. Configurar variables de entorno

En Railway dashboard:
1. Ve a tu proyecto
2. Click en pestaña "Variables"
3. Agrega:

```
MONDAY_API_KEY = eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY3NjA3MjY1MCwiYWFpIjoxMSwidWlkIjoxMDY1MDM4MzAsImlhZCI6IjIwMjYtMDYtMjdUMTY6MjY6NDguMDAwWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjM1NzIxNjYxLCJyZ24iOiJ1c2UxIn0.ZjoCepGV2-ml_zDKMNGWLCqANaPsl7LDaxfPKSm3Zbo
NODE_ENV = production
```

4. Click "Save"

### 3. Deployment automático

Listo. Railway ya está deployado.

En cada `git push` a `main`, Railway auto-redeploya.

## 📝 Paso 3: Obtener URL pública

1. En dashboard de Railway, ve a tu proyecto
2. Pestaña "Deployments"
3. Ve la URL generada (será algo como):
   ```
   https://trego-production.up.railway.app
   ```

4. Copia esa URL

## 🔗 Paso 4: Conectar frontend con backend en Railway

### Editar dashboard-v2.html

Abre `dashboard-v2.html` en tu editor y reemplaza:

```javascript
const API_URL = 'http://localhost:3001/api';
```

Por:

```javascript
const API_URL = 'https://trego-production.up.railway.app/api';
```

(Reemplaza `trego-production.up.railway.app` con tu URL real)

### Hacer push de cambios

```bash
git add dashboard-v2.html
git commit -m "Update API URL for Railway deployment"
git push
```

Railway auto-redeploya.

## ✅ Verificar que funciona

### Test 1: Health check
```
https://trego-production.up.railway.app/health
```

Debe retornar:
```json
{
  "status": "ok",
  "timestamp": "2024-..."
}
```

### Test 2: API de clientes
```
https://trego-production.up.railway.app/api/clientes
```

Debe retornar JSON con tus 5 clientes.

### Test 3: Dashboard

Abre `dashboard-v2.html` en navegador con la URL actualizada.

Debe conectar automáticamente con Railway.

## 💚 Monitorear Railway

En dashboard de Railway:

- **Logs**: Ve en tiempo real qué pasa
- **Metrics**: CPU, memoria, network
- **Deployments**: Historial de deploy

## 🔄 Updates automáticos

Cada vez que hagas:

```bash
git push origin main
```

Railway:
1. Detecta cambios
2. Re-instala dependencias
3. Redeploya automáticamente
4. Tu app está disponible en segundos

## 💰 Costos Railway

- **Gratis**: Primeros $5/mes
- **Pago**: $5 por cada $5 gastado
- Para Trego: probablemente $0-5/mes

## 🆘 Si algo falla

### Error: "Build failed"

Revisa logs en Railway:
1. Dashboard → Deployments
2. Click en último deployment
3. Mira la sección "Logs"

Errores comunes:
- `npm install` falla → Verifica `package.json`
- `PORT` no está definido → Agrega `PORT` en variables

### Error: "Cannot GET /api/clientes"

Backend no está corriendo.

En logs de Railway deberías ver:
```
🚀 Trego Backend corriendo en puerto [PORT]
```

Si no aparece, hay error de inicialización.

### Error: "Cannot connect to Monday API"

`MONDAY_API_KEY` es inválida o expiró.

En Railway:
1. Ve a Variables
2. Verifica que `MONDAY_API_KEY` es correcta
3. Redeploya

## 📱 Acceder desde celular

La URL de Railway funciona desde cualquier lugar:

```
https://trego-production.up.railway.app
```

Puedes:
- Abrir dashboard en navegador del celular
- Sincronizar desde cualquier lugar
- Agregar clientes remotamente

## 🎯 Workflow recomendado

```bash
# 1. Desarrollo local
npm start
# Prueba en http://localhost:3001

# 2. Cambios
# Edita archivos

# 3. Commit y push
git add .
git commit -m "Descripción del cambio"
git push origin main

# 4. Railway redeploya automáticamente
# Verifica en https://trego-production.up.railway.app
```

## 🎉 ¡Listo!

Ya tienes Trego en producción en Railway.

Próximos pasos:
- [ ] Compartir URL con equipo
- [ ] Hacer backup de BD
- [ ] Configurar monitoreo (opcional)
- [ ] Documentar cambios en repo

---

**¿Preguntas? Revisar logs en Railway dashboard.**
