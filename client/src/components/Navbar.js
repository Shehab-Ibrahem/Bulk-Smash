import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MyNavbar = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-warning">
          BULK SMASH
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="fw-bold mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-bold mx-2">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-bold mx-2">Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="fw-bold mx-2 position-relative">
              Cart
              {totalItems > 0 && (
                <Badge 
                  pill 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle shadow-sm"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;