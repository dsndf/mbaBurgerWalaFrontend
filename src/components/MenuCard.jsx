import React from "react";
import "../styles/MenuCard.scss";
import { motion } from "framer-motion";
const MenuCard = ({ de = 0, name, item, image, price, handler }) => {
  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      whileInView={{ x: "0%", opacity: 1 }}
      transition={{
        delay: de
        
      }}
      className="MenuCard"
    >
      <div>Item {item}</div>
      <img src={image} alt="IMAGE1" />
      <div>
        {" "}
        <h2>{name}</h2>
        <h5>{price}₹</h5>
      </div>

      <button onClick={() => handler(name,price,1,image)}>Buy Now</button>
    </motion.div>
  );
};

export default MenuCard;
