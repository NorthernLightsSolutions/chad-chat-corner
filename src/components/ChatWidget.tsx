
import React, { useState, useRef, useEffect } from 'react';
import { Send, MinusCircle, X, MessageCircle } from 'lucide-react';
import ChatMessage from './ChatMessage';
import FollowUpSuggestion from './FollowUpSuggestion';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// N8N webhook URL - updated to new test endpoint
const WEBHOOK_URL = 'https://n8n.northernlights.solutions/webhook-test/f1490af2-fb73-48f4-943b-1205992cb726';

// Type definitions
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Wat zijn jullie diensten?",
    "Kan ik een demo aanvragen?",
    "Wat zijn jullie openingstijden?",
    "Hoe kan ik contact opnemen?",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial bot message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        content: 'Hallo! Ik ben Chad, je persoonlijke assistent. Hoe kan ik je vandaag helpen?',
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && message.trim()) {
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    sendMessage(suggestion);
  };

  const sendMessage = async (text = message) => {
    if (!text.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Send message to N8N webhook with correct headers and body format - sending only the query text
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      let responseData;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        // Handle non-JSON responses
        const textResponse = await response.text();
        responseData = { response: textResponse || "Received response, but no content was returned." };
      }
      
      // Add bot response to chat
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseData.response || "Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      
      // Update suggestions based on context
      setSuggestions([
        "Vertel me meer over Northern Lights",
        "Wat zijn jullie prijzen?",
        "Hoe kan ik een afspraak maken?",
        "Bedankt voor je hulp",
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message if request fails
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Er is een probleem met de verbinding. Probeer het later nog eens.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Icon Button - only visible when chat is closed */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 left-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-0 shadow-lg transition-all duration-300 flex items-center justify-center w-16 h-16 overflow-hidden"
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <img 
              src="/lovable-uploads/6cdee4f9-131b-48b9-9758-0bfceaf3ec67.png" 
              alt="Northern Lights Logo" 
              className="w-full h-full object-cover" 
            />
            <span className="absolute text-white text-xs font-bold flex flex-col items-center" style={{ textShadow: '1px 1px 1px black' }}>
              <span>Chad</span>
              <span>with me</span>
            </span>
          </div>
        </button>
      )}

      {/* Main Chat Widget */}
      <div 
        className={cn(
          "fixed bottom-6 left-6 z-50 w-[350px] rounded-lg shadow-xl transition-all duration-300 overflow-hidden",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none",
          isMinimized ? "h-14" : "h-[500px]"
        )}
      >
        {/* Chat Header */}
        <div className="bg-indigo-600 text-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-white">
              <AvatarImage 
                src="/lovable-uploads/6cdee4f9-131b-48b9-9758-0bfceaf3ec67.png" 
                alt="Northern Lights Logo" 
              />
              <AvatarFallback className="bg-indigo-700">NL</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Chat met Chad</h3>
              <p className="text-xs text-indigo-200">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleMinimize} className="hover:text-indigo-200 p-1">
              <MinusCircle size={18} />
            </button>
            <button onClick={toggleChat} className="hover:text-indigo-200 p-1">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat Body - hidden when minimized */}
        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="bg-gray-100 p-3 h-[370px] overflow-y-auto flex flex-col gap-4">
              {messages.map((msg) => (
                <ChatMessage 
                  key={msg.id} 
                  message={msg.content} 
                  isUser={msg.sender === 'user'}
                  timestamp={msg.timestamp}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-2 shadow flex items-center gap-2 max-w-[75%] animate-pulse">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex-shrink-0"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Area */}
            <div className="bg-gray-50 p-2 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <FollowUpSuggestion 
                    key={index} 
                    text={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                  />
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white p-3 border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                placeholder="Waar kunnen we je mee helpen?"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!message.trim() || isLoading}
                className={cn(
                  "p-2 rounded-full",
                  message.trim() && !isLoading
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                <Send size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
