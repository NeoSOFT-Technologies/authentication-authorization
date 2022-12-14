import React from "react";
import { Card } from "react-bootstrap";
// import RequestResponseData from "../../components/request-response-data/RequestResponseData";

export default function UpdateEvent() {
  return (
    <div>
      <div>
        <Card>
          <Card.Header>
            <h2>Update Event</h2>
          </Card.Header>
          <Card.Body>
            <div>
              <div className="align-items-center">
                <form data-testid="form-input">
                  <div>
                    <label>
                      <b>Event Id: </b>
                    </label>
                    <input
                      type="text"
                      className="ml-2"
                      id="name"
                      placeholder="Enter Category Name"
                      name="name"
                      // value={apisForm.name}
                      // onChange={validateForm}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label>
                      <b>Name: </b>
                    </label>
                    <input
                      type="text"
                      className="ml-2"
                      id="name"
                      placeholder="Enter Category Name"
                      name="name"
                      // value={apisForm.name}
                      // onChange={validateForm}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label>
                      <b>Price: </b>
                    </label>
                    <input
                      type="text"
                      className="ml-2"
                      id="name"
                      placeholder="Enter Category Name"
                      name="name"
                      // value={apisForm.name}
                      // onChange={validateForm}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label>
                      <b>Artist: </b>
                    </label>
                    <input
                      type="text"
                      className="ml-2"
                      id="name"
                      placeholder="Enter Category Name"
                      name="name"
                      // value={apisForm.name}
                      // onChange={validateForm}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label>
                      <b>Date: </b>
                    </label>
                    <input
                      type="text"
                      className="ml-2"
                      id="name"
                      placeholder="Enter Category Name"
                      name="name"
                      // value={apisForm.name}
                      // onChange={validateForm}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label>
                      <b>Description: </b>
                    </label>
                    <input
                      type="text"
                      className="ml-2"
                      id="name"
                      placeholder="Enter Category Name"
                      name="name"
                      // value={apisForm.name}
                      // onChange={validateForm}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <label>
                      <b>Category Id: </b>
                    </label>
                    <input
                      type="text"
                      className="ml-2"
                      id="name"
                      placeholder="Enter Category Name"
                      name="name"
                      // value={apisForm.name}
                      // onChange={validateForm}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <button
                      className="btn btn-sm btn-success btn-md d-flex float-right"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      <br></br>
      {/* <RequestResponseData /> */}
    </div>
  );
}
