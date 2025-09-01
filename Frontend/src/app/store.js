import { configureStore } from "@reduxjs/toolkit";
import treatmentsReducer from "../features/treatments/treatmentsSlice";
import authReducer from "../features/auth/authSlice";
import listenerMiddleware from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    treatments: treatmentsReducer,
    auth: authReducer,
  },
  middleware: (getDefault) => getDefault().prepend(listenerMiddleware.middleware),
});
