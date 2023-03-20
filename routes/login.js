
const express = require('express');
const router = express.Router();

const User = require("../models/User")

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find user with given email and password
      const user = await User.findOne({ email, password });
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
});
module.exports = router;