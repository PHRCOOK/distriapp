import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import ErrorMessage from "./ErrorMessage";
import { useUser } from "../../context/UserContext";

// Recursive function to search for role or type in the user object
const findRoleInUserObject = (userObj) => {
  if (userObj) {
    // If 'role' or 'type' is directly found, return it
    if (userObj.role) return userObj.role;
    if (userObj.type) return userObj.type;

    // Recursively check nested objects
    for (let key in userObj) {
      if (typeof userObj[key] === "object") {
        const foundRole = findRoleInUserObject(userObj[key]);
        if (foundRole) return foundRole;
      }
    }
  }
  return null; // Return null if no role or type is found
};

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser, setUserType } = useUser(); // Use setUserType to update the role

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Por favor, complete todos los campos.");
    } else {
      try {
        setErrorMessage("");
        const response = await axios.post("/login", {
          email,
          password,
        });

        // Log the full response to inspect its structure
        console.log("Full response data:", response.data);

        if (response.data && response.data.user) {
          // Recursively search for the role in the user object
          const userRole = findRoleInUserObject(response.data.user);

          if (userRole) {
            setUser(response.data.user);
            setUserType(userRole); // Save the user role here
            console.log("User role:", userRole); // Log the role to the console
          } else {
            console.log("User role is undefined. Please check the structure.");
          }
        } else {
          console.log("User data is missing in the response.");
        }

        localStorage.setItem("user", JSON.stringify(response.data.user));

        onClose();
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
            <ErrorMessage message={errorMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
