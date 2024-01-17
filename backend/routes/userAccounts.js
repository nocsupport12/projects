const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { getuserAccounts, getAlluserAccounts, updateUserAccounts, addUser, deleteUser } = require('../controllers/userAccountsController'); 

// Define the route for retrieving all user accounts
router.get("/retrieveAll", authMiddleware, getAlluserAccounts);

// Define the route for retrieving a single user account
router.get("/retrieve/:id", authMiddleware, getuserAccounts);

// Define the route for updating a user account
router.patch("/update/:id", authMiddleware, updateUserAccounts);

// Define the route for adding a user account
router.post("/create", authMiddleware, addUser);

// Define the route for deleting a user account
router.delete("/delete/:id", authMiddleware, deleteUser);

module.exports = router;
