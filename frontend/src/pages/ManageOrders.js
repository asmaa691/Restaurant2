import React, { useState, useEffect } from 'react';

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch orders');
        }
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const deleteOrder = (id) => {
    if (window.confirm('Delete order?')) {
      fetch(`http://localhost:5000/orders/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          const newOrders = [];
          for (let i = 0; i < orders.length; i++) {
            if (orders[i].id !== id) {
              newOrders.push(orders[i]);
            }
          }
          setOrders(newOrders);
        })
        .catch(err => {
          console.log(err);
          alert('Error deleting order');
        });
    }
  };

  if (loading) return <p className="container pad">Loading orders...</p>;
  if (error) return <p className="container pad red">Error: {error}</p>;

  return (
    <section className="container pad">
      <h2 className="red">Manage Orders</h2>
      <p className="brown mb">Orders found: {orders.length}</p>

      {orders.length === 0 ? (
        <p>No orders found.</p>
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
              {orders.map(order => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>${order.total}</td>
                    <td>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <button 
                        className="btn" 
                        onClick={() => deleteOrder(order.id)}
                        style={{backgroundColor: '#ff6b6b', padding: '0.4rem 0.8rem'}}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ManageOrders;