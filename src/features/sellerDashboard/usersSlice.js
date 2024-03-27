import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  users: null,
  delError: null,
  delLoading: false,
  delSuccess: false,
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    clearState: (state) => {
      state.delError = null;
      state.delSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.delLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.delLoading = false;
      state.delSuccess = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.delLoading = false;
      state.delError = action.payload;
    });
  },
});

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (apiData, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/user/view`;

      if (apiData.query.role === "Buyers") {
        url += "?role=user";
      }
      if (apiData.query.role === "Sellers") {
        url += "?role=farmer";
      }

      const { data } = await axios.get(url);
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Internal Server error");
    }
  }
);
export const deleteUser = createAsyncThunk(
  "deleteUser",
  (apiData, { rejectWithValue }) => {
    try {
      const { data } = axios.delete(`${BASE_URL}/user/${apiData.id}`);
      return data;
    } catch (error) {
      return rejectWithValue("Internal Server error");
    }
  }
);

export const { clearState } = usersSlice.actions;
