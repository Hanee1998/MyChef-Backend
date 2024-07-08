const User = require('../models/User');

const createUser = async (req, res) => {
  const { email } = req.params;
  const { displayName, firstName, lastName, address, phone, country, city, zipCode } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        displayName,
        firstName,
        lastName,
        address,
        phone,
        country,
        city,
        zipCode
      });
      await user.save();
      return res.status(201).json(user);
    } else {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { email } = req.params;
  const { displayName, firstName, lastName, address, phone, country, city, zipCode } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        displayName,
        firstName,
        lastName,
        address,
        phone,
        country,
        city,
        zipCode
      });
      await user.save();
      return res.status(201).json(user);
    } else {
      user.displayName = displayName || user.displayName;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      user.phone = phone || user.phone;
      user.country = country || user.country;
      user.city = city || user.city;
      user.zipCode = zipCode || user.zipCode;

      const updatedUser = await user.save();
      return res.json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser, updateUser };
