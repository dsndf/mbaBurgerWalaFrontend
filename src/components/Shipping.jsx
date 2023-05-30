import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import "../styles/Shipping.scss";
import { useDispatch, useSelector } from "react-redux";
import { setShippingInfo } from "../slices/cartSlice";
import { toast } from "react-toastify";
const Shipping = () => {
  const { cart, shippingInfo } = useSelector((state) => state.cartReducer);
  const [country, setCountry] = useState(shippingInfo.country);
  const [st, setSt] = useState(shippingInfo.state);
  const [state, setState] = useState({
    hNo: shippingInfo.hNo,
    country,
    state: st,
    pincode: shippingInfo.pincode,
    phoneNumber: shippingInfo.phoneNumber,
    city: shippingInfo.city,
  });
  let navigation = useNavigate();
  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();                     
    let obj = { ...state, country, ["state"]: st };
    let str = obj.phoneNumber.toString();
    if (str.length < 10 || str.length>10) {
     toast.error("Phone no. is In Valid")
    } else {
      dispatch(setShippingInfo(obj));
      navigation("/confirm/order");
    }
  };
  const dispatch = useDispatch();

  return (
    <div className="ship-container">
      <div className="ship">
        <h1>SHIPPING DETAILS</h1>
        

        <form action="" onSubmit={submitHandler}>
          <div>
            <h5>H.No.</h5>
            <input
              type="text"
              name="hNo"
              value={state.hNo}
              onChange={changeHandler}
              required={true}
            />
          </div>
          <div>
            <h5>City</h5>
            <input
              type="text"
              name="city"
              onChange={changeHandler}
              value={state.city}
              required={true}
              
            />
          </div>
          <div>
            <h5>Country</h5>

            <select
              name="country"
              id=""
              onChange={(e) => setCountry(e.target.value)}
              required={true}
            
            >
              <option value={country}>{country ? country : "Country"}</option>
              {Country.getAllCountries().map(({ isoCode, name },ind) => {
                return <option value={isoCode} key={ind}  >{name}</option>;
              })}
            </select>
          </div>
          {country && (
            <div>
              <h5>State</h5>
              <select
                name="state"
                id=""
                onChange={(e) => setSt(e.target.value)}
                required={true}
              
              >
                <option value={st}>{st ? st : "State"}</option>
                {State.getStatesOfCountry(country).map(({ name },ind) => {
                  return <option value={name} key={ind} >{name}</option>;
                })}
              </select>
            </div>
          )}

          <div>
            <h5>Pin Code</h5>
            <input
              type="number"
              name="pincode"
              value={state.pincode}
              onChange={changeHandler}
              required={true}
     
            />
          </div>
          <div>
            <h5>Phone No.</h5>
            <input
              type="number"
              name="phoneNumber"
              value={state.phoneNumber}
              onChange={changeHandler}
              required={true}
           
            />
          </div>
          <div>
            <input type="submit" value="Confirm Order" className="btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
