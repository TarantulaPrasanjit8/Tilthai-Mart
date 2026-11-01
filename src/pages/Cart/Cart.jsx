import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import {useCart} from '../../context/StoreContext';
import { useAuth } from "../../context/AuthContext";

export const deliveryFee = 2;

const Cart = () => {
  const {
    getAllProducts,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  } = useCart();
  // total quantity of the selected items
  const totalQuantity = getTotalQuantity();
  // all products
  const [products, setProducts] = useState([]);

  // authentication checks
  const {user} = useAuth();

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
      
    };
    fetchAllProducts();
  }, [getAllProducts]);

  // navigate to the order page
  const navigate = useNavigate();

  // keys of selected items in the cart
  const selectedItemQuantities = Object.entries(cartItems).reduce((acc, [key, item]) => {
    if (item.quantity > 0 && key !== 'totalPrice') {
      acc[key] = item.quantity;
    }
    return acc;
  }, {});
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title cart-heading">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {!user? 
        <p className="NoItems">Please Login to access your cart</p> :
        totalQuantity === 0 ? (
          <p className="NoItems">No Items in cart</p>
        ) : (
          products.map((item, index) => {
            if (selectedItemQuantities[item.id] > 0) {
              return (
                <React.Fragment key={item.id}>
                  <div
                    className="cart-items-title cart-items-item"
                    key={item.id}
                  >
                    <img src={item.image_url} alt="food img" />
                    <p>{item.product_name}</p>
                    <p>₹{item.price}</p>
                    <p>{selectedItemQuantities[item.id]}</p>
                    <p>₹{item.price * selectedItemQuantities[item.id]}</p>
                    <p
                      className="Remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <img
                        src={assets.remove_icon_cross}
                        alt="remove_icon_cross"
                      />
                    </p>
                  </div>
                  <hr key={`hr-${item.id}-${index}`} />
                </React.Fragment>
              );
            }
          })
        )}
      </div>
      {!user ? <></> :
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Free</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryFee}
              </b>
            </div>
          </div>
          <button
            disabled={getTotalCartAmount() === 0}
            onClick={() => navigate("/order")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default Cart;
