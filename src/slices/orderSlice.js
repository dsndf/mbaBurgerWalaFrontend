import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const server = 'https://mbabwbackend.onrender.com';
const initialState = {
    order: {},
    isPlaced: false,
    status: "idle",
    isDeleted:false,
    err: ""
}

const orderSlice = createSlice({
    initialState,
    name: "order",
    reducers: {
        setIsDeleted(state,action){
            state.isDeleted = action.payload;
        },
        setOrder(state, action) {
            state.order = action.payload;
        }
        ,
        setIsPlaced(state, action) {
            state.isPlaced = action.payload;
        },
        setOrderError(state, action) {
            state.err = action.payload;
        },
        setOrderStatus(state, action) {
            state.status = action.payload;
        },


    }
});

export const {setIsDeleted, setIsPlaced, setOrder, setOrderStatus, setOrderError } = orderSlice.actions;
//thunk for place order;

export function placeOrder(order) {

    return async (dispatch, getState) => {
        dispatch(setOrderStatus("loading"));
        try {
            console.log(order);
            const { data } = await axios.post(`${server}/create/order`, order, {
                 withCredentials: true ,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            dispatch(setOrder(data.order));
            dispatch(setIsPlaced(true));
            dispatch(setOrderStatus("idle"));

        }
        catch (err) {
            dispatch(setOrderError(err.response.data.message));
            dispatch(setOrderStatus("idle"));

        }
    }
}
export function getOrderDetails(orderid) {

    return async (dispatch, getState) => {
        dispatch(setOrderStatus("loading"));
        try {
        
            const { data } = await axios.get(`${server}/order/${orderid}`,{ withCredentials: true });
        dispatch(setOrder(data.order));
        dispatch(setOrderStatus("idle"));

    }
        catch (err) {
        dispatch(setOrderError(err.response.data.message));
        dispatch(setOrderStatus("idle"));

    }
}
}
export function deleteOrder(orderid) {

    return async (dispatch, getState) => {
        dispatch(setOrderStatus("loading"));
        try {
        
            const { data } = await axios.delete(`${server}/admin/delete/order/${orderid}`,{ withCredentials: true });
        dispatch(setIsDeleted(true));
        dispatch(setOrderStatus("idle"));

    }
        catch (err) {
        dispatch(setOrderError(err.response.data.message));
        dispatch(setOrderStatus("idle"));

    }
}
}
export default orderSlice.reducer;