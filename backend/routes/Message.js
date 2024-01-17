const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { addMessage, getMessages, getMessagesLimit, deleteMessage, deleteForMe } = require('../controllers/messageController'); 

// Addmessage
router.post("/create", authMiddleware, addMessage);

// GetMessages
router.get("/retrieveAll/:id", authMiddleware, getMessages);

router.get("/retrieveAllWithLimit/:id/:offset", authMiddleware, getMessagesLimit);

// DELETE EACH MESSAGE 
router.delete("/delete/:messageId", authMiddleware, deleteMessage);

router.patch("/deleteForMe/:messageId/:userId", authMiddleware, deleteForMe);





module.exports = router;
