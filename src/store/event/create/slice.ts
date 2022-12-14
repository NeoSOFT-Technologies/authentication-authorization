import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IAddEventState, IEventFormData } from ".";
import { addEventService } from "../../../services/event";

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
      const response = await addEventService(conditions);
      return response;
    } catch (error) {
      const myError = error as Error | AxiosError;
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
      state.data = action.payload.data.data;
      state.url = action.payload.config.url;
    });
    builder.addCase(addNewEvent.rejected, (state, action) => {
      state.loading = false;
      action.payload = action.error;
    });
  },
});

export default slice.reducer;
