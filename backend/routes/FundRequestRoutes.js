// blogposts.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { getFundRequest, createFundRequest, updateRequestFund, getAllRequestFund, deleteFundRequest } = require("../controllers/fundRequestController");

// Define the route for retrieving all fund request
router.get("/retrieveAll", authMiddleware, getAllRequestFund);

// Define the route for retrieving a single fund request
router.get("/retrieve/:id", authMiddleware, getFundRequest);

// Define the route for updating a fund request
router.patch("/update/:id", authMiddleware, updateRequestFund);

router.post("/create", authMiddleware, createFundRequest);

// Define the route for deleting a fund request
router.delete("/delete/:id", authMiddleware, deleteFundRequest);

module.exports = router;
