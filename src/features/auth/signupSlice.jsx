import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";


const initialState = {
    loading: false,
    error: null,
    success:false
};


export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
        builder.addCase(signup.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(signup.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
        });
        builder.addCase(signup.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
            
        })
    }
});



export const signup = createAsyncThunk('signup', async(apiData, {rejectWithValue}) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/user/register`, apiData);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue('Error Occured During Signup')
    }
});


// export const { signUpStart, signUpSuccess, signUpFailure } = signUpSlice.actions;