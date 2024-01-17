const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobOrderSchema = new Schema({
  accountnumber: {
    type: String ,
    required: false,
  },
  csrreportnumber: {
    type: String ,
    required: false,
  },
  clientname: {
    type: String ,
    required: false,
  },
  contact: {
    type: String ,
    required: false,
  },
  address: {
    type: String ,
    required: false,
  },
  type: {
    type: String ,
    required: false,
  },
  materialsneeded: {
    type: Array ,
    required: false,
  },
  networktype: {
    type: String ,
    required: false,
  },
  description: {
    type: String ,
    required: false,
  },
  dispatch: {
    type: Object ,
    required: false,
  },
  noc: {
    type: Object ,
    required: false,
  },
  billing: {
    type: Object ,
    required: false,
  },
  action: {
    type: Object ,
    required: false,
  },
  history: {
    type: Array ,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("JobOrder", JobOrderSchema);
