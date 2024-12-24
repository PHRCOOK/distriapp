import express from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
} from "../controllers/contacto.js";

const router = express.Router();

router.post("/contacto", createMessage);
router.get("/contacto", getMessages);
router.delete("/contacto/:id", deleteMessage);

export default router;
