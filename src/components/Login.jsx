import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";


export default function Login() {
  const {user, setUser} = useContext(AppContext);
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_BACKEND;
  const Navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
        console.log("Login payload:", user);
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/")
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      {error}
      <p>
        <input
          type="text"
          placeholder="Email Address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </p>
      <p>
        <button onClick={handleSubmit}>Submit</button>
      </p>
      <hr />
      <Link to="/register">Create Account</Link>
    </div>
  );
}