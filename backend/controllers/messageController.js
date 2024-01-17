const MessageModel = require("../models/messageModel");

exports.addMessage = async (req, res) => {
  const { chatId, senderId, text, urls, category } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
    urls,
    category
  });
  try {
    const result = await message.save();
    console.log(result)
    res.status(200).json({result, message});
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await MessageModel.find({ chatId: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessagesLimit = async (req, res) => {
  
  const { id ,offset} = req.params;

  // console.log(offset)
  try {
    const query = { chatId: id };

    const parsedOffset = parseInt(offset, 0) || 0; // Default offset to 0 if not provided
    const parsedLimit = parseInt(req.query.limit, 20) || 20; // Use req.query.limit, and default limit to 10 if not provided

    const result = await MessageModel.find(query)
      .sort({ date: 'asc' }) // Change 'date' if needed
      .skip(parsedOffset)
      .limit(parsedLimit)


    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json(error);
  }
};

exports.deleteMessage = async (req, res) => {
  const messageId  = req.params.messageId ; 

  try {
    const message = await MessageModel.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.deleteOne({messageId});

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json(error);
  }
};

exports.deleteForMe = async (req, res) => {
  const {messageId, userId} = req.params
  console.log(messageId, userId)
  // const userId = req.user.id; // Assuming you have user information in req.user
  if (!userId) {
    return res.status(401).json({ message: 'User ID is required' });
  }
    try {
      let message = await MessageModel.findById(messageId);
      console.log(messageId)
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      } 
    
    // Check if the user requesting deletion is the sender or receiver
    if (userId && message) {
      // Sender is deleting the message
      if (message.deleted) {
        message.deleted = message.deleted.length>0?[...message.deleted, userId]:[userId]        
      } else {
        message = {...message, deleted:[userId]}
      }
    }
    
    await message.save();
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json(error);
  }
};



