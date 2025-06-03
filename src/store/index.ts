import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import { loggerMiddleware } from "./middleware";

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
