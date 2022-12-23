import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { addCategoryService } from "../../../services/category";
import { IAddCategoryState, ICategoryFormData } from ".";
import error from "../../../utils/error";

const initialState: IAddCategoryState = {
  categoryAdded: false,
  loading: false,
  error: undefined,
  data: undefined,
  url: undefined,
};

export const addNewApi = createAsyncThunk(
  "category/createCategory",
  async (conditions: ICategoryFormData) => {
    try {
      const response = await addCategoryService(conditions);
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
  name: "addCategory",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(addNewApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewApi.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryAdded = true;
      state.error = action.payload.data.error;
      state.data = action.payload.data.data;
      state.url = action.payload.config.url;
    });
    builder.addCase(addNewApi.rejected, (state, action) => {
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
