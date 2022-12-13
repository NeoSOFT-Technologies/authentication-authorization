import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "./login/slice";
import getCategoryListReducer from "./category/List/slice";
import addCategoryReducer from "./category/Create/slice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    getCategoryList: getCategoryListReducer,
    addCategory: addCategoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;