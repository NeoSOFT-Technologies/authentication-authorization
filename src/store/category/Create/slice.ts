import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { addCategoryService } from "../../../services/category";
import { IAddCategoryState, ICategoryFormData } from ".";

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
    } catch (error) {
      const myError = error as Error | AxiosError;
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
      state.data = action.payload.data.data;
      state.url = action.payload.config.url;
    });
    builder.addCase(addNewApi.rejected, (state, action) => {
      state.loading = false;
      action.payload = action.error;
    });
  },
});

export default slice.reducer;
