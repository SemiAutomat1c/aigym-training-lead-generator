import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Spinner, Alert, Table } from 'react-bootstrap';
import { generateMessage } from '../services/aiService';

interface Lead {
  name: string;
  interests: string;
  location: string;
}

interface BatchMessage {
  lead: Lead;
  message: string;
  isGenerated: boolean;
  isError: boolean;
}

const BatchMessageGenerator: React.FC = () => {
  const [batchInput, setBatchInput] = useState<string>('');
  const [messageType, setMessageType] = useState('instagram');
  const [tone, setTone] = useState('friendly');
  const [template, setTemplate] = useState('Gym Training Offer');
  const [batchMessages, setBatchMessages] = useState<BatchMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  // Parse the batch input into an array of leads
  const parseLeads = (input: string): Lead[] => {
    const lines = input.trim().split('\n');
    const leads: Lead[] = [];
    
    // Check if the input is in the numbered format (e.g., "1. Ryan - musician, Singapore")
    const numberedFormatRegex = /^\d+\.\s+(.+?)\s+-\s+(.+?),\s+(.+)$/;
    const isNumberedFormat = lines.some(line => numberedFormatRegex.test(line.trim()));
    
    if (isNumberedFormat) {
      // Process numbered format
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue; // Skip empty lines
        
        const match = trimmedLine.match(numberedFormatRegex);
        if (match) {
          const [, name, interests, location] = match;
          leads.push({
            name: name.trim(),
            interests: interests.trim(),
            location: location.trim() || 'Singapore'
          });
        }
      }
    } else {
      // Process original format (3 lines per lead)
      for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 < lines.length) {
          const name = lines[i].trim();
          const interests = lines[i + 1].trim();
          const location = lines[i + 2].trim() || 'Singapore';
          
          if (name) {
            leads.push({ name, interests, location });
          }
        }
      }
    }
    
    return leads;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const leads = parseLeads(batchInput);
    
    if (leads.length === 0) {
      setError('No valid leads found. Please check your input format.');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      setProgress({ current: 0, total: leads.length });
      
      // Initialize batch messages
      const initialBatchMessages: BatchMessage[] = leads.map(lead => ({
        lead,
        message: '',
        isGenerated: false,
        isError: false
      }));
      
      setBatchMessages(initialBatchMessages);
      
      // Generate messages one by one
      for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];
        setProgress({ current: i + 1, total: leads.length });
        
        try {
          const result = await generateMessage({
            leadInfo: {
              name: lead.name,
              company: '',
              industry: '',
              position: '',
              painPoints: '',
              additionalInfo: '',
              interests: lead.interests,
              location: lead.location
            },
            messageType,
            tone,
            template
          });
          
          // Update the batch messages
          setBatchMessages(prev => {
            const updated = [...prev];
            updated[i] = {
              ...updated[i],
              message: result,
              isGenerated: true
            };
            return updated;
          });
          
          // Add a small delay to avoid overwhelming the system
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
          // Handle error for this specific message
          setBatchMessages(prev => {
            const updated = [...prev];
            updated[i] = {
              ...updated[i],
              isError: true
            };
            return updated;
          });
        }
      }
    } catch (err) {
      setError('Failed to generate batch messages. Please try again.');
      console.error('Error generating batch messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Export all messages to a text file
  const exportMessages = () => {
    const content = batchMessages
      .filter(item => item.isGenerated)
      .map(item => `--- Message for ${item.lead.name} ---\n\n${item.message}\n\n`)
      .join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-messages-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy all messages to clipboard
  const copyAllToClipboard = () => {
    const content = batchMessages
      .filter(item => item.isGenerated)
      .map(item => `--- Message for ${item.lead.name} ---\n\n${item.message}\n\n`)
      .join('\n');
    
    navigator.clipboard.writeText(content)
      .then(() => {
        alert('All messages copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy messages:', err);
      });
  };

  return (
    <Container>
      <h1 className="mb-4">Batch Message Generator</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Batch Lead Information</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Enter multiple leads</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    placeholder={`Format 1 (numbered):\n1. Ryan - musician, Singapore\n2. Mei Lin - chef, Singapore\n3. Rajesh - software engineer, Singapore\n\nFormat 2 (line by line):\nJohn Smith\nmusician, fitness enthusiast\nSingapore\n\nJane Doe\nphotographer, foodie\nSingapore`}
                  />
                  <Form.Text className="text-muted">
                    Two formats accepted:
                    <br />1. Numbered format: "1. Name - interests, location"
                    <br />2. Line by line format: Name, Interests, Location (each on a separate line)
                  </Form.Text>
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
                  <Form.Label>Template</Form.Label>
                  <Form.Select 
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                  >
                    <option value="Gym Training Offer">Gym Training Offer (Instagram)</option>
                    <option value="TikTok Gym Training Offer">Gym Training Offer (TikTok)</option>
                  </Form.Select>
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
                    Generating {progress.current}/{progress.total}...
                  </>
                ) : 'Generate Batch Messages'}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      
      {batchMessages.length > 0 && (
        <Card className="mt-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Generated Messages ({batchMessages.filter(m => m.isGenerated).length}/{batchMessages.length})</h5>
            <div>
              <Button 
                variant="outline-primary" 
                size="sm"
                className="me-2"
                onClick={copyAllToClipboard}
                disabled={batchMessages.filter(m => m.isGenerated).length === 0}
              >
                Copy All
              </Button>
              <Button 
                variant="outline-success" 
                size="sm"
                onClick={exportMessages}
                disabled={batchMessages.filter(m => m.isGenerated).length === 0}
              >
                Export to File
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Interests</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {batchMessages.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.lead.name}</td>
                    <td>{item.lead.interests}</td>
                    <td>
                      {item.isError ? (
                        <span className="text-danger">Error</span>
                      ) : item.isGenerated ? (
                        <span className="text-success">Generated</span>
                      ) : (
                        <span className="text-muted">Pending</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(item.message);
                          alert(`Message for ${item.lead.name} copied to clipboard!`);
                        }}
                        disabled={!item.isGenerated}
                      >
                        Copy
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => {
                          const modal = document.createElement('div');
                          modal.style.position = 'fixed';
                          modal.style.top = '0';
                          modal.style.left = '0';
                          modal.style.width = '100%';
                          modal.style.height = '100%';
                          modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
                          modal.style.display = 'flex';
                          modal.style.alignItems = 'center';
                          modal.style.justifyContent = 'center';
                          modal.style.zIndex = '1000';
                          
                          const content = document.createElement('div');
                          content.style.backgroundColor = 'white';
                          content.style.padding = '20px';
                          content.style.borderRadius = '5px';
                          content.style.maxWidth = '80%';
                          content.style.maxHeight = '80%';
                          content.style.overflow = 'auto';
                          
                          const header = document.createElement('div');
                          header.style.display = 'flex';
                          header.style.justifyContent = 'space-between';
                          header.style.marginBottom = '10px';
                          
                          const title = document.createElement('h4');
                          title.textContent = `Message for ${item.lead.name}`;
                          
                          const closeBtn = document.createElement('button');
                          closeBtn.textContent = '×';
                          closeBtn.style.background = 'none';
                          closeBtn.style.border = 'none';
                          closeBtn.style.fontSize = '24px';
                          closeBtn.style.cursor = 'pointer';
                          closeBtn.onclick = () => document.body.removeChild(modal);
                          
                          const messageText = document.createElement('pre');
                          messageText.style.whiteSpace = 'pre-wrap';
                          messageText.style.wordBreak = 'break-word';
                          messageText.textContent = item.message;
                          
                          header.appendChild(title);
                          header.appendChild(closeBtn);
                          content.appendChild(header);
                          content.appendChild(messageText);
                          modal.appendChild(content);
                          document.body.appendChild(modal);
                        }}
                        disabled={!item.isGenerated}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default BatchMessageGenerator; 