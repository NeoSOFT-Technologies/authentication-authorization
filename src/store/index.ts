import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "./login/slice";
import categoryListReducer from "./category/List/slice";
const store = configureStore({
  reducer: {
    login: loginReducer,

    categoryListState: categoryListReducer,
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
