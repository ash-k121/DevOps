import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import './profile.css';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [visibility, setVisibility] = useState("friends");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          const userResponse = await axios.post("http://localhost:5170/api/users/check", {
            email: user.email,
            name: user.name,
            picture: user.picture,
          });
          setUserData(userResponse.data);
          setBio(userResponse.data.bio);

          // Fetch posts for this user
          const postsResponse = await axios.get(`http://localhost:5170/api/posts/user/${userResponse.data._id}`);
          setPosts(postsResponse.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, user]);

  const handleBioChange = async () => {
    if (!userData) {
        alert("User data not available. Please try again later.");
        return;
    }
  
    try {
        await axios.put(`http://localhost:5170/api/users/${userData._id}/update-bio`, { bio });
        alert("Bio updated successfully!");
    } catch (error) {
        console.error("Error updating bio:", error);
        alert("Error updating bio. Please try again.");
    }
};

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        user_id: userData._id,
        content: newPostContent,
        visibility,
      };

      const response = await axios.post("http://localhost:5170/api/posts/create", newPost);
      setPosts([response.data, ...posts]); // Add new post to the beginning of the posts array
      setNewPostContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src={user.picture} alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Edit your bio" />
          <button onClick={handleBioChange}>Save Bio</button>
        </div>
      </div>

      <div className="new-post-section">
        <h3>Create a New Post</h3>
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            required
          />
          <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
            <option value="friends">Friends</option>
            <option value="public">Public</option>
          </select>
          <button type="submit">Post</button>
        </form>
      </div>

      <div className="posts-section">
        <h3>Your Posts</h3>
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h4>{post.content}</h4>
              <p>Visibility: {post.visibility}</p>
              <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
