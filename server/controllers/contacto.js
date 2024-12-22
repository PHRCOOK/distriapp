const Contacto = require("../models/contacto.js"); // Asegúrate de que esta ruta es correcta

const createMessage = async (req, res) => {
  try {
    const { nombre, correo, mensaje, userId } = req.body;
    const nuevoMensaje = await Contacto.create({
      nombre,
      correo,
      mensaje,
    });
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el mensaje",
      error: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const mensajes = await Contacto.findAll();
    res.status(200).json(mensajes);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los mensajes",
      error: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await Contacto.findByPk(id);

    if (!mensaje) {
      return res.status(404).json({ message: "Mensaje no encontrado" });
    }

    await mensaje.destroy();
    res.status(200).json({ message: "Mensaje eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el mensaje",
      error: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};
