import React from "react";

const OrderSelect = ({ onOrderChange }) => {
  return (
    <select
      id="orderSelect"
      className="form-select shadow-sm rounded-3 border-primary"
      onChange={onOrderChange}
    >
      <option value="priceAsc">Menor a mayor</option>
      <option value="priceDesc">Mayor a menor</option>
      <option value="alphaAsc">Nombre: de A a Z</option>
      <option value="alphaDesc">Nombre: de Z a A</option>
    </select>
  );
};

export default OrderSelect;
