// blogposts.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { getClientForm, createClientForm, updateClientForm, getAllClientForm, deleteClientForm } = require("../controllers/clientFormController");

// Define the route for retrieving all fund request
router.get("/retrieveAll", authMiddleware, getAllClientForm);

// Define the route for retrieving a single fund request
router.get("/retrieve/:id", authMiddleware, getClientForm);

// Define the route for updating a fund request
router.patch("/update/:id", authMiddleware, updateClientForm);

router.post("/create", authMiddleware, createClientForm);

// Define the route for deleting a fund request
router.delete("/delete/:id", authMiddleware, deleteClientForm);

module.exports = router;
