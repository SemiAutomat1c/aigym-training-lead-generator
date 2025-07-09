import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutPage: React.FC = () => {
  return (
    <Container>
      <h1 className="text-center mb-5">About AI Gym Training Lead Generator</h1>
      
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <h2 className="mb-4">Our Mission</h2>
              <p className="lead">
                Our mission is to help fitness professionals and personal trainers grow their business by leveraging 
                the power of artificial intelligence to create personalized, engaging messages that convert.
              </p>
              <p>
                In today's competitive fitness industry, personalized communication is key to standing out 
                and building meaningful connections with potential clients. However, crafting individual 
                messages for each lead can be time-consuming and take away from your training time.
              </p>
              <p>
                That's where our AI Gym Training Lead Generator comes in. We combine advanced AI technology with 
                fitness marketing best practices to help you create tailored messages that resonate with your leads, 
                saving you time while improving your conversion rates.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <h2 className="text-center mb-4">Our Approach to Fitness Lead Generation</h2>
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Personalized Outreach</Card.Title>
              <Card.Text>
                Our system creates messages that reference specific interests and traits of your leads,
                making them feel seen and understood from the first interaction.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Singaporean Localization</Card.Title>
              <Card.Text>
                We've specifically designed our system to connect with Singaporean fitness enthusiasts,
                using language patterns and expressions that resonate with the local audience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Proven Templates</Card.Title>
              <Card.Text>
                Our message templates are based on real-world success stories from fitness professionals
                who have grown their client base through effective social media outreach.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <h2 className="mb-4">Why Focus on Instagram?</h2>
              <p>
                Instagram has become the premier platform for fitness professionals to connect with potential clients.
                With its visual nature and engaged fitness community, it's the perfect place to showcase your expertise
                and connect with people who are actively interested in improving their fitness.
              </p>
              <p>
                Our message templates are specifically designed for Instagram DMs, with the right tone, length, and
                structure to maximize response rates and start meaningful conversations that convert to training clients.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <h2 className="text-center mb-4">Our Team</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '100px', height: '100px' }}>
                <span className="h1 text-muted">JD</span>
              </div>
              <Card.Title>John Doe</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Fitness Marketing Expert</Card.Subtitle>
              <Card.Text>
                Former personal trainer with 10+ years of experience in fitness marketing and client acquisition.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '100px', height: '100px' }}>
                <span className="h1 text-muted">JS</span>
              </div>
              <Card.Title>Jane Smith</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">AI Specialist</Card.Subtitle>
              <Card.Text>
                AI specialist with a background in natural language processing and a passion for fitness.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '100px', height: '100px' }}>
                <span className="h1 text-muted">RJ</span>
              </div>
              <Card.Title>Robert Johnson</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Singapore Market Specialist</Card.Subtitle>
              <Card.Text>
                Expert in the Singaporean fitness market with deep knowledge of local culture and communication styles.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage; 