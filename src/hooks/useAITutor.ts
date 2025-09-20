// Custom hook for AI Tutor functionality

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  AILesson, 
  TutorSession, 
  TutorPersonality,
  LearningPath,
  TutorAnalytics,
  LessonGenerationRequest,
  StudentAssessment
} from '@/types/aiTutor';
import { aiTutorService } from '@/services/aiTutorService';

interface UseAITutorOptions {
  studentId: string;
  autoGenerateLesson?: boolean;
}

interface UseAITutorReturn {
  // Current state
  currentLesson: AILesson | null;
  currentSession: TutorSession | null;
  tutorPersonality: TutorPersonality | null;
  learningPath: LearningPath | null;
  analytics: TutorAnalytics | null;
  
  // Loading states
  isLoading: boolean;
  isGeneratingLesson: boolean;
  isStartingSession: boolean;
  
  // Error handling
  error: string | null;
  
  // Actions
  generateLesson: (request: Partial<LessonGenerationRequest>) => Promise<void>;
  startTutorSession: (lessonId: string) => Promise<void>;
  endTutorSession: () => Promise<void>;
  pauseTutorSession: () => Promise<void>;
  resumeTutorSession: () => Promise<void>;
  
  // Session management
  nextStep: () => void;
  previousStep: () => void;
  submitResponse: (response: string, isCorrect?: boolean) => void;
  
  // Progress tracking
  progress: number;
  currentStep: number;
  totalSteps: number;
  
  // Analytics
  refreshAnalytics: () => Promise<void>;
  generateLearningPath: (assessments: StudentAssessment[]) => Promise<void>;
}

export const useAITutor = (options: UseAITutorOptions): UseAITutorReturn => {
  const { studentId, autoGenerateLesson = false } = options;
  const { toast } = useToast();
  
  // State management
  const [currentLesson, setCurrentLesson] = useState<AILesson | null>(null);
  const [currentSession, setCurrentSession] = useState<TutorSession | null>(null);
  const [tutorPersonality, setTutorPersonality] = useState<TutorPersonality | null>(null);
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [analytics, setAnalytics] = useState<TutorAnalytics | null>(null);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingLesson, setIsGeneratingLesson] = useState(false);
  const [isStartingSession, setIsStartingSession] = useState(false);
  
  // Error handling
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, [studentId]);

  // Auto-generate lesson if enabled
  useEffect(() => {
    if (autoGenerateLesson && tutorPersonality && !currentLesson) {
      generateLesson({});
    }
  }, [autoGenerateLesson, tutorPersonality, currentLesson]);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load tutor personality and analytics in parallel
      const [personality, analyticsData] = await Promise.all([
        aiTutorService.getTutorPersonality(studentId),
        aiTutorService.getTutorAnalytics(studentId),
      ]);

      setTutorPersonality(personality);
      setAnalytics(analyticsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load tutor data';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateLesson = useCallback(async (request: Partial<LessonGenerationRequest>) => {
    try {
      setIsGeneratingLesson(true);
      setError(null);

      const lessonRequest: LessonGenerationRequest = {
        studentId,
        subject: 'Mathematics',
        difficulty: 'intermediate',
        learningStyle: 'visual',
        duration: 30,
        ...request,
        // Use analytics data if available
        ...(analytics && {
          learningStyle: analytics.recommendations.suggestedApproach.includes('Visual') ? 'visual' : 'text',
        }),
      };

      const response = await aiTutorService.generateLesson(lessonRequest);
      
      if (response.success) {
        setCurrentLesson(response.lesson);
        
        toast({
          title: 'Lesson Generated!',
          description: `Your personalized lesson on ${response.lesson.topic} is ready!`,
        });
      } else {
        throw new Error(response.message || 'Failed to generate lesson');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate lesson';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingLesson(false);
    }
  }, [studentId, analytics, toast]);

  const startTutorSession = useCallback(async (lessonId: string) => {
    try {
      setIsStartingSession(true);
      setError(null);

      const session = await aiTutorService.startTutorSession(lessonId, studentId);
      setCurrentSession(session);
      
      toast({
        title: 'Tutoring Session Started!',
        description: 'Your AI tutor is ready to help you learn!',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start tutor session';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsStartingSession(false);
    }
  }, [studentId, toast]);

  const endTutorSession = useCallback(async () => {
    if (!currentSession) return;

    try {
      setCurrentSession(prev => prev ? {
        ...prev,
        endTime: new Date().toISOString(),
        status: 'completed',
      } : null);
      
      toast({
        title: 'Session Completed!',
        description: 'Great work! Your progress has been saved.',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to end session';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [currentSession, toast]);

  const pauseTutorSession = useCallback(async () => {
    if (!currentSession) return;

    setCurrentSession(prev => prev ? {
      ...prev,
      status: 'paused',
    } : null);
  }, [currentSession]);

  const resumeTutorSession = useCallback(async () => {
    if (!currentSession) return;

    setCurrentSession(prev => prev ? {
      ...prev,
      status: 'active',
    } : null);
  }, [currentSession]);

  const nextStep = useCallback(() => {
    if (!currentSession || currentSession.currentStep >= currentSession.totalSteps) return;

    setCurrentSession(prev => prev ? {
      ...prev,
      currentStep: prev.currentStep + 1,
      progress: ((prev.currentStep + 1) / prev.totalSteps) * 100,
    } : null);
  }, [currentSession]);

  const previousStep = useCallback(() => {
    if (!currentSession || currentSession.currentStep <= 0) return;

    setCurrentSession(prev => prev ? {
      ...prev,
      currentStep: prev.currentStep - 1,
      progress: ((prev.currentStep - 1) / prev.totalSteps) * 100,
    } : null);
  }, [currentSession]);

  const submitResponse = useCallback((response: string, isCorrect?: boolean) => {
    if (!currentSession) return;

    const studentResponse = {
      id: `response_${Date.now()}`,
      interactionId: `interaction_${currentSession.currentStep}`,
      response,
      timestamp: new Date().toISOString(),
      isCorrect,
      timeSpent: 30, // Mock time spent
    };

    setCurrentSession(prev => prev ? {
      ...prev,
      studentResponses: [...prev.studentResponses, studentResponse],
    } : null);
  }, [currentSession]);

  const refreshAnalytics = useCallback(async () => {
    try {
      const analyticsData = await aiTutorService.getTutorAnalytics(studentId);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to refresh analytics:', err);
    }
  }, [studentId]);

  const generateLearningPath = useCallback(async (assessments: StudentAssessment[]) => {
    try {
      const path = await aiTutorService.generateLearningPath(studentId, assessments);
      setLearningPath(path);
      
      toast({
        title: 'Learning Path Generated!',
        description: 'Your personalized learning journey is ready!',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate learning path';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [studentId, toast]);

  // Computed values
  const progress = currentSession ? currentSession.progress : 0;
  const currentStep = currentSession ? currentSession.currentStep : 0;
  const totalSteps = currentSession ? currentSession.totalSteps : 0;

  return {
    // Current state
    currentLesson,
    currentSession,
    tutorPersonality,
    learningPath,
    analytics,
    
    // Loading states
    isLoading,
    isGeneratingLesson,
    isStartingSession,
    
    // Error handling
    error,
    
    // Actions
    generateLesson,
    startTutorSession,
    endTutorSession,
    pauseTutorSession,
    resumeTutorSession,
    
    // Session management
    nextStep,
    previousStep,
    submitResponse,
    
    // Progress tracking
    progress,
    currentStep,
    totalSteps,
    
    // Analytics
    refreshAnalytics,
    generateLearningPath,
  };
};

export default useAITutor;
