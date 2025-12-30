import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddDish() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addDish = (e) => {
    e.preventDefault();
    
    if (name === '' || price === '' || description === '') {
      setMessage('Please fill all required fields');
      return;
    }

    setLoading(true);
    setMessage('');

    fetch("http://localhost:5000/dishes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: name, 
        price: parseFloat(price), 
        description: description, 
        image: image || '/assets/default.jpg' 
      })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setMessage('Dish added successfully!');
        setLoading(false);
        
        // Clear form
        setName('');
        setPrice('');
        setDescription('');
        setImage('');
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/menu');
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        setMessage('Error adding dish');
        setLoading(false);
      });
  };

  return (
    <section className="container pad">
      <div className="form-container">
        <h2 className="red text-center">Add New Dish</h2>
        <p className="text-center brown mb-2">Add new items to your restaurant menu</p>
        
        {message && (
          <div className={message.includes('success') ? 'green' : 'red'}>
            {message}
          </div>
        )}
        
        <form onSubmit={addDish}>
          <div className="form-group">
            <label>Dish Name *</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., French Fries"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Price ($) *</label>
            <input 
              type="number" 
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="e.g., 5.99"
              step="0.01"
              min="0"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the dish..."
              className="form-input"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL (optional)</label>
            <input 
              type="text" 
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="/assets/fries.jpg"
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn" 
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Dish'}
            </button>
            
            <button 
              type="button" 
              className="btn" 
              onClick={() => navigate('/menu')}
              style={{backgroundColor: '#666', marginLeft: '0.5rem'}}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddDish;
