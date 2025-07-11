import React, { useEffect } from 'react';

const Header: React.FC = () => {
  useEffect(() => {
    document.title = 'AI Gym Training Lead Generator';
  }, []);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center">AI Gym Training Lead Generator</h1>
        <p className="text-center mt-2">Generate personalized Instagram DM messages for gym training leads</p>
      </div>
    </header>
  );
};

export default Header; 