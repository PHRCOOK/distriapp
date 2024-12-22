const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Aquí podrías agregar la validación de la contraseña, por ejemplo:
    // if (user.password !== password) {
    //   return res.status(400).json({ message: "Contraseña incorrecta" });
    // }

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error en el proceso de login",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  const { email, password, name, address, dni, role } = req.body;

  try {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const user = await User.create({
      email,
      password,
      name,
      address,
      dni,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al registrar el usuario",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, address, dni, role } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (password) user.password = password;
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (dni) user.dni = dni;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({ message: "Usuario actualizado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "name", "address", "dni", "role"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error.message,
    });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "email", "name", "address", "dni", "role"],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  register,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
};
