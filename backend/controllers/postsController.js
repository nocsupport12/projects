// postsController.js

const BlogPosts = require("../models/BlogPosts");

// Function to retrieve a single admin by ID
exports.getBlogPosts = async (req, res) => {
  const  id  = req.params.id;

  try {
    const blogPosts = await BlogPosts.findById(id);
    if (blogPosts) {
      res.status(200).json(blogPosts);
    } else {
      res.status(404).json({ message: "Blog Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Function to retrieve all admins
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPosts.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBlogPosts = async (req, res) => {
  const _id = req.params.id; 
  const  set  = req.body; 

  try {
    const blogPosts = await BlogPosts.findById(_id);
    if (!blogPosts) {
      return res.status(404).json({ success: false, message: "BlogPosts is not found" });
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


exports.createBlogPosts = async (req, res) => {
  const {imageUrl,category, title, description, type, barangay, municipality, province, level} = req.body
    try {
      const blogPosts = await BlogPosts.create({
        imageUrl, category, title, description, type, barangay, municipality, province, level
      });
        res.status(200).json(blogPosts);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

  
 
  


  