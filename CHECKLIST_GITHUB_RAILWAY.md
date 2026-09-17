# ✅ Checklist GitHub + Railway - Trego

Usa este checklist para completar el deployment en producción.

## 🔵 Preparación GitHub

- [ ] Creé cuenta en GitHub.com (si no la tenía)
- [ ] Tengo Git instalado en mi computadora (`git --version` en terminal)
- [ ] Creé nuevo repo público llamado `trego`

## 📤 Subir código a GitHub

### Opción A: Desde terminal (recomendado)

```bash
# En la carpeta de Trego:
git init
git add .
git commit -m "Initial commit: Trego sistema de liquidaciones"
git remote add origin https://github.com/TU_USER/trego.git
git branch -M main
git push -u origin main
```

- [ ] Sin errores
- [ ] Code aparece en GitHub (github.com/TU_USER/trego)
- [ ] Incluye `package.json`, `Procfile`, `dashboard-v2.html`, etc

### Qué se sube a GitHub:

```
✓ trego-backend.js
✓ dashboard-v2.html
✓ package.json
✓ Procfile
✓ .gitignore
✓ README_GITHUB.md
✗ .env (NO SE SUBE - está en .gitignore)
✗ trego.db (NO SE SUBE - está en .gitignore)
✗ node_modules/ (NO SE SUBE - está en .gitignore)
```

## 🟢 Preparación Railway

- [ ] Creé cuenta en [railway.app](https://railway.app)
- [ ] Tengo API Key de Monday (misma de antes)

## 🚀 Conectar GitHub a Railway

En Railway Dashboard:

1. Click "New Project"
2. Selecciona "Deploy from GitHub"
3. Conecta tu cuenta GitHub
4. Selecciona repo `trego`
5. Click "Deploy"

- [ ] Railway conectado a GitHub
- [ ] Deployment comienza automáticamente
- [ ] Puedes ver logs en "Deployments"

## 🔑 Configurar Variables de Entorno en Railway

En dashboard de Railway (tu proyecto):

1. Pestaña "Variables"
2. Agrega nueva variable:
   - Name: `MONDAY_API_KEY`
   - Value: `eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY3NjA3MjY1MCwiYWFpIjoxMSwidWlkIjoxMDY1MDM4MzAsImlhZCI6IjIwMjYtMDYtMjdUMTY6MjY6NDguMDAwWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjM1NzIxNjYxLCJyZ24iOiJ1c2UxIn0.ZjoCepGV2-ml_zDKMNGWLCqANaPsl7LDaxfPKSm3Zbo`

3. Agrega otra variable:
   - Name: `NODE_ENV`
   - Value: `production`

4. Click "Save"

- [ ] Variables guardadas
- [ ] Deployment automático disparado
- [ ] Puedes ver "Redeploying..." en logs

## 📝 Esperar deployment

En Railway, pestaña "Deployments":

- [ ] Estado cambió a "✓ Success" (espera 2-3 minutos)
- [ ] Ves URL pública asignada (algo como `https://trego-xxxxx.up.railway.app`)

**Copia esa URL.**

## 🔗 Actualizar dashboard con URL de Railway

En archivo `dashboard-v2.html`, cambia esta línea:

De:
```javascript
const API_URL = 'http://localhost:3001/api';
```

A (reemplaza con tu URL real):
```javascript
const API_URL = 'https://trego-production.up.railway.app/api';
```

O más simple, busca "localhost:3001" en el archivo y reemplaza por tu URL de Railway.

- [ ] URL actualizada
- [ ] Guardaste el archivo

## 📤 Push de cambios a GitHub

```bash
git add dashboard-v2.html
git commit -m "Update API URL for Railway"
git push origin main
```

- [ ] Sin errores
- [ ] GitHub.com muestra cambios
- [ ] Railway comienza redeploy automáticamente

## ✅ Verificar que funciona

### Test 1: Health Check

En navegador (o terminal):
```
https://trego-production.up.railway.app/health
```

Debería devolver:
```json
{"status":"ok","timestamp":"2024-..."}
```

- [ ] Retorna JSON
- [ ] Status es "ok"

### Test 2: API de clientes

```
https://trego-production.up.railway.app/api/clientes
```

Debería devolver JSON con 5 clientes.

- [ ] Retorna array de clientes
- [ ] Puedo ver: Natural Shop, Decoplate, Panchos, La Belle

### Test 3: Dashboard en navegador

Abre `dashboard-v2.html` localmente (o desde cualquier navegador):

1. Se carga la interfaz
2. Tab "📊 Dashboard" muestra tabla
3. Click "🔄 Sincronizar" funciona sin errores

- [ ] Dashboard carga correctamente
- [ ] No hay errores en consola (F12)
- [ ] Botón sincronizar conecta con Railway

## 🎯 Compartir con equipo

La URL ya está pública. Tu equipo puede:

1. Abrir archivo `dashboard-v2.html` local
2. O guardar HTML en Drive/Dropbox
3. Sincronizar y liquidar clientes

- [ ] Compartí URL de Railway con equipo
- [ ] Equipo probó que funciona

## 🔄 Workflow de updates

De aquí en adelante, para cualquier cambio:

```bash
# 1. Edita archivos localmente
# 2. Prueba en http://localhost:3001
# 3. Commit y push
git add .
git commit -m "Tu descripción del cambio"
git push origin main
# 4. Railway redeploya automáticamente
# 5. Cambios viven en https://tu-url-railway.app
```

- [ ] Entendí el workflow de updates
- [ ] Puedo hacer cambios y pushearlos

## 💚 Monitorear en producción

En dashboard de Railway:

- Ver logs en tiempo real
- Monitorear CPU/memoria
- Ver histórico de deployments

- [ ] Puedo acceder a Railway dashboard
- [ ] Veo logs del backend
- [ ] Puedo monitorear si hay errores

## 🎉 ¡COMPLETADO!

- [ ] Código en GitHub
- [ ] Deployado en Railway
- [ ] URL pública funcionando
- [ ] Equipo puede usar
- [ ] Auto-deployment configurado

---

## 📞 Próximos pasos

Si quieres agregar más features:

```bash
git clone https://github.com/TU_USER/trego.git
# Edita archivos
git add .
git commit -m "Feature: tu descripción"
git push origin main
# Railway redeploya automáticamente
```

---

**¡Trego está en producción! 🚀**
