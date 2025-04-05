
import React from 'react';
import FollowUpSuggestion from '../FollowUpSuggestion';

interface SuggestionsAreaProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionsArea: React.FC<SuggestionsAreaProps> = ({ 
  suggestions, 
  onSuggestionClick 
}) => {
  return (
    <div className="bg-gray-50 p-2 border-t border-gray-200">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <FollowUpSuggestion 
            key={index} 
            text={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestionsArea;
