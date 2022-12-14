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
      console.log("response.config", response.config);
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
    });
  },
});

export default slice.reducer;
