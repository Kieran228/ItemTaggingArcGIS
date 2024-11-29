import React from "react";
import { signInOrOut } from "../utilities/auth";

function SignInButton({ user }) {
  return (
    <button onClick={signInOrOut}>
      {user ? `Sign Out (${user.username})` : "Sign In"}
    </button>
  );
}

export default SignInButton;
