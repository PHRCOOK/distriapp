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
