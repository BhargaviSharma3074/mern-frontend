import "./Cart.css";
import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";


export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_BACKEND;
  const Navigate = useNavigate()
  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    if (!cart || cart.length === 0 || cart.every(item => item.qty <= 0)) {
      setError("Cart is empty!");
      return;
    }
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    }
    catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>
      <div className="cart-error">{error}</div>
      <ul className="cart-list">
        {cart &&
          cart.map(
            (value) =>
              value.qty > 0 && (
                <li key={value._id}>
                  <img className="cart-img" src={value.imgUrl} alt={value.pname} width={40} height={40} style={{ objectFit: 'contain', marginRight: '8px', borderRadius: '4px', border: '1px solid #eee' }} />
                  {value.pname} |
                  <span>&#8377;{value.price}</span> :
                  <button className="cart-btn" onClick={() => decrement(value._id, value.qty)}>
                    -
                  </button>
                  {value.qty}
                  <button className="cart-btn" onClick={() => increment(value._id, value.qty)}>
                    +
                  </button>
                  | <span>&#8377;{value.price * value.qty}</span>
                </li>
              )
          )}
      </ul>
      <h5 className="cart-order-value">Order Value: <span>&#8377;{orderValue}</span></h5>
      <p>
        {user?.token ? (
          <button className="cart-btn cart-place-btn" onClick={placeOrder}>Place Order</button>
        ) : (
          <button className="cart-btn cart-login-btn" onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </p>
    </div>
  );
}