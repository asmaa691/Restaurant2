import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
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
import EditDish from './pages/EditDish';

function App() {
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dish/:id" element={<Dish />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-dish" element={<AddDish />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manage-dishes" element={<ManageDishes />} />
          <Route path="/manage-orders" element={<ManageOrders />} />
          <Route path="/login" element={<Login />} />
          {/* REGISTER ROUTE REMOVED */}
          <Route path="/edit-dish/:id" element={<EditDish />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;