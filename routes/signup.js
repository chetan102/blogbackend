const express = require('express');
const router = express.Router();

const User = require("../models/User")

router.post("/", async (req, res) => {
    const { email, password,username } = req.body
  
    try {
      // Check if user already exists with given email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.send("User already exists");
      } else {
        // Create new user with given email and password
        const user = new User({ 
            username:username,
            email:email,
            password:password
         });
        await user.save();
        res.send(user);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  });

  module.exports = router;