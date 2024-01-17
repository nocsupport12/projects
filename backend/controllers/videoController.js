const cloudinary = require('cloudinary').v2;
const UploadingVideo = require('../models/UploadVideo'); 


// Handle video upload to Cloudinary
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.files || !req.files.video) {
      return res.status(400).json({ error: 'No video file uploaded.' });
    }

    const video = req.files.video;
    
    // Upload the video to Cloudinary with quality optimization
    const result = await cloudinary.uploader.upload(video.tempFilePath, {
      resource_type: 'video',
      quality: 'auto',
      width: 640, 
      height: 480,
      eager: [
        { quality: 'auto', width: 640, height: 480 }
      ]
    });

    // Store the public URL in your database
    const newVideo = new UploadingVideo({
      videoUrl: result.secure_url,
    });

    const savedVideo = await newVideo.save();

    res.status(200).json(savedVideo);
  } catch (error) {
    res.status(500).json({ error: 'Error uploading video or saving to the database.' });
  }
};



exports.getAllVideos = async (req, res) => {
    try {
      // Fetch all videos from Cloudinary (resource_type: 'video')
      const result = await cloudinary.api.resources({ resource_type: 'video', folder: "video" });
  
      const videoUrls = result.resources.map((video) => video.secure_url);
  
      res.json(videoUrls);
    } catch (error) {
      console.error('Error fetching videos from Cloudinary:', error);
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  };
  

