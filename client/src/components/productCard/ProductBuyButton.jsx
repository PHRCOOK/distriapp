import React from "react";
import { useUser } from "../../context/UserContext";

const ProductBuyButton = ({ product, handleBuyClick }) => {
  const { user, userType } = useUser();

  // If user is not logged in, show the message
  if (!user) {
    return <p>Por favor, inicie sesión para comprar.</p>;
  }

  // If user is an admin, don't show the button
  if (userType === "admin") {
    return null; // or you can return <p>No puedes comprar como administrador.</p> if you want a message instead
  }

  return (
    <button
      className="btn btn-primary mt-auto"
      onClick={(e) => {
        e.stopPropagation();
        if (product.stock > 0) {
          handleBuyClick(product.id);
        } else {
          alert("No hay stock disponible para este producto.");
        }
      }}
      disabled={product.stock <= 0}
    >
      Comprar
    </button>
  );
};

export default ProductBuyButton;
