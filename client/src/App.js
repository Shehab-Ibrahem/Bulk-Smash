import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import ProductList from './components/ProductList';
import Hero from './pages/Hero';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ProductDetails from './pages/ProductDetails';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (product, quantity = 1) => {
    const exist = cartItems.find((x) => x.id === product.id);
    const qtyToAdd = parseInt(quantity);

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + qtyToAdd } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: qtyToAdd }]);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Router>
      <div className="app-container">
        <Navbar cartCount={cartCount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ProductList products={products} addToCart={addToCart} />
              </>
            } />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/product/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;