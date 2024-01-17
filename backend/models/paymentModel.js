const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    
  clientid: {
    type: Schema.Types.ObjectId,
    ref: 'ClientForm', // Reference to the User model
    required: true,
  },
  referencenumber: {
    type: String,
    required: true,
  },
  bankplatform: {
    type: String,
    required: true,
  },
  paymentdate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
