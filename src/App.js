// import React, { useState, useEffect } from "react";
// import SignInButton from "./components/SignInButton";
// import Gallery from "./components/Gallery";
// import { initializeOAuth, checkSignInStatus } from "./utilities/auth";

// function App() {
//   const [user, setUser] = useState(null);
//   const [portal, setPortal] = useState(null);

//   useEffect(() => {
//     initializeOAuth();

//     checkSignInStatus()
//       .then(({ user, portal }) => {
//         setUser(user);
//         setPortal(portal);
//       })
//       .catch(() => {
//         setUser(null);
//       });
//   }, []);

//   return (

    
//         <div className="text-center">
//           <header>
//             <h2>Welcome Back to the</h2>
//             <h1>ArcGIS Online Item Manager</h1>
//             <SignInButton user={user} />
//           </header>
//           {user ? (
//             <Gallery portal={portal} user={user} />
//           ) : (
//             <p>Please sign in to view your items.</p>
//           )}
//         </div>
//   );
// }

// export default App;

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
    <div className="app-container">
      {/* Card-styled main content */}
      <div className="main-card">
        <header className="text-center">
          <h1>ArcGIS Online Item Manager</h1>
          <p>Manage your ArcGIS items easily and efficiently.</p>
        </header>

        {/* Show login or gallery depending on sign-in status */}
        {!user ? (
          <div className="login-section text-center">
            <h2>Welcome Back</h2>
            <p>Please sign in to view and manage your items.</p>
            <SignInButton user={user} />
          </div>
        ) : (
          <Gallery portal={portal} user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
