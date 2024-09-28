import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./cards";
export default function Post() {
  const [users, setUsers] = useState([]); // Initialize users as an empty array

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5170/post"); // Fetch user data from the server
        console.log("Fetched Data:", response.data); // Log the fetched data
        setUsers(response.data); // Set users to the fetched data
      } catch (error) {
        console.error("Error fetching users:", error); // Log any errors
      }
    };

    fetchUsers(); // Call the fetch function
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user, index) => (
           
            <Card profilePhoto={user.user_id.profilePicture} name={user.user_id.username} content={user.content}></Card>
            // profilePhoto, name, postImage, likes, comments
          // <li key={user._id}>{user.username }</li> // Display username or fallback message
        ))}
      </ul>
    </div>
  );
}
