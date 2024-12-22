import React from "react";

const ProductImage = ({ imageUrl, index }) => (
  <div
    key={index}
    className="m-2"
    style={{
      width: "15vw",
      height: "15vw",
      maxWidth: "150px",
      maxHeight: "150px",
      overflow: "hidden",
      borderRadius: "50%",
    }}
  >
    <img
      src={imageUrl}
      alt={`Product ${index}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  </div>
);

export default ProductImage;
