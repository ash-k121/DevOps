const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); // Import CORS
const path = require('path');
const User = require("./schema/userSchema"); // Import your Mongoose model
const Post= require("./schema/postSchema");
const app = express();
const port = 5170;

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static files

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialMedia')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Fetch users and send as an array
// app.get('/user', async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users
//     res.json(users); // Send the array of users as JSON response
//   } catch (error) {
//     console.error("Error fetching users:", error); // Log any error
//     res.status(500).json({ error: 'Server Error' }); // Send a 500 error response
//   }
// });

app.get('/post', async (req, res) => {
  try {
    const posts = await Post.find().populate('user_id'); // Fetch posts with user details
    res.json(posts);
} catch (error) {
    res.status(500).send(error.message);
}
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
