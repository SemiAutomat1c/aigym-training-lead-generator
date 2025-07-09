import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { generateMessage } from '../services/aiService';

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  platform: string;
}

const MessageGenerator: React.FC = () => {
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    company: '',
    industry: '',
    position: '',
    painPoints: '',
    additionalInfo: '',
    interests: '', // Added for gym template
    location: 'Singapore' // Default to Singapore for the client's target market
  });
  
  const [messageType, setMessageType] = useState('instagram');
  const [tone, setTone] = useState('friendly');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const templates: TemplateOption[] = [
    {
      id: 'gym-training',
      name: 'Gym Training Offer',
      description: 'Personalized message for gym training leads (Singaporean)',
      platform: 'instagram'
    },
    {
      id: 'tiktok-gym-training',
      name: 'TikTok Gym Training Offer',
      description: 'Short, engaging message for TikTok fitness enthusiasts',
      platform: 'tiktok'
    },
    {
      id: 'cold-email',
      name: 'Cold Email',
      description: 'First contact email to introduce your product/service',
      platform: 'email'
    },
    {
      id: 'follow-up',
      name: 'Follow-up Email',
      description: 'Follow up after initial contact',
      platform: 'email'
    },
    {
      id: 'linkedin-connect',
      name: 'LinkedIn Connection',
      description: 'Message to accompany a LinkedIn connection request',
      platform: 'linkedin'
    },
    {
      id: 'linkedin-inmail',
      name: 'LinkedIn InMail',
      description: 'Direct message to a LinkedIn prospect',
      platform: 'linkedin'
    },
    {
      id: 'meeting-request',
      name: 'Meeting Request',
      description: 'Request a meeting or call with the prospect',
      platform: 'email'
    },
    {
      id: 'value-proposition',
      name: 'Value Proposition',
      description: 'Highlight the specific value of your offering',
      platform: 'any'
    }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeadInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // Set default message type based on template
    if (templateId === 'gym-training') {
      setMessageType('instagram');
      setTone('friendly');
    } else if (templateId === 'tiktok-gym-training') {
      setMessageType('tiktok');
      setTone('casual');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTemplate) {
      setError('Please select a message template');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const selectedTemplateObj = templates.find(t => t.id === selectedTemplate);
      
      const result = await generateMessage({
        leadInfo,
        messageType,
        tone,
        template: selectedTemplateObj?.name || '',
      });
      
      setGeneratedMessage(result);
    } catch (err) {
      setError('Failed to generate message. Please try again.');
      console.error('Error generating message:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage)
      .then(() => {
        alert('Message copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy message:', err);
      });
  };
  
  const filteredTemplates = messageType === 'any' 
    ? templates 
    : templates.filter(t => t.platform === messageType || t.platform === 'any');
  
  return (
    <Container>
      <h1 className="mb-4">Generate Personalized Lead Messages</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Lead Information</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Lead Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={leadInfo.name}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={leadInfo.location}
                        onChange={handleInputChange}
                        placeholder="Singapore"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                {selectedTemplate === 'gym-training' || selectedTemplate === 'tiktok-gym-training' ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Interests/Traits</Form.Label>
                      <Form.Control
                        type="text"
                        name="interests"
                        value={leadInfo.interests}
                        onChange={handleInputChange}
                        placeholder="e.g., musician, photographer, foodie"
                      />
                      <Form.Text className="text-muted">
                        Enter interests or traits you noticed from their profile
                      </Form.Text>
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Industry</Form.Label>
                          <Form.Control
                            type="text"
                            name="industry"
                            value={leadInfo.industry}
                            onChange={handleInputChange}
                            placeholder="Technology, Healthcare, etc."
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Position/Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="position"
                            value={leadInfo.position}
                            onChange={handleInputChange}
                            placeholder="Marketing Director"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Company</Form.Label>
                      <Form.Control
                        type="text"
                        name="company"
                        value={leadInfo.company}
                        onChange={handleInputChange}
                        placeholder="Acme Inc."
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Pain Points/Challenges</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="painPoints"
                        value={leadInfo.painPoints}
                        onChange={handleInputChange}
                        placeholder="What challenges is this lead facing that your product/service can solve?"
                      />
                    </Form.Group>
                  </>
                )}
                
                <Form.Group className="mb-3">
                  <Form.Label>Additional Information</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="additionalInfo"
                    value={leadInfo.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Any other relevant information about this lead..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Message Settings</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Message Platform</Form.Label>
                  <Form.Select 
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="email">Email</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="any">Any Platform</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Message Tone</Form.Label>
                  <Form.Select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option value="friendly">Friendly</option>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="persuasive">Persuasive</option>
                    <option value="singaporean">Singaporean English</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Select Template</Form.Label>
                  <div className="template-selector">
                    <Row>
                      {filteredTemplates.map(template => (
                        <Col md={6} key={template.id} className="mb-3">
                          <Card 
                            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                            onClick={() => handleTemplateSelect(template.id)}
                          >
                            <Card.Body>
                              <Card.Title>{template.name}</Card.Title>
                              <Card.Text className="small">{template.description}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>
            
            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Generating...
                  </>
                ) : 'Generate Message'}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      
      {generatedMessage && (
        <Card className="mt-4 message-container">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Generated Message</h5>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={copyToClipboard}
            >
              Copy to Clipboard
            </Button>
          </Card.Header>
          <Card.Body>
            <div className="message-output">
              {generatedMessage}
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default MessageGenerator; 