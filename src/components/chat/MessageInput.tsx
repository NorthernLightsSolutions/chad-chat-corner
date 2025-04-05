
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
    <div className="bg-white p-3 border-t border-gray-200 flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Waar kunnen we je mee helpen?"
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={onSend}
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
  );
};

export default MessageInput;
