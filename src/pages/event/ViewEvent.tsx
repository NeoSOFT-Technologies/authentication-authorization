import React, { useEffect } from "react";
import RequestResponseData from "../../components/request-response-data/RequestResponseData";
import { getEventList } from "../../store/event/create/list/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function ViewEvent() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.getEventList);

  useEffect(() => {
    const result = dispatch(getEventList());

    console.log("result:", result);
  }, []);
  return (
    <div>
      {" "}
      <RequestResponseData state={state} />
    </div>
  );
}
