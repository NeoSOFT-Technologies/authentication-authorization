import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { ICategoryFormData } from "../../store/category/Create";
import { addNewApi } from "../../store/category/Create/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function CreateCategory() {
  const dispatch = useAppDispatch();
  // const categoryName = "Movie";
  const state = useAppSelector((RootState) => RootState.addCategory);
  const [apisForm, setForm] = useState<ICategoryFormData>({
    name: "",
  });

  const validateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <Card>
        <Card.Header>CreateCategory</Card.Header>
        <Card.Body>
          <h2>Request</h2>
          <div>
            {/* <div>Name: {apisForm.name} </div> */}
            <div className="align-items-center">
              <form onSubmit={submit} data-testid="form-input">
                <label>Name :</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Category Name"
                  name="name"
                  value={apisForm.name}
                  onChange={validateForm}
                  required
                />
                <br />
                <button
                  className="btn btn-sm btn-success btn-md d-flex float-right mb-3 mr-3"
                  type="submit"
                >
                  Execute
                </button>
              </form>
            </div>
            <br></br>
            <hr></hr>
            <div>
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
            </div>
            {/* <button type="submit" onClick={() => submit()}>
              Excute
            </button> */}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
