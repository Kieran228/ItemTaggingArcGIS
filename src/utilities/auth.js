//! Import necessary ArcGIS authentication and portal modules
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import IdentityManager from "@arcgis/core/identity/IdentityManager";
import Portal from "@arcgis/core/portal/Portal";

//* OAuth configuration object with application ID
//* Contains settings for ArcGIS authentication
const info = new OAuthInfo({
  appId: "3m25We4mjzP9Km9J",
});

//* Initializes OAuth authentication by registering OAuth configuration
//! Must be called before any authentication attempts
export function initializeOAuth() {
  IdentityManager.registerOAuthInfos([info]);
}

//* Checks if user is currently signed in and loads portal information
export function checkSignInStatus() {

  //* Promise resolving to user and portal objects if signed in
  //* Promise rejection if not signed in
  //* Verify authentication status with portal
  return IdentityManager.checkSignInStatus(info.portalUrl + "/sharing") 
    .then(() => {
      //* Create new Portal instance with immediate authentication                                                       
      const portal = new Portal({ authMode: "immediate" });
      return portal.load().then(() => ({ //* Load portal and return user information
        user: portal.user,
        portal,
      }));
    })
    .catch(() => Promise.reject());
}

//* Toggles sign-in state
//* If signed in: signs out and reloads page
//* If signed out: initiates sign-in process
export function signInOrOut() {
  IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
    .then(() => {
      IdentityManager.destroyCredentials();
      window.location.reload();
    })
    .catch(() => {
      IdentityManager.getCredential(info.portalUrl + "/sharing");
    });
}
