import React from 'react';
import { Container, Table, Button, Image, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, totalPrice, shippingCost, finalTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Container className="text-center my-5 py-5 page-center">
        <h2 className="display-6 fw-bold text-dark">Your cart is empty</h2>
        <p className="text-muted mb-4">Add some supplements to smash your goals!</p>
        <Button as={Link} to="/" variant="warning" className="fw-bold px-4 py-2">
          Back to Shop
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold text-uppercase border-bottom pb-3">Shopping Cart</h2>
      <Row>
        <Col lg={8}>
          <Table responsive hover className="align-middle shadow-sm bg-white">
            <thead className="table-dark">
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Image 
                      src={`/images/${item.image}`} 
                      alt={item.name} 
                      thumbnail 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    />
                  </td>
                  <td className="fw-bold text-dark">{item.name}</td>
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td className="fw-bold text-primary">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col lg={4}>
          <div className="p-4 bg-light rounded shadow-sm border">
            <h4 className="fw-bold mb-4 border-bottom pb-2">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span className="fw-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Shipping</span>
              <span className={shippingCost === 0 ? "text-success fw-bold" : "fw-bold text-dark"}>
                {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            {shippingCost > 0 && (
              <p className="small text-muted mb-2">
                Add <b>${(350 - totalPrice).toFixed(2)}</b> more for FREE shipping!
              </p>
            )}
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="h5 fw-bold">Total</span>
              <span className="h4 fw-bold text-primary">${finalTotal.toFixed(2)}</span>
            </div>
            <Button 
              variant="warning" 
              size="lg" 
              className="w-100 fw-bold py-3 shadow-sm"
              onClick={() => navigate('/checkout')}
            >
              PROCEED TO CHECKOUT
            </Button>
            <Link to="/" className="btn btn-outline-dark w-100 mt-3 fw-bold">
              Continue Shopping
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;