const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const { uploadVideo, getAllVideos } = require('../controllers/videoController'); 

// Define the route for video upload
router.post('/create', authMiddleware, uploadVideo);

router.get("/retrieveAll" , authMiddleware, getAllVideos)


module.exports = router;
