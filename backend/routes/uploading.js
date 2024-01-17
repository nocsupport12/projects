
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { createUploading, getAllUploadings, getUploading, updateUploading, deleteUploading } = require("../controllers/uploadingController");

router.post("/create", authMiddleware, createUploading);

// Define the route for retrieving all uploading
router.get("/retrieveAll", authMiddleware, getAllUploadings);

// Define the route for retrieving a single uploading
router.get("/retrieve/:id", authMiddleware, getUploading);

// Define the route for updating a uploading
router.patch("/update/:id", authMiddleware, updateUploading);

// Define the route for deleting a uploading
router.delete("/delete/:id", authMiddleware, deleteUploading);




module.exports = router;