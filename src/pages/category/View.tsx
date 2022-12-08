import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getCategoryList } from "../../store/category/List/slice";
import { IListCategoryState } from "../../store/category/List";

export default function View() {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<IListCategoryState | any>();
  // const categoryName = "Movie";
  useEffect(() => {
    const result = dispatch(getCategoryList());
    setCategory(result);
    console.log("category", category);
    console.log("result", result);
  }, []);
  return <div>View category Page</div>;
}
