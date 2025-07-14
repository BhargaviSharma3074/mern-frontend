import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Order from './components/Order';
import Admin from './components/Admin';
import Users from './components/Users';
import Orders from './components/Orders';
import Products from './components/Products';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css'

// import Home from './components/home.jsx'

function App() {

  return (
    <div className = "App-Container">
      <BrowserRouter>
    <h1 style={{backgroundColor:"maroon", color: "white", textAlign: "center"}}>MERN Frontend</h1>
    <Link to="/">Home </Link>-
    <Link to="/cart"> MyCart </Link>-
    <Link to="/order"> MyOrder </Link>-
    <Link to="/admin"> Admin </Link>-
    <Link to="/login">Login</Link>
    <Routes>
    <Route index element = {<Product/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="register" element={<Register/>}/>
    <Route path="cart" element={<Cart/>}/>
    <Route path="order" element={<Order/>}/>
    <Route path="admin" element={<Admin/>}>
      <Route index element={<Users/>}/> 
      <Route path="products" element={<Products/>}/>
      <Route path="orders" element={<Orders/>}/>
    </Route>
    </Routes>
    <footer>
      This is footer
    </footer>
    </BrowserRouter>
    </div>

  );
}

export default App;
