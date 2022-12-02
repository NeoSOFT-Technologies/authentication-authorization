import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { ICategoryFormData } from "../../store/category";
import { addNewApi } from "../../store/category/slice";
import { useAppDispatch } from "../../store/hooks";

export default function CreateCategory() {
  const dispatch = useAppDispatch();
  const name = "Movie";
  const [apisForm, setForm] = useState<ICategoryFormData>({
    name: "",
  });

  const submit = async () => {
    setForm({ ...apisForm, name });
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
            <div>Name: {apisForm.name} </div>

            <button type="submit" onClick={() => submit()}>
              Excute
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
