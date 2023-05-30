import React, { useEffect, useState } from "react";
import "../styles/ConfirmOrder.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { placeOrder, setIsPlaced, setOrderError } from "../slices/orderSlice";
import Loading from "./Loading";
const ConfirmOrder = () => {
  const { cart, shippingInfo } = useSelector(
    (state) => state.cartReducer
  );
  const {subTotal, Tax, shippingCharge} = JSON.parse(localStorage.amountInfo);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const { isPlaced, status, err } = useSelector((state) => state.orderReducer);
  const [pymt, setPymt] = useState("");
  const navigation = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!pymt) {
      toast.info("Please select the payment option");
      return;
    }

    let orderItems = cart.map((v) => {
      return {
        name: v.name,
        price: v.price,
        quantity: v.qty,
      };
    });
    let myOrder = {
      shippingInfo,
      orderItems,
      user: user._id,
      itemsPrice: subTotal,
      taxPrice:Tax,
      shippingPrice:shippingCharge,
      totalPrice:shippingCharge + subTotal + Tax,

    };
    
    console.log(myOrder);
    if (pymt === "COD") {
    
      console.log(myOrder);
      dispatch(placeOrder(myOrder));
    } else {
   navigation('/process/payment')
    }
  };
  useEffect(() => {
    if (isPlaced) {
      toast.success("Order Has Been Placed");
      dispatch(setIsPlaced(false));
      navigation("/payment/success");
    } else if (err) {
      toast.error(err);
      dispatch(setOrderError(""));
    }
  }, [isPlaced, err]);

if(status === "loading"){
  return <Loading/>
}

  return (
    <div className="conford-container">
      <div className="payment-options">
     
        <h1>PAYMENT OPTIONS</h1>
        <div>
          <div>
            <p>Online Payment</p>
            <input
              type="radio"
              name="payment-opt"
              value={"ONP"}
              onChange={() => setPymt("ONP")}
            />
          </div>
          <div>
            <p>Cash On Delivery</p>
            <input
              type="radio"
              name="payment-opt"
              value={"COD"}
              onChange={() => setPymt("COD")}
            />
          </div>
        </div>
        <button className="btn" onClick={submitHandler}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
