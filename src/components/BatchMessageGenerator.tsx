import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Spinner, Alert, Table, Badge } from 'react-bootstrap';
import { generateMessage } from '../services/aiService';

interface Lead {
  name: string;
  interests: string;
}

interface BatchMessage {
  lead: Lead;
  message: string;
  isGenerated: boolean;
  isError: boolean;
}

const BatchMessageGenerator: React.FC = () => {
  const [batchInput, setBatchInput] = useState<string>('');
  const [tone, setTone] = useState('level0');
  const [template, setTemplate] = useState('company');
  const [batchMessages, setBatchMessages] = useState<BatchMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const MAX_PROFILES = 200; // Maximum number of profiles as per client requirements

  // Parse the batch input into an array of leads
  const parseLeads = (input: string): Lead[] => {
    const lines = input.trim().split('\n');
    const leads: Lead[] = [];
    
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
          // Additional info is now incorporated into interests if present
          const additionalInfo = parts[2]?.trim() || '';
          
          if (name) {
            leads.push({
              name,
              interests: additionalInfo ? `${interests} / ${additionalInfo}` : interests
            });
          }
        }
      }
    } else {
      // Process leads separated by empty lines
      const blocks = input.split(/\n\s*\n/);
      
      for (const block of blocks) {
        if (!block.trim()) continue;
        
        const blockLines = block.trim().split('\n');
        if (blockLines.length >= 1) {
          const name = blockLines[0].trim();
          
          // Handle different formats
          if (blockLines.length >= 3) {
            // Three-line format: name, trait1, trait2
            const trait1 = blockLines[1].trim();
            const trait2 = blockLines[2].trim();
            
            if (name) {
              leads.push({
                name,
                interests: `${trait1} / ${trait2}`
              });
            }
          } else if (blockLines.length >= 2) {
            // Two-line format: name, traits (may already contain " / ")
            const traits = blockLines[1].trim();
            
            if (name) {
              leads.push({ name, interests: traits });
            }
          } else {
            // Just name
            if (name) {
              leads.push({ name, interests: '' });
            }
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
    
    if (leads.length > MAX_PROFILES) {
      setError(`Too many profiles (${leads.length}). Maximum allowed is ${MAX_PROFILES} for quality purposes.`);
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
              interests: lead.interests,
              company: '',
              industry: '',
              position: '',
              painPoints: '',
              additionalInfo: '',
              location: 'Singapore' // Default location
            },
            messageType: 'instagram',
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

  // Calculate the number of leads from the current input
  const calculateLeadCount = (): number => {
    return parseLeads(batchInput).length;
  };

  const leadCount = calculateLeadCount();
  const isOverLimit = leadCount > MAX_PROFILES;

  return (
    <Container>
      <h1 className="mb-4">Batch Message Generator</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Batch Lead Information</span>
                <Badge bg={isOverLimit ? "danger" : leadCount > 0 ? "success" : "secondary"}>
                  {leadCount} / {MAX_PROFILES} Profiles
                </Badge>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Enter multiple leads</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    placeholder="Name&#10;trait1 / trait2&#10;&#10;Name&#10;trait1 / trait2"
                  />
                  <Form.Text className="text-muted">
                    Format options:
                    <ul className="mt-1">
                      <li>One lead per block (separated by empty lines)</li>
                      <li>First line: Name</li>
                      <li>Second line: Traits separated by " / " (space-slash-space)</li>
                      <li>Example: "Henry&#10;works at (ig/mindmusclesg) / traveling with fam"</li>
                      <li>Or tab-separated format: "Name[tab]trait1 / trait2"</li>
                    </ul>
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
                  <Form.Label>Message Tone</Form.Label>
                  <Form.Select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option value="level0">Level 0 - Normal</option>
                    <option value="level2">Level 2 - BTW Singlish</option>
                    <option value="level3">Level 3 - BTW & PS Singlish</option>
                    <option value="level4">Level 4 - Full Singlish</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Template</Form.Label>
                  <Form.Select 
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                  >
                    <option value="company">Company Account (Jet)</option>
                    <option value="max-company">Max - Company Account</option>
                    <option value="followup">Normal Follow-up (Bob)</option>
                    <option value="bob-followup">BOB - Follow-up</option>
                    <option value="matthew-followup">MATTHEW - Follow-up</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
            
            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isLoading || leadCount === 0 || isOverLimit}
              >
                {isLoading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                    Generating ({progress.current}/{progress.total})
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
            <span>Generated Messages</span>
            <div>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                className="me-2"
                onClick={copyAllToClipboard}
                disabled={!batchMessages.some(msg => msg.isGenerated)}
              >
                Copy All
              </Button>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={exportMessages}
                disabled={!batchMessages.some(msg => msg.isGenerated)}
              >
                Export All
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Traits</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {batchMessages.map((item, index) => (
                  <tr key={index} className={item.isError ? 'table-danger' : ''}>
                    <td>{index + 1}</td>
                    <td>{item.lead.name}</td>
                    <td>{item.lead.interests}</td>
                    <td>
                      {item.isGenerated ? (
                        <div style={{ maxHeight: '150px', overflow: 'auto' }}>
                          <pre style={{ whiteSpace: 'pre-wrap' }}>{item.message}</pre>
                        </div>
                      ) : item.isError ? (
                        <span className="text-danger">Failed to generate</span>
                      ) : (
                        <span className="text-muted">Pending...</span>
                      )}
                    </td>
                    <td>
                      {item.isGenerated && (
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(item.message)}
                        >
                          Copy
                        </Button>
                      )}
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