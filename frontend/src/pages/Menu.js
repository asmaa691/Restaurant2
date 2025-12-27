import React, { useState, useEffect } from 'react';
import DishCard from '../components/DishCard';
import Cart from '../components/Cart';

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  // Fetch dishes from API
  useEffect(() => {
    fetch("http://localhost:5000/dishes")
      .then(res => res.json())
      .then(data => {
        setDishes(data);
        setFilteredDishes(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError('Failed to load dishes');
        setLoading(false);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let result = dishes;
    
    if (searchTerm) {
      result = result.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dish.description && dish.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (minPrice) {
      result = result.filter(dish => dish.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
      result = result.filter(dish => dish.price <= parseFloat(maxPrice));
    }
    
    setFilteredDishes(result);
  }, [searchTerm, minPrice, maxPrice, dishes]);

  const addToCart = (dish) => {
    setCartItems([...cartItems, dish]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
  };

  if (loading) return <p className="container pad">Loading menu...</p>;
  if (error) return <p className="container pad red">{error}</p>;

  return (
    <section className="container">
      <h2 className="red">Menu</h2>
      
      {/* Search and Filter Section - SIMPLIFIED */}
      <div className="filter-section" style={{
        backgroundColor: '#fff3e6',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid #b33a2f'
      }}>
        <div className="filter-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {/* Search */}
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ width: '100%' }}
            />
          </div>
          
          {/* Price Range */}
          <div className="filter-group">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="form-input"
                min="0"
                step="0.01"
                style={{ flex: 1 }}
              />
              <span style={{ color: '#5a3a2b' }}>to</span>
              <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="form-input"
                min="0"
                step="0.01"
                style={{ flex: 1 }}
              />
            </div>
          </div>
          
          {/* Clear Button */}
          <div className="filter-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={clearFilters}
              className="btn"
              style={{ 
                backgroundColor: '#666',
                width: '100%',
                height: '42px' // Match input height
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="no-results" style={{
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: '#fff3e6',
          borderRadius: '8px',
          border: '1px dashed #b33a2f'
        }}>
          <h3 className="red">No dishes found</h3>
          <p className="brown">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="btn"
            style={{ marginTop: '1rem' }}
          >
            Show All Dishes
          </button>
        </div>
      ) : (
        <div className="grid">
          {filteredDishes.map(d => (
            <DishCard
              key={d.id}
              dish={d}
              addToCart={() => addToCart(d)}
            />
          ))}
        </div>
      )}

      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </section>
  );
}

