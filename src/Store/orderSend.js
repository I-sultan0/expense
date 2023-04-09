import { createSlice } from "@reduxjs/toolkit";

const orderSend = createSlice({
  name: "sendOrder",
  initialState: {
    items: [],
  },
  reducers: {
    sendingOrderData(state, action) {
      state.items = action.payload;
      // console.log(state.items);
      // console.log(state);
      //   fetch(
      //     `https://chatakk-orders-default-rtdb.asia-southeast1.firebasedatabase.app/${state.username}.json`,
      //     {
      //       method: "PUT",
      //       body: JSON.stringify(state),
      //       headers: {
      //         "content-type": "application/json",
      //       },
      //     }
      //   );
      // const data = response.json();
      // console.log(data);
      //   alert("Order Placed Successfully");
    },
  },
});

export const orderSendActions = orderSend.actions;

export default orderSend;
