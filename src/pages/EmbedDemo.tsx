
import React from 'react';
import { Link } from 'react-router-dom';

const EmbedDemo = () => {
  const embedCode = `<!-- Add this to your website's <head> section -->
<script src="https://lovable.dev/projects/1a590242-4722-4b44-9d8c-4c031e15e60e/public/embed.js"></script>`;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-indigo-600 hover:underline">← Back to Demo</Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Chat met Chad - Embed Code</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">How to Embed the Chat Widget</h2>
          <p className="mb-4">
            Copy and paste the following code into your website's HTML to add the chat widget.
            It will appear in the bottom left corner of your website:
          </p>
          
          <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            <pre>{embedCode}</pre>
          </div>
          
          <button 
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={() => {
              navigator.clipboard.writeText(embedCode);
              alert('Embed code copied to clipboard!');
            }}
          >
            Copy to Clipboard
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Important Notes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>The chat widget will appear in the bottom left corner of your website.</li>
            <li>The widget is responsive and works on mobile devices.</li>
            <li>All chat messages are processed through your N8N webhook.</li>
            <li>You can customize the appearance by modifying the widget code.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmbedDemo;
