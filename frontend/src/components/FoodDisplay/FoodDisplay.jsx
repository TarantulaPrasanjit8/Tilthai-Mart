import React, { useEffect, useState } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import axios from 'axios';
import { useCart } from "../../context/StoreContext";

const FoodDisplay = ({ category }) => {
  const {onSearched} = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching products from the backend server
  useEffect(() =>{
    const fetchProducts = async () => {
      try{
        setLoading(true);
        const res = await axios.get("https://api.tilthaimart.in//api/products/all-products");
        setProducts(res.data.allProducts);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    }
    fetchProducts();
}, []);
  // cons
  if (loading) return <p>Loading products...</p>;

  return (
    <div className="food-display" id="food-display">
      <section className="food-display" id="food-display" aria-label="Local Food Items">
        <h2 className="visual-hidden-but-readable-by-seo">
          Fresh Menu Items Available for Delivery in North Tripura
        </h2>
        <div className="food-display-list">
          {onSearched? 
          (products.filter(product => {
              return product.product_name.toLowerCase().startsWith(onSearched.toLowerCase());
            })
            .map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item.id}
                  name={item.product_name}
                  description={item.description}
                  price={item.price}
                  image={item.image_url}
                  is_available = {item.is_available}
                  marchant_name = {item.marchant_name}
                />
              );
            }
          })) : 
          
          (products.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item.id}
                  name={item.product_name}
                  description={item.description}
                  price={item.price}
                  image={item.image_url}
                  is_available = {item.is_available}
                  marchant_name = {item.marchant_name}
                />
              );
            }
          } ))}
        </div>
      </section>
    </div>
  );
};

export default FoodDisplay;
