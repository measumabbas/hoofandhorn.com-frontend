import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

const initialState = {
  products: null,
  homeProducts: null,
  product: null,
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
  updateLoading:false,
  updateSuccess:false,
  updateError:null,
  addRatingLoading:false,
  addRatingSuccess:false,
  addRatingError:null
};
export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    clearState: (state) => {
      state.addError = null;
      state.addSuccess = false;
      state.delError = null;
      state.delSuccess = false;
      state.error = null;
      state.getError = null;
      state.updateError = null;
      state.updateSuccess = false;
      state.addRatingSuccess = false;
      state.addRatingError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.homeProducts = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductsForAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductsForAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsForAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getSellerProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSellerProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getSellerProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.addLoading = false;
      state.addError = action.payload;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.addLoading = false;
      state.addSuccess = true;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.delLoading = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.delLoading = false;
      state.delError = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.delLoading = false;
      state.delSuccess = true;
    });
    builder.addCase(getSingleProduct.pending,(state)=>{
      state.getLoading = true;
    })
    builder.addCase(getSingleProduct.fulfilled,(state,action)=>{
      state.getLoading = false;
      state.product = action.payload;
    })
    builder.addCase(getSingleProduct.rejected,(state,action)=>{
      state.getLoading = false;
      state.getError = action.payload;
    })
    builder.addCase(updateProduct.pending,(state)=>{
      state.updateLoading = true;
    })
    builder.addCase(updateProduct.fulfilled,(state,action)=>{
      state.updateLoading = false;
      state.updateSuccess = true;
    })
    builder.addCase(updateProduct.rejected,(state,action)=>{
      state.updateLoading = false;
      state.updateError = action.payload;
    })
    builder.addCase(createProductReview.pending,(state)=>{
      state.addRatingLoading = true;
    })
    builder.addCase(createProductReview.fulfilled,(state,action)=>{
      state.addRatingLoading = false;
      state.addRatingSuccess = true;
    })
    builder.addCase(createProductReview.rejected,(state,action)=>{
      state.addRatingLoading = false;
      state.addRatingError = action.payload;
    })


  },
});

export const getProducts = createAsyncThunk(
  "fetchProducts",
  async (apiData, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/product/view`;
      if (apiData?.category) {
        url += `?category=${apiData?.category}`;
      }
      if(apiData?.status){
        if(apiData?.status === 'All'){

        }else{
          url += `?status=${apiData?.status?.toLowerCase()}`;
        }
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
export const getProductsForAdmin = createAsyncThunk(
  "getProductsForAdmin",
  async (apiData, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/product/admin`;
      if (apiData?.category) {
        url += `?category=${apiData?.category}`;
      }
      if(apiData?.status){
        if(apiData?.status === 'All'){

        }else{
          url += `?status=${apiData?.status?.toLowerCase()}`;
        }
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

export const getSellerProducts = createAsyncThunk(
  "getSellerProducts",
  async (apiData, { rejectWithValue }) => {
    let url = `${BASE_URL}/product/by-farmer`
    if(apiData.query === 'Livestock'){
      url+='?productCategory=1'
    }
    if(apiData.query === 'Processed'){
      url+='?productCategory=0'
    }
    if(apiData.query === 'Poultry'){
      url+='?productCategory=2'
    }
    try {
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
export const createProduct = createAsyncThunk(
  "createProduct",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/product/createProduct`,
        apiData.data,
        {
          headers: {
            Authorization: `Bearer ${apiData.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data?.data;
    } catch (error) {
      console.log(error)
      if(error?.response?.status === 413){
        return rejectWithValue("File size too large")
      }
      if (error?.response?.data?.message) {
        return rejectWithValue(error?.response?.data?.message);
      } else {
        return rejectWithValue("Some error occured please try again later");
      }
    }
  }
);
export const createProductReview = createAsyncThunk(
  "createProductReview",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/product/review/${apiData.id}`,
        apiData.data,
      );
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
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/product/${apiData.id}`, {
        headers: {
          Authorization: `Bearer ${apiData.token}`,
          "Content-Type": "application/json",
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
export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/product/view/${apiData.id}`, {
        headers: {
          Authorization: `Bearer ${apiData.token}`,
          "Content-Type": "application/json",
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
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (apiData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/product/update/${apiData.id}`, apiData.data);
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

export const { clearState } = productsSlice.actions;
