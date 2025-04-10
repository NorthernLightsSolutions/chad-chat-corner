
import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onMinimize, onClose }) => {
  return (
    <div className="bg-gradient-to-b from-indigo-600 to-indigo-500 text-white pt-2 pb-6 px-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 border border-white">
            <AvatarImage 
              src="/lovable-uploads/6cdee4f9-131b-48b9-9758-0bfceaf3ec67.png" 
              alt="Northern Lights Logo" 
            />
            <AvatarFallback className="bg-indigo-700">NL</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-xs">Chat met Chad</h3>
            <p className="text-[10px] text-indigo-200">We're online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onMinimize}
            className="text-white hover:text-indigo-200 transition-colors p-1"
            aria-label="Minimize chat"
          >
            <ChevronDown size={16} />
          </button>
          <button 
            id="chat-close-button"
            onClick={onClose}
            className="text-white hover:text-indigo-200 transition-colors p-1"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      {/* Wave shape */}
      <div className="absolute -bottom-1 left-0 right-0 w-full h-4 overflow-hidden z-10">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ChatHeader;
