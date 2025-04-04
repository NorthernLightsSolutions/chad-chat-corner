
import React from 'react';
import ChatWidget from '@/components/ChatWidget';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Website Content</h1>
        <p className="text-xl text-gray-600 mb-8">Your main website content would be here.</p>
        <p className="text-gray-500">The chat widget is located in the bottom left corner.</p>
      </div>
      <ChatWidget />
    </div>
  );
};

export default Index;
