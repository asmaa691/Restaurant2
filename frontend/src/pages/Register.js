import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: 'customer'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(data.message || 'Registration successful! You can now login.');
      
      // Clear form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container pad">
      <div className="form-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="red text-center">Create Account</h2>
        
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
        
        {success && (
          <div className="green" style={{ 
            backgroundColor: '#e8f5e9', 
            padding: '0.75rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            color: '#2e7d32'
          }}>
            {success}
          </div>
        )}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username *</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Choose a username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Your email address"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="At least 6 characters"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Re-enter your password"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p className="brown">
            Already have an account?{' '}
            <Link to="/login" className="red" style={{ fontWeight: 'bold' }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}