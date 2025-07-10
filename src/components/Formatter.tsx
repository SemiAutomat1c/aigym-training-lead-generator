import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

const Formatter: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [outputData, setOutputData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  interface ParsedLead {
    name: string;
    interests: string;
    additionalInfo: string;
  }

  const parseRawData = (data: string): ParsedLead[] => {
    const lines = data.trim().split('\n');
    const leads: ParsedLead[] = [];
    
    // Check if the input might be tab-separated
    const tabSeparatedFormat = lines.some(line => line.includes('\t'));
    
    if (tabSeparatedFormat) {
      // Process tab-separated format
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue; // Skip empty lines
        
        const parts = trimmedLine.split('\t');
        if (parts.length >= 2) {
          const name = parts[0].trim();
          const interests = parts[1].trim();
          // For the third column, preserve it as additional info
          const additionalInfo = parts[2]?.trim() || '';
          
          if (name) {
            leads.push({
              name,
              interests,
              additionalInfo
            });
          }
        }
      }
    } else {
      // Process three lines per lead format
      for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 < lines.length) {
          const name = lines[i].trim();
          const interests = lines[i + 1].trim();
          const additionalInfo = lines[i + 2].trim();
          
          if (name) {
            leads.push({ name, interests, additionalInfo });
          }
        }
      }
    }
    
    return leads;
  };

  const formatData = () => {
    try {
      setError(null);
      setSuccess(null);
      
      if (!inputData.trim()) {
        setError('Please enter some data to format');
        return;
      }
      
      const parsedLeads = parseRawData(inputData);
      
      if (parsedLeads.length === 0) {
        setError('No valid leads found. Please check your input format.');
        return;
      }
      
      // Format as three lines per lead
      const formattedOutput = parsedLeads.map(lead => 
        `${lead.name}\n${lead.interests}\n${lead.additionalInfo}`
      ).join('\n\n');
      
      setOutputData(formattedOutput);
      setSuccess(`Successfully formatted ${parsedLeads.length} leads!`);
    } catch (err) {
      console.error('Error formatting data:', err);
      setError('Failed to format data. Please check your input format.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputData)
      .then(() => {
        setSuccess('Formatted data copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setError('Failed to copy to clipboard.');
      });
  };

  const clearAll = () => {
    setInputData('');
    setOutputData('');
    setError(null);
    setSuccess(null);
  };

  return (
    <Container>
      <h1 className="mb-4">Lead Data Formatter</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Input Data</Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Paste your raw lead data</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder={`Format 1 (tab-separated):\nDrake\tPhotography/Gaming\tbased on profile pic, likes to travel\nAlex Ng\tRunning Sports\tBased on profile pic, likes to do a marathon\n\nFormat 2 (three lines per lead):\nDrake\nPhotography/Gaming\nbased on profile pic, likes to travel\n\nAlex Ng\nRunning Sports\nBased on profile pic, likes to do a marathon`}
                />
                <Form.Text className="text-muted">
                  Supports two formats: tab-separated or three lines per lead (Name, Interests, Additional Info)
                </Form.Text>
              </Form.Group>
              <div className="d-flex flex-wrap gap-2">
                <Button 
                  variant="primary" 
                  onClick={formatData}
                >
                  Format Data
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={clearAll}
                >
                  Clear All
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Output Format</Card.Header>
            <Card.Body>
              <p>Output will be in the standard three-line format:</p>
              <pre className="bg-light p-2 rounded">
                Name<br/>
                Interests<br/>
                Additional Info
              </pre>
              <p className="text-muted small">
                Multiple interests can be separated with "/" (e.g., Photography/Gaming)
              </p>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Formatted Output</span>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={copyToClipboard}
                disabled={!outputData}
              >
                Copy to Clipboard
              </Button>
            </Card.Header>
            <Card.Body>
              <Form.Control
                as="textarea"
                rows={10}
                value={outputData}
                readOnly
                placeholder="Formatted data will appear here"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Formatter; 