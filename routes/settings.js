// routes/settings.js
const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get premium membership price
router.get('/premiumMembershipPrice', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json({ price: settings.premiumMembershipPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update premium membership price (admin only)
router.put('/premiumMembershipPrice', async (req, res) => {
  const { price } = req.body;
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ premiumMembershipPrice: price });
    } else {
      settings.premiumMembershipPrice = price;
    }
    await settings.save();
    res.json({ price: settings.premiumMembershipPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
