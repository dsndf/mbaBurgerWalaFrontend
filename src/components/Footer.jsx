import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillApple } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import '../styles/Footer.scss'

const Footer = () => {

  return <div className="Footer">
<div>
<h2>MBA Burger Wala</h2>
<p>We are trying to give you best possible taste</p>
<br />
<em>We give attention to geniune feedback</em>
<strong>All right recieved @mbaburgerwala</strong>
</div>
 <div className="Icons">
    <h4>Follow Us</h4>
 <a href="https://www.instagram.com" target="_blank"><AiFillInstagram/></a>
 <a href="https://www.facebook.com"  target="_blank"><AiFillFacebook/></a>
 <a href="https://www.twitter.com"  target="_blank"><AiFillTwitterSquare/></a>
   

 </div>


  </div>;
};

export default Footer;
