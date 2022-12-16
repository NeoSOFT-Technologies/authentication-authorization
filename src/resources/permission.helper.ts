import jwt_decode from "jwt-decode";
import { access } from "../components/auth-guard/AuthGuard";
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
      "oidc.user:https://login.microsoftonline.com/1e3bab2c-ff49-4d6c-827a-5017e6fd859c:93220d6d-a71a-4e6f-9919-49ab354c35a0"
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
  access.name = token?.name;
  return [
    {
      resource: resources.Category,
      scopes: [scopes.View, scopes.Create],
    },
    {
      resource: resources.Event,
      scopes: [scopes.View, scopes.Create, scopes.Edit, scopes.Delete],
    },
    {
      resource: resources.Order,
      scopes: [],
    },
    {
      resource: resources.User,
      scopes: [],
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
  if (permissions && permissions.length > 0 && token !== undefined) {
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
  } else {
    return resourcePermission;
  }
}
