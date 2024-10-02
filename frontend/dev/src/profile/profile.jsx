import React, { useState } from 'react';
import './profile.css'; // For basic styling

const Profile = () => {
  // Mock user data
  const [user, setUser] = useState({
    name: "John Doe",
    followers: 120,
    following: 75,
    posts: [
      {
        id: 1,
        title: "Exploring the mountains",
        content: "Had an amazing time hiking the rocky trails. #nature #adventure",
      },
      {
        id: 2,
        title: "React is Awesome",
        content: "Started learning React today, and it's super fun! #coding #javascript",
      },
      {
        id: 3,
        title: "Best coffee in town",
        content: "Found the best coffee shop! Highly recommend it. #coffee #cafe",
      },
    ],
  });

  // Image upload handling
  const [image, setImage] = useState(null);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to remove the profile photo
  const handleRemoveImage = () => {
    setImage(null); // Clear the image state
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image" onClick={() => document.getElementById('file-input').click()}>
          {image ? (
            <div className="image-wrapper">
              <img src={image} alt="Profile" />
              <button className="remove-image-btn" onClick={handleRemoveImage}>Remove</button>
            </div>
          ) : (
            <div className="image-placeholder">Upload Image</div>
          )}
          <input 
            type="file" 
            id="file-input" 
            onChange={handleImageUpload} 
            accept="image/*" 
            style={{ display: 'none' }} // Hide the input
          />
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.followers} Followers</p>
          <p>{user.following} Following</p>
        </div>
      </div>

      <div className="posts-section">
        <h3>Posts</h3>
        <div className="posts-grid">
          {user.posts.map((post) => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
