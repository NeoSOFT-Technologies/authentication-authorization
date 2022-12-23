import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getAllEventService } from "../../../services/event";
import error from "../../../utils/error";
import { IListEventState } from "./index";

const initialState: IListEventState = {
  loading: false,
  message: undefined,
  error: undefined,
  data: undefined,
  url: undefined,
};

export const getEventList = createAsyncThunk("event/getAllEvent", async () => {
  try {
    const response = await getAllEventService();
    return response;
  } catch (_error) {
    const myError = _error as Error | AxiosError;
    const axError = _error as AxiosError;

    if (
      axError !== undefined &&
      axios.isAxiosError(axError) &&
      axError.response
    )
      throw axError.response.status;
    else
      throw axios.isAxiosError(myError) && myError.response
        ? myError.response.data.Errors[0]
        : myError.message;
  }
});

const slice = createSlice({
  name: "getAllCategory",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getEventList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEventList.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.data.message;
      state.error = action.payload.data.error;
      state.data = action.payload.data.data;
      state.url = action.payload.config.url;
      console.log("actionConfig", action.payload.config.url);
      // console.log("state.data", state.data);
    });
    builder.addCase(getEventList.rejected, (state, action) => {
      state.loading = false;
      action.payload = action.error;
      state.error = error(action.payload);
      if (state.error === "401") {
        state.error = "Token Not Valid.";
      }
    });
  },
});

export default slice.reducer;
