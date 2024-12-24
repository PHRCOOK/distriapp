// controllers/shipment.js
import Shipment from "../models/Shipment.js";

const shipmentController = {
  createShipment: async (req, res) => {
    try {
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

      // Validación de campos requeridos
      if (
        !name ||
        !count ||
        !price ||
        !userName ||
        !userEmail ||
        !userType ||
        !userId
      ) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
      }

      // Crear un nuevo envío
      const newShipment = await Shipment.create({
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

      res.status(201).json(newShipment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Obtener todos los envíos con paginación
  getShipments: async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Valores por defecto: página 1 y 10 envíos por página

    try {
      const shipments = await Shipment.findAll({
        limit: parseInt(limit), // Número de envíos por página
        offset: (parseInt(page) - 1) * parseInt(limit), // Calcular el offset para la paginación
      });

      res.status(200).json(shipments);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Eliminar un envío por ID
  deleteShipment: async (req, res) => {
    const { id } = req.params; // Obtenemos el ID del envío desde los parámetros de la URL

    try {
      const shipment = await Shipment.findByPk(id); // Buscamos el envío por su ID
      if (!shipment) {
        return res.status(404).json({ error: "Envío no encontrado" }); // Si no existe, respondemos con un error 404
      }
      await shipment.destroy(); // Eliminamos el envío de la base de datos
      res.status(200).json({ message: "Envío eliminado exitosamente" }); // Respondemos con un mensaje de éxito
    } catch (err) {
      console.error(err); // Logueamos el error para depuración
      res.status(400).json({ error: err.message }); // Si ocurre un error, lo capturamos y respondemos con el error
    }
  },

  // Borrar el historial de envíos (eliminar todos los envíos)
  clearShipmentHistory: async (req, res) => {
    try {
      const deletedCount = await Shipment.destroy({ where: {} });
      if (deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron envíos para eliminar" });
      }
      res
        .status(200)
        .json({ message: "Historial de envíos borrado exitosamente" });
    } catch (err) {
      console.error(err); // Logueamos el error para depuración
      res.status(400).json({ error: err.message });
    }
  },
};

// Exportar el controlador como exportación por defecto
export default shipmentController;
