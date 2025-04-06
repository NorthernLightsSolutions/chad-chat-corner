
import React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  message: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  message, 
  isLoading, 
  onChange, 
  onKeyPress, 
  onSend 
}) => {
  return (
    <div className="bg-white p-2 border-t border-gray-200 flex items-center gap-2 relative">
      <input
        type="text"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Type in a message..."
        className="flex-1 bg-gray-100 border-none rounded-full px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner"
      />
      <button
        onClick={onSend}
        disabled={!message.trim() || isLoading}
        className={cn(
          "p-2 rounded-full shadow-md",
          message.trim() && !isLoading
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-300 text-gray-400 cursor-not-allowed"
        )}
        aria-label="Send message"
      >
        <Send size={16} />
      </button>
    </div>
  );
};

export default MessageInput;
