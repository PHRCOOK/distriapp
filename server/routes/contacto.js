const express = require("express");
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/contacto.js");

const router = express.Router();

router.post("/contacto", createMessage);
router.get("/contacto", getMessages);
router.delete("/contacto/:id", deleteMessage);

module.exports = router;
