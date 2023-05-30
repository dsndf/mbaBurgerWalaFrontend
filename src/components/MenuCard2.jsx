import React from "react";
import "../styles/MenuCard.scss";
import { motion } from "framer-motion";
const MenuCard2 = ({ name, item, image, price, handler }) => {
  return (
    <div className="MenuCard">
      <div>Item {item}</div>
      <img src={image} alt="IMAGE1" />
      <div>
        {" "}
        <h2>{name}</h2>
        <h5>{price}₹</h5>
      </div>

      <button onClick={() => handler(name, price, 1, image)}>Buy Now</button>
    </div>
  );
};

export default MenuCard2;
