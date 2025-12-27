import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save user and login
      login(data.user);
      
      // Show welcome message
      alert(`Welcome back, ${data.user.username}!`);
      
      // ALWAYS redirect to home page (no auto-redirect to admin)
      navigate('/');

    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container pad">
      <div className="form-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="red text-center">Login to FLAMES</h2>
        
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
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p className="brown">
            Don't have an account?{' '}
            <Link to="/register" className="red" style={{ fontWeight: 'bold' }}>
              Register here
            </Link>
          </p>
          <p className="brown" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            <strong>Test Accounts:</strong><br />
            Admin: admin / admin123<br />
            Customer: customer1 / password123
          </p>
        </div>
      </div>
    </section>
  );
}