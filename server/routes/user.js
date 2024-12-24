import express from "express";
import {
  login,
  register,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/users", getUsers);
router.get("/user/:id", getUserById);

export default router;
