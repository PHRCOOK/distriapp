import React from "react";
import { useUser } from "../../context/UserContext";

const NavbarLinks = () => {
  const { user, userType } = useUser();

  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item me-3">
        <a className="nav-link" href="/">
          Inicio
        </a>
      </li>
      {!user && (
        <>
          <li className="nav-item me-3">
            <a className="nav-link" href="/about">
              Acerca de
            </a>
          </li>
          <li className="nav-item me-3">
            <a className="nav-link" href="/product">
              Productos
            </a>
          </li>
        </>
      )}
      {user && userType === "client" && (
        <>
          <li className="nav-item me-3">
            <a className="nav-link" href="/about">
              Acerca de
            </a>
          </li>
          <li className="nav-item me-3">
            <a className="nav-link" href="/product">
              Productos
            </a>
          </li>
        </>
      )}
      {user && userType === "shipment" && (
        <li className="nav-item me-3">
          <a className="nav-link" href="/flete">
            Envios
          </a>
        </li>
      )}
      {user && userType === "admin" && (
        <>
          <li className="nav-item me-3">
            <a className="nav-link" href="/list">
              Pedidos
            </a>
          </li>
          <li className="nav-item me-3">
            <a className="nav-link" href="/flete">
              Envios
            </a>
          </li>
          <li className="nav-item me-3">
            <a className="nav-link" href="/product">
              Productos
            </a>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavbarLinks;
