import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Checkout() {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get cart items and total from location state or localStorage
  const cartItems = location.state?.cartItems || JSON.parse(localStorage.getItem('cart')) || [];
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    // Validation
    if (!customerName.trim()) {
      setMessage('Please enter your name');
      return;
    }

    if (!phone.trim()) {
      setMessage('Please enter your phone number');
      return;
    }

    if (cartItems.length === 0) {
      setMessage('Your cart is empty');
      return;
    }

    setLoading(true);
    setMessage('');

    fetch("http://localhost:5000/orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        customer_name: customerName.trim(),
        total: total.toFixed(2),
        phone: phone.trim(),
        address: address.trim() || ''
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log('Order response:', data);
        setMessage('✅ Order placed successfully! Thank you!');
        
        // Clear cart from localStorage
        localStorage.removeItem('cart');
        
        // Redirect to home after 3 seconds
        setTimeout(() => navigate('/'), 3000);
      })
      .catch(err => {
        console.error('Order error:', err);
        setMessage('❌ Error placing order. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <section className="container pad">
        <h2 className="red">Checkout</h2>
        <div style={{
          backgroundColor: '#fff3e6',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #b33a2f',
          textAlign: 'center'
        }}>
          <p className="brown" style={{ fontSize: '1.2rem' }}>
            Your cart is empty.
          </p>
          <button 
            onClick={() => navigate('/menu')} 
            className="btn"
            style={{ marginTop: '1rem' }}
          >
            Browse Menu
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container pad">
      <h2 className="red">Checkout</h2>
      
      {/* Order Summary */}
      <div style={{
        backgroundColor: '#fff3e6',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid #b33a2f'
      }}>
        <h3 className="brown">Order Summary</h3>
        
        {cartItems.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: '1px solid #e6c9b2'
          }}>
            <div>
              <span className="brown" style={{ fontWeight: 'bold' }}>
                {item.name}
              </span>
              {item.description && (
                <p className="brown" style={{ fontSize: '0.9rem', margin: '0.25rem 0' }}>
                  {item.description.substring(0, 50)}...
                </p>
              )}
            </div>
            <span className="brown" style={{ fontWeight: 'bold' }}>
              ${item.price}
            </span>
          </div>
        ))}
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0',
          borderTop: '2px solid #b33a2f',
          marginTop: '0.5rem'
        }}>
          <h4 className="red">Total</h4>
          <h3 className="red">${total.toFixed(2)}</h3>
        </div>
      </div>

      {/* Customer Information Form */}
      <div style={{
        backgroundColor: '#fff3e6',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #b33a2f'
      }}>
        <h3 className="brown">Customer Information</h3>
        
        {message && (
          <div className={message.includes('✅') ? 'green' : 'red'} style={{
            padding: '0.75rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            backgroundColor: message.includes('✅') ? '#e8f5e9' : '#ffebee'
          }}>
            {message}
          </div>
        )}
        
        <div className="form-group">
          <label className="brown">Full Name *</label>
          <input 
            type="text" 
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            className="form-input"
            placeholder="Enter your full name"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="brown">Phone Number *</label>
          <input 
            type="tel" 
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="form-input"
            placeholder="Enter your phone number"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label className="brown">Delivery Address</label>
          <textarea 
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="form-input"
            rows="3"
            placeholder="Street address, city (if delivery)"
            disabled={loading}
          />
          <small className="brown" style={{ display: 'block', marginTop: '0.25rem' }}>
            For takeaway orders, you can leave this empty
          </small>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button 
            onClick={placeOrder}
            className="btn"
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? 'Placing Order...' : `Place Order ($${total.toFixed(2)})`}
          </button>
          
          <button 
            type="button" 
            className="btn"
            onClick={() => navigate('/menu')}
            style={{
              backgroundColor: '#666',
              flex: 0.5
            }}
            disabled={loading}
          >
            Back to Menu
          </button>
        </div>
        
        <p className="brown" style={{ 
          marginTop: '1rem', 
          fontSize: '0.9rem',
          fontStyle: 'italic'
        }}>
          * Required fields
        </p>
      </div>
    </section>
  );
}