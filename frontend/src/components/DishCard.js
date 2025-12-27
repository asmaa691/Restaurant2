import React from 'react';
import { Link } from 'react-router-dom';

export default function DishCard({ dish, addToCart }) {
  return (
    <div className="card">
      <img src={dish.image} alt={dish.name} />
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

