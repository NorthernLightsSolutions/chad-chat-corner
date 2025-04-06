
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
          "rounded-2xl px-3 py-1.5 shadow-sm text-xs",
          isUser 
            ? "bg-indigo-600 text-white" 
            : "bg-gray-100 text-gray-800"
        )}>
          {message}
        </div>
        <div className={cn(
          "text-[10px] mt-0.5 text-gray-400",
          isUser ? "text-right" : "text-left"
        )}>
          {format(timestamp, 'HH:mm', { locale: nl })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
