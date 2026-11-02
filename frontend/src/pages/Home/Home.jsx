import React, { useState } from "react";
import { Helmet } from "react-helmet-async";


import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import SearchSuggestion from "../../components/SearchSuggestion/SearchSuggestion";

const Home = () => {
  const [menuCategory, setMenuCategory] = useState("All");

  // SEO Schema
  const ultimateMartSchema = {
    "@context": "https://schema.org",
    "@type": ["FoodDeliveryService", "GroceryService"],
    "@id": "https://tilthaimart.com",
    "name": "Tilthaimart",
    "alternateName": [
      "Tilthai Mart", 
      "Tilthai Food Delivery Mart", 
      "Tilthai Online Grocery & Food Delivery Mart"
    ],
    "slogan": "Your Ultimate Online Food, Grocery, and Delivery Mart in North Tripura",
    "url": "https://tilthaimart.com",
    "logo": "URL_TO_YOUR_LOGO",
    "image": "URL_TO_A_PROMINENT_STOREFRONT_OR_BRAND_IMAGE",
    "description": "Tilthaimart is the highest-rated local digital mart providing lightning-fast restaurant food delivery and daily essential grocery delivery services across Dharmanagar, Panisagar, and North Tripura.",
    "keywords": "mart, food delivery, grocery delivery, online mart, order food Dharmanagar, grocery mart Panisagar, online grocery shop North Tripura",
    "telephone": "+91-8787888957",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dharmanagar",
      "addressRegion": "Tripura",
      "addressCountry": "IN",
      "postalCode": "799250"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Dharmanagar",
        "sameAs": "https://wikipedia.org"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Panisagar",
        "sameAs": "https://wikipedia.org"
      },
      {
        "@type": "AdministrativeArea",
        "name": "North Tripura",
        "sameAs": "https://wikipedia.org"
      }
    ],
    "provider": {
      "@type": "LocalBusiness",
      "name": "Tilthai Mart Hub",
      "description": "Central hub for local marketplace, food, and grocery inventory distribution."
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tilthaimart Delivery Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Online Food Delivery Mart",
            "description": "Hot food delivery from top local restaurants and kitchens in Dharmanagar, Panisagar, and North Tripura."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Online Grocery Mart Delivery",
            "description": "Supermarket grocery shopping, fresh vegetables, snacks, and daily essentials delivered to your doorstep."
          }
        }
      ]
    }
  };


  return (
    <div>
      <Helmet>
        <title>Online Food Delivery in Dharmanagar & Panisagar | Tilthaimart</title>
        <meta name="description" content="Order fresh food online from your favourite local restaurants in Dharmanagar, Panisagar, and North Tripura. Fast doorstep delivery!" />
        <meta name="keywords" content="food delivery Dharmanagar, order food online Panisagar, North Tripura restaurants, Tilthaimart" />
        <script type="application/ld+json">
          {JSON.stringify(ultimateMartSchema)}
        </script>
      </Helmet>

      <SearchSuggestion/>
      <Header/>
      <ExploreMenu menuCategory={menuCategory} setMenuCategory={setMenuCategory} />
      <FoodDisplay category={menuCategory} />
    </div>
  );
};

export default Home;
