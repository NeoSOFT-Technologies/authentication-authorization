import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCategoryList } from "../../store/category/List/slice";
import { IListCategoryState } from "../../store/category/List";
import { Card } from "react-bootstrap";

export default function View() {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<IListCategoryState | any>();

  const state = useAppSelector((RootState) => RootState.getCategoryList);
  console.log("State:", state);
  console.log("State data:", state.data);

  useEffect(() => {
    const result = dispatch(getCategoryList());
    setCategory(result);
    console.log("category", category);
    console.log("result", result);
  }, []);

  return (
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
                {!state.loading && state.config}
              </i>
            </div>
            <hr />
            <div>
              <h4>Request Payload</h4>
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
