import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";

const Register = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dni, setDni] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      email === "" ||
      password === "" ||
      name === "" ||
      address === "" ||
      dni === ""
    ) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    setErrorMessage("");

    const user = {
      email,
      password,
      name,
      address,
      dni,
    };

    try {
      const response = await axios.post("/register", user);
      console.log("Usuario registrado con éxito:", response.data);
      onClose(); // Close the modal on successful registration
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setErrorMessage("Error al registrar el usuario. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="text-center mb-4">Registro</h2>
            <form onSubmit={handleRegister}>
              <FormInput
                id="name"
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormInput
                id="email"
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormInput
                id="password"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FormInput
                id="address"
                label="Domicilio"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <FormInput
                id="dni"
                label="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
              {/* Mensaje de error */}
              {errorMessage && <ErrorMessage message={errorMessage} />}
              <button type="submit" className="btn btn-primary w-100">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
