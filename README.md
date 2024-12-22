# Plataforma Web para Distribuidora

Este es un proyecto de una plataforma web para una distribuidora que permite a los clientes comprar productos, realizar pagos y ver el historial de pedidos. Además, proporciona una interfaz de administración para que los empleados gestionen productos y vendedores.

## Tecnologías Utilizadas

- **Frontend**: React, JavaScript, Bootstrap, Axios, react router.dom
- **Backend**: Node.js, Express.js
- **Base de Datos**: MongoDB
- **Autenticación**: JSON Web Tokens (JWT)
- **Pago**: Integración con mercadopago
- **Sistema de Autenticación**: JWT para el manejo de sesiones y seguridad.
- **Despliegue**: Front-end vercel , Back-end

## Requisitos del Proyecto

### Funcionalidades para Clientes

- **Registro e Inicio de Sesión**:

  - Los usuarios pueden registrarse y acceder mediante correo electrónico y contraseña.
  - Utiliza JWT para autenticación y autorización.

- **Búsqueda y Navegación de Productos**:

  - Los usuarios pueden buscar productos por nombre, categoría o precio.
  - Los productos se presentan con información detallada como nombre, precio, descripción e imágenes.

- **Visualización de Detalles del Producto**:

  - Los usuarios pueden ver detalles de un producto seleccionado (descripción, precio, imágenes).

- **Carrito de Compras**:

  - Los usuarios pueden agregar productos al carrito de compras.
  - El carrito se actualiza en tiempo real cuando se agregan o eliminan productos.

- **Proceso de Pago**:

  - Los usuarios pueden pagar por los productos en su carrito mediante PayPal o Stripe.
  - La integración de la API de PayPal o Stripe gestiona los pagos.

- **Historial de Pedidos**:
  - Los usuarios pueden ver el historial de pedidos realizados con sus detalles.

### Funcionalidades para Administradores

- **Gestión de Productos**:

  - Los administradores pueden añadir, editar o eliminar productos de la base de datos.
  - Los productos se gestionan con un sistema de categorías y precios.

- **Gestión de Vendedores**:

  - Los administradores pueden dar de alta o baja a los vendedores (empleados).
  - Los vendedores pueden agregar sus ventas a la plataforma, gestionando sus propios productos.

- **Estadísticas y Métricas**:

  - Los administradores pueden ver métricas como ventas totales, productos más vendidos y estadísticas de vendedores.

- **Autenticación y Roles**:
  - Los administradores tienen acceso completo a las funcionalidades de gestión.
  - Los vendedores solo tienen acceso a las funcionalidades relacionadas con sus ventas.

### Funcionalidades para Vendedores

- **Registro e Inicio de Sesión**:

  - Los vendedores pueden registrarse, iniciar sesión y gestionar sus ventas.

- **Gestión de Ventas**:
  - Los vendedores pueden cargar productos a la plataforma, editar o eliminar productos asociados a sus ventas.
  - Los vendedores pueden ver el total de sus ventas y la cantidad de productos vendidos.

## Estructura de la Base de Datos

La base de datos utiliza **MongoDB** para almacenar la información de los productos, pedidos y usuarios. Los principales modelos son:

- **Usuario**:

  - Contiene los datos del usuario, como nombre, correo electrónico, rol (cliente, vendedor, administrador), y contraseña (hash).

- **Producto**:

  - Contiene los detalles del producto, como nombre, categoría, precio, descripción, imagen y vendedor asociado.

- **Pedido**:

  - Almacena los pedidos realizados por los clientes, incluyendo los productos comprados, cantidades, precios y estado del pedido.

