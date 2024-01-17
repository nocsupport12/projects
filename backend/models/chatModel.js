const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    chatname:{
        type: String
    },
    lastmessages: {
      type: Number,
    },
    lastmessagetext: {
      type: String,
    },
    lastmessagesender: {
      type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
      },
  },
);
module.exports = mongoose.model("Chat", ChatSchema);
