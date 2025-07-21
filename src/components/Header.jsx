import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <div className="header-container">
      <div className="header-row">
        <h1 className="header-title">Elm&Oak</h1>
        <nav className="header-nav">
          <Link className="header-link" to="/">Home</Link>
          <Link className="header-link" to="/cart"> MyCart</Link>
          <Link className="header-link" to="/order"> MyOrder</Link>
          {/* <Link className="header-link" to="/admin">Admin</Link>- */}
          {user?.role === "admin" && <Link className="header-link" to="/admin"> Admin</Link>}
          {user?.token ? <Link className="header-link" to="/profile"> Profile </Link> : <Link className="header-link" to="/login"> Login</Link>}
        </nav>
      </div>
    </div>
  );
}