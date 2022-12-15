import React, { useState } from "react";
import { Card } from "react-bootstrap";
import RequestResponseData from "../../components/request-response-data/RequestResponseData";
import { deleteEvent } from "../../store/event/delete/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function DeleteEvent() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.deleteEvent);
  const [deleteEventId, setDeleteEventId] = useState<string>("");
  const validateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDeleteEventId(value);
  };

  const deleteFunction = async (event: React.FormEvent) => {
    event.preventDefault();
    if (deleteEventId !== undefined) {
      await dispatch(deleteEvent(deleteEventId));
    }
  };
  return (
    <div>
      <Card>
        <Card.Header>
          <h2>Delete Event</h2>
        </Card.Header>
        <Card.Body>
          <div>
            <div className="align-items-center">
              <form onSubmit={deleteFunction} data-testid="form-input">
                <label>
                  <b>Event Id: </b>
                </label>
                <input
                  type="text"
                  className="ml-2"
                  id="id"
                  placeholder="Enter Event Id"
                  name="id"
                  value={deleteEventId}
                  onChange={validateForm} // {(e) => setDeleteEventId(e.target.value)}
                  required
                />
                <button
                  className="btn btn-sm btn-success btn-md d-flex float-right mb-3 mr-3"
                  type="submit"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </Card.Body>
      </Card>
      <br />
      <br />

      <RequestResponseData state={state} data={deleteEventId} />
    </div>
  );
}
