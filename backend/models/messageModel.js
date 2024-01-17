const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    urls: {
      type: Array,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    deleted:{
      type: Array,
      required: false,
    },
    date: {
        type: Date,
        default: Date.now(),
      },
  },
  
);

MessageSchema.index({ date: 1 });

module.exports = mongoose.model("Message", MessageSchema);