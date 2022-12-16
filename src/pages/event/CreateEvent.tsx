import React, { useState } from "react";
import { Card } from "react-bootstrap";
import RequestResponseData from "../../components/request-response-data/RequestResponseData";
import { IEventFormData } from "../../store/event/create";
import { addNewEvent } from "../../store/event/create/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import DateTimePicker from "react-datetime-picker";

export default function CreateEvent() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.addEvent);
  const [eventForm, setEventForm] = useState<IEventFormData>({
    name: "",
    price: 0,
    artist: "",
    // date: "2022-12-18",
    description: "",
    imageurl: "",
    categoryId: "",
    date: new Date(),
  });
  const [date3, setDate] = useState(new Date());

  const validateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventForm({ ...eventForm, [name]: value });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEventForm({ ...eventForm, date: date3 });
    console.log("submit", eventForm);
    await dispatch(
      addNewEvent({
        ...eventForm,
      })
    );
  };
  console.log("event", eventForm);
  console.log("date", date3);
  return (
    <div>
      <div>
        <Card>
          <Card.Header>
            <h2>Create Event</h2>
          </Card.Header>
          <Card.Body>
            <div>
              <div className="align-items-center">
                <form onSubmit={submit}>
                  <label>
                    <b>Name: </b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    id="name"
                    placeholder="Enter Event Name"
                    name="name"
                    value={eventForm.name}
                    onChange={validateForm}
                    required
                  />
                  <label>
                    <b>Price: </b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    id="price"
                    placeholder="Enter Price "
                    name="price"
                    value={eventForm.price}
                    onChange={validateForm}
                    required
                  />
                  <label>
                    <b>Artist: </b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    id="artist"
                    placeholder="Enter Artist Name"
                    name="artist"
                    value={eventForm.artist}
                    onChange={validateForm}
                    required
                  />
                  {/* <label>
                    <b>Date: </b>
                  </label>
                  <input
                    type="date"
                    className="ml-2"
                    id="date"
                    placeholder="Enter Event Date"
                    name="date"
                    value={eventForm.date}
                    onChange={validateForm}
                    required
                  /> */}
                  <label>
                    <b>Description: </b>
                  </label>
                  <input
                    type="textarea"
                    className="ml-2"
                    id="description"
                    placeholder="Enter Category Name"
                    name="description"
                    value={eventForm.description}
                    onChange={validateForm}
                    required
                  />
                  <label>
                    <b>ImageUrl: </b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    id="imageurl"
                    placeholder="Enter image url"
                    name="imageurl"
                    value={eventForm.imageurl}
                    onChange={validateForm}
                    required
                  />
                  <label>
                    <b>Category: </b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    id="categoryId"
                    placeholder="Enter Category Name"
                    name="categoryId"
                    value={eventForm.categoryId}
                    onChange={validateForm}
                    required
                  />
                  <label>
                    <b>Date: </b>
                  </label>
                  <DateTimePicker
                    name="date1"
                    onChange={setDate}
                    value={date3}
                  />
                  <button
                    className="btn btn-sm btn-success btn-md d-flex float-right mb-3 mr-3"
                    type="submit"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      <br></br>

      <RequestResponseData state={state} data={eventForm} />
    </div>
  );
}
