import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <section className="container pad">
      <h2 className="red">Admin Panel</h2>
      <p className="brown mb">Manage your restaurant</p>
      
      <div className="admin-cards">
        <div className="admin-card">
          <h3>Dishes Management</h3>
          <p>Add, edit, or remove dishes from the menu</p>
          <div className="admin-links">
            <Link to="/add-dish" className="btn">Add New Dish</Link>
            <Link to="/manage-dishes" className="btn" style={{backgroundColor: '#666'}}>
              Manage Dishes
            </Link>
          </div>
        </div>
        
        <div className="admin-card">
          <h3>Orders Management</h3>
          <p>View and manage customer orders</p>
          <div className="admin-links">
            <Link to="/manage-orders" className="btn" style={{backgroundColor: '#666'}}>
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}