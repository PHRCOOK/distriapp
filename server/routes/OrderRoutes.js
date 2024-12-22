const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController.js");

router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getOrders);
router.delete("/orders", orderController.clearOrderHistory);
router.delete("/orders/:id", orderController.deleteOrder);

module.exports = router;
