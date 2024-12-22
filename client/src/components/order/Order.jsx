import React, { useState } from "react";
import OrderSelect from "./OrderSelect";
import OrderLabel from "./OrderLabel";

const Order = ({ products, setProducts }) => {
  const handleOrderChange = (event) => {
    const value = event.target.value;
    let sortedProducts = [];

    if (value === "priceAsc") {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (value === "priceDesc") {
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
    } else if (value === "alphaAsc") {
      sortedProducts = [...products].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (value === "alphaDesc") {
      sortedProducts = [...products].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="mb-4">
      <OrderLabel />
      <OrderSelect onOrderChange={handleOrderChange} />
    </div>
  );
};

export default Order;
