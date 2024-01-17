

const ClientFormModel = require("../models/clientFormModel");


// Function to retrieve a single admin by ID
exports.getClientForm = async (req, res) => {
  const  id  = req.params.id;

  try {
    const clientForm = await ClientFormModel.findById(id)
    .populate('clientid') 

    if (clientForm) {
      res.status(200).json(clientForm);
    } else {
      res.status(404).json({ message: "Client Form not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Function to retrieve all admins
exports.getAllClientForm = async (req, res) => {
  try {
    const clientForm = await ClientFormModel.find();
    res.status(200).json(clientForm);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateClientForm = async (req, res) => {
    const _id = req.params.id;
    const set = req.body;
  
    try {
      const updatedclientForm = await ClientFormModel.findOneAndUpdate(
        { _id },
        { $set: set },
        { new: true } 
      );
  
      if (!updatedclientForm) {
        return res.status(404).json({
          success: false,
          message: "Client Form not found or could not be updated",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Client Form updated successfully",
        newData: updatedclientForm,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update Client Form" });
    }
  };
  

exports.createClientForm = async (req, res) => {
    try {
      const clientFormData = req.body;


      const newClientForm= new ClientFormModel(clientFormData);
      await newClientForm.save();
    
  
      res.status(201).json({
        success: true,
        message: "Fund Request added successfully",
        newData: newClientForm,
      });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deleteClientForm = async (req, res) => {

  const id = req.params.id;

  try {
    const clientForm = await ClientFormModel.findById(id);
    if (!clientForm) {
      return res.status(404).json({ success: false, message: "Client Form not found" });
    }
    await ClientFormModel.deleteOne({_id: id});
    res.status(200).json({ success: true, message: "Client Form successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to Fund Request" });
  }
};
  
 
  


  