import React, { useEffect } from "react";
import "../styles/Header.scss";
import { BsFillCartCheckFill } from "react-icons";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { IoFastFoodOutline } from "react-icons/io5";
import { BiLogInCircle, BiUserCircle } from "react-icons/bi";
import { FaUserAlt,FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const Header = ({ isAuth = false }) => {
  
  const { cart } = useSelector((state) => state.cartReducer);
  return (
    <nav className="Header">
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "0%" }}
        className="logo"
      >
        <IoFastFoodOutline />
      </motion.div>

      <div>
        <div className="links">
 
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">{cart.length?<span>{cart.length}</span>:null}<FaShoppingCart/></Link>
 
        <Link to={isAuth ? "/me" : "/login"}>
          {isAuth? <FaUserAlt  style={{color:"rgb(214, 0, 68)"}}/> : <BiLogInCircle></BiLogInCircle>}
        </Link>
        </div>

      </div>
    </nav>
  );
};

export default Header;
