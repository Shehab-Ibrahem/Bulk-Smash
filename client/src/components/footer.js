import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 border-top border-warning">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start">
            <h4 className="fw-bold text-warning mb-0">BULK SMASH</h4>
            <p className="small text-secondary ">Premium Supplements for your fitness journey</p>
          </Col>

          <Col md={4} className="text-center my-3 my-md-0">
            <div className="d-flex justify-content-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61576504893644" target="_blank" className="text-white fs-4"><FaFacebook /></a>
              <a href="https://www.instagram.com/bulksmashstore/" target="_blank" className="text-white fs-4"><FaInstagram /></a>
              <a href="https://wa.me/201115585173?text=Hello%20Bulk%20Smash!%20I%20want%20to%20ask%20about%20the%20supplements" target="_blank" className="text-white fs-4"><FaWhatsapp /></a>
            </div>
          </Col>

          <Col md={4} className="text-center text-md-end">
            <p className="small text-secondary mb-0">
              &copy; {new Date().getFullYear()} Bulk Smash. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>

      <style>{`
        footer a { transition: 0.3s; }
        footer a:hover { color: #ffc107 !important; transform: scale(1.2); display: inline-block; }
      `}</style>
    </footer>
  );
};

export default Footer;