- **Vendedor**:
  - Los vendedores tienen un modelo propio que incluye las ventas realizadas, el total de productos vendidos, y métricas asociadas.

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/No-Country-simulation/C22-56-n-webapp
cd plataforma-distribuidora
2. Instalar dependencias
Backend:
bash
Copiar código
cd backend
npm install
Frontend:
bash
Copiar código
cd frontend
npm install
4. Ejecutar la aplicación
Backend:
bash
Copiar código
cd backend
npm start
Frontend:
bash
Copiar código
cd frontend
npm run dev
Rutas del API
Usuarios (Autenticación)
POST /api/auth/register: Registro de un nuevo usuario.
POST /api/auth/login: Inicio de sesión y obtención de JWT.
GET /api/auth/logout: Cerrar sesión.
Productos
GET /api/products: Listar productos.
POST /api/products: Añadir un nuevo producto (solo administradores y vendedores).
PUT /api/products/:id: Editar un producto.
DELETE /api/products/:id: Eliminar un producto.
Pedidos
POST /api/orders: Crear un pedido.
GET /api/orders: Ver todos los pedidos del cliente.
GET /api/orders/:id: Ver detalle de un pedido específico.
Vendedores
POST /api/vendors/register: Registrar un nuevo vendedor (solo administrador).
GET /api/vendors: Listar todos los vendedores.
GET /api/vendors/:id: Ver ventas de un vendedor específico.
POST /api/vendors/sales: Registrar una venta para un vendedor.
Estadísticas (Solo Administradores)
GET /api/admin/stats: Ver estadísticas generales de ventas, productos más vendidos, etc.
Autenticación y Seguridad
La aplicación utiliza JSON Web Tokens (JWT) para la autenticación y autorización de usuarios. Los usuarios autenticados reciben un token que debe enviarse en el encabezado Authorization de cada solicitud a rutas protegidas.

Proceso de autenticación:
Registro de usuario: Los usuarios se registran con su correo electrónico y contraseña.
Inicio de sesión: El sistema genera un JWT al validar las credenciales del usuario.
Acceso a rutas protegidas: El cliente debe enviar el JWT en el encabezado Authorization para acceder a rutas que requieren autenticación.
Despliegue
Este proyecto está preparado para ser desplegado en plataformas como Heroku, AWS, o DigitalOcean. Asegúrate de configurar las variables de entorno adecuadas en el entorno de producción.

Contribuciones
Si deseas contribuir al proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).
Realiza tus cambios y realiza un commit (git commit -am 'Añadir nueva funcionalidad').
Sube los cambios a tu rama (git push origin feature-nueva-funcionalidad).
Abre un Pull Request para revisión.
Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

Copiar código

Este `README.md` detalla las principales funcionalidades del proyecto y cómo configurar y ejecutar la plataforma. Además, se incluyen secciones específicas para la gestión de vendedores y métricas/estadísticas para administradores, lo que permite una gestión completa tanto de productos como de empleados dentro de la plataforma.

A continuación, te proporciono las historias de usuario para el proyecto de la plataforma web para la distribuidora, basadas en las funcionalidades que describí en el README.md. Las historias de usuario se escriben desde el punto de vista del usuario final (ya sea cliente, administrador o vendedor) y describen cómo interactúan con la plataforma.

