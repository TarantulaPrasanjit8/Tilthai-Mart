import React, { useState, useEffect } from 'react';
import './MyOrders.css'; // Importing the core CSS file
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpiner/LoadingSpiner';
export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [my_order, setMyOrder] = useState(null);
  const {isAuthenticated} = useAuth();

  useEffect(()=>{
    const fetch_my_orders = async()=>{
      try{
        const my_orders = await axios.get(`http://localhost:5000/api/orders/user/my-orders`, {withCredentials: true})
        if(!my_orders){
          <p>Error to load my orders</p>
        }else{
          setLoading(false);
          setMyOrder(my_orders.data.my_orders);
        }
      }catch(err){
        setMyOrder(null);
        setLoading(true);
      }
    }
    if(isAuthenticated){
      fetch_my_orders()
    }
    
  }, []);

  if(loading) return <LoadingSpinner/>;

  const filteredOrders = my_order.filter(order => {
    if (activeTab === "All") return true;
    return order.status === activeTab;
  });
  
  return (
    <div className="orders-page-wrapper">
      <div className="orders-container">
        
        {/* Header section */}
        <header className="orders-header">
          <h1>My Orders</h1>
          <p>Check the status of recent orders, manage returns, and view receipts.</p>
        </header>

        {/* Tab Filters */}
        <div className="tabs-navigation">
          {["All", "Processing", "Delivered", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Stack */}
        <main className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p>No orders found in this category.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <article key={order.id} className="order-card">
                
                {/* Meta Summary Row */}
                <div className="order-meta-bar">
                  <div className="meta-col">
                    <span className="meta-label">Order ID</span>
                    <span className="meta-value order-id-font">TM-ORD-2026-{order.id}</span>
                  </div>
                  <div className="meta-col">
                    <span className="meta-label">Date Placed</span>
                    <span className="meta-value">{order.placed_at.replace("T", " ").split(' ')[0]}</span>
                  </div>
                  <div className="meta-col">
                    <span className="meta-label">Total Amount</span>
                    <span className="meta-value total-price-text">${order.total_price}</span>
                  </div>
                  <div className="meta-col status-alignment">
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status === 'done'? "Processing" : order.status}
                    </span>
                    <spna className="pay-method">{order.payment_method}</spna>
                  </div>
                </div>

                {/* Card Items Stack */}
                <div className="order-items-container">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="item-row">
                      <div className="item-details-group">
                        <img src={item.product['image_url']} alt={item.product['product_name']} className="item-thumbnail" />
                        <div className="item-text-info">
                          <h4 className="item-title">{item.product['product_name']}</h4>
                          <p className="item-quantity">Qty: <span>{item.quantity}</span></p>
                        </div>
                      </div>
                      <div className="item-pricing-group">
                        <p className="item-total-cost">${(item.price_at_purchage * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="item-unit-cost">${item.price_at_purchage} each</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer Actions */}
                <footer className="order-footer">
                  <span className="system-timestamp">System Time: {order.placed_at}</span>
                </footer>

              </article>
            ))
          )}
        </main>

      </div>
    </div>
  );
}