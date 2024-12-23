const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const Shipment = sequelize.define("Shipment", {
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    // Nuevo campo: ID del usuario
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    // Nuevo campo: Dirección del usuario
    type: DataTypes.STRING,
    allowNull: true, // Opcional, puede ser nulo si no es obligatorio
  },
  dni: {
    // Nuevo campo: DNI del usuario
    type: DataTypes.STRING,
    allowNull: true, // Opcional, puede ser nulo si no es obligatorio
  },
});

module.exports = Shipment;
