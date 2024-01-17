

const fundRequestModel = require("../models/fundRequestModel");


// Function to retrieve a single admin by ID
exports.getFundRequest = async (req, res) => {
  const  id  = req.params.id;

  try {
    const fundRequest = await fundRequestModel.findById(id);
    if (fundRequest) {
      res.status(200).json(fundRequest);
    } else {
      res.status(404).json({ message: "Fund Request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Function to retrieve all admins
exports.getAllRequestFund = async (req, res) => {
  try {
    const fundRequest = await fundRequestModel.find();
    res.status(200).json(fundRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateRequestFund = async (req, res) => {
  const _id = req.params.id; 
  const  set  = req.body; 

  try {
    const fundRequest = await fundRequestModel.findById({ _id: _id, });
    if (!fundRequest) {
      return res.status(404).json({ success: false, message: "Fund Request is not found" });
    }

    await fundRequestModel.updateOne({ _id: _id }, { $set: set });

    const updatedFundRequest = await fundRequestModel.findById(_id);

    res.status(200).json({
      success: true,
      message: "Fund Request updated successfully",
      newData: updatedFundRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update fund request" });
  }
};

exports.createFundRequest = async (req, res) => {
    try {
      const fundRequestData = req.body;


      const newFundRequest = new fundRequestModel(fundRequestData);
      await newFundRequest.save();
      console.log(newFundRequest)
  
      res.status(201).json({
        success: true,
        message: "Fund Request added successfully",
        newData: newFundRequest,
      });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteFundRequest= async (req, res) => {

  const id = req.params.id;

  try {
    const fundRequest = await fundRequestModel.findById(id);
    if (!fundRequest) {
      return res.status(404).json({ success: false, message: "Fund Request not found" });
    }
    await fundRequestModel.deleteOne({_id: id});
    res.status(200).json({ success: true, message: "Fund Request successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to Fund Request" });
  }
};
  
 
  


  