import express from "express";
import shipmentController from "../controllers/shipment.js";

const router = express.Router();

router.post("/shipment", shipmentController.createShipment);
router.get("/shipment", shipmentController.getShipments);
router.delete("/shipment", shipmentController.clearShipmentHistory);
router.delete("/shipment/:id", shipmentController.deleteShipment);

export default router;
