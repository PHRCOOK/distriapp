const { DataTypes } = require("sequelize");
const { sequelize } = require("../../server/config/db.js");

const Order = sequelize.define("Order", {
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
    // Nuevo campo para almacenar el ID del usuario
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    // Nuevo campo para almacenar la dirección del usuario
    type: DataTypes.STRING,
    allowNull: true, // Opcional, ya que no siempre es necesario
  },
  dni: {
    // Nuevo campo para almacenar el DNI del usuario
    type: DataTypes.STRING,
    allowNull: true, // Opcional, ya que no siempre es necesario
  },
});

module.exports = Order;
