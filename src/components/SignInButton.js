import React from "react";
import { signInOrOut } from "../utilities/auth";

function SignInButton({ user }) {
  return (
    <button className="sign-in-btn btn btn-primary" onClick={signInOrOut}>
      {user ? `Sign Out (${user.username})` : "Login"}
    </button>
  );
}

export default SignInButton;
