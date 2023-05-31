import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// import { server } from "../store";
const server = 'https://mbabwbackend.onrender.com';
const initialState = {
    allUsers: [],
    status: "idle",
    err: ""
    ,

    isUpdated:false,

}

const adminUsersSlice = createSlice({
    initialState,
    name: "adminUsers",
    reducers: {
        setAllUsers(state, action) {
            state.allUsers = action.payload;
        }
        ,
        setAllUsersStatus(state, action) {
            state.status = action.payload;
        }
        ,
        setAllUsersError(state, action) {
            state.err = action.payload;
        },
        setIsUpdated(state, action) {
            state.isUpdated = action.payload;
        },
        

    }


});

export const { setIsUpdated,  setAllUsers,setAllUsersError,setAllUsersStatus} = adminUsersSlice.actions;

// thunk middleware to load the user

export function getAllUsers() {

    return async (dispatch, getState) => {
        dispatch(setAllUsersStatus("loading"));
        try {
            const {data} = await axios.get(`${server}/admin/users`);
         dispatch(setAllUsers(data.users));
         dispatch(setAllUsersStatus("idle"));

        }

        catch (err) {
            dispatch(setAllUsersError(err.response.data.message));
            dispatch(setAllUsersStatus("idle"));

        }
    }
}


export function updateUser(userId) {

    return async (dispatch, getState) => {
        dispatch(setAllUsersStatus("loading"));
        try {
            const {data} = await axios.put(`${server}/admin/user/update/${userId}`);
            
         dispatch(setIsUpdated(true));
         dispatch(setAllUsersStatus("idle"));

        }

        catch (err) {
            dispatch(setAllUsersError(err.response.data.message));
            dispatch(setAllUsersStatus("idle"));

        }
    }
}


export default adminUsersSlice.reducer;