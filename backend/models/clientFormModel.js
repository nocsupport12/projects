const mongoose = require("mongoose");

const ClientFormSchema = new mongoose.Schema(
  {
    /////application
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
    ////Dispatch/same as JO
    materialsneeded:Object,
    dispatch:Object,
    noc:Object,
    billing: Object,
    action: Object,
    ////NOC
    accountnumber:String, ///TBF start number auto
    ipaddress:String,
    macaddress:String,
    installeddate: String,
    dateactivated: String,
    statusupdate: String,//application purpose only
    ///Update status to activated

    history:Array,

    date: {
        type: Date,
        default: Date.now,
      },
  },
  {timestamps: true}
);
module.exports = mongoose.model("ClientForm", ClientFormSchema);
