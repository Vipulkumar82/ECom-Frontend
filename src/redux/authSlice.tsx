import { createSlice } from "@reduxjs/toolkit";
interface initialState{
    token: string;
}
const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:'',
    },
    reducers:{
        getUser:(state,action)=>{
            state.token = localStorage.getItem('token')||"";

        }
    }
})

export const {getUser} = authSlice.actions;
export default authSlice.reducer;