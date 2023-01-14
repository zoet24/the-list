const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validation
      if (!username || !password) {
        res.status(400);
        throw new Error("ZARLECK IS DISPLEASED");
      }

      // Check user doesn't already exist
      const userExists = await User.findOne({ username });
      if (userExists) {
        res.status(400);
        throw new Error("ZARLECK IS DISPLEASED");
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //   Create user
      const user = await User.create({
        username,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json({
          user,
        });
      }
    } catch (error) {
      res.status(400);
      throw new Error("ZARLECK IS DISPLEASED");
    }
  })
);

module.exports = router;
