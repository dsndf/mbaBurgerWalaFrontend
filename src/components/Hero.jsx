import React, { useEffect } from "react";
import "../styles/Hero.scss";
import { motion } from "framer-motion";
import { useTitle } from "../Hooks/useTitle";

const Hero = () => {
   useTitle("Home");


  return (

    <section className="Hero">

      <div>
        <motion.h1
        style={{
          fontWeight:700
        }}
          initial={{ y: "-100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
        >
          MBA BURGER WALA
        </motion.h1>
        <motion.h4
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: "0%", opacity: 1 }}
        >
          Welcome to Our Resturent
        </motion.h4>
        <motion.button
        className="btn"
          initial={{
            y: "100%",
            opacity: 0,
          }}
          whileInView={{
            y: "0",
            opacity: 1,
          }}
        >
          <a href="#menu">Explore Menu</a>  
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
