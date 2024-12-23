const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./config/db.js");
const userRoutes = require("./routes/user.js");
const contactoRoutes = require("./routes/contacto.js");
const productoRoutes = require("./routes/producto.js");
const orderRoutes = require("./routes/order.js");
const shipmentRoutes = require("./routes/shipment.js");

const User = require("./models/user.js");
const Producto = require("./models/producto.js");
const Contacto = require("./models/contacto.js");
const Order = require("./models/order.js");
const Shipment = require("./models/shipment.js");

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
// const { sequelize, connectDB } = require("./config/db.js"); // Importamos la configuración de la DB
// const userRoutes = require("./routes/user.js");
// const contactoRoutes = require("./routes/contacto.js");
// const productoRoutes = require("./routes/producto.js");
// const orderRoutes = require("./routes/order.js");
// const shipmentRoutes = require("./routes/shipment.js");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Definir relaciones entre los modelos (Asegúrate de que los modelos estén correctamente definidos)
// const User = require("./models/user.js");
// const Producto = require("./models/producto.js");
// const Contacto = require("./models/contacto.js");
// const Order = require("./models/order.js");
// const Shipment = require("./models/shipment.js");

// User.hasMany(Producto, {
//   foreignKey: "userId",
//   onDelete: "SET NULL",
// });
// Producto.belongsTo(User, {
//   foreignKey: "userId",
// });

// User.hasMany(Contacto, {
//   foreignKey: "userId",
//   onDelete: "SET NULL",
// });
// Contacto.belongsTo(User, {
//   foreignKey: "userId",
// });

// User.hasMany(Order, {
//   foreignKey: "userId",
//   onDelete: "CASCADE",
// });
// Order.belongsTo(User, {
//   foreignKey: "userId",
// });

// Producto.hasMany(Order, {
//   foreignKey: "productoId",
//   onDelete: "CASCADE",
// });
// Order.belongsTo(Producto, {
//   foreignKey: "productoId",
// });

// User.hasMany(Shipment, {
//   foreignKey: "userId",
//   onDelete: "CASCADE",
// });
// Shipment.belongsTo(User, {
//   foreignKey: "userId",
// });

// Producto.hasMany(Shipment, {
//   foreignKey: "productoId",
//   onDelete: "CASCADE",
// });
// Shipment.belongsTo(Producto, {
//   foreignKey: "productoId",
// });

// // Sincronizar la base de datos (No usar { force: true } a menos que sea necesario)
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("Tablas sincronizadas");
//   })
//   .catch((error) => {
//     console.error("Error al sincronizar las tablas:", error);
//   });

// // Rutas de la API
// app.use("/api", userRoutes);
// app.use("/api", contactoRoutes);
// app.use("/api", productoRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", shipmentRoutes);

// // Conectar a la base de datos y iniciar el servidor
// const startServer = async () => {
//   await connectDB(); // Conectar a la base de datos
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Servidor corriendo en el puerto ${PORT}`);
//   });
// };

// startServer();
