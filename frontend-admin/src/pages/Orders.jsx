import { useCallback, useEffect, useState } from "react";
import { getOrders, setOrderStatus, errMsg } from "../api";




export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const load = useCallback(async () => {
    try { setOrders((await getOrders()).data); setError(""); }
    catch (e) { setError(errMsg(e)); }
    finally { setLoading(false); }
  }, []);

  useEffect( () => { load(); const t = setInterval(load, 5000); return () => clearInterval(t); }, [load]);

 
  // 1. First-time loading state
  if (loading && orders.length === 0) {
    return <div>Loading orders...</div>;
  }

  // 2. Error fallback
  if (error) {
    return <div style={{ color: 'red' }}>Error fetching orders: {error}</div>;
  }

   const new_orders = Object.values(orders);
  //  console.log(new_orders)

  // filtering order based on status
   const filteredOrders = new_orders[0].filter((order) => {
    // 1. Status Filter Matching
    if (statusFilter !== 'all' && order.orderStatus !== statusFilter) {
      return false;
    }
    
    return true;
  });

  const change = async (id, status) => {
    if (status === "cancelled" && !window.confirm("Cancel this order?")) return;
    setBusyId(id);
    try {
      const { data } = await setOrderStatus(id, status);
      // setOrders((list) => list.map((o) => (o._id === id ? { ...o, ...data, status } : o)));
    } catch (e) { setError(errMsg(e)); }
    finally { setBusyId(null); }
  };

  return (
    <>
      <header className="head"><h2>Orders</h2><button className="btn ghost" onClick={load}>Refresh</button></header>
      {error && <p className="error">{error}</p>}
      {loading && <p className="muted">Loading orders...</p>}
      <div className="list">
        <h2>Live Orders</h2>
        <div className="status-filter-bar">
        <button 
          className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          All Orders ({new_orders[0].length})
        </button>
        <button 
          className={`status-tab ${statusFilter === 'accepted' ? 'active-accepted' : ''}`}
          onClick={() => setStatusFilter('accepted')}
        >
          Accepted
        </button>
        <button 
          className={`status-tab ${statusFilter === 'done' ? 'active-done' : ''}`}
          onClick={() => setStatusFilter('done')}
        >
          New Orders
        </button>
        <button 
          className={`status-tab ${statusFilter === 'delivered' ? 'active-delivered' : ''}`}
          onClick={() => setStatusFilter('delivered')}
        >
          Delivered
        </button>
        <button 
          className={`status-tab ${statusFilter === 'cancelled' ? 'active-cancelled' : ''}`}
          onClick={() => setStatusFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>
        
        {/* Check if the array exists and has items */}
        {!new_orders || new_orders[0].length === 0 ? (
          <p>No orders to display yet. Waiting for data...</p>
        ) : 
      
        (<div className="list">
          {filteredOrders.map((o) => (
            <article className="order-card" key={o.order_id}>
              <div className="row order-header">
                <div>
                  <h3 className="order-title">#{o.user_id} - {o.users['full_name']} <span className="meta-label font-space">Status:</span> <span className="meta-value">{o.orderStatus}</span></h3>
                  <div className="meta-row">
                    <span className="meta-label">Date:</span> <span className="meta-value">{o.orderTime.split('T')[0]}</span>
                    <span className="meta-label font-space">Time:</span> <span className="meta-value">{o.orderTime.split('T')[1].replace('Z', '')}</span>
                  </div>
                  <p className="muted">{o.address} {o.users['full_name'] && `- ${o.users['phone_number']}`}</p>
                </div>
                <strong className="order-price">Rs {o.orderTotalPrice}</strong>
              </div>
              <ul className="items-box">
                {o.items?.map((it, i) => 
                <li key={i} className="receipt-item">
                  <div className="item-details">
                    <span className="product-name">{it.product['product_name']}</span>
                    <span className="merchant-name">{it.product['marchant_name']}</span> 
                  </div>
                  <span className="qnty-price">{it.quantity} x {it.price_at_purchage}</span>
                </li>)}
              </ul>
              {/* <Progress status={o.status} /> */}
              <div className="order-actions">
                <button className="btn btn-accept" disabled={busyId === o.order_id || o.orderStatus !== "done"}
                  onClick={() => change(o.order_id, "accepted")}>Accept order</button>
                <button className="btn good" disabled={busyId === o.order_id || o.orderStatus !== "accepted"}
                  onClick={() => change(o.order_id, "delivered")}>Mark delivered</button>
                <button className="btn btn-cancel" disabled={busyId === o.order_id || !["done", "accepted"].includes(o.orderStatus)}
                  onClick={() => change(o.order_id, "cancelled")}>Cancel order</button>
              </div>
            </article>
          ))}
        </div>)}
      </div>
    </>
  );
}
