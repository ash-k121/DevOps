// LoadingPage.jsx
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoadingPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const checkOrCreateUser = async () => {
      if (isAuthenticated && user) {
        try {
          // Check or create user in the backend
          await axios.post("http://localhost:5170/load", {
            email: user.email,
            name: user.name,
            picture: user.picture,
          });
          // Redirect to LandingPage after user is verified/created
          navigate("/main");
        } catch (error) {
          console.error("Error checking or creating user:", error);
        }
      } else {
        navigate("/"); // Redirect to login if not authenticated
      }
    };

    checkOrCreateUser();
  }, [isAuthenticated, user, navigate]);

  return (
    <div>
      <h2>Loading...</h2>
      <p>Verifying your account. Please wait...</p>
    </div>
  );
};

export default LoadingPage;
