// blogposts.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { getDispatch, createDispatch, updateDispatch, getAllDispatch, deleteDispatch } = require("../controllers/dispatchController");

// Define the route for retrieving all fund request
router.get("/retrieveAll", authMiddleware, getAllDispatch);

// Define the route for retrieving a single fund request
router.get("/retrieve/:id", authMiddleware, getDispatch);

// Define the route for updating a fund request
router.patch("/update/:id", authMiddleware, updateDispatch);

router.post("/create", authMiddleware, createDispatch);

// Define the route for deleting a fund request
router.delete("/delete/:id", authMiddleware, deleteDispatch);

module.exports = router;
