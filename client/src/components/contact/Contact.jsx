import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import ContactoField from "./ContactoField";
import ContactoButton from "./ContactoButton";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });
  const [mensajes, setMensajes] = useState([]);
  const { user, userType } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/contacts", formData);

      if (response.status === 201) {
        console.log("Formulario enviado:", response.data);
        alert("¡Gracias por contactarnos!");
        setFormData({ nombre: "", correo: "", mensaje: "" });
      } else {
        console.error("Error al enviar el formulario");
        alert("Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar tu mensaje. Inténtalo más tarde.");
    }
  };

  const fetchMensajes = async () => {
    try {
      const response = await axios.get("/api/contacts");
      setMensajes(response.data);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Contáctanos</h2>
      {userType !== "admin" ? (
        <form onSubmit={handleSubmit} className="card p-4 shadow">
          <ContactoField
            label="Nombre:"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
          />
          <ContactoField
            label="Correo electrónico:"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
            type="email"
            required
          />
          <ContactoField
            label="Mensaje:"
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí"
            type="textarea"
            rows="5"
            required
          />
          <ContactoButton text="Enviar mensaje" />
        </form>
      ) : (
        <div className="mt-4">
          <h3 className="text-center mb-4">Mensajes Recibidos</h3>
          <button onClick={fetchMensajes} className="btn btn-primary mb-3">
            Obtener Mensajes
          </button>
          <ul className="list-group">
            {mensajes.map((mensaje) => (
              <li key={mensaje.id} className="list-group-item">
                <p>
                  <strong>Nombre:</strong> {mensaje.nombre}
                </p>
                <p>
                  <strong>Correo:</strong> {mensaje.correo}
                </p>
                <p>
                  <strong>Mensaje:</strong> {mensaje.mensaje}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Contacto;
