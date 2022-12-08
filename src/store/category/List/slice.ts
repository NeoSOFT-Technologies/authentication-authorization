import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { getAllCategoryService } from "../../../services/category";
import { IListCategoryState } from "./index";

const initialState: IListCategoryState = {
  loading: false,
  error: undefined,
  data: undefined,
  message: undefined,
};

export const getCategoryList = createAsyncThunk(
  "category/getAllCategory",
  async () => {
    try {
      const response = await getAllCategoryService();
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      const myError = error as Error | AxiosError;
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
      state.data = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getCategoryList.rejected, (state, action) => {
      state.loading = false;
      action.payload = action.error;
    });
  },
});

export default slice.reducer;
