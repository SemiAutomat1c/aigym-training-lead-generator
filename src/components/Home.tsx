import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Custom component that combines Link and Button
const LinkButton = ({ to, variant, size, className, children }: { 
  to: string; 
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'link' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-dark' | 'outline-light'; 
  size?: "sm" | "lg"; 
  className?: string;
  children: React.ReactNode;
}) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Button variant={variant} size={size} className={className}>
      {children}
    </Button>
  </Link>
);

const Home: React.FC = () => {
  return (
    <Container>
      <div className="text-center mb-5 py-5">
        <h1 className="display-4 fw-bold">AI-Powered Gym Training Lead Generator</h1>
        <p className="lead mb-4">
          Create personalized, engaging messages for gym training leads using advanced AI technology.
          Save time and increase your conversion rates with tailored communication for fitness enthusiasts.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <LinkButton 
            to="/generate" 
            variant="primary" 
            size="lg" 
            className="px-5 py-3"
          >
            Start Generating Messages
          </LinkButton>
          <LinkButton 
            to="/batch" 
            variant="outline-primary" 
            size="lg" 
            className="px-5 py-3"
          >
            Batch Message Generator <Badge bg="danger">NEW!</Badge>
          </LinkButton>
        </div>
      </div>

      <h2 className="text-center mb-4">How It Works</h2>
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 feature-card">
            <Card.Body>
              <div className="feature-icon">1</div>
              <Card.Title>Input Lead Information</Card.Title>
              <Card.Text>
                Enter details about your lead, including their name and interests you've noticed from their profile.
                Support for both single leads and batch processing of up to 200 profiles.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 feature-card">
            <Card.Body>
              <div className="feature-icon">2</div>
              <Card.Title>Select Message Style</Card.Title>
              <Card.Text>
                Choose from various message styles including standard or Singaporean English (Singlish) with authentic
                local phrases like "wah", "lah", "sia", and "leh" to better connect with your audience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 feature-card">
            <Card.Body>
              <div className="feature-icon">3</div>
              <Card.Title>Generate & Send</Card.Title>
              <Card.Text>
                Our AI generates highly personalized messages that match the exact template required,
                with handcrafted variations based on each lead's unique interests.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Key Features</Card.Title>
              <ul>
                <li><strong>Batch processing</strong> - Handle up to 200 profiles at once</li>
                <li><strong>Easy data input</strong> - Simple copy-paste of names and traits</li>
                <li><strong>Singlish support</strong> - Authentic Singaporean English phrases</li>
                <li><strong>Personalized messaging</strong> - Unique variations for each interest type</li>
                <li><strong>Multiple platforms</strong> - Instagram and TikTok templates</li>
                <li><strong>Perfect template matching</strong> - Follows the exact required format</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Benefits</Card.Title>
              <ul>
                <li>Save hours with bulk processing of 100+ leads at once</li>
                <li>Increase response rates with handcrafted personalized messages</li>
                <li>Connect better with Singaporean fitness enthusiasts using Singlish</li>
                <li>Scale your gym training client acquisition efficiently</li>
                <li>Maintain message quality even with high volume</li>
                <li>Easy export options for all your generated messages</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="cta-section rounded">
        <h2>Ready to Grow Your Gym Training Business?</h2>
        <p className="lead mb-4">
          Start creating personalized messages that convert fitness enthusiasts into clients.
          Process up to 200 leads at once with our new batch generator!
        </p>
        <div className="d-flex justify-content-center gap-3">
          <LinkButton 
            to="/generate" 
            variant="primary" 
            size="lg"
          >
            Single Message
          </LinkButton>
          <LinkButton 
            to="/batch" 
            variant="success" 
            size="lg"
          >
            Batch Generator <Badge bg="danger">NEW!</Badge>
          </LinkButton>
        </div>
      </div>
    </Container>
  );
};

export default Home; 