import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

const Contact = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <div className="pb-5 pt-4 bg-white">
      <Container>
        <div className="text-center mb-5 mt-4">
          <h1 className="fw-bold display-5">CONTACT US</h1>
          <p className="text-muted">Have a question? The Bulk Smash team is here to help.</p>
        </div>
        
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="bg-white rounded-4 shadow-lg border-0 overflow-hidden">
              <Row className="g-0">
                <Col md={5} className="bg-dark text-white p-5 d-flex flex-column justify-content-center">
                  <h3 className="text-warning fw-bold mb-4">Contact Us</h3>
                  <div className="mb-4">
                    <p className="mb-1 fw-bold text-uppercase small text-light">Phone</p>
                    <h5 className='text-secondary'>+20 111 558 5173</h5>
                  </div>
                  <div className="mb-4">
                    <p className="mb-1 fw-bold text-uppercase small text-light">Email</p>
                    <h5 className='text-secondary'>shehabhopa555@gmail.com</h5>
                  </div>
                  <div>
                    <p className="mb-1 fw-bold text-uppercase small text-light">Location</p>
                    <h5 className='text-secondary'>Alexandria, Egypt</h5>
                  </div>
                </Col>

                <Col md={7} className="p-5">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Label className="small fw-bold">Full Name</Form.Label>
                        <Form.Control required className="form-control-lg bg-light border-0 shadow-none" type="text" placeholder="John Doe" style={{ fontSize: '0.9rem' }} />
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label className="small fw-bold">Email</Form.Label>
                        <Form.Control required className="form-control-lg bg-light border-0 shadow-none" type="email" placeholder="john@example.com" style={{ fontSize: '0.9rem' }} />
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Message</Form.Label>
                      <Form.Control required className="bg-light border-0 shadow-none" as="textarea" rows={4} placeholder="How can we help you?" style={{ fontSize: '0.9rem' }} />
                    </Form.Group>
                    <Button 
                      variant={status === 'success' ? 'success' : 'warning'} 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="w-100 fw-bold py-3 shadow-sm transition-all"
                    >
                      {status === 'idle' && "SEND MESSAGE"}
                      {status === 'loading' && <Spinner animation="border" size="sm" />}
                      {status === 'success' && "MESSAGE SENT! ✅"}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;