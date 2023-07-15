import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../slices/orderSlice";
import "../styles/OrdersDetails.scss";
import Heading from "./Heading";
import Loading from "./Loading";
const OrdersDetails = () => {

  useEffect(() => {
    dispatch(getOrderDetails(orderid));
  }, []);
  const { orderid } = useParams();
  const dispatch = useDispatch();
  const { order ,status} = useSelector((state) => state.orderReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { itemsPrice, taxPrice, shippingPrice, totalPrice } = order;

  let dateinfo = {
    placedAt: new Date(order.createdAt).toDateString(),
    deliveredAt: order.deliveredAt
      ? new Date(order.deliveredAt).toDateString()
      : "",
    paidAt: order.paidAt ? new Date(order.paidAt).toDateString() : "",
  };
  if(status==="loading"){
    return <Loading/>
  }
  return (
    <div className="order-details">
      <div>
        <Heading text={"ORDER DETAILS"} />
        <div>
          <h3>SHIPPING</h3>
          {order.shippingInfo && (
            <p>
              Address:{" "}
              <span>
                HNO. {order.shippingInfo.hNo} , {order.shippingInfo.city} ,{" "}
                {order.shippingInfo.state} , {order.shippingInfo.country}
              </span>
            </p>
          )}
        </div>
        <div>
          <h3>CONTACT</h3>
          <p>
            Name: <span>{user.name}</span>{" "}
          </p>
          <p>
            Phone:{" "}
            <span>
              {order.shippingInfo ? order.shippingInfo.phoneNumber : null}
            </span>{" "}
          </p>
        </div>
        <div>
          <h3>STATUS</h3>
          <p>
            Order Status:{" "}
            <span
              className={
                (order.orderStatus === "Delivered" && "green") ||
                (order.orderStatus === "Shipped" && "orange") ||
                (order.orderStatus === "Processing" && "red")
              }
            >
              {order.orderStatus}
            </span>
          </p>
          <p>
            Placed At: <span>{dateinfo.placedAt}</span>
          </p>
          <p>
            Deliverd At:{" "}
            <span>{dateinfo.deliveredAt ? dateinfo.deliveredAt : "NA"}</span>
          </p>
        </div>
        <div>
          <h3>PAYMENT</h3>
          <p>
            Payment Method: <span>{order.paymentMethod}</span>
          </p>
          <p>
            Payment Reference:{" "}
            <span>{order.paymentInfo ? order.paymentInfo.id : "NA"}</span>
          </p>
          <p>
            Paid At: <span>{dateinfo.paidAt ? dateinfo.paidAt : "NA"}</span>
          </p>
        </div>
        <div>
          <h3>AMOUNT</h3>
          <p>
            Price: <span>{itemsPrice}₹</span>
          </p>
          <p>
            Shipping:
            <span>{shippingPrice}₹</span>
          </p>
          <p>
            Tax: <span>{taxPrice}₹</span>
          </p>
          <p>
            Total: <span>{totalPrice}₹</span>
          </p>
        </div>
        <div>
          <h2>ORDERED ITEMS</h2>
          {order.orderItems &&
            order.orderItems.map(({ name, quantity, price }, ind) => {
              return (
                <div className="ordered-items" key={ind}>
                  <p>{name}</p>
                  <p>
                    {quantity}x ₹{price}
                  </p>
                </div>
              );
            })}

          <div>
            <h3>SubTotal:</h3>
            <h3>₹{order.itemsPrice}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetails;
