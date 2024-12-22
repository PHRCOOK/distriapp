const Producto = require("../models/Producto");

const getProducts = async (req, res) => {
  const { name, price, description, stock } = req.body;

  try {
    let filter = {};

    if (name) {
      filter.name = name;
    }

    if (price) {
      filter.price = price;
    }

    if (description) {
      filter.description = description;
    }

    if (stock) {
      filter.stock = stock;
    }

    const products = await Producto.findAll({ where: filter });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, image, stock } = req.body;

  try {
    const newProduct = await Producto.create({
      name,
      price,
      description,
      image,
      stock,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear producto", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, stock } = req.body;

  try {
    const product = await Producto.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Actualiza solo los campos proporcionados, incluyendo el stock
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.stock = stock || product.stock;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Producto.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.destroy();
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
