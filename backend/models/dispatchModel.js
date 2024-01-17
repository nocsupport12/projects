const mongoose = require("mongoose");


const DispatchSchema = new mongoose.Schema(
  {
    joborder: Array,
    recipient: String,
    preparedby: String,
    item: Array,
    total: String,
    remarks: String,
    status: String,
    recievedby: Object,
    history: Array,
    
    date: {
        type: Date,
        default: Date.now,
      },
  },
  {timestamps: true}
);
module.exports = mongoose.model("Dispatch", DispatchSchema);
