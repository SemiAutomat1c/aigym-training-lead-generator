import React, { useState } from 'react';
import './styles/App.css';
import MessageGenerator from './components/MessageGenerator';
import TestExamples from './components/TestExamples';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import Home from './components/Home';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'generator':
        return <MessageGenerator />;
      case 'examples':
        return <TestExamples />;
      case 'about':
        return <AboutPage />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 py-3">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 rounded-md ${currentPage === 'home' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('generator')}
              className={`px-3 py-2 rounded-md ${currentPage === 'generator' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Message Generator
            </button>
            <button 
              onClick={() => setCurrentPage('examples')}
              className={`px-3 py-2 rounded-md ${currentPage === 'examples' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Template Examples
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`px-3 py-2 rounded-md ${currentPage === 'about' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              About
            </button>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App; 