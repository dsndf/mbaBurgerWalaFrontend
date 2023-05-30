import React from "react";
import "../styles/About.scss";
import { MdSearch } from "react-icons/md";

import Heading from "./Heading";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="about-cont">
      <div>
        <h2>ABOUT US</h2>
        <div className="b1">
          <h1>MBA BURGER WALA</h1>
          <p>
            We are MBA Burger Wala.The place
            for most tasty burger
          </p>
          <p>
            Explore more variety of burgers along with some different and tasty
            food
            <br />
            like pizza,momos,french fries get them by clicking below <br />
    
          </p> 
        
            <span> <Link to={"/items"}><MdSearch/></Link></span>
        </div>
 <div >
    <h3>FOUNDER</h3>
    <h4>I am Gaurav jain founder of MBA Burger Wala.Affiliated to God Taste...</h4>

 </div>

      </div>
    </div>
  );
};

export default About;
