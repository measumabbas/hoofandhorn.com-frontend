import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './auth/loginSlice';
import { signUpSlice } from './auth/signupSlice';
import { productsSlice } from './products/products';
import { orderSlice } from './sellerDashboard/orderSlice';
import { dashboardSlice } from './sellerDashboard/dashboardSlice';
import { doctorsSlice } from './sellerDashboard/doctorsSlice';
import { consultationSlice } from './sellerDashboard/consultationSlice';
import { usersSlice } from './sellerDashboard/usersSlice';


const persistConfig = {
    key: 'root',
    storage,
  }

  export const store = configureStore({
    reducer: {
        auth: persistReducer(persistConfig, authSlice.reducer),
        signUp: signUpSlice.reducer,
        products : productsSlice.reducer,
        orders: orderSlice.reducer,
        dashboard: dashboardSlice.reducer,
        doctor: doctorsSlice.reducer,
        consultations: consultationSlice.reducer,
        users: usersSlice.reducer
    }
})

export const persistor = persistStore(store)