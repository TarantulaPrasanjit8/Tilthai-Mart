import React from "react";
import "./Header.css";
import OfferCarousel from "../OfferCarousel/OfferCarousel";

const Header = () => {
  return (
    <header>
      <div className="header-contents">
        <OfferCarousel/>
      </div>
    </header>
  );
};

export default Header;
