import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <div className="pb-5 pt-4 bg-white text-dark">
      <Container>
        <Row className="align-items-center mb-5 mt-4">
          <Col md={6}>
            <h6 className="text-warning fw-bold text-uppercase tracking-wider mb-2">Our Story</h6>
            <h1 className="display-4 fw-bold mb-4" style={{ color: '#1a1a1a' }}>ABOUT <span className="text-warning">BULK SMASH</span></h1>
            <p className="lead text-muted mb-4">
              Born in Alexandria, we provide elite supplements for those who demand excellence in every rep.
            </p>
            <p className="text-secondary" style={{ lineHeight: '1.8' }}>
              Bulk Smash isn't just a brand; it's a commitment to your progress. From professional bodybuilders to fitness enthusiasts, we supply the fuel that smashes limits. Every product is 100% authentic and hand-picked for maximum results.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {[
            { title: 'Quality', desc: '100% Authentic & Certified' },
            { title: 'Energy', desc: 'Maximum Performance Formulas' },
            { title: 'Speed', desc: 'Fast Delivery Across Egypt' }
          ].map((item, idx) => (
            <Col md={4} key={idx}>
              <Card className="border-1 bg-dark text-white border-warning shadow-sm h-100 text-center py-4" style={{ backgroundColor: '#fdfdfd' }}>
                <Card.Body>
                  <h4 className="fw-bold mb-2">{item.title}</h4>
                  <p className="text-muted mb-0 text-white-50">{item.desc}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default About;