const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  premiumMembershipPrice: { type: Number, required: true, default: 10 }
}, { versionKey: false });

module.exports = mongoose.model('Settings', SettingsSchema);
