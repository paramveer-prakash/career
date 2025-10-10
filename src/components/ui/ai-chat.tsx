'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/services/ai-service';
import { useAIChat } from '@/hooks/use-ai-chat';
import { Resume } from '@/services/resume-service';

interface AIChatProps {
  resumeId: string;
  resume: Resume;
  isOpen: boolean;
  onClose: () => void;
  onOpenInterviewPrep?: () => void;
  onOpenCareerGuidance?: () => void;
  isSidebarMode?: boolean;
}

export function AIChat({ resumeId, resume, isOpen, onClose, onOpenInterviewPrep, onOpenCareerGuidance, isSidebarMode = false }: AIChatProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, loading, error, sendMessage, clearChat } = useAIChat(resumeId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setSuggestions([
        "Help me write a better summary",
        "Review my skills section",
        "Improve my work experience",
        "Check my resume format"
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const resumeContext = {
      skills: resume.skills?.map(s => s.name) || [],
      workExperiences: resume.workExperiences?.map(w => w.jobTitle) || [],
      education: resume.educations?.map(e => e.degree).filter((degree): degree is string => Boolean(degree)) || [],
      currentRole: resume.title
    };

    await sendMessage(inputMessage, resumeContext);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setInputMessage(suggestion);
    // Wait for state update, then send message
    setTimeout(async () => {
      if (!loading) {
        const resumeContext = {
          skills: resume.skills?.map(s => s.name) || [],
          workExperiences: resume.workExperiences?.map(w => w.jobTitle) || [],
          education: resume.educations?.map(e => e.degree).filter((degree): degree is string => Boolean(degree)) || [],
          currentRole: resume.title
        };
        await sendMessage(suggestion, resumeContext);
        setInputMessage('');
      }
    }, 0);
  };


  const getMessageIcon = (message: ChatMessage) => {
    switch (message.type) {
      case 'question': return '❓';
      case 'advice': return '💡';
      case 'suggestion': return '✨';
      case 'clarification': return '🤔';
      default: return message.role === 'user' ? '👤' : '🤖';
    }
  };

  const getMessageBgColor = (message: ChatMessage) => {
    if (message.role === 'user') {
      return 'bg-blue-500 text-white';
    }
    
    switch (message.type) {
      case 'advice': return 'bg-green-50 border-green-200';
      case 'suggestion': return 'bg-purple-50 border-purple-200';
      case 'clarification': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  if (!isOpen) return null;

  // Sidebar mode - render content only
  if (isSidebarMode) {
    return (
      <div className="h-full flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">Start a conversation to get AI-powered resume advice!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 border text-sm ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : getMessageBgColor(message)
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm">{getMessageIcon(message)}</span>
                    <div className="flex-1">
                      <p className="leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🤖</span>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/50 max-h-32 overflow-y-auto">
            <p className="text-xs font-medium text-slate-700 mb-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
          <div className="flex gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your resume..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none text-sm"
              rows={2}
              disabled={loading}
              style={{ minHeight: '40px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || loading}
              className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-600">{error}</p>
          )}
          {/* Debug info - remove in production */}
          <div className="mt-2 text-xs text-gray-400">
            Input length: {inputMessage.length} | Loading: {loading ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    );
  }

  // Modal mode - original implementation
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border-2 border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🤖</span>
            <div>
              <h2 className="text-xl font-semibold">AI Resume Assistant</h2>
              <p className="text-sm opacity-90">Get personalized advice for your resume</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenInterviewPrep && (
              <button
                onClick={onOpenInterviewPrep}
                className="px-3 py-1.5 text-sm bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
              >
                🎯 Interview Prep
              </button>
            )}
            {onOpenCareerGuidance && (
              <button
                onClick={onOpenCareerGuidance}
                className="px-3 py-1.5 text-sm bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
              >
                🚀 Career Guidance
              </button>
            )}
            <button
              onClick={clearChat}
              className="px-3 py-1.5 text-sm bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
            >
              Clear Chat
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-slate-500">Start a conversation to get AI-powered resume advice!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 border ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : getMessageBgColor(message)
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{getMessageIcon(message)}</span>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-200 bg-slate-50/50 max-h-40 overflow-y-auto">
            <p className="text-sm font-medium text-slate-700 mb-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}


        {/* Input */}
        <div className="p-6 border-t border-slate-200 bg-white flex-shrink-0">
          <div className="flex gap-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your resume..."
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
              rows={2}
              disabled={loading}
              style={{ minHeight: '48px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || loading}
              className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          {/* Debug info - remove in production */}
          <div className="mt-2 text-xs text-gray-400">
            Input length: {inputMessage.length} | Loading: {loading ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </div>
  );
}
