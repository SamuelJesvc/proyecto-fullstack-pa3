# Sistema de Gestión de Artículos - Producto Académico N.º 3

## Descripción general y objetivo
Esta es una aplicación web Full-Stack diseñada para gestionar artículos. Permite el registro e inicio de sesión de usuarios, asegurando que cada persona solo pueda crear, listar y eliminar sus propios recursos, utilizando un módulo de seguridad con JWT.

## Tecnologías utilizadas
- **Frontend**: React (con Hooks), TypeScript, Vite.
- **Backend**: Node.js, Express.
- **Base de Datos**: MongoDB, Mongoose.
- **Seguridad**: bcryptjs (Hashing), jsonwebtoken (JWT).

## Requisitos previos
- Node.js (v16 o superior)
- MongoDB instalado localmente o cuenta en MongoDB Atlas.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd proyecto-fullstack
   ```

2. Instalar dependencias del servidor:
   ```bash
   cd server
   npm install
   ```

3. Instalar dependencias del cliente:
   ```bash
   cd ../client
   npm install
   ```

## Configuración de variables de entorno (Backend)
Dentro de la carpeta `server`, encontrarás un archivo `.env.example`. Copia su contenido y crea un archivo llamado `.env` en la misma carpeta, configurando tus credenciales:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sistema-articulos
JWT_SECRET=tu_secreto_seguro_aqui
```

## Ejecución del proyecto en modo desarrollo

1. **Backend**:
   ```bash
   cd server
   npm run dev
   ```
2. **Frontend**:
   ```bash
   cd client
   npm run dev
   ```

## Descripción de las funcionalidades
- **Registro y Login**: Implementado de forma segura en `auth.controller.js`.
- **Protección de rutas**: El middleware `auth.middleware.js` valida que en cada solicitud a `/api/articulos` se envíe el token correcto en `Authorization: Bearer <token>`.
- **CRUD (Artículos)**:
  - Listar: Obtiene los artículos del usuario logueado.
  - Crear: Genera un nuevo artículo y lo asocia automáticamente al usuario.
  - Eliminar: Borra un artículo de la BD (previamente verificando que el usuario logueado sea el dueño).
