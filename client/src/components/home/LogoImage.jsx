import React from "react";
import Logo from "../../assets/logo.jpg";

const LogoImage = () => (
  <img
    src={Logo}
    alt="Logo"
    className="rounded-circle"
    style={{
      marginTop: "50px",
      marginBottom: "-50px",
      width: "10vw",
      height: "10vw",
      objectFit: "cover",
      objectPosition: "center",
    }}
  />
);

export default LogoImage;
