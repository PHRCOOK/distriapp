const Order = require("../models/Order.js");

exports.createOrder = async (req, res) => {
  try {
    const { date, name, count, price, user } = req.body;
    const newOrder = await Order.create({
      date,
      name,
      count,
      price,
      userName: user.name,
      userEmail: user.email,
      userType: user.userType,
      userId: user.id, // Nuevo campo: ID del usuario
      address: user.address, // Nuevo campo: Dirección del usuario
      dni: user.dni, // Nuevo campo: DNI del usuario
    });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los pedidos
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un pedido por ID
exports.deleteOrder = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del pedido desde los parámetros de la URL
  try {
    const order = await Order.findByPk(id); // Buscamos el pedido por su ID
    if (!order) {
      return res.status(404).json({ error: "Pedido no encontrado" }); // Si no existe, respondemos con un error 404
    }
    await order.destroy(); // Eliminamos el pedido de la base de datos
    res.status(200).json({ message: "Pedido eliminado con éxito" }); // Respondemos con un mensaje de éxito
  } catch (err) {
    res.status(400).json({ error: err.message }); // Si ocurre un error, lo capturamos y respondemos con el error
  }
};

// Borrar el historial de pedidos (eliminar todos los pedidos)
exports.clearOrderHistory = async (req, res) => {
  try {
    await Order.destroy({ where: {} });
    res.status(200).json({ message: "Historial de pedidos eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
