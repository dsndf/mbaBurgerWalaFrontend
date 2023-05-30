import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa";

import { Link } from "react-router-dom";

import "../styles/myorders.scss";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrders, setOrders } from "../slices/ordersSlice";
import Loading from "./Loading";
const MyOrders = () => {
  const { myorders, status } = useSelector((state) => state.ordersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, []);
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="myorders-cont">
      <div>
        {myorders.length === 0 ? (
          <h2 className="not-found">No Orders Found!</h2>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Status</th>
                <th>Item Qty</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myorders &&
                myorders.map(
                  ({
                    _id,
                    orderStatus,
                    orderItems,
                    totalPrice,
                    paymentMethod,
                  }) => {
                    return (
                      <tr key={_id} >
                        <td>{_id}</td>
                        <td
                          className={
                            (orderStatus === "Delivered" && "green") ||
                            (orderStatus === "Shipped" && "orange") ||
                            (orderStatus === "Processing" && "red")
                          }
                        >
                          {orderStatus}
                        </td>
                        <td>{orderItems.length}</td>
                        <td>₹{totalPrice}</td>
                        <td>{paymentMethod}</td>
                        <td>
                          <Link to={`/order/${_id}`}>
                            <FaEye />
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
