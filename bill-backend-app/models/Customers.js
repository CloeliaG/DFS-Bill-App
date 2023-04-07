const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
  firstName: { 
    type: String,
    required: true 
  },
  lastName: { 
    type: String,
    required: true 
  },
  dateAdded: { 
    type: String,
    required: true 
  },
  role: String,
  phone: String,
  email: String,
  company: String,
  address: {
    type: Object,
    required : true
  }
});

module.exports = mongoose.model('Customer', customerSchema)