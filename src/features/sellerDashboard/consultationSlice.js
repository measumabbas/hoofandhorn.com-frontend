import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  consultations: null,
  addLoading: false,
  addSuccess: false,
  addError: null,
  updateLoading: false,
  updateSuccess: false,
  updateError: null,
  delLoading: false,
  delSuccess: false,
  delError: null,
};

export const consultationSlice = createSlice({
  name: "consultationSlice",
  initialState,
  reducers: {
    clearState: (state) => {
      state.addSuccess = false;
      state.addError = null;
      state.delError = null;
      state.delSuccess = false;
      state.updateSuccess = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConsultations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getConsultations.fulfilled, (state, action) => {
      state.loading = false;
      state.consultations = action.payload;
    });
    builder.addCase(getConsultations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getUserConsultations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserConsultations.fulfilled, (state, action) => {
      state.loading = false;
      state.consultations = action.payload;
    });
    builder.addCase(getUserConsultations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createConsultation.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(createConsultation.fulfilled, (state, action) => {
      state.addLoading = false;
      state.addSuccess = true;
    });
    builder.addCase(createConsultation.rejected, (state, action) => {
      state.addLoading = false;
      state.addError = action.payload;
    });
    builder.addCase(updateConsultation.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateConsultation.fulfilled, (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = true;
    });
    builder.addCase(updateConsultation.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    });
    builder.addCase(deleteConsultation.pending, (state) => {
      state.delLoading = true;
    });
    builder.addCase(deleteConsultation.fulfilled, (state, action) => {
      state.delLoading = false;
      state.delSuccess = true;
    });
    builder.addCase(deleteConsultation.rejected, (state, action) => {
      state.delLoading = false;
      state.delError = action.payload;
    });
  },
});

export const getConsultations = createAsyncThunk(
  "getConsultations",
  async (apiData, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/consultations/all`
      if(apiData.query.status === 'Resolved'){
        url+='?status=resolved'
      }
      if(apiData.query.status === 'Pending'){
        url+='?status=pending'
      }
      const { data } = await axios.get(url);
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
export const getUserConsultations = createAsyncThunk(
  "getUserConsultations",
  async (apiData, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/consultations/all`
      if(apiData.query.status === 'Resolved'){
        url+='?status=resolved'
      }
      if(apiData.query.status === 'Pending'){
        url+='?status=pending'
      }
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

export const createConsultation = createAsyncThunk(
  "createConsultation",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/consultations/create`,
        apiData.data,
        {
          headers: {
            Authorization: `Bearer ${apiData.token}`,
          },
        }
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
export const updateConsultation = createAsyncThunk(
  "updateConsultation",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/consultations/update/${apiData.id}`,
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
export const deleteConsultation = createAsyncThunk(
  "deleteConsultation",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/consultations/delete/${apiData.id}`
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


export const {clearState} = consultationSlice.actions