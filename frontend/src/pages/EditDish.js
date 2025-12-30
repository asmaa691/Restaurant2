import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditDish() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  // Fetch the dish data when component loads
  useEffect(() => {
    fetch(`http://localhost:5000/dishes/${id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setName(data.name || '');
        setPrice(data.price || '');
        setDescription(data.description || '');
        setImage(data.image || '');
      })
      .catch(err => {
        console.log("Error fetching dish:", err);
        setMessage('Could not load dish data.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    
    const dishData = {
      name: name,
      price: price,
      description: description,
      image: image
    };
    
    fetch(`http://localhost:5000/dishes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dishData)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setMessage('Dish updated successfully!');
        // Wait 2 seconds then go back
        setTimeout(() => {
          navigate('/manage-dishes');
        }, 2000);
      })
      .catch(err => {
        setMessage('Error updating dish.');
        console.log("Update error:", err);
      });
  };

  return (
    <div className="container">
      <div style={{maxWidth: '600px', margin: '0 auto'}}>
        <h2 className="red">Edit Dish</h2>
        
        {message && (
          <p className="green" style={{padding: '10px', background: '#e6ffe6'}}>
            {message}
          </p>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '15px'}}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{width: '100%', padding: '8px'}}
              required
            />
          </div>

          <div style={{marginBottom: '15px'}}>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{width: '100%', padding: '8px'}}
              step="0.01"
              required
            />
          </div>

          <div style={{marginBottom: '15px'}}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{width: '100%', padding: '8px', height: '100px'}}
              required
            />
          </div>

          <div style={{marginBottom: '15px'}}>
            <label>Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{width: '100%', padding: '8px'}}
              placeholder="/assets/image.jpg"
            />
          </div>

          <button type="submit" className="btn">
            Update Dish
          </button>
          <button 
            type="button" 
            className="btn" 
            onClick={() => navigate('/manage-dishes')}
            style={{marginLeft: '10px', background: '#666'}}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDish;