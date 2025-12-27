import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-red white pad flex between center-items">
      <h1 className="bold text-xl">FLAMES</h1>
      <div className="flex center-items gap">
        <ul className="flex gap">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
          {/* Show Admin link only for admin users */}
          {user && user.role === 'admin' && (
            <li><Link to="/admin" className="admin-link">Admin</Link></li>
          )}
        </ul>
        
        {/* User/Auth section */}
        <div className="flex center-items gap" style={{ marginLeft: '1rem' }}>
          {user ? (
            <>
              <span className="user-greeting">
                Hello, {user.username} ({user.role})
              </span>
              <button 
                onClick={handleLogout}
                className="btn btn-small"
                style={{ 
                  backgroundColor: '#8c1f12',
                  padding: '0.3rem 0.8rem'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-small" style={{ 
                backgroundColor: '#ff7043',
                padding: '0.3rem 0.8rem'
              }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-small" style={{ 
                backgroundColor: '#666',
                padding: '0.3rem 0.8rem'
              }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}