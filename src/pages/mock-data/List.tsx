import React from "react";
import { h } from "gridjs";
import { Grid } from "gridjs-react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function List() {
  const navigate = useNavigate();
  const NavigateCreateApi = () => {
    navigate("/create");
  };

  const classNames = {
    table: "table",
    pagination: "d-flex justify-content-around",
    search: "search-field",
  };
  const NavigateUpdate = () => {
    navigate(`/update`);
  };

  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <Card>
          <Card.Body>
            <h1 className="card-title">Users</h1>
            <button
              type="button"
              className=" btn btn-sm btn-success btn-sm d-flex float-right mb-2"
              onClick={() => NavigateCreateApi()}
            >
              Create API &nbsp;
              <span className="bi bi-plus-lg"></span> &nbsp;
            </button>

            <div className="table-responsive">
              <Grid
                data={[
                  ["John", "john@example.com"],
                  ["Mike", "mike@gmail.com"],
                ]}
                columns={[
                  "Name",
                  "Email",
                  {
                    name: "Actions",
                    formatter: (cell, row) => {
                      return h(
                        "button",
                        {
                          className:
                            "py-2 mb-4 px-4 border rounded-md text-white bg-success",
                          onClick: () => NavigateUpdate(),
                        },
                        "Edit"
                      );
                    },
                  },
                ]}
                className={classNames}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
