import React from "react";
import "../styles/Profile.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import userimg from "../assets/userimg.jpg";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/userSlice";
const Profile = () => {
  const userState = useSelector((state) => state.userReducer);
  const { name, photo, role } = userState.user;

  const dispatch = useDispatch();
  return (
    <div className="profile-cont">
      <div>
        <motion.img
          src={photo ? photo : ""}
          alt=""
          initial={{ y: "-50vh", opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        />
        <motion.h2
          initial={{ x: "100vw", opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          {userState.user.name}
        </motion.h2>

        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          {" "}
         {role==="admin"&& <Link
            to={"/admin/dashboard"}
            style={{ backgroundColor: "#2a2a2a", border: "none" }}
            className={"btn"}
          >
            <MdDashboard /> Dashboard
          </Link>}
          <br />
          <Link
            to={"/orders"}
            style={{ minWidth: "18%", width:"100px", marginTop: "20px" }}
            className={"btn"}
          >
            Orders
          </Link>
        </motion.div>

        <motion.button
          initial={{ y: "-100vw", opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ delay: 0.5 }}
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </motion.button>
      </div>
    </div>
  );
};

export default Profile;
