import React from "react";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterSocialLinks from "./FooterSocialLinks";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Logo from "../../assets/icono-phr.jpg";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-4">
      <div className="container-sm d-flex justify-content-between align-items-start">
        <div className="mt-3">
          <img
            src={Logo}
            alt="Distri App Logo"
            className="img-fluid"
            style={{
              maxWidth: "195px",
              borderRadius: "50%", // Hace la imagen redonda
              objectFit: "cover", // Asegura que toda la imagen se vea dentro del círculo
            }}
          />
        </div>
        <div>
          <p>&copy; 2024 Distri App. Todos los derechos reservados.</p>
          <FooterLinks />
          <div className="mt-3">
            <FooterContact />
          </div>
        </div>

        <div className="text-end">
          <p>Síguenos en:</p>
          <FooterSocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
