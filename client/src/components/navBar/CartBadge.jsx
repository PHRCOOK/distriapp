import React from "react";

const CartBadge = ({ cart }) => {
  return cart.length > 0 ? (
    <span
      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      style={{ fontSize: "0.75rem" }}
    >
      {cart.length}
    </span>
  ) : null;
};

export default CartBadge;
