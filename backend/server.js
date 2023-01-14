const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

// Grab port info from config
const PORT = process.env.PORT || 5000;

// Initialise app
const app = express();

// Listen for app
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode of port ${PORT}`)
);
