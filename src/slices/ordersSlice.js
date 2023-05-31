import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const server = 'https://mbabwbackend.onrender.com';

const initialState = {
    myorders: [],
    adminAllOrders: [],
    status: "idle",
    isOrderUpdated:false,
    err: ""
}

const ordersSlice = createSlice({
    initialState,
    name: "order",
    reducers: {
setIsOrderUpdated(state,action){
    state.isOrderUpdated = action.payload;
}
        ,
        setOrders(state, action) {
            state.myorders = action.payload;
        }
        ,
        setAdminAllOrders(state, action) {
            state.adminAllOrders = action.payload;
        },
        setOrdersError(state, action) {
            state.err = action.payload;
        },
        setOrdersStatus(state, action) {
            state.status = action.payload;
        },


    }
});

export const { setIsOrderUpdated,setOrders, setAdminAllOrders, setOrdersStatus, setOrdersError } = ordersSlice.actions;
//thunk for place order;

export function getMyOrders() {

    return async (dispatch, getState) => {
        dispatch(setOrdersStatus("loading"));
        try {

            const { data } = await axios.get(`${server}/my/orders`,{ withCredentials: true });
            console.log("this is ",data.orders)
            
            dispatch(setOrders(data.orders))
            dispatch(setOrdersStatus("idle"));

        }
        catch (err) {
            dispatch(setOrdersError(err.response.data.message));
            dispatch(setOrdersStatus("idle"));

        }
    }
}

export function getAllOrders() {

    return async (dispatch, getState) => {
        dispatch(setOrdersStatus("loading"));
        try {

            const { data } = await axios.get(`${server}/admin/orders`,{ withCredentials: true });
        
            dispatch(setAdminAllOrders(data.orders))
            dispatch(setOrdersStatus("idle"));

        }
        catch (err) {
            dispatch(setOrdersError(err.response.data.message));
            dispatch(setOrdersStatus("idle"));

        }
    }
}
export function  updateOrder(id) {

    return async (dispatch, getState) => {
        dispatch(setOrdersStatus("loading"));
        try { 
            console.log(id);
            const { data } = await axios.put(`${server}/admin/update/order/${id}`,{ withCredentials: true });
             console.log(data.order)
            dispatch(setIsOrderUpdated(true));
            dispatch(setOrdersStatus("idle"));

        }
        catch (err) {
            dispatch(setOrdersError(err.response.data.message));
            dispatch(setOrdersStatus("idle"));

        }
    }
}
export default ordersSlice.reducer;
