import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
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
            const { data } = await axios.post('/create/order', order, {
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
        
            const { data } = await axios.get(`/order/${orderid}`);
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
        
            const { data } = await axios.delete(`/admin/delete/order/${orderid}`);
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