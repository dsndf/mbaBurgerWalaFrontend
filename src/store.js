
import {configureStore, createSlice} from '@reduxjs/toolkit'
import adminUsersSlice from './slices/AdminUsersSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import ordersSlice from './slices/ordersSlice';
import userSlice from './slices/userSlice';

const store =  configureStore({ 
     reducer:{
         userReducer:userSlice,
         cartReducer:cartSlice,
         orderReducer:orderSlice,
         ordersReducer:ordersSlice,
         allUsersReducer:adminUsersSlice
     }
});

export default store;