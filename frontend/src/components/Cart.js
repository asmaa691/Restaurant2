
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cartItems, removeFromCart }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const goToCheckout = () => {
    // Save cart to localStorage so Checkout page can access it
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <div className="cart">
      <h3 className="red">Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name} - ${item.price}</span>
              <button
                className="remove"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <h4 className="red">Total: ${total.toFixed(2)}</h4>
      
      {cartItems.length > 0 && (
        <button onClick={goToCheckout} className="btn">
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}
