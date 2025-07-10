import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

// Custom NavLink component that combines Nav.Link and Link
const NavLinkRouter = ({ to, active, children }: {
  to: string;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <Nav.Item>
    <Link to={to} className={`nav-link ${active ? 'active' : ''}`}>
      {children}
    </Link>
  </Nav.Item>
);

// Custom NavBrand component that combines Navbar.Brand and Link
const NavBrandRouter = ({ to, children }: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link to={to} className="navbar-brand">
    {children}
  </Link>
);

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <NavBrandRouter to="/">AI Gym Training Lead Generator</NavBrandRouter>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLinkRouter 
              to="/" 
              active={location.pathname === '/'}
            >
              Home
            </NavLinkRouter>
            <NavLinkRouter 
              to="/batch" 
              active={location.pathname === '/batch'}
            >
              Batch Generator
            </NavLinkRouter>
            <NavLinkRouter 
              to="/formatter" 
              active={location.pathname === '/formatter'}
            >
              Lead Formatter
            </NavLinkRouter>
            <NavLinkRouter 
              to="/test-examples" 
              active={location.pathname === '/test-examples'}
            >
              Test Examples
            </NavLinkRouter>
            <NavLinkRouter 
              to="/about" 
              active={location.pathname === '/about'}
            >
              About
            </NavLinkRouter>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 