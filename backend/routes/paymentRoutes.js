// blogposts.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { getPayment, createPayment, updatePayment, getAllPayment, deletePayment } = require("../controllers/paymentController");

// Define the route for retrieving all fund request
router.get("/retrieveAll", authMiddleware, getAllPayment);

// Define the route for retrieving a single fund request
router.get("/retrieve/:id", authMiddleware, getPayment);

// Define the route for updating a fund request
router.patch("/update/:id", authMiddleware, updatePayment);

router.post("/create", authMiddleware, createPayment);

// Define the route for deleting a fund request
router.delete("/delete/:id", authMiddleware, deletePayment);

module.exports = router;
