import React, { useEffect, useState} from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useCart } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";

const FoodItem = ({ id, name, price, description, image, marchant_name, is_available }) => {
  const {cartItems, cart_items_new, addToCart, removeFromCartByOne} = useCart();
  const {isAuthenticated} = useAuth()
  const itemIds = Object.keys(cart_items_new).filter(key => key !== 'totalPrice');
  // console.log(cartItems);
  return (
    <div className="food-item" itemScope itemType="https://schema.org">
    {is_available ? (
      <div className="food-item-img-container ">
        <span className="food-badge">f</span>
        <img 
        src={image} 
        alt={`${name} from ${marchant_name} available in Dharmanagar`} 
        className="food-item-img" 
        itemProp="image" 

        />
        {isAuthenticated? !itemIds.includes(id) ? (
          <img
            src={assets.add_icon_white}
            alt="add_icon_white"
            className="add"
            onClick={() => addToCart(id, price)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="remove_icon_red"
              onClick={() => removeFromCartByOne(id, price)}
            />
            <p>{cart_items_new[id]?.quantity || 0}</p>
            <img
              src={assets.add_icon_green}
              alt="add_icon_green"
              onClick={() => addToCart(id, price)}
            />
          </div>
        ) : <img
            src={assets.add_icon_white}
            alt="add_icon_white"
            className="add"
            onClick={() => window.alert('Please login to make an order')}
          />
        }
      </div>
    ): 
    <div className="food-item-img-container disabled-div">
      <img src={image} 
        alt={`${name} - Out of stock`} 
        className="food-item-img" 
      />
      <img
          src={assets.add_icon_white}
          alt="add_icon_white"
          className="add"
        />
    </div>
    }
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <p className="food-item-rating" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <span itemProp="ratingValue" content="4.5">⭐ 4.5</span>
            {/* <span itemProp="reviewCount" content="24"> (24)</span> */}
          </p>
          {/* <img src={assets.rating_starts} className="rating-chip" alt="rating_starts" /> */}
        </div>
        <p className="item-marchant" itemProp="provider"><span>🛍️ {marchant_name}</span> <br/>Dharmanagar<br/>Panisagar</p>
        <p className="food-item-price" itemProp="offers" itemScope itemType="https://schema.org">
          <span itemProp="priceCurrency" content="INR">Rs. </span>
          <span itemProp="price" content={price}>{price}</span>
          <link itemProp="availability" href={is_available ? "https://schema.org" : "https://schema.org"} />
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
