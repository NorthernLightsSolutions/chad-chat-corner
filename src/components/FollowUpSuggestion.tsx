
import React from 'react';

interface FollowUpSuggestionProps {
  text: string;
  onClick: () => void;
}

const FollowUpSuggestion: React.FC<FollowUpSuggestionProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-xs bg-white border border-indigo-300 rounded-full px-3 py-1 hover:bg-indigo-50 text-indigo-700 transition-colors truncate max-w-[150px] shadow-sm"
    >
      {text}
    </button>
  );
};

export default FollowUpSuggestion;
