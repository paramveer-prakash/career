import { useState, useCallback } from 'react';
import { AIService, ChatMessage, ChatRequest, ChatResponse, ResumeContext } from '@/services/ai-service';
import { getErrorMessage } from '@/utils/error-utils';

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}

export function useAIChat(resumeId: string) {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    loading: false,
    error: null,
  });

  const addMessage = useCallback((message: ChatMessage) => {
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }, []);

  const sendMessage = useCallback(async (message: string, resumeContext?: ResumeContext) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
      type: 'question'
    };

    addMessage(userMessage);
    setChatState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const request: ChatRequest = {
        resumeId,
        message,
        conversationHistory: chatState.messages,
        resumeContext
      };

      const response: ChatResponse = await AIService.chatWithResume(request);

      if (response.success && response.message) {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.message,
          timestamp: new Date(),
          type: 'advice'
        };

        addMessage(assistantMessage);
      } else {
        throw new Error(response.error || 'Failed to get AI response');
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, 'Failed to send message');
      setChatState(prev => ({ ...prev, error: errorMessage }));
      
      const errorChatMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        type: 'clarification'
      };
      
      addMessage(errorChatMessage);
    } finally {
      setChatState(prev => ({ ...prev, loading: false }));
    }
  }, [resumeId, chatState.messages, addMessage]);

  const clearChat = useCallback(() => {
    setChatState({
      messages: [],
      loading: false,
      error: null
    });
  }, []);

  const getSuggestions = useCallback(async (message: string, resumeContext?: ResumeContext) => {
    try {
      const request: ChatRequest = {
        resumeId,
        message,
        conversationHistory: chatState.messages,
        resumeContext
      };

      const response: ChatResponse = await AIService.chatWithResume(request);
      return response.suggestions || [];
    } catch (error: unknown) {
      console.error('Failed to get suggestions:', error);
      return [];
    }
  }, [resumeId, chatState.messages]);

  const getFollowUpQuestions = useCallback(async (message: string, resumeContext?: ResumeContext) => {
    try {
      const request: ChatRequest = {
        resumeId,
        message,
        conversationHistory: chatState.messages,
        resumeContext
      };

      const response: ChatResponse = await AIService.chatWithResume(request);
      return response.followUpQuestions || [];
    } catch (error: unknown) {
      console.error('Failed to get follow-up questions:', error);
      return [];
    }
  }, [resumeId, chatState.messages]);

  return {
    ...chatState,
    sendMessage,
    clearChat,
    getSuggestions,
    getFollowUpQuestions,
    addMessage
  };
}
