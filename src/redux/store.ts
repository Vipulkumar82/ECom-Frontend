import { configureStore } from "@reduxjs/toolkit";
// import { setProducts } from "./productSlice";
import productSlice from '../redux/productSlice'

export const store=configureStore({
    reducer:{
        products:productSlice,
    }
})