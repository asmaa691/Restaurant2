import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Nav from './components/Nav';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Dish from './pages/Dish';
import Contact from './pages/Contact';
import Services from './pages/Services';
import AddDish from './pages/AddDish';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import ManageDishes from './pages/ManageDishes';
import ManageOrders from './pages/ManageOrders';
import Login from './pages/Login';
import Register from './pages/Register';
import EditDish from './pages/EditDish';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container pad">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

function AppContent() {
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dish/:id" element={<Dish />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Admin Routes */}
          <Route path="/add-dish" element={
            <ProtectedRoute requireAdmin>
              <AddDish />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <Admin />
            </ProtectedRoute>
          } />
          
          <Route path="/manage-dishes" element={
            <ProtectedRoute requireAdmin>
              <ManageDishes />
            </ProtectedRoute>
          } />
          
          <Route path="/manage-orders" element={
            <ProtectedRoute requireAdmin>
              <ManageOrders />
            </ProtectedRoute>
          } />
          
          <Route path="/edit-dish/:id" element={
            <ProtectedRoute requireAdmin>
              <EditDish />
            </ProtectedRoute>
          } />
          
          {/* Protected Customer Route */}
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}