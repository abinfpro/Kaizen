import { createListenerMiddleware } from "@reduxjs/toolkit";
import { logout } from "../features/auth/authSlice";
import { clearTreatments } from "../features/treatments/treatmentsSlice";
import toast from "react-hot-toast";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: async (_action, api) => {
    api.dispatch(clearTreatments());
    toast.success("Logged out. Local state cleared.");
  },
});

export default listenerMiddleware;
