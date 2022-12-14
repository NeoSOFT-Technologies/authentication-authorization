import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IDeleteEventState } from "./index";
import { deleteEventService } from "../../../services/event";
import error from "../../../utils/error";

const initialState: IDeleteEventState = {
  isDeleted: false,
  loading: false,
  error: undefined,
};
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (Id: string) => {
    try {
      const response = await deleteEventService(Id);
      return response;
    } catch (_error) {
      const myError = _error as Error | AxiosError;
      throw axios.isAxiosError(myError) && myError.response
        ? myError.response.data.Errors[0]
        : myError.message;
    }
  }
);

const slice = createSlice({
  name: "deleteEvent",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(deleteEvent.pending, (state) => {
      state.loading = true;
      state.isDeleted = false;
    });
    builder.addCase(deleteEvent.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
      //
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      // action.payload contains error information
      action.payload = action.error;
      state.error = error(action.payload);
    });
  },
});

export default slice.reducer;
