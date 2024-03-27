import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = false;
    },
    logout:(state)=>{
      state.token = null;
      state.user = null;
      state.error = null;
      state.success = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const login = createAsyncThunk(
  "login",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, apiData);
      return data;
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message);
      } else {
        return rejectWithValue("Invalid Credentials");
      }
    }
  }
);

export const { clearState, setError ,logout} = authSlice.actions;
