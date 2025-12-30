import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  // Simple check for logged in user
  const userString = localStorage.getItem('user');
  let user = null;
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch(e) {
      console.log('Error reading user');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
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
          
          {user && user.role === 'admin' && (
            <li><Link to="/admin" className="admin-link">Admin</Link></li>
          )}
        </ul>
        
        <div className="flex center-items gap" style={{ marginLeft: '1rem' }}>
          {user ? (
            <>
              <span className="user-greeting">
                Hello, {user.username}
              </span>
              <button onClick={handleLogout} className="btn btn-small">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-small">Login</Link>
              {/* REGISTER BUTTON REMOVED */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;