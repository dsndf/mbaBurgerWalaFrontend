import React from "react";
import "../styles/Me.scss";
import {useSelector} from 'react-redux';
import im  from '../assets/userimg.jpg'
const Me = () => {
  const userState= useSelector((state)=>state.userReducer);
  const {name,photo} = userState;
  return (
    <div className="Me">
      <div>
        <img src={im} alt="" />
        <h4>{name}</h4>
        <p style={{
          fontWeight:600,
          fontSize:"20px"
        }} >Hello,I AM MERN STACK DEVELOPER</p>
        <p>THANKS FOR EXPLORING MY WEBSITE</p>
      </div>
    </div>
  );
};

export default Me;
