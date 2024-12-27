import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductosCrud = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    stock: 0,
  });
  const [editando, setEditando] = useState(false);
  const [productoId, setProductoId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("/api/products");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleCrearProducto = async () => {
    try {
      await axios.post("/api/products", producto);
      fetchProductos();
      setProducto({ name: "", price: 0, description: "", image: "", stock: 0 });
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  const handleEditarProducto = (producto) => {
    setEditando(true);
    setProductoId(producto.id);
    setProducto({
      name: producto.name,
      price: producto.price,
      description: producto.description,
      image: producto.image,
      stock: producto.stock,
    });
  };

  const handleActualizarProducto = async () => {
    try {
      await axios.put(`/api/products/${productoId}`, producto);
      fetchProductos();
      setEditando(false);
      setProducto({ name: "", price: 0, description: "", image: "", stock: 0 });
      setProductoId(null);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestión de Productos</h1>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre del producto
        </label>
        <input
          id="name"
          type="text"
          className="form-control mb-2"
          name="name"
          placeholder="Nombre del producto"
          value={producto.name}
          onChange={handleInputChange}
        />

        <label htmlFor="price" className="form-label">
          Precio del producto
        </label>
        <input
          id="price"
          type="number"
          className="form-control mb-2"
          name="price"
          placeholder="Precio del producto"
          value={producto.price}
          onChange={handleInputChange}
        />

        <label htmlFor="description" className="form-label">
          Descripción del producto
        </label>
        <input
          id="description"
          type="text"
          className="form-control mb-2"
          name="description"
          placeholder="Descripción del producto"
          value={producto.description}
          onChange={handleInputChange}
        />

        <label htmlFor="image" className="form-label">
          URL de la imagen
        </label>
        <input
          id="image"
          type="text"
          className="form-control mb-2"
          name="image"
          placeholder="URL de la imagen"
          value={producto.image}
          onChange={handleInputChange}
        />

        <label htmlFor="stock" className="form-label">
          Stock del producto
        </label>
        <input
          id="stock"
          type="number"
          className="form-control mb-2"
          name="stock"
          placeholder="Stock del producto"
          value={producto.stock}
          onChange={handleInputChange}
        />

        {editando ? (
          <button
            className="btn btn-primary"
            onClick={handleActualizarProducto}
          >
            Actualizar
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleCrearProducto}>
            Crear
          </button>
        )}
      </div>

      <ul className="list-group">
        {productos.map((producto) => (
          <li
            key={producto.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{producto.name}</h5>
              <p>{producto.description}</p>
              <p>
                <strong>Precio:</strong> ${producto.price} -{" "}
                <strong>Stock:</strong> {producto.stock} unidades
              </p>
            </div>
            <img
              src={producto.image}
              alt={producto.name}
              style={{ width: "50px", height: "50px" }}
              className="rounded"
            />
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEditarProducto(producto)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleEliminarProducto(producto.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosCrud;
