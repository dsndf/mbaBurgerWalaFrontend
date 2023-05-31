import React, { useState } from "react";
import "../styles/Contact.scss";
import { motion } from "framer-motion";
import burger from "../assets/brg3.png";
import axios from "axios";

import { toast } from "react-toastify";
import Loading from "./Loading";
import { Link } from "react-router-dom";
const server = 'https://mbabwbackend.onrender.com';

const Thanku = () => {
  return (
    <div className="thanku-cont">
      <div>
        <h1>Thank you for contacting us</h1>
        <p>We'll send response to your mail.</p>
        <br />
        <br />
        <Link to="/" className="btn">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

const Contact = () => {
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const sendHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (state.name.length < 3) {
        toast.error("Name should have at least 3 words");
        return;
      }

      const { data } = await axios.post(`${server}/contact`, state);

      if (data.success === true) {
        setLoader(false);
        toast.success("Send Successfully");
        setFlag(true);
      }
    } catch (err) {
      setLoader(false);
      toast.error(err.message);
    }
  };
  if (loader) {
    return <Loading />;
  } else if (flag) {
    return <Thanku />;
  }
  return (
    <section>
      <>
        <motion.form
          onSubmit={(e) => sendHandler(e)}
          className="form"
          initial={{
            x: "-100%",
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
        >
          <h1>CONTACT US</h1>
          <div>
            <input
              type="text"
              required
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={changeHandler}
            />
          </div>
          <div>
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={state.email}
              onChange={changeHandler}
            />
          </div>
          <div>
            <textarea
              required
              name="message"
              placeholder="Message..."
              cols="30"
              rows="10"
              value={state.message}
              onChange={changeHandler}
            ></textarea>
          </div>

          <input type="submit" value={"Send"} className="btn" />
        </motion.form>
        <motion.div
          initial={{
            x: "100%",
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: "0.2",
          }}
          className="form-part"
        >
          <motion.img
            initial={{
              y: "-200%",
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
            }}
            src={burger}
            alt=""
          />{" "}
        </motion.div>
      </>
    </section>
  );
};

export default Contact;
