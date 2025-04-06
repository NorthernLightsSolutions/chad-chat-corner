
import { useState, useEffect } from 'react';

// Type definitions
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// N8N webhook URL
const WEBHOOK_URL = 'https://n8n.northernlights.solutions/webhook/f1490af2-fb73-48f4-943b-1205992cb726';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial bot message when chat is opened
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        content: 'Hallo! Ik ben Chad, je persoonlijke assistent. Hoe kan ik je vandaag helpen?',
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }
  }, [messages.length]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && message.trim()) {
      sendMessage();
    }
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
      // Send message to N8N webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      // Process the response
      let botResponseText = "Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.";
      
      try {
        if (response.ok) {
          const data = await response.text();
          if (data) {
            try {
              const jsonResponse = JSON.parse(data);
              if (jsonResponse && jsonResponse.response) {
                botResponseText = jsonResponse.response;
              }
            } catch (jsonError) {
              // If not JSON, use the text response
              if (data.trim()) {
                botResponseText = data;
              }
            }
          }
        } else {
          console.error('Error response from webhook:', response.status);
          botResponseText = "Er is een probleem met de verbinding. Probeer het later nog eens.";
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
      }
      
      // Add bot response to chat
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
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

  return {
    messages,
    message,
    isLoading,
    handleMessageChange,
    handleKeyPress,
    sendMessage,
    setMessage
  };
};
