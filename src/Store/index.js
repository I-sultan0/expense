import { configureStore } from "@reduxjs/toolkit";

// import logout from "./logout";
import login from "./login";
import orderSend from "./orderSend";

const store = configureStore({
  reducer: { loggedIn: login.reducer, sendOrder: orderSend.reducer },
});

export default store;
