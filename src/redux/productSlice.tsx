import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
    allProducts: any[];
    filteredProducts: any[];
}

const initialState: ProductState = {
    allProducts: [],
    filteredProducts: []
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
            state.filteredProducts = action.payload;
        },
        updateFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        }
    }
});

export const { setAllProducts, updateFilteredProducts } = productSlice.actions;
export default productSlice.reducer;