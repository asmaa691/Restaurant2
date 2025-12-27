
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ManageDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all dishes
  useEffect(() => {
    fetch("http://localhost:5000/dishes")
      .then(res => res.json())
      .then(data => {
        setDishes(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const deleteDish = (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      fetch(`http://localhost:5000/dishes/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(() => {
          setDishes(dishes.filter(d => d.id !== id));
          alert('Dish deleted successfully');
        })
        .catch(err => {
          console.log(err);
          alert('Error deleting dish');
        });
    }
  };

  if (loading) return <p className="container pad">Loading...</p>;

  return (
    <section className="container pad">
      <h2 className="red">Manage Dishes</h2>
      <p className="brown mb">Total dishes: {dishes.length}</p>

      {dishes.length === 0 ? (
        <p>No dishes found. Add some dishes first.</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map(dish => (
                <tr key={dish.id}>
                  <td>{dish.id}</td>
                  <td>{dish.name}</td>
                  <td>${dish.price}</td>
                  <td>{dish.description ? dish.description.substring(0, 50) + '...' : 'No description'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link 
                        to={`/edit-dish/${dish.id}`}
                        className="btn btn-small"
                        style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          textDecoration: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          fontSize: '0.9rem',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-block',
                          textAlign: 'center'
                        }}
                      >
                        Edit
                      </Link>
                      
                      <button 
                        className="btn btn-small" 
                        onClick={() => deleteDish(dish.id)}
                        style={{
                          backgroundColor: '#ff6b6b', 
                          color: 'white',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}