import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} AI Gym Training Lead Generator</p>
        <p className="text-sm mt-1">Personalized message generation for gym training leads</p>
      </div>
    </footer>
  );
};

export default Footer; 