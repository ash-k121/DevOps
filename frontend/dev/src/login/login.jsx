import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
    <div>
      <button onClick={() => loginWithRedirect({ prompt: 'login' })}>Log In</button>
      {isAuthenticated ? navigate("/load") : null}
    </div>
  );
};

export default LoginButton;
