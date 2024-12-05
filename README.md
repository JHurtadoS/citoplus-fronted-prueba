# Frontend - Logs y Gestión de Usuarios

```markdown
Este proyecto incluye la gestión de usuarios y un sistema de visualización de logs, con funcionalidades como edición de usuarios, desactivación y visualización de logs paginados.


## Instalación
### Requisitos Previos

- **Node.js (v16 o superior)**
- **npm o yarn**


### Clonar el Repositorio
git clone <url-del-repositorio>
cd <nombre-del-proyecto>

### Instalar Dependencias
npm install

### Scripts Disponibles
Iniciar el Proyecto
npm run dev
Ejecuta la aplicación en modo de desarrollo. Abra [http://localhost:3000](http://localhost:3000) para verla en el navegador.



### Construir para Producción
npm run build
npm run start

### Ejecuta la aplicación optimizada para producción.
Abra http://localhost:3000 para verla en el navegador.

## Funcionalidades Principales
### Gestión de Usuarios
- **Creación de Usuarios**: Formulario con validaciones para añadir usuarios con nombre, email, roles y contraseña.
- **Edición de Usuarios**: Edición interactiva de los datos de usuarios existentes.
- **Desactivación de Usuarios**: Botón para desactivar usuarios con confirmación.
- **Paginación**: Navegación entre las páginas de usuarios.

### Visualización de Logs
- **Tabla de Logs**: Muestra los registros del sistema con detalles de las acciones realizadas.
- **Visualización de JSON**: Detalles de los logs formateados utilizando `react-json-view`.
- **Paginación**: Navegación entre las páginas de logs.

 ## #Notificaciones
- **Toasts**: Uso de toast para mostrar notificaciones de éxito y error en las acciones.

## Estructura del Proyecto
src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx          # Página principal del dashboard
│   ├── logs/
│   │   ├── page.tsx          # Página de visualización de logs
├── components/
│   ├── ui/                   # Componentes reutilizables (tabla, botones, etc.)
│   ├── forms/                # Formularios de edición y creación
│   ├── UserTable.tsx         # Tabla de usuarios
│   ├── LogTable.tsx          # Tabla de logs
├── context/
│   ├── DashboardContext.tsx  # Manejo de estado global para usuarios
├── services/
│   ├── userService.ts        # Servicios para la gestión de usuarios
│   ├── logsService.ts        # Servicios para la gestión de logs
├── utils/
│   ├── api.ts                # Configuración de Axios


## Dependencias Principales
- **Next.js**: Framework principal para el desarrollo frontend.
- **React Hook Form**: Manejo de formularios con validaciones.
- **React JSON View**: Visualización de JSON en los detalles de logs.
- **ShadCN UI**: Componentes de interfaz de usuario.
- **Axios**: Realización de peticiones HTTP.

Estilo y Diseño
- **TailwindCSS**: Utilizado para estilizar los componentes.
- **ShadCN UI**: Componentes estilizados para botones, tablas y notificaciones.




### Configuración Adicional
## Variables de Entorno
NEXT_PUBLIC_API_URL=http://localhost:3000/api


## Visualización de Logs
- **Verificar que los logs se muestran correctamente con detalles JSON interactivos**.
- **Navegar entre las páginas de logs**.

### Notificaciones
- **Verificar que los toasts aparecen para notificaciones de éxito y error**.

Comandos para Linter
npm run lint