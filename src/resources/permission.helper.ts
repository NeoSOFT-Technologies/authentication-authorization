import jwt_decode from "jwt-decode";

export interface IPermission {
  resource?: string;
  scopes: string[];
}

// This variable needs to be removed once token provides resource based permissions
const resources: any = {
  Category: "category",
  Event: "event",
  Order: "order",
  User: "user",
};
const scopes: any = {
  Create: "create",
  Edit: "edit",
  Delete: "delete",
  View: "view",
};
// This will get jwt access token from localstorage
function getLocalAccessToken() {
  let user: any =
    localStorage.getItem(
      "oidc.user:https://dev-ba0ok41t.us.auth0.com:GdSP4Sfu2zMq9trCY8pxHgtJ78aUPOXT"
    ) || undefined;
  if (user) {
    user = JSON.parse(user);
  }
  return user?.id_token;
}

// This will decode jwt access token
export const getDecodeToken: any = () => {
  const token = getLocalAccessToken();
  let decoded;
  if (token) {
    decoded = jwt_decode(token);
  }

  return decoded;
};

function permissionFunction(token: any) {
  return [
    {
      resource: resources.Category,
      scopes: [scopes.View, scopes.Create, scopes.Edit],
    },
    {
      resource: resources.Event,
      scopes: [scopes.View, scopes.Create],
    },
    {
      resource: resources.Order,
      scopes: token && token.permission !== undefined ? token.permission : "",
    },
    {
      resource: resources.User,
      scopes: [scopes.View],
    },
  ];
}
// This will get current logged-in user's resource based permissions
export default function getUserPermissions(resource: string) {
  const token = getDecodeToken();
  // Uncomment below variable once Token provides resource based permissions
  // const permissions: IPermission[] = token.permission;

  // Token should provide resource based permission and then we will remove hard-code part
  const permissions: IPermission[] = permissionFunction(token);

  let resourcePermission: IPermission = {
    resource: "",
    scopes: [],
  };

  const userResources: string[] = [];
  if (permissions && permissions.length > 0) {
    // This will get resource specific permissions/scopes
    if (resource) {
      for (const item of permissions) {
        if (item.resource === resource) {
          resourcePermission = item;
          break;
        }
      }
      return resourcePermission;
    }
    // This will get all user permitted resources
    else {
      for (const item of permissions) {
        userResources.push(item.resource as string);
      }
      return userResources;
    }
  }
}
