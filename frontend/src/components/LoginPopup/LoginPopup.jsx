import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpiner/LoadingSpiner";

const LoginPopup = ({ setShowLogin}) => {
  const [currentState, setCurrentState] = useState("Login");
  const [loginSignUpData, setLoginSignUpData] = useState({full_name: "",username: "", phone: "", password: ""});
  const [message, setMessage]= useState('');
  const redirectPage = useNavigate();
  const [loging, setLoging] = useState(false);
  const {isAuthenticated, login} = useAuth();


  // closing the login popup while cliking outside the popup

  const handleClose =(e) =>{
    if(e.target.className === 'login-popup'){
      setShowLogin(false);
    }
  }
  // preventing the popup from closing when clicking inside the popup
  const handleOnPopupClick = (e) => {
    e.stopPropagation();
  }

  // sign up function using axios
  const handleSignUp = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('https://tilthai-mart.onrender.com/api/auth/user/register', 
        {
          full_name: loginSignUpData.full_name, 
          username: loginSignUpData.username, 
          phone: loginSignUpData.phone, 
          password: loginSignUpData.password
        }, 
        {withCredentials: true});

      if(res.data.message){
        setMessage(res.data.message);
        // console.log(res.data.message);
        setLoginSignUpData({})
        
      }else{
        setMessage('Something went wrong!');
      }
      
    }catch(err){
      // console.log(err.response.data.message);
      setMessage(err.response.data.message);
      setLoginSignUpData({})
    }
  }

  // handle login 
  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
      // sending login request using axios
      setLoging(true);
      const res = await login({username: loginSignUpData.username, password: loginSignUpData.password})
      // console.log(res);
      if(res){
        setMessage('Login successful');
        setLoging(false);
        // setShowLogin(false);
      }else{
        setMessage('Login failed! Wrong Credentials.');
        setLoging(false);
        redirectPage('/')
      }
    
  }catch(err){
    console.log(err);
    setMessage('An error occurred during login');
    setLoging(false);
  }
}
  return (
    <>
    <div className="login-popup" onClick={handleClose}>
      <form className="login-popup-container" onClick={handleOnPopupClick}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            onClick={() => setShowLogin(false)}
          />
        </div>

        {!isAuthenticated? (<>
        <div className="login-popup-inputs">
          {currentState == 'Login' ? (
            <p name="login-msg">{message}</p>
          ) : (
            <>
            <p name="login-msg">{message}</p>
            <input type="text" placeholder="Your name" value={loginSignUpData.full_name ? loginSignUpData.full_name : ''} onChange={(e)=>{setLoginSignUpData({...loginSignUpData, full_name: e.target.value})}} required />

            <input type="text" placeholder="Phone number" value={loginSignUpData.phone ? loginSignUpData.phone : ''} onChange={(e)=>{setLoginSignUpData({...loginSignUpData, phone: e.target.value})}} required />
            </>
          )}
          <input type="email" placeholder="Your email" value={loginSignUpData.username ? loginSignUpData.username : ''} required onChange={(e)=>{setLoginSignUpData({...loginSignUpData, username: e.target.value})}}/>

          <input type="password" placeholder="Password" value={loginSignUpData.password ? loginSignUpData.password : ''} required onChange={(e)=>{setLoginSignUpData({...loginSignUpData, password: e.target.value})}}/>
        </div>
        {loging ? (
          <div className="login-spiner">
            <LoadingSpinner/>
          </div>
        ) : (<></>)}
        <button onClick={currentState ==="Sign up"? handleSignUp : handleLogin}>
          {currentState === "Sign up" ? "Create Account" : "Login"}
        </button>

        {currentState === "Sign up" ? (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        ) : (
          <></>
        )}

        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )} </>)
        : 
        (<div className="login-success">
           {/* <!-- Circle with the right mark --> */}
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          
          {/* <!-- Text content --> */}
          <div className="success-content">
            <h3>Login Successful</h3>
            <p>Welcome back!</p>
          </div>
        </div>)}
      </form>
    </div>
    </>
  );
};

export default LoginPopup;
