const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const { username, password } = req.body;

      // Validation
      if (!username || !password) {
        res.status(400);
        throw new Error("Missing information");
      }

      // Check user doesn't already exist
      const userExists = await User.findOne({ username });
      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = await User.create({
        username,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json({
          username: user.username,
          watchList: user.watchList,
          favList: user.favList,
          token: generateToken(user._id),
        });
      }
    } catch (error) {
      next(error);
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      //   Check if user exists
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      //   Check if password exists
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("User not found");
      }

      res.status(200).json({
        _id: user._id,
        username: user.username,
        watchList: user.watchList,
        favList: user.favList,
        token: generateToken(user._id),
      });
    } catch (error) {
      next(error);
    }
  })
);

// watchList Routes
router.get(
  "/:userId/watchList",
  asyncHandler(async (req, res, next) => {
    try {
      const { watchList } = await User.findById(req.params.userId);
      res.status(200).json(watchList);
    } catch (error) {
      next(error);
    }
  })
);

router.put(
  "/:userId/watchList",
  asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  })
);

// favList Routes
router.get(
  "/:userId/favList",
  asyncHandler(async (req, res, next) => {
    try {
      const { favList } = await User.findById(req.params.userId);
      res.status(200).json(favList);
    } catch (error) {
      next(error);
    }
  })
);

router.put(
  "/:userId/favList",
  asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  })
);

const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = router;
