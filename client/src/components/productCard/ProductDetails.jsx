import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <>
      <h5 className="card-title mb-2">{product.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">
        Precio: ${product.price}
      </h6>
      <p className="card-text mb-3 flex-grow-1">{product.description}</p>
      <p className="card-text mb-3">
        <strong>Stock:</strong>{" "}
        {product.stock > 0 ? product.stock : "Sin stock"}
      </p>
    </>
  );
};

export default ProductDetails;
