const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  phone: { type: String },
  country: { type: String },
  city: { type: String },
  zipCode: { type: String }
}, { versionKey: false });

module.exports = mongoose.model('User', UserSchema);
