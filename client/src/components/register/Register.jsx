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
  const [role, setRole] = useState("client"); // Default role 'client'
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Para mostrar mensajes de éxito

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validación del lado del cliente
    if (!email || !password || !name || !address || !dni || !role) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    setErrorMessage(""); // Limpiar cualquier mensaje de error anterior
    setSuccessMessage(""); // Limpiar cualquier mensaje de éxito anterior

    const user = {
      email,
      password,
      name,
      address,
      dni,
      role, // Se envía el rol
    };

    try {
      // Realizamos la solicitud POST para registrar el usuario
      const response = await axios.post("/users", user);

      if (response.status === 201) {
        // Si la respuesta es exitosa, mostramos mensaje de éxito
        setSuccessMessage("Usuario registrado con éxito.");
        setTimeout(() => {
          onClose(); // Cerrar el modal después de unos segundos
        }, 2000);
      }
    } catch (error) {
      // Manejo de errores
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message ||
            "Error al registrar el usuario. Inténtalo nuevamente."
        );
      } else {
        setErrorMessage("Error de conexión. Por favor, intenta nuevamente.");
      }
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
              <div className="form-group">
                <label htmlFor="role">Rol</label>
                <select
                  id="role"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="client">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              {/* Mensaje de error */}
              {errorMessage && <ErrorMessage message={errorMessage} />}
              {/* Mensaje de éxito */}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
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
