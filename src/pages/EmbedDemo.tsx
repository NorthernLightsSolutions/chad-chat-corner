
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { CheckCircle } from 'lucide-react';

const EmbedDemo = () => {
  const [copied, setCopied] = useState(false);
  
  const embedCode = `<!-- Northern Lights Chat Widget - Chad -->
<script src="https://lovable.dev/projects/1a590242-4722-4b44-9d8c-4c031e15e60e/public/embed.js"></script>`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast({
      title: "Gekopieerd!",
      description: "De embed code is naar je klembord gekopieerd.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-indigo-600 hover:underline">← Terug naar Demo</Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Chat met Chad - Embed Code</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Hoe je de Chat Widget kunt embedden</h2>
          <p className="mb-4">
            Kopieer en plak de volgende code in de &lt;head&gt; sectie van je website om de chat widget toe te voegen.
            Deze zal linksonder op je website verschijnen:
          </p>
          
          <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            <pre>{embedCode}</pre>
          </div>
          
          <button 
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
            onClick={handleCopyToClipboard}
          >
            {copied ? <CheckCircle size={18} /> : null}
            {copied ? "Gekopieerd!" : "Kopieer naar Klembord"}
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Belangrijke Opmerkingen</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>De chat widget verschijnt linksonder op je website.</li>
            <li>De widget is responsief en werkt op mobiele apparaten.</li>
            <li>Alle chatberichten worden verwerkt via je N8N webhook.</li>
            <li>Je kunt de weergave aanpassen door de widget-code te wijzigen.</li>
            <li>De gebruiker kan de chat minimaliseren of sluiten met de knoppen rechtsboven in de widget.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmbedDemo;
