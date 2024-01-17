

const PaymentModel = require("../models/paymentModel");


// Function to retrieve a single admin by ID
exports.getPayment = async (req, res) => {
  const  id  = req.params.id;

  try {
    const payment = await PaymentModel.findById(id)
    .populate('clientid') 
    .exec();

    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Function to retrieve all admins
exports.getAllPayment = async (req, res) => {
  try {
    const payment = await PaymentModel.find()
    .populate('clientid')
    .exec();
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updatePayment = async (req, res) => {
    const _id = req.params.id;
    const set = req.body;
  
    try {
      const updatedPayment = await PaymentModel.findOneAndUpdate(
        { _id },
        { $set: set },
        { new: true } 
      );
  
      if (!updatedPayment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found or could not be updated",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Payment updated successfully",
        newData: updatedPayment,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update payment" });
    }
  };
  

exports.createPayment = async (req, res) => {
    try {
      const paymentData = req.body;


      const newPayment= new PaymentModel(paymentData);
      await newPayment.save();
    
  
      res.status(201).json({
        success: true,
        message: "Fund Request added successfully",
        newData: newPayment,
      });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.deletePayment= async (req, res) => {

  const id = req.params.id;

  try {
    const payment = await PaymentModel.findById(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Fund Request not found" });
    }
    await PaymentModel.deleteOne({_id: id});
    res.status(200).json({ success: true, message: "Fund Request successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to Fund Request" });
  }
};
  
 
  


  