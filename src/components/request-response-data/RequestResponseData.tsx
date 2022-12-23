import React from "react";
import { Card } from "react-bootstrap";

export default function RequestResponseData({ state, data }: any) {
  console.log("Common Component State:", state);
  return (
    <div>
      <Card>
        <Card.Header>
          <h2>Request & Response Data</h2>
        </Card.Header>
        <Card.Body>
          <div>
            <div>
              <h4>Request Url</h4>
              <i>
                {process.env.REACT_APP_API_Backend}
                {!state.loading && state.url}
              </i>
            </div>
            <hr />
            <div>
              <h4>Request Payload</h4>
              {data !== undefined ? JSON.stringify(data, undefined, 4) : "None"}
            </div>
            <hr />
            <div>
              <h4>Response data</h4>
              <div>
                {!state.loading && (
                  <textarea
                    rows={11}
                    cols={60}
                    defaultValue={JSON.stringify(state, undefined, 4)}
                    readOnly
                  ></textarea>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
