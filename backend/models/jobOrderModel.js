const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobOrderSchema = new Schema({
  /////with client
  naturejoborder: String,///default pending
  status: String,///default pending
  fullname: String,
  contactnumber: String,
  email: String,
  address: String,
  area: String,
  mbps: String,
  microbizplan: String,
  type: String,
  monthlyplan: String,
  referencenumber: String,
  indexnumber: String,///TBF start number auto//App No.
  agent: String,
  remitdate: String,
  modeofpayment: String,
  otc: String,
  //////// if client trouble
  accountnumber: {
    type: String ,
    required: false,
  },
  ////normal dispatch form
  csrreportnumber: {
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
  csr: {
    type: Object ,
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
  /////NOC ONLY FOR ACTIVATION  
  ipaddress:String,
  macaddress:String,
  installeddate: String,
  dateactivated: String,
  statusupdate: String,//application purpose only
  ///Update status to activated


  // RECEIVER
  receiver:String,
  //Cleared departments
  cleareddepartments:Array,
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("JobOrder", JobOrderSchema);
