// controllers/order.js
const orderController = {
  createOrder: async (req, res) => {
    // Lógica para crear un pedido
    const {
      date,
      name,
      count,
      price,
      userName,
      userEmail,
      userType,
      userId,
      address,
      dni,
    } = req.body;
    try {
      const newOrder = await Order.create({
        date,
        name,
        count,
        price,
        userName,
        userEmail,
        userType,
        userId,
        address,
        dni,
      });
      res.status(201).json(newOrder);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear el pedido", error: error.message });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los pedidos",
        error: error.message,
      });
    }
  },

  clearOrderHistory: async (req, res) => {
    try {
      const deletedCount = await Order.destroy({ where: {} });
      if (deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron pedidos para eliminar" });
      }
      res
        .status(200)
        .json({ message: "Historial de pedidos borrado exitosamente" });
    } catch (error) {
      res.status(500).json({
        message: "Error al borrar el historial de pedidos",
        error: error.message,
      });
    }
  },

  deleteOrder: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Pedido no encontrado" });
      }
      await order.destroy();
      res.status(200).json({ message: "Pedido eliminado exitosamente" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar el pedido", error: error.message });
    }
  },
};

export default orderController;
