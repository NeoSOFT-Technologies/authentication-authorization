import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { ICategoryFormData } from "../../store/category";
import { addNewApi } from "../../store/category/slice";
import { useAppDispatch } from "../../store/hooks";

export default function CreateCategory() {
  const dispatch = useAppDispatch();
  // const categoryName = "Movie";
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
                <button
                  className="btn btn-sm btn-success btn-md d-flex float-right mb-3 mr-3"
                  type="submit"
                >
                  Execute
                </button>
              </form>
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
