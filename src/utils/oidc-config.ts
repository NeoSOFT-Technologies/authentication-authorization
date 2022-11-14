interface IDENTITY_CONFIG {
  authority: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
}
interface PROVIDERS {
  config: IDENTITY_CONFIG;
  name: string;
}

interface IDENTITY_PROVIDERS {
  KeyCloak?: PROVIDERS;
  Auth0?: PROVIDERS;
}

const KEYCLOAK_IDENTITY_CONFIG = {
  authority: "http://localhost:8082/realms/Neosoft",
  client_id: "react-app",
  redirect_uri: "http://localhost:3000/callback",
  scope: "openid profile email",
};

const AUTH0_IDENTITY_CONFIG = {
  authority: "https://dev-ba0ok41t.us.auth0.com",
  client_id: "GdSP4Sfu2zMq9trCY8pxHgtJ78aUPOXT",
  redirect_uri: "http://localhost:3000/callback",
  scope: "openid profile email",
};

export const AuthProviders: IDENTITY_PROVIDERS = {
  KeyCloak: {
    config: KEYCLOAK_IDENTITY_CONFIG,
    name: "KeyCloak",
  },
  Auth0: {
    config: AUTH0_IDENTITY_CONFIG,
    name: "Auth0",
  },
};
