import React, { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
// import { getCategoryList } from "../../store/category/List/slice";
// import { IListCategoryState } from "../../store/category/List";
import { Card } from "react-bootstrap";

export default function View() {
  // const dispatch = useAppDispatch();
  // const Categories: IListCategoryState = useAppSelector(
  //   (State) => State.categoryListState
  // );
  // let result: any;
  // const [category, setCategory] = useState<IListCategoryState | any>();

  const state = useAppSelector((RootState) => RootState.getCategoryList);
  console.log("State:", state);
  console.log("State data:", state.data);
  // const listData: any = state;
  // const getListFunction = async () => {
  //   result = await dispatch(getCategoryList());
  //   await setCategory(result?.payload);
  //   console.log("Categories", Categories);
  //   console.log("category", category);
  //   console.log(category, "result", result);
  // };
  useEffect(() => {
    // getListFunction();
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
              <i>{process.env.REACT_APP_API_Backend}</i>
            </div>
            <hr />
            <div>
              <h4>Request Payload</h4>
            </div>
            <hr />
            <div>
              <h4>Response data</h4>
              {/* <textarea
                value={listData.map((e: any) => JSON.stringify(e))}
              ></textarea> */}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
