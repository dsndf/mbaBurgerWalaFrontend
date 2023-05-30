import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// import { server } from "../store";
const server = 'https://mbabwbackend.onrender.com';
const initialState = {
    user: {},
    isLogin: false,
    isAuth: false,
    status: "idle",
    isLogout:false,
    err: ""
}

const userSlice = createSlice({
    initialState,
    name: "userState",
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        }
        ,
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        }
        ,
        setUserStatus(state, action) {
            state.status = action.payload;
        }
        ,
        setIslogin(state, action) {
            state.isLogin = action.payload;
        },
        setUserError(state, action) {
            state.err = action.payload;
        }
 ,
 setIsLogOut(state,action){
    state.isLogout = action.payload;
 }
    }


});

export const {setIsLogOut, setIsAuth, setIslogin, setUser, setUserError, setUserStatus } = userSlice.actions;

// thunk middleware to load the user

export function LoginUser() {

    return async (dispatch, getState) => {
        dispatch(setUserStatus("loading"));
        try {
                window.open(`${server}/google/login`,"_parent");
            dispatch(setIslogin(true));
            dispatch(setUserStatus("idle"));
        }

        catch (err) {
            dispatch(setUserError(err.response.data.message));
            dispatch(setUserStatus("idle"));

        }
    }
}
export function LoadUser() {

    return async (dispatch, getState) => {
        dispatch(setUserStatus("loading"));
        try {
            const { data } = await axios.get('https://mbabwbackend.onrender.com/me',{
            withCredentials:true
            });
            dispatch(setUserStatus("idle"));
             dispatch(setUser(data.user));
            dispatch(setIsAuth(true));
       
        }

        catch (err) {
        
            dispatch(setUserStatus("idle"));
            dispatch(setUserError(err.response.data.message));
        }
    }
}
export function logoutUser() {

    return async (dispatch, getState) => {
        dispatch(setUserStatus("loading"));
        try {
            console.log("dasda");
            const { data } = await axios.get('/logout',{withCredentials:true});
            dispatch(setUserStatus("idle"));
           dispatch(setIsLogOut(true));
            dispatch(setIsAuth(false));
       
        }

        catch (err) {
            dispatch(setUserStatus("idle"));
            dispatch(setUserError(err.response.data.message));
        }
    }
}
export default userSlice.reducer;
