import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart: localStorage.getItem("cartList") ? JSON.parse(localStorage.cartList) : [],
    shippingInfo: localStorage.shippingInfo ? JSON.parse(localStorage.shippingInfo) : {}
    
}

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {

        setCart(state, action) {
            state.cart.push(action.payload);
            localStorage.setItem("cartList", JSON.stringify(state.cart));
        },
        removeCartItem(state, action) {
            state.cart = state.cart.filter((v) => v.name !== action.payload.name);
            localStorage.setItem("cartList", JSON.stringify(state.cart));
        }
        ,
        setCartItemQty(state, action) {
            let item = state.cart.find((v) => v.name === action.payload.name);
            item.qty = action.payload.qty;
            localStorage.setItem("cartList", JSON.stringify(state.cart));
        }
        ,
        setShippingInfo(state,action){
           state.shippingInfo = action.payload;
           console.log(action.payload);
           localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));

        }


    }

});

export const {setShippingInfo,setCart,setCartItemQty,removeCartItem} = cartSlice.actions;


export default cartSlice.reducer;