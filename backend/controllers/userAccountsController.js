
const userAccounts = require("../models/userAccounts");

exports.getuserAccounts = async (req, res) => {
  const  id  = req.params.id;

  try {
    const user = await userAccounts.findById(id);


    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAlluserAccounts = async (req, res) => {
  try {
    const users = await userAccounts.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};






exports.updateUserAccounts = async (req, res) => {
  const _id = req.params.id; 
  const  set  = req.body; 

  try {
    const user = await userAccounts.findById(_id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User is not found" });
    }

   
    await userAccounts.updateOne({ _id }, { $set: set });

 
    const updatedUser = await userAccounts.findById(_id);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      newData: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};



exports.addUser = async (req, res) => {
  try {
   
    const userData = req.body;


    const newUser = new userAccounts(userData);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      newUser: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add user" });
  }
};


exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userAccounts.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    await userAccounts.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};





