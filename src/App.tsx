import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Header from './components/Header';
import Home from './components/Home';
import BatchMessageGenerator from './components/BatchMessageGenerator';
import AboutPage from './components/AboutPage';
import Formatter from './components/Formatter';

const App: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'AI Gym Training Lead Generator';
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/batch" element={<BatchMessageGenerator />} />
          <Route path="/formatter" element={<Formatter />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App; 