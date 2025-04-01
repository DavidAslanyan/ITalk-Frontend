import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../lib/features/user/userSlice";
import counterReducer from '../lib/features/couterSlice'


const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer
});


export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
