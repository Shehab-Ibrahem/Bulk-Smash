import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
  const { cart, totalPrice, shippingCost, finalTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Confirm Order?',
      text: `Your total is $${finalTotal.toFixed(2)}. Do you want to place the order?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#343a40',
      confirmButtonText: 'Yes, Smash it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customer: formData, items: cart, total: finalTotal })
        })
        .then(res => res.json())
        .then(data => {
          Swal.fire({
            title: 'Success!',
            text: 'Your order has been placed. Get ready for the gains!',
            icon: 'success',
            confirmButtonColor: '#198754'
          });
          clearCart();
          navigate('/');
        })
        .catch(err => {
          Swal.fire('Error', 'Connection failed', 'error');
        });
      }
    });
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2 className="fw-bold">Your cart is empty</h2>
        <Button onClick={() => navigate('/')} variant="warning" className="mt-3 fw-bold px-4">
          Go Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4 text-uppercase">Checkout</h2>
      <Row className="g-4">
        <Col md={7}>
          <Card className="border-0 shadow-sm p-4">
            <h4 className="mb-4 fw-bold text-uppercase">Shipping Information</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="fullName" 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your full name"
                  className="py-2 shadow-none border-2"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  onChange={handleChange} 
                  required 
                  placeholder="name@example.com"
                  className="py-2 shadow-none border-2"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Phone Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="phone" 
                  onChange={handleChange} 
                  required 
                  placeholder="01xxxxxxxxx"
                  className="py-2 shadow-none border-2"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">City</Form.Label>
                <Form.Control 
                  type="text" 
                  name="city" 
                  onChange={handleChange} 
                  required 
                  placeholder="Alexandria"
                  className="py-2 shadow-none border-2"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Detailed Address</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  name="address" 
                  onChange={handleChange} 
                  required 
                  placeholder="Street name, building number, apartment..."
                  className="shadow-none border-2"
                />
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100 py-3 fw-bold shadow-sm text-uppercase">
                PLACE ORDER (${(finalTotal || 0).toFixed(2)})
              </Button>
            </Form>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="border-0 shadow-sm p-4 bg-light">
            <h4 className="mb-4 fw-bold text-uppercase">Order Summary</h4>
            <ListGroup variant="flush" className="bg-transparent">
              {cart.map((item) => (
                <ListGroup.Item key={item.id} className="bg-transparent d-flex justify-content-between align-items-center px-0 border-bottom-0 pb-2">
                  <div className="text-dark">
                    <span className="fw-bold">{item.quantity}x</span> {item.name}
                  </div>
                  <span className="fw-bold">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <hr className="my-4" />
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span className="fw-bold">${(totalPrice || 0).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span className={shippingCost === 0 ? "text-success fw-bold" : "fw-bold"}>
                {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <hr className="my-3" />
            <div className="d-flex justify-content-between mt-2">
              <span className="h5 fw-bold text-uppercase">Total</span>
              <span className="h4 fw-bold text-primary">${(finalTotal || 0).toFixed(2)}</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;