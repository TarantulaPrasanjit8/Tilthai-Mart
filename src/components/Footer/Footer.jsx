import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="footer-logo" src={assets.logo2} alt="logo" />
          <p>
            Tilthai Mart | The Ultimate Food, Grocery & Daily Essentials Delivery in Dharmanagar & Panisagar
<br/>
            Looking for the fastest, most reliable way to get your daily essentials in North Tripura? Welcome to Tilthai Mart, your premier local delivery app bringing everything you need straight to your doorstep.
            From piping hot restaurant meals to farm-fresh greens, monthly groceries, and daily household items, we bridge the gap between local vendors and your home. We proudly serve residents across the entire Dharmanagar and Panisagar regions with absolute speed, hygiene, and convenience.
            
<br/>
<br/>
            What You Can Order on Tilthai Mart
<br/>

            🍔 Hot & Delicious Cooked Food Delivery
<br/>
            Craving your favorite biryani, local fast food, or a comforting traditional meal? Tilthai Mart partners with the top-rated restaurants and local kitchens across Dharmanagar and Panisagar. Browse diverse menus, order in a few clicks, and enjoy fresh, hot food delivered directly to your dining table.
<br/>
            🥬 Farm-Fresh Vegetables & Seasonal Fruits
<br/>
            Skip the crowded bazar lines. We source our vegetables and fruits directly from local farmers in North Tripura daily. Get crisp potatoes, onions, fresh green chilies, leafy vegetables, and seasonal fruits handpicked for quality and delivered straight to your kitchen.
<br/>
            🥩 Premium Grocery & Raw Food Items (Meat & Fish)
<br/>
            Planning a special Sunday feast? Use Tilthai Mart to order fresh raw chicken, mutton, and high-quality fish. Everything is sourced hygienically, cleaned professionally, and delivered in temperature-controlled packaging. Plus, stock up your pantry with our comprehensive grocery list—including rice, pulses, cooking oils, premium spices, and packaged snacks.
<br/>
            🧼 Miscellaneous Household Essentials
<br/>
            From baby care products and personal hygiene items to dishwashing bars and sudden home necessities, our miscellaneous catalog ensures you never run out of the small but crucial things that keep your home running smoothly.
<br/>
            Proudly Serving Our North Tripura Communities
<br/>
            We know the local routes of North Tripura like the back of our hand. Our dedicated delivery network covers major hubs and residential areas seamlessly:
            • Dharmanagar: Serving Kalibari Road, Station Road, DNV Road, Chandrapur, and surrounding neighborhoods.
            • Panisagar: Prompt delivery covering the main market areas, institutional zones, and nearby residential sectors.
<br/>
            Why Choose Tilthai Mart?
<br/>
            • Super Fast Local Delivery: Our fleet is optimized to ensure your items reach you while the food is hot and the vegetables are fresh.<br/>
            • Hygienic Handling Guaranteed: We enforce strict safety guidelines for packaging raw meats, cooked food, and grocery packages separately.<br/>
            • Supporting Local Vendors: Every order you place on Tilthai Mart empowers local markets, farmers, and restaurants in Dharmanagar and Panisagar.<br/>
            • Seamless Ordering: Designed with a smooth frontend interface that makes adding items to your cart and checking out effortless.
<br/>
            Say Goodbye to Market Traffic. Download Tilthai Mart & Place Your First Order Today!

          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com" target="_">
              <img src={assets.facebook_icon} alt="facebook" />
            </a>
            <a href="https://www.twitter.com" target="_">
              <img src={assets.twitter_icon} alt="twitter" />
            </a>
            <a href="https://www.linkedin.com" target="_">
              <img src={assets.linkedin_icon} alt="linkedin" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>OUR SERVICE AREAS</h2>
          <ul>
            <li>Food Delivery in Dharmanagar</li>
            <li>Food Delivery in Panisagar</li>
            <li>Online Order in North Tripura</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-8787888957</li>
            <li>contact@tomato.com</li>
            <li style={{fontSize: '12px', color: '#bbb'}}>Hub: Near Motor Stand, Dharmanagar, North Tripura</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026 © Tilthaimart.com</p>
    </footer>
  );
};

export default Footer;
