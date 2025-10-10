import { useState } from 'react';
import { AIService, AIEnhancementRequest, SkillRecommendationRequest, SummaryGenerationRequest } from '@/services/ai-service';
import { getErrorMessage } from '@/utils/error-utils';

export interface AIState {
  loading: boolean;
  error: string | null;
  result: unknown;
}

export function useAI() {
  const [aiState, setAIState] = useState<AIState>({
    loading: false,
    error: null,
    result: null
  });

  const setLoading = (loading: boolean) => {
    setAIState(prev => ({ ...prev, loading, error: null }));
  };

  const setError = (error: string) => {
    setAIState(prev => ({ ...prev, loading: false, error }));
  };

  const setResult = (result: unknown) => {
    setAIState(prev => ({ ...prev, loading: false, result, error: null }));
  };

  // 1. Generate Resume Summary
  const generateSummary = async (request: SummaryGenerationRequest) => {
    setLoading(true);
    try {
      const result = await AIService.generateResumeSummary(request);
      setResult(result);
      return result;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, 'Failed to generate summary');
      setError(errorMessage);
      throw error;
    }
  };

  // 2. Analyze Skill Gaps
  const analyzeSkillGaps = async (request: SkillRecommendationRequest) => {
    setLoading(true);
    try {
      const result = await AIService.analyzeSkillGaps(request);
      setResult(result);
      return result;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, 'Failed to analyze skill gaps');
      setError(errorMessage);
      throw error;
    }
  };

  // 3. Enhance Achievement
  const enhanceAchievement = async (request: AIEnhancementRequest) => {
    setLoading(true);
    try {
      const result = await AIService.enhanceAchievement(request);
      setResult(result);
      return result;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, 'Failed to enhance achievement');
      setError(errorMessage);
      throw error;
    }
  };

  // Reset AI state
  const resetAIState = () => {
    setAIState({
      loading: false,
      error: null,
      result: null
    });
  };

  return {
    ...aiState,
    generateSummary,
    analyzeSkillGaps,
    enhanceAchievement,
    resetAIState
  };
}
