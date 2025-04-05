
import React from 'react';
import { MinusCircle, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onMinimize, onClose }) => {
  return (
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
        <button 
          onClick={onMinimize}
          className="bg-white text-indigo-700 hover:bg-indigo-100 rounded-md px-2 py-1 text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
        >
          <MinusCircle size={16} />
          <span>Min</span>
        </button>
        <button 
          id="chat-close-button"
          onClick={onClose}
          className="bg-white text-indigo-700 hover:bg-indigo-100 rounded-md px-2 py-1 text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
        >
          <X size={16} />
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
