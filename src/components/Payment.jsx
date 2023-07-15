import React, { useEffect, useState } from "react";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BsKey } from "react-icons/bs";
import { placeOrder, setIsPlaced, setOrderError } from "../slices/orderSlice";
import "../styles/Payment.scss";
import { toast } from "react-toastify";
import {
  CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import Loading from "./Loading";

const Payment = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const { user } = useSelector((state) => state.userReducer);
  const { shippingInfo, cart } = useSelector((state) => state.cartReducer);

  const paybtn = useRef(null);
  const { subTotal, Tax, shippingCharge } = JSON.parse(localStorage.amountInfo);
  const Total = subTotal + Tax + shippingCharge;
  const payment = { amount: Math.round(Total * 100) };
  const navigation = useNavigate();
 const {isPlaced,err} = useSelector((state)=>state.orderReducer);
const [loading,setLoading] = useState(false);
  let orderItems = cart.map((v) => {
    return {
      name: v.name,
      price: v.price,
      quantity: v.qty,
    };
  });
  const order = {
    shippingInfo,
    orderItems,
    itemsPrice: subTotal,
    taxPrice: Tax,
    shippingPrice: shippingCharge,
    totalPrice: Total,
    user: user.id,
  };

  const paymentSubmit = async (e) => {
    e.preventDefault();
 console.log("3d secure call");
    if (!stripe || !elements) {
      console.log("return");
      return;
    }
    paybtn.current.disabled = true;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: user.name,
        email: user.email,
        address: {
          line1: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postal_code: shippingInfo.pincode,
          country: shippingInfo.country,
        },
      },
    });
 
    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log(id);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
 console.log("axios calling");
        const { data } = await axios.post(
          "/process/payment",
          { amount: Total*100, id },
          config
        );

 console.log("after axios calling");
        const { success, client_secret } = data;
setLoading(true);
      
 console.log("client seceret is", client_secret);
        const result = await stripe.confirmCardPayment(client_secret);

        if (result.error) { 
              setLoading(false);
              console.log("neterer")
          toast.error("Payment Failed please try agian");
          paybtn.current.disabled = false;
     
        } else {
          if (result.paymentIntent.status === "succeeded") {
            
            order.paymentMethod = "Online";
            dispatch(placeOrder(order));
         
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };

          
          
          } else {
            toast.error("There is some issue");
          }
        }
      } catch (err) {
        paybtn.current.disabled = false;
        toast.error(err.message);
      }
    }
  };


useEffect(()=>{
if(isPlaced){
  toast.success("Payment has been done successfully");
   dispatch(setIsPlaced(false));
  navigation("/payment/success");
}
},[isPlaced]) 

if(loading){
  return <Loading/>
}


  return (
    <>
      <div className="main-payment-cont">   
       
        <div className="paymentContainer">
      
          <div className="payment-box">
            <Heading text={"Make Payment"}></Heading>
            <div>
              <MdOutlineAccountBalanceWallet />
              <CardNumberElement className="paymentinput" />
            </div>
            <div>
              <FaRegCalendarCheck />
              <CardCvcElement className="paymentinput" />
            </div>
            <div>
              <BsKey />
              <CardExpiryElement className="paymentinput" />
            </div>
            <div>
              {" "}
              <input
                className="btn"
                type="submit"
                ref={paybtn}
      
                value={`Pay ₹${Total}.00`}
                onClick={paymentSubmit}
              />
         
            </div>  
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
