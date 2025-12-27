
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Dish() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/dishes/${id}`)
      .then(res => {
        setDish(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="pad">Loading...</p>;
  if (!dish) return <p className="pad">Dish not found.</p>;

  return (
    <section className="container pad">
      <h2 className="text-2xl bold mb">{dish.name}</h2>

      <img 
        src={dish.image} 
        alt={dish.name} 
        className="card-img"
      />

      <p className="mb">Price: ${dish.price}</p>
      <p className="brown">{dish.description}</p>
    </section>
  );
}
