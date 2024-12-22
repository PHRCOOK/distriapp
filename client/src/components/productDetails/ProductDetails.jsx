import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductNotFound from "./ProductNotFound";

function ProductDetails() {
  const { productId } = useParams();
  const { products } = useProducts();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.id === parseInt(productId, 10)
    );
    if (foundProduct) {
      setProducto(foundProduct);
      setLoading(false);
    } else {
      setError("Producto no encontrado en el contexto.");
      setLoading(false);
    }
  }, [productId, products]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="ms-3">Cargando...</p>
      </div>
    );
  }

  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ marginTop: "20px" }}
    >
      <div className="flex-grow-1">
        {producto ? (
          <div
            className="card mx-auto"
            style={{ maxWidth: "600px", marginTop: "40px" }}
          >
            <div className="card-body text-center">
              <ProductImage image={producto.image} name={producto.name} />
              <ProductInfo product={producto} />
            </div>
          </div>
        ) : (
          <ProductNotFound />
        )}
      </div>
      <footer
        className="text-center mt-4 py-3"
        style={{ marginTop: "20px" }}
      ></footer>
    </div>
  );
}

export default ProductDetails;
