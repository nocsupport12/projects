const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = Schema({
  filename: {
    type: String,
    required: false,
  },
  originalname: {
    type: String,
    required: false,
  },
  mimetype: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    required: false,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = ImageModel = mongoose.model("Image", ImageSchema);
