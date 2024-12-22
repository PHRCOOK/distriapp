import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <>
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">
        <strong>Descripción:</strong> {product.description}
      </p>
      <p className="card-text">
        <strong>Precio:</strong> ${product.price}
      </p>
      <p className="card-text">
        <strong>Cantidad disponible:</strong> {product.stock}
      </p>
    </>
  );
};

export default ProductInfo;
