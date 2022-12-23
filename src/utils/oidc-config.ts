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
  Okta?: PROVIDERS;
  Azure?: PROVIDERS;
}

const KEYCLOAK_IDENTITY_CONFIG = {
  authority: "http://localhost:8080/realms/Neosoft",
  client_id: "React-Application",
  client_secret: "wBJ2qPw8WhWK7NqD1iyM9K7NGirDOL47",
  redirect_uri: "http://localhost:3000/callback",
  scope: "openid profile email",
};

const AUTH0_IDENTITY_CONFIG = {
  authority: "https://dev-ba0ok41t.us.auth0.com",
  client_id: "GdSP4Sfu2zMq9trCY8pxHgtJ78aUPOXT",
  redirect_uri: "http://localhost:3000/callback",
  scope: "openid profile email",
};

const OKTA_IDENTITY_CONFIG = {
  authority: "https://dev-76985921.okta.com",
  client_id: "0oa7co7g2nnpRjjlh5d7",
  redirect_uri: "http://localhost:3000/callback",
  scope: "openid profile email",
};

const AZURE_ACTIVE_DIRECTORY_CONFIG = {
  authority:
    "https://login.microsoftonline.com/1e3bab2c-ff49-4d6c-827a-5017e6fd859c",
  client_id: "93220d6d-a71a-4e6f-9919-49ab354c35a0",
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
  Okta: {
    config: OKTA_IDENTITY_CONFIG,
    name: "Okta",
  },
  Azure: {
    config: AZURE_ACTIVE_DIRECTORY_CONFIG,
    name: "Azure",
  },
};
