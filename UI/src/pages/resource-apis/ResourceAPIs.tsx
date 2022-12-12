import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { access, AuthGuard } from "../../components/auth-guard/AuthGuard";

export default function ResourceAPIs() {
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
                    <h2>{key}</h2>
                    <div>
                      {" "}
                      <button
                        className={`${
                          AuthGuard({
                            resource: access.resources[key],
                            scope: access.scopes.View,
                          })
                            ? "btn btn-sm btn-success "
                            : "btn btn-sm btn-danger"
                        } mr-3`}
                        onClick={() => NavigateToView(key)}
                      >
                        View
                      </button>
                      <button
                        className={`${
                          AuthGuard({
                            resource: access.resources[key],
                            scope: access.scopes.Create,
                          })
                            ? "btn btn-sm btn-success "
                            : "btn btn-sm btn-danger"
                        } mr-3`}
                        onClick={() => NavigateToCreate(key)}
                      >
                        Create
                      </button>
                      <button
                        className={`${
                          AuthGuard({
                            resource: access.resources[key],
                            scope: access.scopes.Edit,
                          })
                            ? "btn btn-sm btn-success "
                            : "btn btn-sm btn-danger"
                        } mr-3`}
                        onClick={() => NavigateToUpdate(key)}
                      >
                        Update
                      </button>
                      <button
                        className={`${
                          AuthGuard({
                            resource: access.resources[key],
                            scope: access.scopes.Delete,
                          })
                            ? "btn btn-sm btn-success "
                            : "btn btn-sm btn-danger"
                        } mr-3`}
                        onClick={() => NavigateToDelete(key)}
                      >
                        Delete
                      </button>
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
