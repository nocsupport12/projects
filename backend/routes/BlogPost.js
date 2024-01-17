// blogposts.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { getAllBlogPosts, createBlogPosts, updateBlogPosts, getBlogPosts } = require("../controllers/postsController");

// Define the route for retrieving all admins
router.get("/retrieveAll", authMiddleware, getAllBlogPosts);

// Define the route for retrieving a single admin
router.get("/retrieve/:id", authMiddleware, getBlogPosts);

// Define the route for updating a user account
router.patch("/update/:id", authMiddleware, updateBlogPosts);

router.post("/create", authMiddleware, createBlogPosts);

module.exports = router;
