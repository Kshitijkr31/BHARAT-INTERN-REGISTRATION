// app.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT environment variable or default to port 3000

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/registrationuser", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save(); // Use async/await to wait for the save operation

    res.send("Congratulations you have Succesfully Registered.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Registering User.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Your Server is running on http://localhost:${PORT}`);
});