Historias de Usuario
1. Como usuario (cliente), quiero registrarme y acceder a la plataforma para poder comprar productos.
Criterios de aceptación:
El usuario puede registrarse proporcionando su nombre, correo electrónico y una contraseña segura.
El sistema valida que el correo electrónico no esté registrado previamente.
El sistema debe mostrar un mensaje de confirmación tras un registro exitoso.
Después del registro, el usuario debe poder iniciar sesión con su correo electrónico y contraseña.
El sistema debe generar un JWT y enviarlo al cliente después del inicio de sesión.
2. Como usuario (cliente), quiero poder buscar productos por nombre, categoría o precio para encontrar lo que necesito rápidamente.
Criterios de aceptación:
El usuario puede filtrar los productos por nombre, categoría o rango de precios.
Los resultados de búsqueda se actualizan en tiempo real a medida que el usuario escribe.
3. Como usuario (cliente), quiero poder ver los detalles de un producto, incluyendo su descripción, precio e imágenes, para tomar una decisión de compra informada.
Criterios de aceptación:
El usuario puede hacer clic en un producto para ver sus detalles.
Los detalles del producto incluyen una descripción completa, precio y una o varias imágenes.
4. Como usuario (cliente), quiero agregar productos a mi carrito de compras para poder comprar varios productos a la vez.
Criterios de aceptación:
El usuario puede agregar productos al carrito haciendo clic en un botón "Agregar al carrito".
El sistema actualiza el carrito en tiempo real y muestra el número total de productos y el precio total.
El usuario puede ver y editar su carrito antes de proceder al pago.
5. Como usuario (cliente), quiero poder pagar por los productos de mi carrito utilizando PayPal o Stripe para completar mi compra.
Criterios de aceptación:
El usuario puede elegir entre PayPal o Stripe como método de pago.
El sistema realiza la transacción correctamente a través de la API de PayPal o Stripe.
El usuario recibe una confirmación de pago y se actualiza el estado del pedido.
6. Como usuario (cliente), quiero poder ver el historial de mis pedidos para poder revisar mis compras pasadas.
Criterios de aceptación:
El usuario puede acceder a un historial de pedidos desde su perfil.
Cada pedido debe mostrar detalles como la fecha, productos comprados, precios y estado del pedido.
7. Como administrador, quiero gestionar el registro de nuevos usuarios (clientes y vendedores) para poder darles acceso a la plataforma.
Criterios de aceptación:
El administrador puede crear un nuevo usuario, asignando un rol de cliente o vendedor.
El sistema envía un correo de confirmación al nuevo usuario para activar su cuenta.
8. Como administrador, quiero gestionar los productos (agregar, editar, eliminar) para asegurarme de que el catálogo esté siempre actualizado.
Criterios de aceptación:
El administrador puede agregar nuevos productos al sistema proporcionando nombre, precio, categoría, descripción e imágenes.
El administrador puede editar productos existentes (nombre, descripción, precio, imagen, etc.).
El administrador puede eliminar productos del catálogo.
9. Como administrador, quiero gestionar los vendedores (dar de alta o baja) para controlar el acceso de los empleados a la plataforma.
Criterios de aceptación:
El administrador puede asignar un nuevo vendedor a la plataforma.
El administrador puede eliminar a un vendedor de la plataforma, desactivando su cuenta.
10. Como administrador, quiero ver métricas y estadísticas de ventas, productos más vendidos y vendedores para poder tomar decisiones informadas.
Criterios de aceptación:
El administrador puede acceder a una sección de estadísticas que incluye:
Total de ventas por período.
Productos más vendidos.
Vendedores con mejores ventas.
Detalles sobre el rendimiento de cada vendedor.
11. Como vendedor, quiero registrarme en la plataforma para poder gestionar y vender mis productos.
Criterios de aceptación:
El vendedor puede registrarse proporcionando sus datos (nombre, correo, contraseña) y recibir un correo de confirmación.
El vendedor debe tener acceso a un área personalizada donde pueda gestionar sus productos.
12. Como vendedor, quiero agregar, editar o eliminar productos que vendo para tener el catálogo actualizado.
Criterios de aceptación:
El vendedor puede agregar nuevos productos proporcionándoles un nombre, precio, descripción, categoría e imágenes.
El vendedor puede editar productos existentes para cambiar sus detalles.
El vendedor puede eliminar productos que ya no desea vender.
13. Como vendedor, quiero ver mis estadísticas de ventas para conocer mis ingresos y productos más vendidos.
Criterios de aceptación:
El vendedor puede acceder a un panel donde puede ver sus estadísticas de ventas, como el total de ventas realizadas y productos vendidos.
El vendedor puede ver detalles de cada transacción y su estado (pendiente, completado, etc.).
14. Como vendedor, quiero registrar una venta para actualizar mis métricas de ventas.
Criterios de aceptación:
El vendedor puede registrar una venta después de una transacción completada, lo que actualiza las métricas en su panel.
El sistema debe permitir registrar la cantidad de productos vendidos, su precio y la fecha.
15. Como vendedor, quiero poder consultar el estado de mis ventas pasadas y ver detalles de mis pedidos, para saber qué he vendido y cuánto he ganado.
Criterios de aceptación:
El vendedor puede consultar un historial de ventas con detalles de cada pedido (productos vendidos, cantidad, precio total y estado).
16. Como administrador, quiero revisar las métricas de cada vendedor para gestionar sus rendimiento y posibles bonificaciones.
Criterios de aceptación:
El administrador puede ver un desglose de las ventas realizadas por cada vendedor, productos vendidos y el rendimiento individual.
El administrador tiene la capacidad de analizar el desempeño de cada vendedor y tomar decisiones relacionadas con incentivos o penalizaciones.
Conclusión
Estas historias de usuario describen cómo cada tipo de usuario (cliente, vendedor y administrador) interactúa con la plataforma, lo que facilita el desarrollo de funcionalidades centradas en las necesidades de cada rol. Además, las historias están orientadas a la experiencia de usuario y ayudan a guiar las pruebas, asegurando que todas las funcionalidades sean implementadas correctamente.
```
