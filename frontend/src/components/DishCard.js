import React from 'react';
import { Link } from 'react-router-dom';

export default function DishCard({ dish, addToCart }) {
  // Use dish.image directly - it will have valid Unsplash URLs now
  const imageSrc = dish.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop";
  
  return (
    <div className="card">
      <img 
        src={imageSrc} 
        alt={dish.name} 
        onError={(e) => {
          // Only use this as last resort
          e.target.style.display = 'none';
        }}
      />
      <h3 className="red">{dish.name}</h3>
      <p className="brown">Price: ${dish.price}</p>

      <div className="btns">
        <Link to={`/dish/${dish.id}`} className="btn">View Details</Link>
        {addToCart && (
          <button className="btn" onClick={addToCart}>Add to Cart</button>
        )}
      </div>
    </div>
  );
}