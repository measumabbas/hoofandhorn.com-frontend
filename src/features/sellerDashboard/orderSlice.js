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
};
export const orderSlice = createSlice({
  name: "orderSlice",
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
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createOrder.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.addLoading = false;
      state.addError = action.payload;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.addLoading = false;
      state.addSuccess = true;
    });
    builder.addCase(deleteOrder.pending, (state) => {
      state.delLoading = true;
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.delLoading = false;
      state.delError = action.payload;
    });
    builder.addCase(deleteOrder.fulfilled, (state) => {
      state.delLoading = false;
      state.delSuccess = true;
    });
    builder.addCase(updateOrder.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    });
    builder.addCase(updateOrder.fulfilled, (state) => {
      state.updateLoading = false;
      state.updateSuccess = true;
    });
  },
});

export const getAllOrders = createAsyncThunk(
  "getAllOrders",
  async (apiData, { rejectWithValue }) => {
    const category =
      apiData.query.category === "Livestock"
        ? "1"
        : apiData.query.category === "Poultry"
        ? "2"
        : "0";
    try {
      let url = `${BASE_URL}/orders/view?category=${category}`;
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

export const createOrder = createAsyncThunk(
  "createOrder",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/orders/create`,
        apiData.data,
        {
          headers: {
            Authorization: `Bearer ${apiData.token}`,
            "Content-Type": "application/json",
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
export const deleteOrder = createAsyncThunk(
  "deleteOrder",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/orders/delete/${apiData.id}`,
        {
          headers: {
            Authorization: `Bearer ${apiData.token}`,
            "Content-Type": "application/json",
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
export const updateOrder = createAsyncThunk(
  "updateOrder",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/orders/update/${apiData.id}`,
        apiData.data,
        {
          headers: {
            Authorization: `Bearer ${apiData.token}`,
            "Content-Type": "application/json",
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

export const { clearState } = orderSlice.actions;
