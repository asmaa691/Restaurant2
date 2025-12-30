import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ManageDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all dishes
  useEffect(() => {
    fetch("http://localhost:5000/dishes")
      .then(res => {
        return res.json();
      })
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
        .then(res => {
          return res.json();
        })
        .then(() => {
          // Remove dish from state
          const newDishes = [];
          for (let i = 0; i < dishes.length; i++) {
            if (dishes[i].id !== id) {
              newDishes.push(dishes[i]);
            }
          }
          setDishes(newDishes);
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
              {dishes.map(dish => {
                let shortDesc = dish.description || 'No description';
                if (shortDesc.length > 50) {
                  shortDesc = shortDesc.substring(0, 50) + '...';
                }
                
                return (
                  <tr key={dish.id}>
                    <td>{dish.id}</td>
                    <td>{dish.name}</td>
                    <td>${dish.price}</td>
                    <td>{shortDesc}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link 
                          to={`/edit-dish/${dish.id}`}
                          className="btn"
                          style={{backgroundColor: '#4CAF50', padding: '0.4rem 0.8rem'}}
                        >
                          Edit
                        </Link>
                        
                        <button 
                          className="btn" 
                          onClick={() => deleteDish(dish.id)}
                          style={{backgroundColor: '#ff6b6b', padding: '0.4rem 0.8rem'}}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ManageDishes;