import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import {useCart} from '../../context/StoreContext';
import { useAuth } from "../../context/AuthContext";

export const deliveryFee = 30;

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
        <div className="cart-page-head">
          <h1>Your cart</h1>
          {user && totalQuantity > 0 && (
            <span className="cart-count">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        <div className="cart-items-title cart-heading">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {!user? 
        <p className="NoItems">Please Login to access your cart</p> :
        totalQuantity === 0 ? (
          <p className="NoItems">No Items in cart</p>
        ) : (
          products.map((item) => {
            if (selectedItemQuantities[item.id] > 0) {
              return (
                <div
                  className="cart-items-title cart-items-item"
                  key={item.id}
                >
                  <img
                    className="cart-item-img"
                    src={item.image_url}
                    alt={item.product_name}
                  />
                  <p className="cart-item-name">{item.product_name}</p>
                  <p className="cart-item-price">₹{item.price}</p>
                  <p className="cart-item-qty">{selectedItemQuantities[item.id]}</p>
                  <p className="cart-item-total">
                    ₹{item.price * selectedItemQuantities[item.id]}
                  </p>
                  <button
                    type="button"
                    className="Remove"
                    aria-label={`Remove ${item.product_name} from cart`}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <img
                      src={assets.remove_icon_cross}
                      alt=""
                    />
                  </button>
                </div>
              );
            }
          })
        )}
      </div>
      {!user ? <></> :
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Order summary</h2>
          <div className="cart-total-rows">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
            </div>
            <div className="cart-total-details cart-grand-total">
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
            Proceed to checkout
          </button>
        </div>
        {/* <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div> */}
      </div>
      }
    </div>
  );
};

export default Cart;
