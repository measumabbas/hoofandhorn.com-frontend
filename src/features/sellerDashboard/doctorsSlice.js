import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

const initialState = {
  orders: null,
  loading: false,
  error: null,
  addLoading: false,
  addError: null,
  addSuccess: false,
  getLoading: false,
  getError: null,
  delLoading: false,
  delError: false,
  delSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  updateError: null,
  doctors:null
};
export const doctorsSlice = createSlice({
  name: "doctorsSlice",
  initialState,
  reducers: {
    clearState: (state) => {
      state.addError = null;
      state.addSuccess = false;
      state.delError = null;
      state.delSuccess = false;
      state.error = null;
      state.getError = null;
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDoctors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDoctors.fulfilled, (state, action) => {
      state.loading = false;
      state.doctors = action.payload;
    });
    builder.addCase(getAllDoctors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(doctorRequest.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(doctorRequest.rejected, (state, action) => {
      state.addLoading = false;
      state.addError = action.payload;
    });
    builder.addCase(doctorRequest.fulfilled, (state) => {
      state.addLoading = false;
      state.addSuccess = true;
    });
    builder.addCase(deleteDoctor.pending, (state) => {
      state.delLoading = true;
    });
    builder.addCase(deleteDoctor.rejected, (state, action) => {
      state.delLoading = false;
      state.delError = action.payload;
    });
    builder.addCase(deleteDoctor.fulfilled, (state) => {
      state.delLoading = false;
      state.delSuccess = true;
    });
    builder.addCase(updateDoctor.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateDoctor.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    });
    builder.addCase(updateDoctor.fulfilled, (state) => {
      state.updateLoading = false;
      state.updateSuccess = true;
    });
  },
});

export const getAllDoctors = createAsyncThunk(
  "getAllDoctors",
  async (apiData, { rejectWithValue }) => {
    const status = apiData.query.status === "Approved" ? "approved" : "pending";
    try {
      let url = `${BASE_URL}/doctor/all?status=${status}`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${apiData.token}`,
        },
      });
      return data?.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message);
      } else {
        return rejectWithValue("Some error occured please try again later");
      }
    }
  }
);

export const doctorRequest = createAsyncThunk(
  "doctorRequest",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/doctor/create`,
        apiData.data
      );
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message);
      } else {
        return rejectWithValue("Some error occured please try again later");
      }
    }
  }
);
export const updateDoctor = createAsyncThunk(
  "updateDoctor",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/doctor/update/${apiData.id}`,
        apiData.data
      );
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message);
      } else {
        return rejectWithValue("Some error occured please try again later");
      }
    }
  }
);
export const deleteDoctor = createAsyncThunk(
  "deleteDoctor",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/doctor/delete/${apiData.id}`
      );
      return data;
    } catch (error) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message);
      } else {
        return rejectWithValue("Some error occured please try again later");
      }
    }
  }
);

export const { clearState } = doctorsSlice.actions;
