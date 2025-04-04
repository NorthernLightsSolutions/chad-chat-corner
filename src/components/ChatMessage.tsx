
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { nl } from 'date-fns/locale';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={cn(
      "flex",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex items-start gap-2 max-w-[80%]",
        isUser && "flex-row-reverse"
      )}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-xs">
            <img 
              src="/lovable-uploads/6cdee4f9-131b-48b9-9758-0bfceaf3ec67.png" 
              alt="Bot Avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <div className={cn(
            "rounded-lg p-3 shadow-sm",
            isUser 
              ? "bg-indigo-600 text-white rounded-br-none" 
              : "bg-white text-gray-800 rounded-bl-none"
          )}>
            {message}
          </div>
          <div className={cn(
            "text-xs mt-1 text-gray-500",
            isUser ? "text-right" : "text-left"
          )}>
            {format(timestamp, 'HH:mm', { locale: nl })}
          </div>
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
            <span className="text-gray-600 text-xs">U</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
