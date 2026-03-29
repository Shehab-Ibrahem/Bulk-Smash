import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Badge, Form, Spinner } from 'react-bootstrap';
import { FaShoppingCart, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('idle');
  
  const product = products.find((p) => p.id === parseInt(id));

  const handleAddToCart = () => {
    if (!product) return;
    setStatus('loading');
    
    setTimeout(() => {
      addToCart({ ...product, quantity: Number(quantity) });
      setStatus('success');
      
      setTimeout(() => setStatus('idle'), 2000);
    }, 800);
  };

  if (!product) {
    return (
      <Container className="py-5 text-center page-center">
        <h2>Product not found!</h2>
        <Button as={Link} to="/" variant="warning" className="mt-3">Back to Shop</Button>
      </Container>
    );
  }

  return (
    <div className="py-5 bg-white">
      <Container>
        <Link to="/" className="text-decoration-none text-dark d-flex align-items-center mb-4 fw-bold">
          <FaArrowLeft className="me-2" /> BACK TO PRODUCTS
        </Link>

        <Row className="g-5">
          <Col md={6} className='my-auto pb-3'>
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
              <Card.Img variant="top" src={`../images/${product.image}`} alt={product.name} className="img-fluid" />
            </Card>
          </Col>

          <Col md={6}>
            <div className="ps-md-4">
              <Badge bg="warning" text="dark" className="mb-2 px-3 py-2 text-uppercase">
                {product.category || 'Premium Supplement'}
              </Badge>
              <h1 className="fw-bold display-5 mb-3">{product.name}</h1>
              <h2 className="text-warning fw-bold mb-4">{product.price} $</h2>
              
              <p className="text-muted mb-4 fs-5" style={{ lineHeight: '1.8' }}>
                {product.description || "Unlock your full potential with Bulk Smash's premium formula. Engineered for maximum performance and faster recovery."}
              </p>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">Key Benefits:</h5>
                <ul className="list-unstyled">
                  <li className="mb-2"><FaCheckCircle className="text-warning me-2" /> High-quality pure ingredients</li>
                  <li className="mb-2"><FaCheckCircle className="text-warning me-2" /> Lab-tested for safety & potency</li>
                  <li className="mb-2"><FaCheckCircle className="text-warning me-2" /> Fast absorption formula</li>
                </ul>
              </div>

              <hr className="my-4" />

              <div className="d-flex align-items-center gap-3 mb-4">
                <Form.Control 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ width: '80px' }}
                  className="form-control-lg text-center shadow-none border-2"
                />
                <Button 
                  onClick={handleAddToCart}
                  disabled={status === 'loading'}
                  variant={status === 'success' ? 'success' : 'dark'} 
                  className="btn-lg w-100 fw-bold py-3 shadow-sm text-warning d-flex align-items-center justify-content-center gap-2 transition-all"
                >
                  {status === 'idle' && (
                    <>
                      <FaShoppingCart /> ADD TO CART
                    </>
                  )}
                  {status === 'loading' && <Spinner animation="border" size="sm" />}
                  {status === 'success' && "ADDED TO CART! ✅"}
                </Button>
              </div>

              <Card className="bg-light border-0 rounded-3">
                <Card.Body className="p-3 text-center small text-muted">
                  🚚 Free Shipping in Alexandria on orders over 350$
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetails;