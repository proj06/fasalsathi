const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
      return res.render('register', { error: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if(exists){
      return res.render('register', { error: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');

    await User.create({
      name,
      email,
      password: hash,
      verificationToken: token
    });

    
    console.log("Verification token:", token);

    res.render('login', { success: "Account created. Verify email before login." });

  } catch (err) {
    console.error(err);
    res.render('register', { error: "Server error" });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.render('login', { error: "All fields required" });
    }

    const user = await User.findOne({ email });
    if(!user){
      return res.render('login', { error: "User not found" });
    }

    if(!user.isVerified){
      return res.render('login', { error: "Verify email first" });
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
      return res.render('login', { error: "Invalid password" });
    }

    res.redirect('/');

  } catch (err) {
    console.error(err);
    res.render('login', { error: "Server error" });
  }
});


router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if(!user){
      return res.send("Invalid token");
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.redirect('/login');

  } catch (err) {
    res.send("Verification failed");
  }
});

module.exports = router;
