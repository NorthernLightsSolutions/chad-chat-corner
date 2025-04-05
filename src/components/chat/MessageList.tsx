
import React, { useRef, useEffect } from 'react';
import ChatMessage from '../ChatMessage';
import { Message } from '@/hooks/useChat';
import { Skeleton } from "@/components/ui/skeleton";

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
  );
};

export default MessageList;
