import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('Login successful!');
          if (data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Login failed. Please try again.');
        setLoading(false);
      });
  };

  return (
    <section className="container pad">
      <div className="form-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="red text-center">Login</h2>
        
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
            <label>Username *</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
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

        {/* TEST ACCOUNTS SECTION - UPDATED TEXT */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '5px',
          border: '1px solid #ddd'
        }}>
          <p style={{
            marginTop: '0',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
            color: '#333',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            Use These Test Accounts:
          </p>
          <p style={{margin: '0.25rem 0', fontSize: '14px', color: '#666', textAlign: 'center'}}>
            <strong>Admin:</strong> admin / admin123
          </p>
          <p style={{margin: '0.25rem 0', fontSize: '14px', color: '#666', textAlign: 'center'}}>
            <strong>Customer:</strong> customer1 / password123
          </p>
          
        </div>
      </div>
    </section>
  );
}

export default Login;