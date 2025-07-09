import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import MessageGenerator from './components/MessageGenerator';
import BatchMessageGenerator from './components/BatchMessageGenerator';
import AboutPage from './components/AboutPage';

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
          <Route path="/generate" element={<MessageGenerator />} />
          <Route path="/batch" element={<BatchMessageGenerator />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App; 