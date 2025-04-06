
import React, { useRef, useEffect } from 'react';
import ChatMessage from '../ChatMessage';
import { Message } from '@/hooks/useChat';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="bg-white p-3 h-[310px] overflow-y-auto flex flex-col gap-3">
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
          <div className="bg-gray-100 rounded-3xl px-3 py-1 shadow flex items-center max-w-[75%]">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
