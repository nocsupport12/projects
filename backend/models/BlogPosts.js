const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  title:{
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  barangay:{
    type: String,
    required: false,
  },
  municipality:{
    type: String,
    required: false,
  },
  province:{
    type: String,
    required: false,
  },
  type:{
    type: String,
    required: false,
  },
  level:{
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("BlogPosts", ImageSchema);
