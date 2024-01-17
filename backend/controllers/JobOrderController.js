
const jobOrderModel = require("../models/jobOrderModel");

exports.getJobOrder = async (req, res) => {
  const  id  = req.params.id;

  try {
    const jobOrder = await jobOrderModel.findById(id);
    if (jobOrder) {
      res.status(200).json(jobOrder);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllJobOrder = async (req, res) => {
  try {
    const jobOrders = await jobOrderModel.find();
    res.status(200).json(jobOrders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




exports.updateJobOrder = async (req, res) => {
  const _id = req.params.id; 
  const  set  = req.body; 

  try {
    const jobOrder = await jobOrderModel.findById(_id);
    if (!jobOrder) {
      return res.status(404).json({ success: false, message: "Job Order is not found" });
    }

   
    await jobOrderModel.updateOne({ _id }, { $set: set });

 
    const updatedJobOrder = await jobOrderModel.findById(_id);
    console.log(req.body, updatedJobOrder)
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      newData: updatedJobOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};



exports.addJobOrder = async (req, res) => {
  try {
   
    const jobOrderData = req.body;


    const newJobOrder = new jobOrderModel(jobOrderData);
    await newJobOrder.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      newData: newJobOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add JobOrder" });
  }
};


exports.deleteJobOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const jobOrder = await jobOrderModel.findById(id);
    if (!jobOrder) {
      return res.status(404).json({ success: false, message: "JobOrder not found" });
    }
    await jobOrder.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "JobOrder deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete JobOrder" });
  }
};





