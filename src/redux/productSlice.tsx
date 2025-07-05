import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:'products',
    initialState:[],
    reducers:{
        setProducts:(state,action)=>{
            console.log(action)
            const res =  action.payload.products;
            return res;
        }
    }
})

export const {setProducts} = productSlice.actions;
export default productSlice.reducer;