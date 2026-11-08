import React, {useEffect} from "react";
import "./PlaceOrder.css";
import { deliveryFee } from "../Cart/Cart";
import { useNavigate } from "react-router-dom";
import {useCart} from '../../context/StoreContext';
import OrderPopup from '../../components/OrderPopup/OrderPopup';
import { useState } from "react";
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, setCartItems } = useCart();
  const {isAuthenticated, user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  // Scroll to the top when the component mounts
  window.scrollTo(0, 0);
}, []);

  /**
   * Zipcode validation check
   */
  const zipcodeList = ["799260", "799250"];
  const [zipcode, setZipcode] = useState("")
  const [isZipcodeValid, setIsZipcodeValid] = useState(true);

  const [address, setAddress] = useState({street: "", state: "tripura", city:"", zipcode: "", country: "india", landmark: "", phone: ""})

  // handles zipcode entry
  const handleInputChange = (e) => {
    setZipcode(e.target.value);
  }

  // handle zipcode validation
  const postalValidation = (e)=>{
    const zipvalue = e.target.value;

    if(zipvalue.length < 6){
      setIsZipcodeValid(false);
    } else {
        if(zipcodeList.includes(zipvalue)){
          // set zipcode
          setZipcode(zipvalue);
          setIsZipcodeValid(true);
          setAddress(prevAddress => ({
            ...prevAddress,
            zipcode: zipcode
          }))
        } else{
          setIsZipcodeValid(false);
          setZipcode("")
          setAddress(prevAddress => ({
            ...prevAddress,
            zipcode: ""
          }))
        }
    }
  }

  /**
   * place order function using axios
   * axios
   * order cart
   * item details by id
   */


  // order placement and order data formation 
  // items data
  const itemsData = Object.entries(cartItems).filter(([key]) => key !=="totalPrice").map(([id, details]) => (
    
      {
        
        product_id: Number(id),
        quantity: details.quantity,
        price_at_purchage: details.price / details.quantity
  
      }
  ));
  // console.log(itemsData)
  const orderData = {
    total_price: cartItems.totalPrice,
    placed_at : new Date().toISOString().replace('T', ' ').replace('Z', ' +00:00'),
    status: 'Success',
    itemsData:  itemsData
  }

  // console.log(orderData)

  const [orderStatus, setOrderStatus] = useState('idle');
  const proceedOrder = async (e)=>{
    setOrderStatus('processing');
    e.preventDefault()
    try{
      const res = await axios.post("https://api.tilthaimart.in/api/orders/user/create-order", orderData, {withCredentials: true});
      console.log(res.data)
      if(res.data.order_id){
        setCartItems({})
        console.log(res.data)
        setOrderStatus('success');
      } else {
        setOrderStatus('error');
      }
    }catch(err){
      setOrderStatus('error');
      console.log(`response from backend ${err}`)
    }
  };

  const handleRedirectHome = () => {
    setOrderStatus('idle'); // Clear modal state
    localStorage.clear('cartItems');
    navigate('/');          // Redirect user to home page routing route
  };

  if(!isAuthenticated){
    return navigate('/');
  }

  return (
    <>
    {isAuthenticated? (
      <div className="po-page">
      <div className="po-head">
        <button type="button" className="GoBack" onClick={() => navigate("/cart")}>
          ← Back to cart
        </button>
        <h1>Checkout</h1>
      </div>

      <form className="place-order" onSubmit={(e)=>{proceedOrder(e)}}>
        <div className="place-order-left">
          <h2 className="title">Delivery information</h2>

          <label className="field">
            <span>Street</span>
            <input type="text" placeholder="Street" onChange={(e)=>{setAddress({...address, street: e.target.value})}}/>
          </label>

          <div className="multi-fields">
            <label className="field">
              <span>City</span>
              <input type="text" placeholder="City" onChange={(e)=>{setAddress({...address, city: e.target.value})}}/>
            </label>
            <label className="field">
              <span>State</span>
              <input type="text" placeholder="State" value="Tripura" readOnly />
            </label>
          </div>

          <div className="multi-fields">
            <label className="field">
              <span>Zip code</span>
              <input type="text" placeholder="Zip Code"  onChange={handleInputChange} onBlur={(e)=>{postalValidation(e)}} value={zipcode} style={{color: isZipcodeValid? "green" : "red"}}/>
            </label>
            <label className="field">
              <span>Country</span>
              <input type="text" placeholder="Country" value="India" readOnly />
            </label>
          </div>
          <p className={`zipcode-validation ${isZipcodeValid ? "valid" : "invalid"}`} style={{color: isZipcodeValid ? "green" : "red", display: isZipcodeValid ? "none" : "block"}}>
            {isZipcodeValid ? " " : "Invalid Zipcode"}
          </p>

          <label className="field">
            <span>Landmark</span>
            <input type="text" placeholder="Landmark" onChange={(e)=>{setAddress({...address, landmark: e.target.value})}}/>
          </label>
          <label className="field">
            <span>Phone</span>
            <input type="text" placeholder="Phone" onChange={(e)=>{setAddress({...address, phone: e.target.value})}} required/>
          </label>
        </div>

        <div className="place-order-right">
          <div className="po-summary">
            <h2 className="title">Order summary</h2>
            <div className="po-rows">
              <div className="po-row">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <div className="po-row">
                <p>Delivery fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
              </div>
              <div className="po-row po-grand">
                <b>Total</b>
                <b>
                  ₹
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + deliveryFee}
                </b>
              </div>
            </div>
            <button type="submit" disabled={getTotalCartAmount() === 0}>
              Place order
            </button>
          </div>
          {/* Render the structural overlay component */}
        <OrderPopup
          status={orderStatus} 
          onClose={() => setOrderStatus('idle')} 
          onRedirect={handleRedirectHome} 
        />
        </div>
      </form>
    </div> ) : <></>}
    </>
  );
};

export default PlaceOrder;
