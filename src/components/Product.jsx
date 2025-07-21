import "./Product.css";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";


export default function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { cart, setCart } = useContext(AppContext);

  const API_URL = import.meta.env.VITE_BACKEND;
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const result = await axios.get(`${API_URL}/api/products/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (!exists) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  return (
    <div className="product-container">
      <h3 className="product-title">Available Products</h3>
      {error && <p className="product-error">{error}</p>}
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img className="product-img" src={product.imgUrl} width={100} alt={product.pname} />
            <h4>{product.pname}</h4>
            <p>{product.description}</p>
            <p>&#8377;{product.price}</p>
            <button className="product-btn" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
