import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getAllCategoryService } from "../../../services/category";
import error from "../../../utils/error";
import { IListCategoryState } from "./index";

const initialState: IListCategoryState = {
  loading: false,
  message: undefined,
  error: undefined,
  data: undefined,
  url: undefined,
};

export const getCategoryList = createAsyncThunk(
  "category/getAllCategory",
  async () => {
    try {
      const response = await getAllCategoryService();
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
  name: "getAllCategory",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getCategoryList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.data.message;
      state.error = action.payload.data.error;
      state.data = action.payload.data.data;
      state.url = action.payload.config.url;
      console.log("actionConfig", action.payload.config.url);
      // console.log("state.data", state.data);
    });
    builder.addCase(getCategoryList.rejected, (state, action) => {
      state.loading = false;
      action.payload = action.error;
      state.error = error(action.payload);
      if (state.error === "401") {
        state.error = "Token Not Valid.";
      }
      console.log("category-list-reject-action", action);
    });
  },
});

export default slice.reducer;
