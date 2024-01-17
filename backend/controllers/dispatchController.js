

const DispatchModel = require("../models/dispatchModel");


// Function to retrieve a single admin by ID
exports.getDispatch = async (req, res) => {
  const  id  = req.params.id;

  try {
    const dispatch = await DispatchModel.findById(id);
    if (dispatch) {
      res.status(200).json(dispatch);
    } else {
      res.status(404).json({ message: "Dispatch not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Function to retrieve all admins
exports.getAllDispatch = async (req, res) => {
  try {
    const dispatch = await DispatchModel.find();
    res.status(200).json(dispatch);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateDispatch = async (req, res) => {
  const _id = req.params.id; 
  const  set  = req.body; 

  try {
    const dispatch = await DispatchModel.findById({ _id: _id, });
    if (!dispatch) {
      return res.status(404).json({ success: false, message: "Dispatch is not found" });
    }

    await DispatchModel.updateOne({ _id: _id }, { $set: set });

    const updatedDispatch = await DispatchModel.findById(_id);

    res.status(200).json({
      success: true,
      message: "Dispatch updated successfully",
      newData: updatedDispatch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update dispatch" });
  }
};

exports.createDispatch = async (req, res) => {
    try {
      const DispatchData = req.body;


      const newDispatch = new DispatchModel(DispatchData);
      await newDispatch.save();
      console.log(newFundRequest)
  
      res.status(201).json({
        success: true,
        message: "Dispatch added successfully",
        newData: newDispatch,
      });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteDispatch = async (req, res) => {

  const id = req.params.id;

  try {
    const dispatch = await DispatchModel.findById(id);
    if (!dispatch) {
      return res.status(404).json({ success: false, message: "Dispatch not found" });
    }
    await DispatchModel.deleteOne({_id: id});
    res.status(200).json({ success: true, message: "Dispatch successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to Dispatch" });
  }
};
  
 
  


  