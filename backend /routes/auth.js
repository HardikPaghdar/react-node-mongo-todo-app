const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // check for user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already created with given email' });
    }
  
  
    // Hash the password
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err});
      }
  
      const user = new User({
        email,
        password: hash,
        username
      });
  
      try {
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }


  // check password is same 
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (result === true) {
      // use JWT 
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

module.exports = router;
