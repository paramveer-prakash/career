'use client';

interface AISuggestion {
  id: string;
  content: string;
  type: 'enhancement' | 'recommendation' | 'alternative';
  confidence: number;
}

interface AISuggestionsPanelProps {
  suggestions: AISuggestion[];
  onApply: (suggestion: AISuggestion) => void;
  onDismiss: (suggestionId: string) => void;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AISuggestionsPanel({ 
  suggestions, 
  onApply, 
  onDismiss, 
  title = "AI Suggestions",
  isOpen,
  onClose
}: AISuggestionsPanelProps) {

  if (!isOpen) return null;

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'enhancement': return '✨';
      case 'recommendation': return '💡';
      case 'alternative': return '🔄';
      default: return '🤖';
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'enhancement': return 'border-green-200 bg-green-50';
      case 'recommendation': return 'border-blue-200 bg-blue-50';
      case 'alternative': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border-2 border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🤖</span>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {suggestions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🤖</div>
              <p className="text-gray-500">No suggestions available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={`border rounded-xl p-4 transition-all duration-200 hover:shadow-md ${getSuggestionColor(suggestion.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">{getSuggestionIcon(suggestion.type)}</span>
                        <span className="text-sm font-medium text-gray-800 capitalize">
                          {suggestion.type} Suggestion
                        </span>
                        {suggestion.confidence && (
                          <span className="ml-3 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
                            {Math.round(suggestion.confidence * 100)}% confidence
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm">{suggestion.content}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end mt-4 space-x-2">
                    <button
                      onClick={() => onDismiss(suggestion.id)}
                      className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-colors"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => onApply(suggestion)}
                      className="px-4 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">
            AI suggestions are generated based on best practices and industry standards.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
