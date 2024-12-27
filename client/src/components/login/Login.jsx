import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import ErrorMessage from "./ErrorMessage";
import { useUser } from "../../context/UserContext";

// Función recursiva para buscar el rol o tipo en el objeto del usuario
const findRoleInUserObject = (userObj) => {
  if (userObj) {
    // Si encuentra 'role' o 'type', lo devuelve
    if (userObj.role) return userObj.role;
    if (userObj.type) return userObj.type;

    // Verifica los objetos anidados
    for (let key in userObj) {
      if (typeof userObj[key] === "object") {
        const foundRole = findRoleInUserObject(userObj[key]);
        if (foundRole) return foundRole;
      }
    }
  }
  return null; // Retorna null si no se encuentra un rol o tipo
};

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser, setUserType } = useUser(); // Usar setUserType para actualizar el rol

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Por favor, complete todos los campos.");
    } else {
      try {
        setErrorMessage("");

        // Solicitar login a la nueva ruta con prefijo "/api"
        const response = await axios.post("/api/login", {
          email,
          password,
        });

        // Loguea la respuesta completa para inspeccionar su estructura
        console.log("Full response data:", response.data);

        if (response.data && response.data.user) {
          // Buscar el rol del usuario de forma recursiva
          const userRole = findRoleInUserObject(response.data.user);

          if (userRole) {
            setUser(response.data.user);
            setUserType(userRole); // Guardar el rol del usuario
            console.log("User role:", userRole); // Mostrar el rol en consola
          } else {
            console.log("User role is undefined. Please check the structure.");
          }
        } else {
          console.log("User data is missing in the response.");
        }

        localStorage.setItem("user", JSON.stringify(response.data.user));

        onClose(); // Cerrar el modal al iniciar sesión
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Error en el proceso de login");
        }
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <LoginForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleLogin}
            />
            {/* Muestra los mensajes de error */}
            <ErrorMessage message={errorMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
