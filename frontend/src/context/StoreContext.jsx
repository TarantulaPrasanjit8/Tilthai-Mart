import { createContext, useEffect, useState, useContext  } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);

export const StoreContextProvider = ({children}) => {


  const [cartItems, setCartItems] = useState(()=>{

    // storing cart items on local storage
    const storeCartItems = localStorage.getItem("cartItems");
    if(storeCartItems && storeCartItems !== "undefined"){
      try{
        return JSON.parse(storeCartItems);
      }catch(err){
        console.log("Error parsing cartItems from localStorage:", err);
        return {};
      }
    }
    return {};
  });
  
  // search instance to set filter using search bar
  const [onSearched, setOnSearched] = useState("");
  
  const cart_items_new = cartItems;
  useEffect(()=>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // get all  the products
  const getAllProducts = async () => {
    try{
      const res = await axios.get("http://localhost:5000/api/products/all-products");
      return res.data.allProducts;
    }catch(err){
      console.log(err);
    }
  }

  // add item to cart
  const addToCart = (itemId, price) => {
    setCartItems((prevCartItems) => {
      const newCartItems = prevCartItems[itemId] || {quantity: 0, price: 0};

      return {
        ...prevCartItems,
        [itemId]: {
          quantity: newCartItems.quantity + 1,
          price: newCartItems.price + Number(price),
        },
        totalPrice: (prevCartItems.totalPrice || 0) + Number(price)
      }
    })
  };
  // remove item from cart
  const removeFromCartByOne = (itemId, price) => {
    setCartItems((prevCartItems)=> {
      const newCartItems = prevCartItems[itemId];
      if(!newCartItems) return prevCartItems;

      const nextTotalPrice = (prevCartItems.totalPrice || 0) - Number(price);

      const updatedCartItems = {...prevCartItems, totalPrice: nextTotalPrice};

       if (newCartItems.quantity <= 1) {
        // If quantity drops below 1, completely remove the item key safely
        delete updatedCartItems[itemId];
      } else {
        updatedCartItems[itemId] = {
          quantity: newCartItems.quantity - 1,
          price: newCartItems.price - Number(price),
        };
      }
      if(updatedCartItems.totalPrice == 0){
        delete updatedCartItems.totalPrice;
      }
      return updatedCartItems;
    }
    )
  };
  // remove item from cart completely
  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const newCartItems = prevCartItems[itemId];
      if (!newCartItems) return prevCartItems;
      const nextTotalPrice = (prevCartItems.totalPrice || 0) - newCartItems.price;
      const updatedCartItems = {...prevCartItems, totalPrice: nextTotalPrice};
      delete updatedCartItems[itemId];
      
      if(updatedCartItems.totalPrice == 0){
        delete updatedCartItems.totalPrice;
      }
      return updatedCartItems;
    })
  }
  // get the total quantity of the itmes in the cart
  const getTotalQuantity = () => {
    return Object.entries(cartItems).reduce((total, [key, value]) => {
      if (!isNaN(key) && key !== 'totalPrice') {
        return total + value.quantity;
      }
      return total;
    }, 0);
  };


  // get the total amount of the items in the cart
  const getTotalCartAmount = () => {
    return cartItems.totalPrice || 0;
  };
  

  const contextValue = {
    getAllProducts,
    cartItems,
    cart_items_new,
    setCartItems,
    onSearched,
    setOnSearched,
    addToCart,
    removeFromCartByOne,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useCart = () => {
  
  const context = useContext(StoreContext);
  
  // 💡 This will tell you exactly if a component is in the wrong place
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
}