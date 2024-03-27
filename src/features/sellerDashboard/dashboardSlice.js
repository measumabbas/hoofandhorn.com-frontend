import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {BASE_URL} from '../config'
const initialState = {
    loading:false,
    error:null,
    data:null
}


export const dashboardSlice = createSlice({
    name:"dashboardSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getDashboardData.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getDashboardData.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(getDashboardData.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        builder.addCase(getDashboardDataForAdmin.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getDashboardDataForAdmin.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(getDashboardDataForAdmin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})


export const getDashboardData = createAsyncThunk("getDashboardData",async (apiData,{rejectWithValue})=>{
    try {
        if(!apiData.token){
            return rejectWithValue("Please provide token")
        }

        const {data} = await axios.get(`${BASE_URL}/user/analytics`,{
            headers:{
                Authorization:`Bearer ${apiData.token}`
            }
        })

        return data.data
    } catch (error) {
        return rejectWithValue("Some error occured")
    }
})
export const getDashboardDataForAdmin = createAsyncThunk("getDashboardDataForAdmin",async (apiData,{rejectWithValue})=>{
    try {

        const {data} = await axios.get(`${BASE_URL}/user/analytics/admin`)

        return data
    } catch (error) {
        return rejectWithValue("Some error occured")
    }
})