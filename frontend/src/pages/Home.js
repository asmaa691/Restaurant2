import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="container pad-lg center">
      <h2 className="text-4xl bold mb red">Welcome to FLAMES 🔥</h2>
      <p className="text-lg brown mb">
        Where great taste meets fresh ingredients. Explore our menu and enjoy your favorite dishes!
      </p>
      <Link to="/menu" className="btn">
        Explore Menu
      </Link>
    </section>
  );
}