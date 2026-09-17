# 📑 Índice de Archivos - Trego

Guía rápida sobre qué es cada archivo y para qué sirve.

## 🚀 EMPEZAR AQUÍ

### **INICIO_RAPIDO.txt** ⭐⭐⭐
- Resumen ejecutivo de los 3 pasos: GitHub → Railway → ¡Listo!
- **Lee esto PRIMERO**
- ~5 minutos

---

## 💻 CÓDIGO (Lo importante)

### **trego-backend.js**
- El backend Node.js que hace todo
- Lee Monday, calcula saldos, maneja BD
- **No modificar** a menos que sepas qué haces

### **dashboard-v2.html** ⭐
- Interfaz bonita con 2 tabs
- Dashboard: ver saldos y estadísticas
- Gestión: agregar/editar/eliminar clientes
- **Usar ESTE archivo** (no dashboard.html viejo)

### **trego-backend.js**
- Código principal del backend
- Endpoints API REST
- Sincronización con Monday

---

## ⚙️ CONFIGURACIÓN

### **.env** 🔒
- API Key de Monday (ya configurada)
- **NO SUBIR A GITHUB** (está en .gitignore)
- Contiene: MONDAY_API_KEY, PORT, NODE_ENV

### **.gitignore**
- Archivos que NO se suben a GitHub
- Incluye: .env, *.db, node_modules/
- **No modificar**

### **package.json** 📦
- Dependencias de Node.js (Express, SQLite, etc)
- Scripts: npm start
- Motor: Node 18.x
- **No modificar** (a menos que agregues dependencias)

### **Procfile**
- Cómo Railway ejecuta la app
- Contiene: `web: node trego-backend.js`
- **No modificar**

### **clientes.json**
- Lista de clientes (LEGACY)
- Ya no se usa (data está en BD)
- Puedes borrar si quieres

---

## 📖 DOCUMENTACIÓN

### **INICIO_RAPIDO.txt** ⭐⭐⭐
- Los 3 pasos para tener todo en producción
- Tomar 10 minutos
- **EMPIEZA AQUÍ**

### **README_GITHUB.md**
- Documentación completa para GitHub
- Requisitos, stack, endpoints API
- Setup local vs deployment

### **GUIA_RAPIDA.md**
- Instrucciones rápidas para usar Trego
- Cómo sincronizar, liquidar, agregar clientes
- Tips y troubleshooting

### **DEPLOYMENT_RAILWAY.md**
- Guía paso a paso para Railway
- Cómo configurar variables de entorno
- Cómo verificar que funciona
- Monitoreo en producción

### **CHECKLIST_INSTALACION.md**
- Checklist para setup LOCAL
- Verifica que todo funciona en tu PC
- Para testing antes de subir a GitHub

### **CHECKLIST_GITHUB_RAILWAY.md**
- Checklist para GitHub + Railway
- Paso a paso del deployment en producción
- Verifica cada etapa

### **README.md**
- Documentación general
- Requisitos, estructura, troubleshooting

---

## 🗄️ BASE DE DATOS

### **trego.db**
- Base de datos SQLite (se crea sola)
- Contiene: clientes, liquidaciones, historial
- **No subir a GitHub** (está en .gitignore)
- En Railway se crea automáticamente

---

## 📋 ARCHIVOS QUE NO NECESITAS

### **dashboard.html**
- Versión antigua del dashboard
- **NO USAR** - Usa dashboard-v2.html

### **install.sh / install.bat**
- Scripts de instalación automática
- Solo si quieres automatizar setup local
- Opcional

---

## 🎯 FLUJO DE TRABAJO

### **Para desarrollo LOCAL:**

1. **Instalar**
   ```bash
   npm install express sqlite3 axios dotenv cors
   ```

2. **Ejecutar**
   ```bash
   npm start
   ```

3. **Editar**
   - trego-backend.js (si cambias API)
   - dashboard-v2.html (si cambias interfaz)

4. **Probar**
   - Abrir dashboard-v2.html
   - Click "🔄 Sincronizar"
   - Ver que funciona

---

### **Para deployment en GitHub + Railway:**

1. **Subir a GitHub**
   ```bash
   git add .
   git commit -m "tu mensaje"
   git push origin main
   ```

2. **Railway redeploya automáticamente**
   - No haces nada
   - Verifica logs en Dashboard

3. **Verificar en producción**
   - Test API: https://tu-url/api/clientes
   - Test Dashboard: abre dashboard-v2.html
   - Cambiar API_URL si es necesario

---

## 📊 ARCHIVOS POR PRIORIDAD

### ⭐⭐⭐ CRÍTICOS
- trego-backend.js
- dashboard-v2.html
- package.json
- .env (API Key)

### ⭐⭐ IMPORTANTES
- Procfile
- .gitignore
- INICIO_RAPIDO.txt
- README_GITHUB.md

### ⭐ ÚTILES
- DEPLOYMENT_RAILWAY.md
- GUIA_RAPIDA.md
- CHECKLIST archivos

### ℹ️ REFERENCIA
- README.md
- INDICE_ARCHIVOS.md (este archivo)

---

## 📝 CHECKLIST: QU� DESCARGAR

Para empezar:

- [ ] trego-backend.js
- [ ] dashboard-v2.html
- [ ] package.json
- [ ] Procfile
- [ ] .env
- [ ] .gitignore
- [ ] INICIO_RAPIDO.txt

Para deployment:

- [ ] README_GITHUB.md
- [ ] DEPLOYMENT_RAILWAY.md
- [ ] CHECKLIST_GITHUB_RAILWAY.md

---

## 🆘 "¿Qué archivo edito para...?"

| Quiero hacer | Archivo | Línea |
|---|---|---|
| Agregar endpoint API | trego-backend.js | Busca "// Endpoints" |
| Cambiar interfaz | dashboard-v2.html | Busca "const App" |
| Cambiar API Key | .env | MONDAY_API_KEY = ... |
| Agregar dependencias | package.json | "dependencies": {...} |
| Cambiar puerto | .env | PORT = ... |

---

## 🎉 RESUMEN

**Archivos necesarios:**
1. trego-backend.js (backend)
2. dashboard-v2.html (interfaz)
3. package.json (dependencias)
4. .env (config)
5. Procfile (para Railway)
6. .gitignore (para no subir sensibles)

**Documentación:**
- Lee INICIO_RAPIDO.txt primero
- Luego README_GITHUB.md
- Luego DEPLOYMENT_RAILWAY.md

**El resto:**
- Referencia y checklists
- Úsalos si algo no funciona

---

¡Listo! Ahora tienes una visión clara de cada archivo y para qué sirve.

Next step: Lee INICIO_RAPIDO.txt 🚀
