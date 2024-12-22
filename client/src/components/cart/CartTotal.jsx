import React from "react";

const CartTotal = ({ totalPrice }) => (
  <div className="mt-4 text-center" style={{ marginTop: "20px" }}>
    <h4>Total de la compra: ${totalPrice.toFixed(2)}</h4>
  </div>
);

export default CartTotal;
