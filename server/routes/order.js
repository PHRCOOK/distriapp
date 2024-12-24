import express from "express";
import orderController from "../controllers/order.js";

const router = express.Router();

router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getOrders);
router.delete("/orders", orderController.clearOrderHistory);
router.delete("/orders/:id", orderController.deleteOrder);

export default router;
