import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import IdentityManager from "@arcgis/core/identity/IdentityManager";
import Portal from "@arcgis/core/portal/Portal";

const info = new OAuthInfo({
  appId: "3m25We4mjzP9Km9J",
});

export function initializeOAuth() {
  IdentityManager.registerOAuthInfos([info]);
}

export function checkSignInStatus() {
  return IdentityManager.checkSignInStatus(info.portalUrl + "/sharing")
    .then(() => {
      const portal = new Portal({ authMode: "immediate" });
      return portal.load().then(() => ({
        user: portal.user,
        portal,
      }));
    })
    .catch(() => Promise.reject());
}

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
