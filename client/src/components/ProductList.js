import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <Container id="products" className="my-5">
      <h2 className="text-center mb-4 text-uppercase fw-bold">Our Supplements</h2>
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Link to={`/product/${product.id}`}>
                <Card.Img variant="top" src={`/images/${product.image}`} style={{ cursor: 'pointer' }} />
              </Link>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{product.name}</Card.Title>
                <Card.Text className="text-muted small">
                  {product.description}
                </Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 mb-0 text-primary font-weight-bold">${product.price}</span>
                    <Button 
                      variant="outline-dark" 
                      onClick={() => addToCart({ ...product, quantity: 1 })}
                    >
                      Add to Cart
                    </Button>
                  </div>
                  <Button 
                    as={Link} 
                    to={`/product/${product.id}`} 
                    variant="dark" 
                    className="w-100 fw-bold text-warning py-2"
                  >
                    VIEW DETAILS
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;