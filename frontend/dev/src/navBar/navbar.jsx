import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth0 } from "@auth0/auth0-react";
const Navbar = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate(); // Get the navigate function
  let userName="";
  isAuthenticated?(userName=user.name):(userName=" ")
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Handle search logic here (e.g., redirecting or filtering)
    console.log('Searching for:', searchQuery);
    // Optionally navigate to a search results page
    // navigate(`/search?query=${searchQuery}`);
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <h1>Hi {userName} !</h1>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          placeholder="Search..."
          style={{ padding: '5px' }}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={() => navigate('/profile')} style={{ marginLeft: '20px' }}>Profile</button> {/* Navigate to Profile */}
    </nav>
  );
};

export default Navbar;
