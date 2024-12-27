import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Alert,
  Card,
} from "react-bootstrap";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    dni: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setClientes(response.data);
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message);
        setCargando(false);
      });
  }, []);

  const handleEdit = (cliente) => {
    setEditingUser(cliente);
    setFormData({
      name: cliente.name,
      email: cliente.email,
      address: cliente.address,
      dni: cliente.dni,
      role: cliente.role,
      password: "", // No pre-ponemos una contraseña al editar
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then(() => {
        setClientes(clientes.filter((cliente) => cliente.id !== id));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Verificar si todos los campos están llenos
    if (
      !formData.email ||
      !formData.name ||
      !formData.address ||
      !formData.dni ||
      !formData.role
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    axios
      .put(`/api/users/${editingUser.id}`, formData)
      .then((response) => {
        setClientes(
          clientes.map((cliente) =>
            cliente.id === editingUser.id ? response.data : cliente
          )
        );
        setEditingUser(null);
        setFormData({
          name: "",
          email: "",
          address: "",
          dni: "",
          role: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error(
          "Error en la actualización:",
          error.response ? error.response.data : error.message
        );
        setError(error.response ? error.response.data.message : error.message);
      });
  };

  if (cargando) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <span> Cargando...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="alert-dismissible fade show">
          <strong>Error:</strong> {error}
        </Alert>
      </Container>
    );
  }

  // Filtramos los clientes para que no se muestren aquellos con rol "admin"
  const clientesFiltrados = clientes.filter(
    (cliente) => cliente.role !== "admin"
  );

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Clientes</h1>

      {editingUser && (
        <div className="mb-5">
          <h2 className="mb-4 text-center">Editar Usuario</h2>
          <Form onSubmit={handleUpdate}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Dirección"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    placeholder="DNI"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formRole">
                  <Form.Label>Rol</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Rol"
                  />
                </Form.Group>
              </Col>
              {/* Aquí se deshabilita el campo de la contraseña */}
              <Col md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña (no editable)</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button variant="primary" type="submit" className="mt-3">
                Actualizar
              </Button>
            </div>
          </Form>
        </div>
      )}

      <ListGroup>
        {clientesFiltrados.map((cliente) => (
          <ListGroup.Item key={cliente.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{cliente.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {cliente.email}
                  <br />
                  <strong>Dirección:</strong> {cliente.address}
                  <br />
                  <strong>DNI:</strong> {cliente.dni}
                  <br />
                  <strong>Rol:</strong> {cliente.role}
                </Card.Text>

                <div className="d-flex justify-content-start">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(cliente)}
                    className="mr-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Clientes;
