import React, { useState, useEffect } from "react";
import SignInButton from "./components/SignInButton";
import Gallery from "./components/Gallery";
import { initializeOAuth, checkSignInStatus, signInOrOut } from "./utilities/auth";
import './App.css';  

function App() {
  const [user, setUser] = useState(null);
  const [portal, setPortal] = useState(null);

  // Initialize OAuth and check sign-in status on load
  useEffect(() => {
    initializeOAuth();

    checkSignInStatus()
      .then(({ user, portal }) => {
        setUser(user);
        setPortal(portal);
      })
      .catch(() => {
        setUser(null);  // If not signed in, reset user
      });
  }, []);

  return (
    <div className="app-container">
      {/* Card-styled main content */}
      <div className="main-card">
        <header className="text-center">
          <h1>ArcGIS Online Item Manager</h1>
          <p>Manage your ArcGIS items easily and efficiently.</p>
        </header>

        {/* Show login button or the gallery depending on sign-in status */}
        {!user ? (
          <div className="login-section text-center">
            <h2>Welcome Back</h2>
            <p>Please sign in to view and manage your items.</p>
            <SignInButton onClick={signInOrOut} />  {/* Passing the signInOrOut function to SignInButton */}
          </div>
        ) : (
          <div>
            <button onClick={signInOrOut} className="logout-button">Log Out</button> {/* Log Out button */}
            <Gallery portal={portal} user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;







