import "./Admin.css";
import React from 'react'
import { Outlet, Link } from 'react-router-dom'


export default function Admin() {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <Link className="admin-link" to="/admin">Users -</Link>
        <Link className="admin-link" to="/admin/products"> Products -</Link>
        <Link className="admin-link" to="/admin/orders"> Orders</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
