
import React from 'react';

interface FollowUpSuggestionProps {
  text: string;
  onClick: () => void;
}

const FollowUpSuggestion: React.FC<FollowUpSuggestionProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 text-gray-700 transition-colors truncate max-w-[150px]"
    >
      {text}
    </button>
  );
};

export default FollowUpSuggestion;
