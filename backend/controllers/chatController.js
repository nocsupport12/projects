// chatController.js      

const Chat = require("../models/chatModel");

exports.allChats = async (req, res) => {
  try {
    const chat = await Chat.find();
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.userChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.createChat = async (req, res) => {
  const members = req.body.members
  const newChat = new Chat({
    members: members,
    lastmessages: Date.now()
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateChat = async (req, res) => {
  const _id = req.params.id; 
  const  set  = req.body; 

  try {
    const chat = await Chat.findById(_id);
    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat is not found" });
    }

   
    await Chat.updateOne({ _id }, { $set: set });

 
    const updatedChat = await Chat.findById(_id);

    res.status(200).json({
      success: true,
      message: "Chat updated successfully",
      newData: updatedChat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update chat" });
  }
};

exports.deleteChat = async (req, res) => {
  const chatId  = req.params.id ; 
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await chat.deleteOne({chatId});

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json(error);
  }
};
