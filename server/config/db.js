const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a PostgreSQL establecida con éxito");
  } catch (error) {
    console.error("Error al conectar a PostgreSQL:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

// const { Sequelize } = require("sequelize");
// require("dotenv").config(); // Carga las variables del archivo .env

// // Configuración de Sequelize con la información de las variables de entorno
// const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: process.env.DB_HOST, // Host de la base de datos
//   port: process.env.DB_PORT || 5432, // Puerto de conexión, por defecto 5432
//   username: process.env.DB_USER, // Usuario de la base de datos
//   password: process.env.DB_PASSWORD, // Contraseña de la base de datos
//   database: process.env.DB_DATABASE, // Nombre de la base de datos
//   logging: false, // Puedes cambiar a `true` si quieres ver los logs de las consultas SQL
//   dialectOptions: {
//     ssl: {
//       require: true, // Necesario para la conexión con Supabase
//       rejectUnauthorized: false, // Para aceptar certificados no verificados
//     },
//   },
// });

// // Función para conectar a la base de datos
// const connectDB = async () => {
//   try {
//     // Intentamos conectar
//     await sequelize.authenticate();
//     console.log("Conexión a PostgreSQL establecida con éxito");
//   } catch (error) {
//     console.error("Error al conectar a PostgreSQL:", error.message);
//     process.exit(1); // Terminamos el proceso si la conexión falla
//   }
// };

// // Exportamos la instancia de Sequelize y la función para conectar
// module.exports = { sequelize, connectDB };
