import React, { useState, useEffect } from 'react';
import DishCard from '../components/DishCard';
import Cart from '../components/Cart';

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/dishes")
      .then(res => res.json())
      .then(data => setDishes(data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (dish) => {
    setCart([...cart, dish]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const filteredDishes = dishes.filter(dish => 
    dish.name.toLowerCase().includes(search.toLowerCase()) ||
    dish.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="red" style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px'}}>
        Our Menu
      </h2>
      
      {/* Improved Search Bar */}
      <div style={{
        marginBottom: '40px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'absolute',
            left: '15px',
            color: '#b33a2f',
            fontSize: '18px'
          }}>
            🔍
          </div>
          <input
            type="text"
            placeholder="Search for dishes by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 15px 15px 45px',
              fontSize: '16px',
              border: '2px solid #e6c9b2',
              borderRadius: '50px',
              backgroundColor: '#fff8f0',
              boxShadow: '0 3px 10px rgba(179, 58, 47, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#b33a2f';
              e.target.style.boxShadow = '0 3px 15px rgba(179, 58, 47, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e6c9b2';
              e.target.style.boxShadow = '0 3px 10px rgba(179, 58, 47, 0.1)';
            }}
          />
        </div>
        
        {/* Search results counter */}
        <div style={{
          textAlign: 'center',
          marginTop: '10px',
          color: '#5a3a2b',
          fontSize: '14px'
        }}>
          {search && (
            <span>
              Found {filteredDishes.length} dish{filteredDishes.length !== 1 ? 'es' : ''} matching "{search}"
            </span>
          )}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid">
        {filteredDishes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            gridColumn: '1/-1'
          }}>
            <p style={{fontSize: '18px', color: '#5a3a2b'}}>
              {search ? 'No dishes found matching your search.' : 'Loading dishes...'}
            </p>
            {search && (
              <button 
                onClick={() => setSearch('')}
                style={{
                  marginTop: '15px',
                  background: '#b33a2f',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          filteredDishes.map(dish => (
            <DishCard
              key={dish.id}
              dish={dish}
              addToCart={() => addToCart(dish)}
            />
          ))
        )}
      </div>

      <Cart cartItems={cart} removeFromCart={removeFromCart} />
    </div>
  );
}

export default Menu;
