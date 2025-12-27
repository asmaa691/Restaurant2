// Replace your current ManageOrders.js with this SIMPLER version:
import React, { useState, useEffect } from 'react';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // SIMPLE TEST - Try fetching directly
    console.log('TEST: Starting to fetch orders...');
    
    fetch("http://localhost:5000/orders")
      .then(res => {
        console.log('TEST: Got response, status:', res.status);
        return res.text(); // Use text() instead of json() to see raw response
      })
      .then(text => {
        console.log('TEST: Raw response text:', text);
        try {
          const data = JSON.parse(text);
          console.log('TEST: Parsed JSON:', data);
          setOrders(data);
        } catch (e) {
          console.error('TEST: Failed to parse JSON:', e);
          console.error('TEST: Raw text was:', text);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('TEST: Fetch failed:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="container pad">Loading orders... (check console F12)</p>;
  if (error) return <p className="container pad red">Error: {error}</p>;

  return (
    <section className="container pad">
      <h2 className="red">Manage Orders</h2>
      <p className="brown mb">Orders found: {orders.length}</p>

      {orders.length === 0 ? (
        <div>
          <p>No orders showing in table.</p>
          <p><strong>Please open Developer Tools (F12) → Console tab</strong></p>
          <p>Look for messages starting with "TEST:"</p>
          <p>Tell me what those messages say.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>${order.total}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn btn-small" 
                      onClick={() => {
                        if (window.confirm('Delete order?')) {
                          fetch(`http://localhost:5000/orders/${order.id}`, {
                            method: 'DELETE'
                          }).then(() => {
                            setOrders(orders.filter(o => o.id !== order.id));
                          });
                        }
                      }}
                      style={{backgroundColor: '#ff6b6b'}}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}