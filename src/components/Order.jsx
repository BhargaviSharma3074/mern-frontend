import "./Order.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../App';


export default function Order() {
  const API_URL = import.meta.env.VITE_BACKEND;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    }
    catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };
  // console.log("email: ", user?.email);
  useEffect(() => {
    // if(user?.email){
    fetchOrders();
    // }
  }, []);
  // console.log(orders);
  return (
    <div className="order-container">
      <h3 className="order-title">My Orders</h3>
      <div className="order-error">{error}</div>
      {orders &&
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <p>OrderId:{order._id}</p>
            <p>Order Value: {order.orderValue} </p>
            <p>Status:{order.status}</p>
            <table className="order-table" border="1">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.pname}</td>
                    <td>{item.price}</td>
                    <td>{item.qty}</td>
                    <td>{item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
          </div>
        ))}
    </div>
  );
}






