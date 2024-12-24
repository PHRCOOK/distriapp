import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import userRoutes from "./routes/user.js";
import contactoRoutes from "./routes/contacto.js";
import productoRoutes from "./routes/producto.js";
import orderRoutes from "./routes/order.js";
import shipmentRoutes from "./routes/shipment.js";

import User from "./models/User.js";
import Producto from "./models/Producto.js";
import Contacto from "./models/Contacto.js";
import Order from "./models/Order.js";
import Shipment from "./models/Shipment.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

User.hasMany(Producto, {
  foreignKey: "userId",
  onDelete: "SET NULL",
});
Producto.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Contacto, {
  foreignKey: "userId",
  onDelete: "SET NULL",
});
Contacto.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Order, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Order.belongsTo(User, {
  foreignKey: "userId",
});

Producto.hasMany(Order, {
  foreignKey: "productoId",
  onDelete: "CASCADE",
});
Order.belongsTo(Producto, {
  foreignKey: "productoId",
});

User.hasMany(Shipment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Shipment.belongsTo(User, {
  foreignKey: "userId",
});

Producto.hasMany(Shipment, {
  foreignKey: "productoId",
  onDelete: "CASCADE",
});
Shipment.belongsTo(Producto, {
  foreignKey: "productoId",
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((error) => {
    console.error("Error al sincronizar las tablas:", error);
  });

app.use("/api", userRoutes);
app.use("/api", contactoRoutes);
app.use("/api", productoRoutes);
app.use("/api", orderRoutes);
app.use("/api", shipmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
