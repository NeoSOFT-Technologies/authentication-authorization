import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUpdatedEventState, IEventUpdateData } from ".";
import { updateEventService } from "../../../services/event";

const initialState: IUpdatedEventState = {
  eventUpdated: false,
  loading: false,
  error: undefined,
  data: undefined,
  url: undefined,
};

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (conditions: IEventUpdateData) => {
    try {
      const response = await updateEventService(conditions);
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
  name: "updateEvent",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(updateEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.eventUpdated = true;
      state.data = action.payload.data.data;
      state.url = action.payload.config.url;
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.loading = false;
      action.payload = action.error;
    });
  },
});

export default slice.reducer;
