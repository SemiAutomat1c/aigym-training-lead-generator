import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">AI Gym Training Lead Generator</h5>
            <p className="mb-3 text-gray-300">
              Generate personalized messages for your gym training leads using advanced AI technology.
              Save time and increase your conversion rates with tailored communication.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-decoration-none">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/generate" className="text-decoration-none">Generate Messages</Link></li>
              <li className="mb-2"><Link to="/batch" className="text-decoration-none">Batch Generator</Link></li>
              <li className="mb-2"><Link to="/about" className="text-decoration-none">About</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="mb-3 fw-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-envelope me-2"></i>
                <a href="mailto:contact@gymleadgen.com" className="text-decoration-none">contact@gymleadgen.com</a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-telephone me-2"></i>
                <a href="tel:+6512345678" className="text-decoration-none">+65 1234 5678</a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-geo-alt me-2"></i>
                <span>Singapore</span>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4 border-gray-700" />
        <Row>
          <Col className="text-center">
            <p className="mb-0 text-gray-400">&copy; {currentYear} AI Gym Training Lead Generator. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 