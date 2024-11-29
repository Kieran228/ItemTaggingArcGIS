import React, { useState, useEffect } from "react";
import SignInButton from "./components/SignInButton";
import Gallery from "./components/Gallery";
import { initializeOAuth, checkSignInStatus } from "./utilities/auth";

function App() {
  const [user, setUser] = useState(null);
  const [portal, setPortal] = useState(null);

  useEffect(() => {
    initializeOAuth();

    checkSignInStatus()
      .then(({ user, portal }) => {
        setUser(user);
        setPortal(portal);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <div>
      <header>
        <h1>ArcGIS Online Item Manager</h1>
        <SignInButton user={user} />
      </header>
      {user ? (
        <Gallery portal={portal} user={user} />
      ) : (
        <p>Please sign in to view your items.</p>
      )}
    </div>
  );
}

export default App;
