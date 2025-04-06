
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
        "max-w-[80%]",
      )}>
        <div className={cn(
          "rounded-3xl px-4 py-2 shadow-sm",
          isUser 
            ? "bg-indigo-600 text-white" 
            : "bg-gray-100 text-gray-800"
        )}>
          {message}
        </div>
        <div className={cn(
          "text-xs mt-1 text-gray-400",
          isUser ? "text-right" : "text-left"
        )}>
          {format(timestamp, 'HH:mm', { locale: nl })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
