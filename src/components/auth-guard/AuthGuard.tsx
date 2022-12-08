// class AuthGuard {
//   constructor(public errorComponent: any) {
//     this.errorComponent = errorComponent;
//   }
import React from "react";
import Error401 from "../../pages/error-pages/Error401";
import getUserPermissions from "../../resources/permission.helper";

//   protect = (component: any, isAuthenticated: any) => {
//     const authenticationState = isAuthenticated;

//     return authenticationState ? component : this.errorComponent;
//   };
// }

// export default AuthGuard;

type component = {
  children?: any;
  resource?: any;
  scope?: any;
  protect?: boolean;
};

// This will be used by Button Actions and AppRoutes
export const access: any = {
  resources: {
    Category: "category",
    Event: "event",
    Order: "order",
    User: "user",
  },
  scopes: {
    Create: "create",
    Edit: "edit",
    Delete: "delete",
    View: "view",
  },
  name: "",
  protect: true,
};
// This will be used when Auth is turned off
const menus: string[] = [
  access.resources.Category,
  access.resources.Event,
  access.resources.Order,
  access.resources.User,
];

function isChildren(children: any, protect: any, authorized: any) {
  // This will execute when AuthGuard is invoked from AppRoutes
  if (protect) {
    return authorized ? children : <Error401 />;
  }
  // This will execute when AuthGuard is invoked from Action Buttons
  else {
    return authorized ? children : <></>;
  }
}

export function AuthGuard({ children, resource, scope, protect }: component) {
  let authorized = true;
  let permissions: any;

  // This will execute when Auth is turned on
  if (process.env.REACT_APP_GATEWAY_ENABLE_AUTH === "true") {
    // This will get Resource Based Permissions
    permissions = getUserPermissions(resource);

    // This will check specific resource has specific scope
    if (resource && scope) {
      authorized =
        permissions.scopes && permissions.scopes.length > 0
          ? permissions.scopes.includes(scope)
          : false;
    }
  }
  // This will execute when Auth is turned off
  else {
    permissions = menus;
  }

  // This will check if AuthGuard is invoked from Action Buttons, or AppRoutes or Menus
  if (children) {
    return isChildren(children, protect, authorized);
  }
  // This will execute when AuthGuard is invoked from Menus
  else if (resource === undefined && permissions) {
    return permissions;
  }

  return authorized;
}
