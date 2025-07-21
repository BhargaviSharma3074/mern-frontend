import "./Login.css";
import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";



export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_BACKEND;
  const Navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
      // console.log("Login payload:", user);
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/")
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="login-error">{error}</div>
      <form className="login-form">
        <input
          className="login-input"
          type="text"
          placeholder="Email Address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="login-btn" type="button" onClick={handleSubmit}>Submit</button>
      </form>
      <Link className="login-link" to="/register">Create Account</Link>
    </div>
  );
}