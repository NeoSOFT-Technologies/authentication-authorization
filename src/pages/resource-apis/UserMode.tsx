import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { access, AuthGuard } from "../../components/auth-guard/AuthGuard";
import {
  permissionFunction,
  getDecodeToken,
} from "../../resources/permission.helper";

export default function UserMode() {
  const navigate = useNavigate();
  const NavigateToView = (key: any) => {
    navigate("/view" + key);
  };
  const NavigateToCreate = (key: any) => {
    navigate("/create" + key);
  };
  const NavigateToUpdate = (key: any) => {
    navigate("/update" + key);
  };
  const NavigateToDelete = (key: any) => {
    navigate("/delete" + key);
  };

  const token = getDecodeToken();
  const resourcePermission = permissionFunction(token);

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <Card>
        <Card.Header>
          <h2 className="card-title">Logged-In User ({access.name})</h2>
          <em>
            User is Authorized to access following resources with provided scope
          </em>
        </Card.Header>
        <Card.Body>
          <div className="mt-2">
            <div>
              {/* 👇️ iterate object KEYS */}
              {Object.keys(access.resources).map((key) => {
                return (
                  <div key={key}>
                    {/* <h2>{key}</h2> */}
                    {
                      // eslint-disable-next-line array-callback-return
                      resourcePermission.map((a) => {
                        if (
                          a.resource === key.toLowerCase() &&
                          a.scopes.length > 0
                        ) {
                          return <h2>{key}</h2>;
                        }
                        // eslint-disable-next-line react/jsx-key
                      })
                    }
                    <div>
                      {" "}
                      <AuthGuard
                        resource={access.resources[key]}
                        scope={access.scopes.View}
                      >
                        <button
                          className=" mr-3"
                          onClick={() => NavigateToView(key)}
                        >
                          View
                        </button>
                      </AuthGuard>
                      <AuthGuard
                        resource={access.resources[key]}
                        scope={access.scopes.Create}
                      >
                        <button
                          className="mr-3"
                          onClick={() => NavigateToCreate(key)}
                        >
                          Create
                        </button>
                      </AuthGuard>
                      <AuthGuard
                        resource={access.resources[key]}
                        scope={access.scopes.Edit}
                      >
                        <button
                          className="mr-3"
                          onClick={() => NavigateToUpdate(key)}
                        >
                          Update
                        </button>
                      </AuthGuard>
                      <AuthGuard
                        resource={access.resources[key]}
                        scope={access.scopes.Delete}
                      >
                        <button
                          className="mr-3"
                          onClick={() => NavigateToDelete(key)}
                        >
                          Delete
                        </button>
                      </AuthGuard>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
