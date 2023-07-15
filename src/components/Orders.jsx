import React, { useEffect } from "react";
import { FaEye,FaRegEye} from "react-icons/fa";
import { SlActionRedo } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import userimg from "../assets/userimg.jpg";
import { toast } from "react-toastify";
import { GrEdit } from "react-icons/gr";

import "../styles/Orders.scss";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllOrders,
  setIsOrderUpdated,
  updateOrder,
} from "../slices/ordersSlice";
import { deleteOrder, setIsDeleted } from "../slices/orderSlice";

const Orders = () => {
  const { adminAllOrders, status, isOrderUpdated } = useSelector(
    (state) => state.ordersReducer
  );
  const { isDeleted } = useSelector(
    (state) => state.orderReducer
  );
  const dispatch = useDispatch();
  const fireUpdateFunc = (id, orderStatus) => {
    if (orderStatus === "Delivered") {
      toast.info("Order Is Already Delivered");
      return;
    }
    dispatch(updateOrder(id));
  };
  useEffect(() => {


    if (isOrderUpdated) {
      toast.success("Order Status Updated Successfully");
      dispatch(setIsOrderUpdated(false));
    }
if(isDeleted){
  toast.success("Order Deleted");
  dispatch(setIsDeleted(false));
}

    dispatch(getAllOrders());
  }, [isOrderUpdated,isDeleted]);
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="orders-cont">
      <div>

{adminAllOrders.length===0?<h2 className="not-found">No Orders Found!</h2>:   <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Item Qty</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {adminAllOrders &&
              adminAllOrders.map(
                ({ _id, orderStatus, totalPrice, orderItems }) => {
                  return (
                    <tr key={_id} >
                      <td>{_id}</td>
                      <td>{orderItems.length}</td>

                      <td>₹{totalPrice}</td>
                      <td
                        className={
                          (orderStatus === "Delivered" && "green") ||
                          (orderStatus === "Shipped" && "orange") ||
                          (orderStatus === "Processing" && "red")
                        }
                      >
                        {orderStatus}
                      </td>

                      <td className="icons">
                        <Link to={`/order/${_id}`}>
                          <FaRegEye />
                        </Link>
                        <Link onClick={() => fireUpdateFunc(_id, orderStatus)}>
                          <GrEdit />
                        </Link>
                        <Link onClick={() =>dispatch(deleteOrder(_id))}>
                          <MdDelete />
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>}

     
      </div>
    </div>
  );
};

export default Orders;
