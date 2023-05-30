import React from "react";
import { Link } from "react-router-dom";
import "../styles/OrderSuccess.scss";
import { useSelector } from "react-redux";
const OrderPlaced = () => {

  const {order} = useSelector((state)=>state.orderReducer); 
  return (
    <div className="order-success">
      <div>
        <h1>Order Placed</h1>
        <p>Your Order has been placed.You can chack order status below.</p>
        <br />
        <br />
        <Link to={`/order/${order._id}`}>Check Order</Link>
      </div>
    </div>
  );
};

export default OrderPlaced;
