import React from "react";
import MenuCard from "./MenuCard";
import "../styles/Menu.scss";
import CB from "../assets/Cb.png";
import Aaloo from "../assets/Aalo.png";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartReducer);

  const addToCartHandler = (name, price, qty, img) => {
    if (cart.find((v) => v.name === name)) {
      toast.info("Already in cart!");
    } else {
      dispatch(setCart({ name, price, qty, img }));
      toast.success("Added to cart!");
    }
  };
const navigation = useNavigate();
  return (
    <>
    
      <div className="Menu" >
        <MenuCard
          de={0.1}
          name="Cheese Burger"
          item={1}
          image={CB}
          price={199}
          handler={addToCartHandler}
        />
        <MenuCard
          de={0.2}
          name="Aloo Tikki Burger"
          item={2}
          image={Aaloo}
          price={299}
          handler={addToCartHandler}
        />
        <MenuCard
          de={0.3}
          name="Veg Burger"
          item={3}
          image={CB}
          price={399}
          handler={addToCartHandler}
        />
   

      </div>     
        <p className="main-menu-para" onClick={()=>navigation('/items')} >Explore More...</p>
    </>
  );
};

export default Menu;
