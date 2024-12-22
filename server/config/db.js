// const { Sequelize } = require("sequelize");
const { Sequelize } = require("sequelize"); // Asegúrate de incluir esta línea
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Requerido para Render
      rejectUnauthorized: false, // Evita errores de certificados SSL
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
