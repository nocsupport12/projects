const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAccountsSchema = new Schema({
  fullname: {
    type: String ,
    required: true,
  },
  contact: {
    type: String ,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  employeddate: {
    type: String,
    required: true,
  },
  office: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  privilegeaccess: {
    type: Array,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required:false,
  },
  password: {
    type: String,
    required: false,
  },
  barangay: {
    type: String,
    required: false,
  }, 
  municipality: {
    type: String,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  level: {
    type: String,
    required: false,
  },
  privilege: {
    type: String,
    required: false,
  }, 
  remarks: {
    type: String,
    required: false,
  }, 
  token: {
    type: String,
    required: false,
  },
  expiration: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("UserAccounts", UserAccountsSchema);
