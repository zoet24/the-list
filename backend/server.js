const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");

// Grab port info from config
const PORT = process.env.PORT || 5000;

// Connect to Mongo database
connectDB();

// Initialise app
const app = express();

// Body parser
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Listen for app
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode of port ${PORT}`)
);
