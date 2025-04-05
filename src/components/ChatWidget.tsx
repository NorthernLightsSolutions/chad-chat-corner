
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/useChat';

// Import refactored components
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import SuggestionsArea from './chat/SuggestionsArea';
import MessageInput from './chat/MessageInput';
import ChatButton from './chat/ChatButton';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const {
    messages,
    message,
    isLoading,
    suggestions,
    handleMessageChange,
    handleKeyPress,
    handleSuggestionClick,
    sendMessage
  } = useChat();

  // Send message to parent window when close button is clicked
  useEffect(() => {
    if (window.parent && window.parent !== window) {
      const sendMessageToParent = () => {
        window.parent.postMessage('close-chat', '*');
      };
      
      // Attach event listener to close button
      const closeButton = document.getElementById('chat-close-button');
      if (closeButton) {
        closeButton.addEventListener('click', sendMessageToParent);
      }
      
      return () => {
        if (closeButton) {
          closeButton.removeEventListener('click', sendMessageToParent);
        }
      };
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Icon Button - only visible when chat is closed */}
      {!isOpen && <ChatButton onClick={toggleChat} />}

      {/* Main Chat Widget */}
      <div 
        className={cn(
          "fixed bottom-6 left-6 z-50 w-[350px] rounded-lg shadow-xl transition-all duration-300 overflow-hidden",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none",
          isMinimized ? "h-14" : "h-[500px]"
        )}
      >
        {/* Chat Header */}
        <ChatHeader 
          onMinimize={toggleMinimize} 
          onClose={toggleChat}
        />

        {/* Chat Body - hidden when minimized */}
        {!isMinimized && (
          <>
            {/* Messages Area */}
            <MessageList 
              messages={messages} 
              isLoading={isLoading} 
            />

            {/* Suggestions Area */}
            <SuggestionsArea 
              suggestions={suggestions} 
              onSuggestionClick={handleSuggestionClick} 
            />

            {/* Message Input */}
            <MessageInput 
              message={message}
              isLoading={isLoading}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
              onSend={() => sendMessage()}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
