import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IAddEventState, IEventFormData } from ".";
import { addEventService } from "../../../services/event";
import error from "../../../utils/error";

const initialState: IAddEventState = {
  eventAdded: false,
  loading: false,
  error: undefined,
  data: undefined,
  url: undefined,
};

export const addNewEvent = createAsyncThunk(
  "event/createEvent",
  async (conditions: IEventFormData) => {
    try {
      console.log("slice:", conditions);
      const response = await addEventService(conditions);
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
  }
);

const slice = createSlice({
  name: "addEvent",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(addNewEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.eventAdded = true;
      state.error = action.payload.data.error;
      state.data = action.payload.data.data;
      state.url = action.payload.config.url;
    });
    builder.addCase(addNewEvent.rejected, (state, action) => {
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
