import React from "react";
import Logo from "../../assets/logo.jpg";

const NavbarBrand = () => {
  return (
    <a
      className="navbar-brand d-flex align-items-center"
      href="/"
      style={{ textDecoration: "none" }}
    >
      <img
        src={Logo}
        alt="Logo"
        className="rounded-circle me-2"
        style={{
          height: "100px",
          width: "100px",
          objectFit: "cover",
          border: "2px solid #007bff",
        }}
      />
      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#007bff",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        Distri App
      </span>
    </a>
  );
};

export default NavbarBrand;
