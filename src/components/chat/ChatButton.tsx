
import React from 'react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-0 shadow-lg transition-all duration-300 flex items-center justify-center w-16 h-16 overflow-hidden"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <img 
          src="https://northernlights.solutions/assets/images/image04.png" 
          alt="Northern Lights Logo" 
          className="w-full h-full object-cover" 
        />
        <span className="absolute text-white text-xs font-bold flex flex-col items-center" style={{ textShadow: '1px 1px 1px black' }}>
          <span>Chad</span>
          <span>with me</span>
        </span>
      </div>
    </button>
  );
};

export default ChatButton;
