const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const contactoRoutes = require("./routes/contactoRoutes.js");
const productoRoutes = require("./routes/productoRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const shipmentRoutes = require("./routes/shipmentRoutes.js");

const User = require("./models/User.js");
const Producto = require("./models/Producto.js");
const Contacto = require("./models/Contacto.js");
const Order = require("./models/Order.js");
const Shipment = require("./models/Shipment.js");

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
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const { sequelize, connectDB } = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const contactoRoutes = require("./routes/contactoRoutes");
// const productoRoutes = require("./routes/productoRoutes");
// const orderRoutes = require("./routes/OrderRoutes");
// const shipmentRoutes = require("./routes/shipmentRoutes");

// const User = require("./models/User");
// const Producto = require("./models/Producto");
// const Contacto = require("./models/Contacto");
// const Order = require("./models/Order");
// const Shipment = require("./models/Shipment");

// dotenv.config();

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// // Definición de relaciones
// User.hasMany(Producto, { foreignKey: "userId", onDelete: "SET NULL" });
// Producto.belongsTo(User, { foreignKey: "userId" });

// User.hasMany(Contacto, { foreignKey: "userId", onDelete: "SET NULL" });
// Contacto.belongsTo(User, { foreignKey: "userId" });

// User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
// Order.belongsTo(User, { foreignKey: "userId" });

// Producto.hasMany(Order, { foreignKey: "productoId", onDelete: "CASCADE" });
// Order.belongsTo(Producto, { foreignKey: "productoId" });

// User.hasMany(Shipment, { foreignKey: "userId", onDelete: "CASCADE" });
// Shipment.belongsTo(User, { foreignKey: "userId" });

// Producto.hasMany(Shipment, { foreignKey: "productoId", onDelete: "CASCADE" });
// Shipment.belongsTo(Producto, { foreignKey: "productoId" });

// // Sincronizar modelos con la base de datos
// sequelize
//   .sync({ force: false }) // Cambia a `true` si quieres reiniciar las tablas (solo en desarrollo)
//   .then(() => {
//     console.log("Tablas sincronizadas con éxito");
//   })
//   .catch((error) => {
//     console.error("Error al sincronizar las tablas:", error);
//   });

// // Rutas
// app.use("/api", userRoutes);
// app.use("/api", contactoRoutes);
// app.use("/api", productoRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", shipmentRoutes);

// // Puerto
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
