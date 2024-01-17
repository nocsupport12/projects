/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
// const cloudinary = require('cloudinary').v2;
const cloudinary = require("./cloudinary/cloudinary")


const app = express();

const port = process.env.PORT || 6001;

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// db connection
const dbConfig = require("./config/db");
dbConfig();



// User accounts
const userAccountsRoutes = require("./routes/userAccounts");
app.use("/useraccounts", userAccountsRoutes);

// Post
const postsController = require("./routes/BlogPost");
app.use("/blogposts", postsController);

// Chat
const chatController = require("./routes/Chat");
app.use("/chat", chatController);

// Message
const messageController = require("./routes/Message");
app.use("/message", messageController);

// Post
const uploadingRoutes = require("./routes/uploading");
app.use("/uploading", uploadingRoutes);

// job order
const jobOrderRoutes = require("./routes/JobOrderRoutes");
app.use("/joborder", jobOrderRoutes);

// fund request
const fundRequestRoutes = require("./routes/FundRequestRoutes");
app.use("/fundrequest", fundRequestRoutes);

// client form
const clientFormRoutes = require("./routes/clientFormRoutes");
app.use("/clientform", clientFormRoutes);


// payment
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/payment", paymentRoutes);

// dispatch
const dispatchRoutes = require("./routes/dispatchRoutes");
app.use("/dispatch", dispatchRoutes);




app.listen(port, () => {
  console.log(`Listening to ${port} port`);
}); 
// //////////////////////////
