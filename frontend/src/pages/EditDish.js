import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditDish() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [dish, setDish] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch dish details
  useEffect(() => {
    fetch(`http://localhost:5000/dishes/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setDish({
            name: data.name || '',
            price: data.price || '',
            description: data.description || '',
            image: data.image || ''
          });
        } else {
          setError('Dish not found');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError('Failed to load dish');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setDish({
      ...dish,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    if (!dish.name || !dish.price || !dish.description) {
      setError('Please fill all required fields');
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/dishes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dish)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Update failed');
      }

      setMessage('✅ Dish updated successfully!');
      
      // Redirect back to manage dishes after 2 seconds
      setTimeout(() => {
        navigate('/manage-dishes');
      }, 2000);

    } catch (err) {
      setError('❌ ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="container pad">Loading dish details...</p>;
  if (error) return <p className="container pad red">{error}</p>;

  return (
    <section className="container pad">
      <div className="form-container">
        <h2 className="red text-center">Edit Dish</h2>
        <p className="brown text-center mb">Editing dish ID: {id}</p>
        
        {message && (
          <div className="green" style={{ 
            backgroundColor: '#e8f5e9', 
            padding: '0.75rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            color: '#2e7d32'
          }}>
            {message}
          </div>
        )}
        
        {error && (
          <div className="red" style={{ 
            backgroundColor: '#ffebee', 
            padding: '0.75rem',
            borderRadius: '5px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Dish Name *</label>
            <input 
              type="text" 
              name="name"
              value={dish.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., French Fries"
              required
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label>Price ($) *</label>
            <input 
              type="number" 
              name="price"
              value={dish.price}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 5.99"
              step="0.01"
              min="0"
              required
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea 
              name="description"
              value={dish.description}
              onChange={handleChange}
              className="form-input"
              placeholder="Describe the dish..."
              rows="4"
              required
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label>Image URL (optional)</label>
            <input 
              type="text" 
              name="image"
              value={dish.image}
              onChange={handleChange}
              className="form-input"
              placeholder="/assets/fries.jpg or https://example.com/image.jpg"
              disabled={saving}
            />
            <small className="text-muted">Leave empty for default image</small>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn" 
              disabled={saving}
            >
              {saving ? 'Updating...' : 'Update Dish'}
            </button>
            
            <button 
              type="button" 
              className="btn" 
              onClick={() => navigate('/manage-dishes')}
              style={{backgroundColor: '#666', marginLeft: '0.5rem'}}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}