const express = require("express");
const router = express.Router();
const shipmentController = require("../../server/controllers/shipment.js");

router.post("/shipment", shipmentController.createShipment);
router.get("/shipment", shipmentController.getShipments);
router.delete("/shipment", shipmentController.clearShipmentHistory);
router.delete("/shipment/:id", shipmentController.deleteShipment);

module.exports = router;
