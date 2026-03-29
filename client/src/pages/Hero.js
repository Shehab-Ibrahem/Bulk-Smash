import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className="bg-dark text-white text-center py-5 mb-4 w-100" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("images/hero.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
      <Container className="py-5">
        <h1 className="display-3 fw-bold text-uppercase">Smash Your Goals</h1>
        <p className="lead fs-4 mb-4">Premium supplements for serious athletes.</p>
        <Button variant="warning" size="lg" className="fw-bold px-5 py-3 fs-5 shadow" href="#products">
          Shop Supplements
        </Button>
      </Container>
    </div>
  );
};

export default Hero;