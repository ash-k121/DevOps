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
// app.js
app.post("/load", async (req, res) => {
  const { email, username, profilePicture } = req.body; // Updated field names

  try {
    // Step 1: Check if user already exists in the database
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({ email, username, profilePicture });
      await user.save();
      console.log("New user created:", user);
    } else {
      console.log("User already exists:", user);
    }

    // Return user info to the client
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in check-or-create:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/getUser", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// app.put("/updateBio", async (req, res) => {
//   const { email, bio } = req.body;

//   try {
//     const user = await User.findOneAndUpdate(
//       { email },
//       { bio },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error updating bio:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Update profile picture
// app.put("/updateProfilePicture", async (req, res) => {
//   const { email, profilePicture } = req.body;

//   try {
//     const user = await User.findOneAndUpdate(
//       { email },
//       { profilePicture },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error updating profile picture:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Add post with image
// app.post("/addPost", async (req, res) => {
//   const { email, title, content, image, visibility } = req.body;

//   try {
//     // Find the user by email to get their _id
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create a new post linked to the user_id
//     const newPost = new Post({
//       user_id: user._id, // Link post to the user
//       content: content,  // Set the post content
//       visibility: visibility || "public",  // Default to "public" if not provided
//       created_at: new Date(),
//       updated_at: new Date(),
//     });

//     // Optionally add the image or title if they exist
//     if (title) newPost.title = title;
//     if (image) newPost.image = image;

//     // Save the new post to the Post collection
//     await newPost.save();

//     res.status(200).json(newPost);
//   } catch (error) {
//     console.error("Error adding post:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// Check user existence and fetch user data
app.post("/api/users/check", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update user bio
app.put("/api/users/:id/update-bio", async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { bio }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new post
app.post("/api/posts/create", async (req, res) => {
  const { user_id, content, visibility } = req.body;
  try {
    const newPost = new Post({ user_id, content, visibility, created_at: new Date(), updated_at: new Date() });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get posts by user ID
app.get("/api/posts/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ user_id: userId }).sort({ created_at: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

