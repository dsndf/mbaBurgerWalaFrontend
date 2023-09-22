import React, { useEffect, useState } from "react";
import "../styles/Cart.scss";
import burger from "../assets/Cb.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, setCartItemQty } from "../slices/cartSlice";
import { TiDeleteOutline } from "react-icons/ti"; 
const CartItem = ({ title, image, Qty, price }) => {
  const [qty, setQty] = useState(Qty);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCartItemQty({ name: title, qty }));
  }, [qty]);

  function increQty() {
    setQty(qty + 1);
  }
  function decreQty() {
    if (qty == 1) {
      setQty(1);
    } else {
      setQty(qty - 1);
    }
  }
  return (
    <div className="cart-item">
      <div onClick={() => dispatch(removeCartItem({ name: title }))}>
        {window.innerWidth <= "600" ? <TiDeleteOutline /> : "Remove"}
      </div>
      <div>
        <h4>{title}</h4>
        <img src={image} alt="" />
      </div>

      <p>₹{price * Qty}</p>
      <div>
        <button className="qty-btn" onClick={increQty}>
          +
        </button>
        <input type="number" readOnly value={qty} />
        <button className="qty-btn" onClick={decreQty}>
          -
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cartReducer);

  let subTotal = cart.reduce((acc, v) => {
    return acc + v.price * v.qty;
  }, 0);
  let Tax = Math.floor((subTotal * 18) / 100);
  let Total = subTotal + Tax + 30;
  return (
    <div className="cart-container">
      <div className="cart">
        {cart.length === 0 ? (
          <div className="empty-cart">
          
            <h1>Cart is Empty</h1>
            <Link to={"/items"} className="btn">Go to Menu</Link>
          </div>
        ) : (
          <>
            {" "}
            <div>
              {cart &&
                cart.map((v,index) => {
                  return (
                    <CartItem key={index}
                      title={v.name}
                      image={v.img}
                      price={v.price}
                      Qty={v.qty}
                    ></CartItem>
                  );
                })}
            </div>
            <div className="cart-part">
              <div>
                <p>Sub Total</p>
                <p className="price">₹{subTotal}</p>
              </div>
              <div>
                <p>Tax</p>
                <p className="price">₹{Tax}</p>
              </div>
              <div>
                <p>Shipping Charge</p>
                <p className="price">₹30</p>
              </div>
              <div>
                <p>Total</p>
                <p className="price">₹{Total}</p>
              </div>
              <div>
                <Link
                  to={"/shipping"}
                  className="btn"
                  onClick={() => {
                    localStorage.amountInfo = JSON.stringify({
                      subTotal,
                      Tax,
                      shippingCharge:30
                    });
                  }}
                >
                  Check Out
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
