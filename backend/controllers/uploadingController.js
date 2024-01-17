const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const fs = require("fs");

const Uploading = require('../models/Uploading')

const imageDirectory = 'uploads';
app.use('/uploads', express.static(imageDirectory));

let newName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    let destinationDirectory;
    
    if (file.mimetype.startsWith('image')) {
      destinationDirectory = 'uploads/images';
    } else if (file.mimetype.startsWith('video')) {
      destinationDirectory = 'uploads/videos';
    } else if (file.originalname.endsWith('.txt')) {
      destinationDirectory = 'uploads/documents/text-plain';
    } else if (file.originalname.endsWith('.docx')) {
      destinationDirectory = 'uploads/documents/msword';
    } else if (file.originalname.endsWith('.pptx')) {
      destinationDirectory = 'uploads/documents/ppt';
    } else if (file.originalname.endsWith('.xlsx')) {
      destinationDirectory = 'uploads/documents/excel';
    } else if (file.originalname.endsWith('.csv')) {
      destinationDirectory = 'uploads/documents/excel';
    } else {
      
      destinationDirectory = 'uploads/misc';
    }

    cb(null, destinationDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
    newName = uniqueSuffix.toString() + file.originalname;
  },
});

const upload = multer({ storage: storage });

exports.createUploading = async (req, res) => {
  upload.single('file')(req, res, async (err) => {
    // Check for multer errors
    if (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }

    try {
      // Destructure req.file and req.body
      const { filename, originalname, mimetype, size, img, } = req.file;

      // Create a new BlogPosts instance with the file path
      const uploading = await Uploading.create({
        filename,
        originalname,
        mimetype,
        size,
        img,
      });

      // Respond with the created blog post
      res.status(200).json(uploading);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
};


exports.getUploading = async (req, res) => {
  const  id  = req.params.id;

  try {
    const uploading = await Uploading.findById(id);
    if (uploading) {
      res.status(200).json(uploading);
    } else {
      res.status(404).json({ message: "Uploading not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Function to retrieve all admins
exports.getAllUploadings = async (req, res) => {
  try {
    const uploading = await Uploading.find();
    res.status(200).json(uploading);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUploading = async (req, res) => {
  const _id = req.params.id; 
  const  set  = req.body; 

  try {
    const uploading = await Uploading.findById(_id);
    if (!uploading) {
      return res.status(404).json({ success: false, message: "Uploading is not found" });
    }

   
    await BlogPosts.updateOne({ _id }, { $set: set });

 
    const updatedBlogPosts = await BlogPosts.findById(_id);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      newData: updatedBlogPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update blogposts" });
  }
};

const fsPromises = require('fs').promises;

exports.deleteUploading = async (req, res) => {
  const ids = req.params.id.split(','); // Assuming the IDs are passed as a comma-separated string
  const deletedData = [];

  try {
    for (const loopId of ids) {
      const uploading = await Uploading.findById(loopId);

      if (!uploading) {
        // If uploading document not found, skip to the next ID
        console.log(`Uploading with ID ${loopId} not found. Skipping.`);
        continue;
      }

      let destinationDirectory;

      // Determine the category based on the stored category or mimetype
      if (uploading.category) {
        destinationDirectory = `uploads/${uploading.category}`;
      } else {
        if (uploading.mimetype.startsWith('image')) {
          destinationDirectory = 'uploads/images';
        } else if (uploading.mimetype.startsWith('video')) {
          destinationDirectory = 'uploads/videos';
        } else if (uploading.originalname.endsWith('.txt')) {
          destinationDirectory = 'uploads/documents/text-plain';
        } else if (uploading.originalname.endsWith('.docx')) {
          destinationDirectory = 'uploads/documents/msword';
        } else if (uploading.originalname.endsWith('.pptx')) {
          destinationDirectory = 'uploads/documents/ppt';
        } else if (uploading.originalname.endsWith('.xlsx')) {
          destinationDirectory = 'uploads/documents/excel';
        } else if (uploading.originalname.endsWith('.csv')) {
          destinationDirectory = 'uploads/documents/csv';
        } else {
          
          destinationDirectory = 'uploads/misc';
        }
      }

      // Construct the correct file path based on the destinationDirectory and filename
      const filePath = path.join(__dirname, '..', destinationDirectory, uploading.filename);

      // Remove the uploading document from the collection
      await Uploading.findByIdAndDelete(loopId);

      // Unlink (delete) the file
      await fsPromises.unlink(filePath).catch(error => {
        // Handle unlink error (optional)
        console.error(`Error deleting file with ID ${loopId}:`, error.message);
      });

      deletedData.push(uploading);
      console.log(`Uploading with ID ${loopId} deleted successfully.`);
    }

    res.status(200).json({
      success: true,
      message: "Uploadings deleted successfully",
      deletedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};






