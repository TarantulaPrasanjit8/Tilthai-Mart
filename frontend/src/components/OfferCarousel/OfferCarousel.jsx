import React, { useState, useEffect, useRef } from 'react';
import './OfferCarousel.css';
import { assets } from '../../assets/assets';

const BANNERS = [
  {
    id: 1,
    badge: 'DIWALI SPECIAL • 3 DAYS ONLY',
    title: 'Festival of Lights Feast in Dharmanagar & Panisagar 🪔',
    discount: 'FLAT 40% OFF',
    tags: 'Valid across all premium local sweets & family restaurants',
    bgGradient: 'linear-gradient(135deg, #e65c00, #F9D423)', // Festive Marigold Orange
    image: assets.diwaliFeast || '🪔'
  },
  {
    id: 2,
    badge: 'GRAND NEW LAUNCH',
    title: 'Tilthai Mart is Now Live in Panisagar & Dharmanagar! 🚀',
    discount: 'ORDER NOW',
    tags: 'Order cooked food, groceries, & fresh farm items instantly',
    bgGradient: 'linear-gradient(135deg, #1f5f43, #0f1813)', // Tilthai Forest Green
    image: assets.appLaunch || '🛵'
  },
  {
    id: 3,
    badge: 'FRESH FARM PRODUCE',
    title: 'Online Vegetable Market Dharmanagar 🥬',
    discount: 'UP TO 30% OFF',
    tags: 'Handpicked crisp green veggies, potatoes & seasonal fruits',
    bgGradient: 'linear-gradient(135deg, #11998e, #38ef7d)', // Crisp Veggie Green
    image: assets.freshVeg || '🥗'
  },
  {
    id: 4,
    badge: 'DAILY FRESH CUTS',
    title: 'Hygienic Raw Meat & Fish Delivery 🥩',
    discount: 'FRESH CHICKEN, PORK, MUTTON & FISH',
    tags: 'Cleaned professionally, cold-packaged, delivered within hours',
    bgGradient: 'linear-gradient(135deg, #bf1919, #660000)', // Butcher Crimson
    image: assets.rawMeat || '🍗'
  },
  {
    id: 5,
    badge: 'PANTRY STAPLES',
    title: 'Monthly Grocery Delivery in Panisagar 🛒',
    discount: 'BEST WHOLESALE RATES',
    tags: 'Super savings on rice, cooking oils, pulses, and household products',
    bgGradient: 'linear-gradient(135deg, #2193b0, #6dd5ed)', // Electric Blue Staples
    image: assets.groceries || '🛍️'
  },
  {
    id: 6,
    badge: 'ANNOUNCEMENT',
    title: 'Craving Fast Food or Local Bengali Cuisine? 🍛🍚',
    discount: 'HOT RESTAURANT FOOD DELIVERED',
    tags: 'Partnered with top-rated kitchens across North Tripura',
    bgGradient: 'linear-gradient(135deg, #FF416C, #ffc62b)', // Foodie Red
    image: assets.cookedFood || '🍛'
  }
];

export default function OfferCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  // Setup auto-sliding behavior similar to Swiggy homepage banners
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(nextSlide, 3500);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isPaused]);

  return (
    <div 
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Structural Slider Window Frame */}
      <div className="carousel-viewport">
        <div 
          className="carousel-track" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {BANNERS.map((banner) => (
            <div key={banner.id} className="carousel-slide-item">
              <div 
                className="banner-card" 
                style={{ background: banner.bgGradient }}
              >
                {/* Left Side Copywriting Details */}
                <div className="banner-content">
                  <span className="banner-badge">SPECIAL OFFER</span>
                  <h2 className="banner-title">{banner.title}</h2>
                  <h1 className="banner-discount">{banner.discount}</h1>
                  <div className="banner-code-wrapper">
                    <span className="banner-code">{banner.code}</span>
                  </div>
                  <p className="banner-tags">{banner.tags}</p>
                </div>

                {/* Right Side Visual Focal Element */}
                <div className="banner-graphic">
                  {typeof banner.image === 'string' ? (
                    <span role="img" aria-label="promo-icon">{banner.image}</span>
                  ) : (
                    <img 
                      src={banner.image} 
                      alt={banner.title} 
                      loading="lazy" 
                      className="banner-real-img"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <button className="carousel-btn btn-left" onClick={prevSlide} aria-label="Previous Offer">
        &#10094;
      </button>
      <button className="carousel-btn btn-right" onClick={nextSlide} aria-label="Next Offer">
        &#10095;
      </button>

      {/* Pagination Carousel Indicator Dots */}
      <div className="carousel-dots">
        {BANNERS.map((_, index) => (
          <span 
            key={index}
            className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
