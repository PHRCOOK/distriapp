import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Flete() {
  const [shipments, setShipments] = useState([]); // Estado para almacenar los datos de los envíos
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [showUserData, setShowUserData] = useState({}); // Estado para controlar la visualización de los datos del usuario, usando un objeto

  useEffect(() => {
    // Función para obtener los envíos
    const fetchShipments = async () => {
      try {
        const response = await axios.get("/api/shipment"); // Cambia la URL según tu configuración
        setShipments(response.data); // Guardar los datos en el estado
      } catch (err) {
        setError(err.message); // Manejar errores
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    };

    fetchShipments(); // Llamar a la función al cargar el componente
  }, []);

  // Función para eliminar un envío
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shipment/${id}`);
      setShipments(shipments.filter((shipment) => shipment.id !== id)); // Eliminar el envío del estado
    } catch (err) {
      setError("Error al eliminar el envío: " + err.message);
    }
  };

  // Función para alternar la visualización de los datos del usuario
  const toggleUserData = (userEmail) => {
    setShowUserData((prevState) => ({
      ...prevState,
      [userEmail]: !prevState[userEmail], // Cambia la visibilidad solo para el usuario actual
    }));
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando envíos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        Error: {error}
      </div>
    );
  }

  // Agrupar los envíos por email de usuario
  const groupedShipments = shipments.reduce((acc, shipment) => {
    const userEmail = shipment.userEmail;
    if (!acc[userEmail]) {
      acc[userEmail] = [];
    }
    acc[userEmail].push(shipment);
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Envíos por Usuario</h1>

      {Object.keys(groupedShipments).length === 0 ? (
        <div className="alert alert-warning" role="alert">
          No hay envíos disponibles.
        </div>
      ) : (
        Object.keys(groupedShipments).map((userEmail) => {
          // Obtener el nombre del usuario para mostrar en mayúsculas
          const userName = groupedShipments[userEmail][0].userName;
          const userDni = groupedShipments[userEmail][0].dni;
          const userAddress = groupedShipments[userEmail][0].address;

          return (
            <div key={userEmail} className="mb-4">
              <h3>Pedidos de {userName.toUpperCase()}</h3>
              <button
                className="btn btn-info mb-3"
                onClick={() => toggleUserData(userEmail)} // Cambiar la visibilidad solo para el usuario actual
              >
                {showUserData[userEmail]
                  ? "Ocultar Datos"
                  : "Mostrar Datos del Usuario"}
              </button>

              {showUserData[userEmail] && (
                <div className="user-details mt-3">
                  <p>
                    <strong>Email:</strong> {userEmail}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {userAddress || "No disponible"}
                  </p>
                  <p>
                    <strong>DNI:</strong> {userDni || "No disponible"}
                  </p>
                </div>
              )}

              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Usuario</th>
                      <th>Email</th>
                      <th>Tipo de Usuario</th>
                      <th>Dirección</th> {/* Nueva columna de dirección */}
                      <th>DNI</th> {/* Nueva columna de DNI */}
                      <th>Acción</th>{" "}
                      {/* Columna de acción para el botón de eliminar */}
                    </tr>
                  </thead>
                  <tbody>
                    {groupedShipments[userEmail].map((shipment) => (
                      <tr key={shipment.id}>
                        <td>{shipment.id}</td>
                        <td>{new Date(shipment.date).toLocaleString()}</td>
                        <td>{shipment.name}</td>
                        <td>{shipment.count}</td>
                        <td>${shipment.price.toFixed(2)}</td>
                        <td>{shipment.userName}</td>
                        <td>{shipment.userEmail}</td>
                        <td>{shipment.userType}</td>
                        <td>{shipment.address || "N/A"}</td>{" "}
                        {/* Dirección, si está disponible */}
                        <td>{shipment.dni || "N/A"}</td>{" "}
                        {/* DNI, si está disponible */}
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(shipment.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
