const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { allChats,  userChats,  createChat, findChat, updateChat,deleteChat } = require('../controllers/chatController'); 




// Retrieve all chats in DB
router.get("/retrieveAllChats", authMiddleware, allChats);

// Retrieve all chats of the user
router.get("/retrieveChats/:id", authMiddleware, userChats);

// Define the route for adding a user account
router.post("/create", authMiddleware, createChat);

// Find chat between users
router.get("/findconversation/:id", authMiddleware, findChat);

router.patch("/update/:id", authMiddleware, updateChat);

// delete
router.delete("/delete/:id", authMiddleware, deleteChat);

module.exports = router;
