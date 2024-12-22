import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarBrand from "./NavbarBrand";
import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarAction";
import LoginModal from "../login/modal/LoginModal";
import RegisterModal from "../register/modal/RegisterModal";
import ContactModal from "../contact/modal/ContactModal";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const goToCart = () => navigate("/cart");
  const goToHistory = () => navigate("/history");

  const closeModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowContactModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="container">
          <NavbarBrand />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon me-3"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <NavbarLinks />
            <NavbarActions
              goToCart={goToCart}
              goToHistory={goToHistory}
              cart={cart}
              setShowLoginModal={setShowLoginModal}
              setShowRegisterModal={setShowRegisterModal}
              setShowContactModal={setShowContactModal}
            />
          </div>
        </div>
      </nav>
      <LoginModal open={showLoginModal} onClose={closeModal} />
      <RegisterModal open={showRegisterModal} onClose={closeModal} />
      <ContactModal open={showContactModal} onClose={closeModal} />
    </>
  );
};

export default Navbar;
