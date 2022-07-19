import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productQuantity = action.payload.quantity;
      state.quantity += productQuantity;
      state.products.push(action.payload);
      const productPrice = action.payload.price;
      state.total += productPrice * productQuantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
