// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 5432,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Conexión a PostgreSQL establecida con éxito");
//   } catch (error) {
//     console.error("Error al conectar a PostgreSQL:", error);
//     process.exit(1);
//   }
// };

// module.exports = { sequelize, connectDB };
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Si estás en producción o en Railway, usa DATABASE_URL. En desarrollo, usa las otras variables de entorno
const databaseUrl =
  process.env.DATABASE_URL ||
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Asegúrate de que SSL esté habilitado en producción (Railway lo requiere)
      rejectUnauthorized: false, // Esto puede ser necesario dependiendo del entorno
    },
  },
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
