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
                and building meaningful connections with potential clients. Our AI-powered platform enables you to scale
                your outreach efforts while maintaining the personal touch that makes your communication effective.
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
              <h3 className="h5">Personalization at Scale</h3>
              <p>
                Our AI analyzes lead information to create messages that feel handcrafted and personalized,
                even when processing hundreds of leads at once.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h3 className="h5">Cultural Relevance</h3>
              <p>
                With support for Singaporean English (Singlish), our messages connect authentically with
                local audiences using familiar phrases and expressions.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h3 className="h5">Data Organization</h3>
              <p>
                Our Lead Formatter tool helps you clean and organize your lead data in various formats,
                making it easier to manage your prospecting workflow.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <h2 className="mb-4">Key Features</h2>
              <Row>
                <Col md={6}>
                  <ul className="feature-list">
                    <li><strong>Single Message Generator</strong> - Create personalized messages one at a time</li>
                    <li><strong>Batch Processing</strong> - Generate up to 200 messages at once</li>
                    <li><strong>Lead Data Formatter</strong> - Clean and format lead data for easy use</li>
                    <li><strong>Singlish Support</strong> - Connect with local Singaporean audience</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="feature-list">
                    <li><strong>Interest-Based Personalization</strong> - Tailored messages based on interests</li>
                    <li><strong>Multiple Platforms</strong> - Support for Instagram, TikTok, and more</li>
                    <li><strong>Easy Export</strong> - Copy or save messages with one click</li>
                    <li><strong>Format Conversion</strong> - Convert between different lead data formats</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <h2 className="mb-4">How to Use Our Tools</h2>
              <ol className="how-to-list">
                <li>
                  <strong>Single Message Generator</strong>
                  <p>Perfect for crafting highly personalized messages for your most promising leads.</p>
                </li>
                <li>
                  <strong>Batch Message Generator</strong>
                  <p>Ideal for processing large numbers of leads efficiently while maintaining personalization.</p>
                </li>
                <li>
                  <strong>Lead Data Formatter</strong>
                  <p>Clean up and standardize your lead data before generating messages for better organization and consistency.</p>
                </li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mx-auto text-center mb-5">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Try our tools today and see how they can transform your fitness business outreach.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage; 