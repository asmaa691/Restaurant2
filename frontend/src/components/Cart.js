import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, removeFromCart }) {
  const navigate = useNavigate();
  
  // Calculate total with simple loop
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].price;
  }
  
  const goToCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/checkout');
  };

  return (
    <div className="cart">
      <h3 className="red">Your Cart</h3>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => {
            return (
              <div key={index} className="cart-item">
                <span>{item.name} - ${item.price}</span>
                <button
                  className="remove"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            );
          })}
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

export default Cart;