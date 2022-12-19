import React, { useState } from "react";
import { Card } from "react-bootstrap";
import RequestResponseData from "../../components/request-response-data/RequestResponseData";
import { ICategoryFormData } from "../../store/category/Create";
import { addNewApi } from "../../store/category/Create/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function Create() {
  const dispatch = useAppDispatch();
  // const categoryName = "Movie";
  const state = useAppSelector((RootState) => RootState.addCategory);
  const [apisForm, setForm] = useState<ICategoryFormData>({
    name: "",
  });

  const validateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm({ ...apisForm, [name]: value });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    // setForm({ ...apisForm, name });
    await dispatch(
      addNewApi({
        ...apisForm,
      })
    );
  };
  return (
    <div>
      <div>
        <Card>
          <Card.Header>
            <h2>Create Category</h2>
          </Card.Header>
          <Card.Body>
            <div>
              <div className="align-items-center">
                <form onSubmit={submit} data-testid="form-input">
                  <label>
                    <b>Name: </b>
                  </label>
                  <input
                    type="text"
                    className="ml-2"
                    id="name"
                    placeholder="Enter Category Name"
                    name="name"
                    value={apisForm.name}
                    onChange={validateForm}
                    required
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
      {/* <div>
        <Card>
          <Card.Header>
            <h2>Request & Response data</h2>
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
                {JSON.stringify(apisForm, undefined, 4)}
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
      </div> */}
      <RequestResponseData state={state} data={apisForm} />
    </div>
  );
}
