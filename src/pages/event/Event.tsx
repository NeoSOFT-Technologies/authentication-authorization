import React from "react";
import { Card } from "react-bootstrap";
import { access, AuthGuard } from "../../components/auth-guard/AuthGuard";

export default function Event() {
  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <Card>
        <Card.Header>
          <h1 className="card-title">Event</h1>
        </Card.Header>
        <Card.Body>
          <div className="mt-2">
            <button
              className={`${
                AuthGuard({
                  resource: access.resources.Event,
                  scope: access.scopes.View,
                })
                  ? "btn btn-sm btn-success "
                  : "btn btn-sm btn-danger"
              } mr-3`}
            >
              View
            </button>
            <button
              className={`${
                AuthGuard({
                  resource: access.resources.Event,
                  scope: access.scopes.Create,
                })
                  ? "btn btn-sm btn-success "
                  : "btn btn-sm btn-danger"
              } mr-3`}
            >
              Create
            </button>
            <button
              className={`${
                AuthGuard({
                  resource: access.resources.Event,
                  scope: access.scopes.Edit,
                })
                  ? "btn btn-sm btn-success "
                  : "btn btn-sm btn-danger"
              } mr-3`}
            >
              Update
            </button>
            <button
              className={`${
                AuthGuard({
                  resource: access.resources.Event,
                  scope: access.scopes.Delete,
                })
                  ? "btn btn-sm btn-success "
                  : "btn btn-sm btn-danger"
              } mr-3`}
            >
              Delete
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
