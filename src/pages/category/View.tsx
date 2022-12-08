import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCategoryList } from "../../store/category/List/slice";
import { IListCategoryState } from "../../store/category/List";

export default function View() {
  const dispatch = useAppDispatch();
  const Categories: IListCategoryState = useAppSelector(
    (State) => State.categoryListState
  );
  let result: any;
  const [category, setCategory] = useState<IListCategoryState | any>();
  // const categoryName = "Movie";
  const getListFunction = async () => {
    result = await dispatch(getCategoryList());
    await setCategory(result?.payload);
    console.log("Categories", Categories);
    console.log("category", category);
    console.log(category, "result", result);
  };
  useEffect(() => {
    getListFunction();
  }, []);
  return <div>{result && <textarea>{result?.payload}</textarea>}</div>;
}
