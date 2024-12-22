const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductoController");

const router = express.Router();

router.get("/productos", getProducts);
router.post("/productos", createProduct);
router.put("/productos/:id", updateProduct);
router.delete("/productos/:id", deleteProduct);

module.exports = router;
