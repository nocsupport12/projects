const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const { uploadImage, getAllImage } = require('../controllers/imageController'); 

// Define the route for video upload
router.post('/create', authMiddleware, uploadImage);

router.get("/retrieveAll" , authMiddleware, getAllImage)


module.exports = router;
