const cloudinary = require('cloudinary').v2;
const UploadingImage = require('../models/BlogPosts');

// Handle video upload to Cloudinary
exports.uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: ' No image file uploaded. ' });
    }

    const image = req.files.image;
    
    // Upload the video to Cloudinary and wait for the response
    const result = await cloudinary.uploader.upload(image.tempFilePath);

    // Store the public URL in your database
    const newImage = new UploadingImage({
      ImageUrl: result.secure_url,
    });

    const savedImage = await newImage.save();

    res.status(200).json(savedImage);

    // res.status(200).json()
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image or saving to the database.'});
  }
};

exports.getAllImage = async (req, res) => {
    try {
      // Fetch all image from Cloudinary (resource_type: 'video')
      const result = await cloudinary.api.resources({ resource_type: 'image', });
  
      const imageUrls = result.resources.map((image) => image.secure_url);

      
      res.json(imageUrls);

    } catch (error) {
      console.error('Error fetching image from Cloudinary:', error);
      res.status(500).json({ error: 'Failed to fetch image' });
    }
  };





  

