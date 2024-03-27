import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../config'


const initialState = {
    loading:false,
    error:null,
    users:null
}



export const usersSlice = createSlice({
    name:"usersSlice",
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
        builder.addCase(getAllUsers.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload
        })
        builder.addCase(getAllUsers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }

})


export const getAllUsers = createAsyncThunk("getAllUsers",async (apiData,{rejectWithValue})=>{
    try {
        const {data} = await axios.get(`${BASE_URL}/user/view`)

        return data.data
    } catch (error) {
        if(error?.response?.data?.message){
            return rejectWithValue(error?.response?.data?.message)
        }else{
            return rejectWithValue("Some error occured")
        }
    }
})