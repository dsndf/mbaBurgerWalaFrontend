import React from "react";
import { Link } from "react-router-dom";
import "../styles/Notfound.scss";
const NotFOund = () => {
  return (
    <div className="notfound">
      <div>
        {" "}
        <h2>! 404</h2>
        <p>Oops Page Not Found.</p>
        <button className="btn">
          <Link to={"/"}>Go to Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFOund;
