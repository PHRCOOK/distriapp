import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const CartProduct = ({ product, onRemove }) => {
  const totalPriceProduct = product.price * product.count;

  return (
    <div
      className="card mb-3 shadow-sm"
      style={{ borderRadius: "0.5rem", marginTop: "20px" }}
    >
      <div className="card-body d-flex justify-content-between align-items-start">
        <div className="d-flex align-items-center">
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginRight: "15px",
            }}
          />
          <div>
            <h5 className="card-title mb-1">{product.name}</h5>
            <p className="card-text mb-2">Precio: ${product.price}</p>
            <p className="card-text mb-2">Descripción: {product.description}</p>
            <small className="text-muted">Cantidad: {product.count}</small>
            <h6 className="mt-2 text-success">
              Total: ${totalPriceProduct.toFixed(2)}
            </h6>
          </div>
        </div>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemove(product)}
          title="Eliminar producto"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
