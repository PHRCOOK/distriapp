import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto para el usuario
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  // Cargar el usuario desde el localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserType = localStorage.getItem("userType");

    if (storedUser && storedUserType) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserType(storedUserType); // También cargamos el userType desde localStorage
    }
  }, []);

  // Cuando se actualiza el usuario, lo guardamos en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", userType);
    }
  }, [user, userType]);

  return (
    <UserContext.Provider value={{ user, userType, setUser, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useUser = () => useContext(UserContext);
