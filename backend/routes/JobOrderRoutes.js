const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { getJobOrder, getAllJobOrder, updateJobOrder, addJobOrder, deleteJobOrder } = require('../controllers/JobOrderController'); 

// Define the route for retrieving all user accounts
router.get("/retrieveAll", authMiddleware, getAllJobOrder);

// Define the route for retrieving a single user account
router.get("/retrieve/:id", authMiddleware, getJobOrder);

// Define the route for updating a user account
router.patch("/update/:id", authMiddleware, updateJobOrder);

// Define the route for adding a user account
router.post("/create", authMiddleware, addJobOrder);

// Define the route for deleting a user account
router.delete("/delete/:id", authMiddleware, deleteJobOrder);

module.exports = router;
