import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: [],
  products: [],
  checkedBrands: [],
  checkedCategorys: [],
  checkedColors: [],
  selectedPrice: null,
};

export const orebiSlice = createSlice({
  name: "MAQI_TREND",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      // Dispatch a success toast
      toast.success("Product added to cart");
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        // Dispatch a success toast
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        // Dispatch a success toast
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      // Dispatch a success toast
      toast.error("Product removed from cart");
    },
    resetCart: (state) => {
      state.products = [];
      // Dispatch a success toast
    },

   toggleBrand: (state, action) => {
      const brand = action.payload;
      if (!brand) return;
      const exists = state.checkedBrands.find((b) => b._id === brand._id);
      if (exists) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b._id !== brand._id
        );
      } else {
        state.checkedBrands.push(brand);
      }
    },
    clearBrands: (state) => {
      state.checkedBrands = [];
    },
  

    toggleColor: (state, action) => {
      const color = action.payload;
      const isColorChecked = state.checkedColors.includes(color);

      if (isColorChecked) {
        state.checkedColors = state.checkedColors.filter((c) => c !== color);
      } else {
        state.checkedColors.push(color);
      }
    },
    togglePrice: (state, action) => {
      const range = action.payload; // { min, max }
      state.selectedPrice = range;
    },

    toggleCategory: (state, action) => {
      const slug = action.payload;

      if (state.checkedCategorys.includes(slug)) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (s) => s !== slug
        );
      } else {
        state.checkedCategorys.push(slug);
      }
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleBrand,
  togglePrice,
  toggleColor,
  clearBrands ,
  toggleCategory,
} = orebiSlice.actions;
export default orebiSlice.reducer;
