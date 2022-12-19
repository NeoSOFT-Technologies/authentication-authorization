import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import RequestResponseData from "../../components/request-response-data/RequestResponseData";
import { IEventUpdateData } from "../../store/event/update";
import { updateEvent } from "../../store/event/update/slice";
import { getCategoryList } from "../../store/category/List/slice";
import DateTimePicker from "react-datetime-picker";
import { ICategoryData } from "../../store/category/List";

export default function UpdateEvent() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateEvent);
  const [dateState, setDate] = useState(new Date());
  const [updateEventForm, setUpdateEventForm] = useState<IEventUpdateData>({
    eventId: "",
    name: "",
    price: 0,
    artist: "",
    date: "2023-12-18T06:04:37.918Z",
    description: "",
    imageurl: "",
    categoryId: "",
  });
  const getCategoryState = useAppSelector((State) => State.getCategoryList);
  useEffect(() => {
    dispatch(getCategoryList());
  }, [getCategoryState === undefined]);

  const validateForm = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUpdateEventForm({ ...updateEventForm, [name]: value });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(
      updateEvent({
        ...updateEventForm,
      })
    );
  };
  console.log("event", updateEventForm);

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
                <form onSubmit={submit} data-testid="form-input">
                  <div>
                    <label>
                      <b>Event Id: </b>
                    </label>
                    <input
                      type="text"
                      className="ml-2"
                      id="eventId"
                      name="eventId"
                      placeholder="Enter Event Id"
                      value={updateEventForm.eventId}
                      onChange={validateForm}
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
                      name="name"
                      placeholder="Enter Event Name"
                      value={updateEventForm.name}
                      onChange={validateForm}
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
                      id="price"
                      name="price"
                      placeholder="Enter Price"
                      value={updateEventForm.price}
                      onChange={validateForm}
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
                      id="artist"
                      name="artist"
                      placeholder="Enter Artist Name"
                      value={updateEventForm.artist}
                      onChange={validateForm}
                    />
                  </div>
                  <br />
                  <div>
                    <label>
                      <b>Date: </b>
                    </label>
                    <DateTimePicker
                      name="date1"
                      onChange={setDate}
                      value={dateState}
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
                      id="description"
                      name="description"
                      placeholder="Enter Event Description"
                      value={updateEventForm.description}
                      onChange={validateForm}
                    />
                  </div>
                  <br />
                  <div>
                    <label>
                      <b>Category : </b>
                    </label>
                    {/* <input
                      type="text"
                      className="ml-2"
                      id="categoryId"
                      name="categoryId"
                      placeholder="Enter Category Id"
                      value={updateEventForm.categoryId}
                      onChange={validateForm}
                      required
                    /> */}
                    <select
                      name="categoryId"
                      value={updateEventForm.categoryId}
                      onChange={validateForm}
                    >
                      {getCategoryState !== undefined &&
                        !getCategoryState.loading &&
                        getCategoryState?.data?.map(
                          (options: ICategoryData) => (
                            <option
                              key={options.categoryId}
                              value={options.categoryId}
                            >
                              {options.name}
                            </option>
                          )
                        )}
                    </select>
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
      <RequestResponseData state={state} data={updateEventForm} />
    </div>
  );
}
