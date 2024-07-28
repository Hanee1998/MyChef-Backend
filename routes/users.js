const express = require('express');
const router = express.Router();
const { updateUser, createUser } = require('../controllers/userController');
const User = require('../models/User');


router.post('/:email', createUser);

router.put('/:email', updateUser);

router.get('/:email', async (req, res) => {
  try {
    console.log(req.params.email)
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
