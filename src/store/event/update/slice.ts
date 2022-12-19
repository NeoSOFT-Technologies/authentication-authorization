import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUpdatedEventState, IEventUpdateData } from ".";
import error from "../../../utils/error";
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
      state.error = action.payload.data.error;
      state.data = action.payload.data.data;
      state.url = action.payload.config.url;
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
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
