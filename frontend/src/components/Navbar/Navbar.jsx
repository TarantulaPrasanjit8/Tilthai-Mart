import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useCart} from '../../context/StoreContext';
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ setShowLogin }) => {
  const {getTotalQuantity} = useCart();
  const totalQuantity = getTotalQuantity();
  const {isAuthenticated, logout} = useAuth()

  const [menu, setMenu] = useState("home");

  // handles logout session
  const handleLogout = async ()=>{
    try{
      const res = await logout();
      if(!res){
        return;
      }else{
        window.alert('You are Logged out!')
      }
      
    }catch(err){
      console.log("Something went wrong")
    }
  }

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo2} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      {/* search and sign in sign out button */}
      <div className="navbar-right">
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>
          <div className={!isAuthenticated || totalQuantity === 0 ? "dotHidden" : "dot"}>
            <p>{totalQuantity}</p>
          </div>
        </div>
        {isAuthenticated ? (
          <>
            <button onClick={()=>  handleLogout()}>Logout</button>
            <Link to='/my-orders'>
              <button onClick={()=> setMenu("")}>My Order</button>
            </Link>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
