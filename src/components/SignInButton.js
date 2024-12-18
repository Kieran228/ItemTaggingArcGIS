import React from "react";
import { signInOrOut } from "../utilities/auth";

function SignInButton({ user }) { //* user - The current user object, null if no user is signed in
  //* A button that toggles between sign-in and sign-out states
  //* Handles both sign-in and sign-out functionality
  return (
    <button className="sign-in-btn btn btn-primary" onClick={signInOrOut}> 

    {/* Conditionally render button text based on user authentication state
          If user exists, show "Sign Out" with username
          If no user, show "Login" */}
      {user ? `Sign Out (${user.username})` : "Login"}
    </button>
  );
}

export default SignInButton;
