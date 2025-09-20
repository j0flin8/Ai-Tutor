// Custom hook for personalized quiz management

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  QuizGenerationRequest, 
  QuizGenerationResponse, 
  PersonalizedQuiz, 
  QuizAttempt, 
  StudentProfile,
  QuizAnalytics 
} from '@/types/quiz';
import { quizApiService } from '@/services/quizApi';

interface UsePersonalizedQuizOptions {
  studentId: string;
  classId?: string;
  autoGenerate?: boolean;
}

interface UsePersonalizedQuizReturn {
  // Quiz state
  currentQuiz: PersonalizedQuiz | null;
  quizAttempt: QuizAttempt | null;
  isLoading: boolean;
  error: string | null;
  
  // Student profile
  studentProfile: StudentProfile | null;
  
  // Quiz actions
  generateQuiz: (request: Partial<QuizGenerationRequest>) => Promise<void>;
  startQuiz: () => void;
  submitAnswer: (questionId: string, selectedAnswer: number, timeSpent: number) => void;
  completeQuiz: () => Promise<QuizAnalytics>;
  
  // Quiz progress
  currentQuestionIndex: number;
  progress: number;
  timeRemaining: number;
  
  // Quiz results
  score: number;
  isCompleted: boolean;
  analytics: QuizAnalytics | null;
}

export const usePersonalizedQuiz = (options: UsePersonalizedQuizOptions): UsePersonalizedQuizReturn => {
  const { studentId, classId, autoGenerate = false } = options;
  const { toast } = useToast();
  
  // State management
  const [currentQuiz, setCurrentQuiz] = useState<PersonalizedQuiz | null>(null);
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [analytics, setAnalytics] = useState<QuizAnalytics | null>(null);

  // Load student profile on mount
  useEffect(() => {
    loadStudentProfile();
  }, [studentId]);

  // Auto-generate quiz if enabled
  useEffect(() => {
    if (autoGenerate && studentProfile && !currentQuiz) {
      generateQuiz({});
    }
  }, [autoGenerate, studentProfile, currentQuiz]);

  // Timer effect
  useEffect(() => {
    if (quizAttempt && !quizAttempt.completed && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && quizAttempt && !quizAttempt.completed) {
      // Auto-submit when time runs out
      completeQuiz();
    }
  }, [timeRemaining, quizAttempt]);

  const loadStudentProfile = async () => {
    try {
      setIsLoading(true);
      const profile = await quizApiService.getStudentProfile(studentId);
      setStudentProfile(profile);
    } catch (err) {
      setError('Failed to load student profile');
      toast({
        title: 'Error',
        description: 'Failed to load student profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuiz = useCallback(async (request: Partial<QuizGenerationRequest>) => {
    try {
      setIsLoading(true);
      setError(null);

      const quizRequest: QuizGenerationRequest = {
        studentId,
        classId,
        questionCount: 10,
        timeLimit: 1800, // 30 minutes
        difficulty: 'adaptive',
        language: 'English',
        ...request,
        // Use student profile data if available
        ...(studentProfile && {
          interests: studentProfile.interests,
          learningStyle: studentProfile.learningStyle,
          weakAreas: studentProfile.weakAreas,
          language: studentProfile.language,
        }),
      };

      const response: QuizGenerationResponse = await quizApiService.generatePersonalizedQuiz(quizRequest);
      
      if (response.success) {
        setCurrentQuiz(response.quiz);
        setTimeRemaining(response.quiz.timeLimit);
        setCurrentQuestionIndex(0);
        setAnalytics(null);
        
        toast({
          title: 'Quiz Generated',
          description: `Personalized quiz created with ${response.quiz.totalQuestions} questions`,
        });
      } else {
        throw new Error(response.message || 'Failed to generate quiz');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate quiz';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [studentId, classId, studentProfile, toast]);

  const startQuiz = useCallback(() => {
    if (!currentQuiz) return;

    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      quizId: currentQuiz.id,
      studentId,
      startTime: new Date().toISOString(),
      answers: [],
      score: 0,
      percentage: 0,
      timeSpent: 0,
      completed: false,
      feedback: {
        strengths: [],
        improvements: [],
        recommendations: [],
      },
    };

    setQuizAttempt(attempt);
    setTimeRemaining(currentQuiz.timeLimit);
    setCurrentQuestionIndex(0);
  }, [currentQuiz, studentId]);

  const submitAnswer = useCallback((questionId: string, selectedAnswer: number, timeSpent: number) => {
    if (!quizAttempt || !currentQuiz) return;

    const question = currentQuiz.questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    const newAnswer = {
      questionId,
      selectedAnswer,
      isCorrect,
      timeSpent,
    };

    const updatedAnswers = [...quizAttempt.answers, newAnswer];
    const newScore = updatedAnswers.filter(a => a.isCorrect).length;
    const newPercentage = (newScore / updatedAnswers.length) * 100;

    setQuizAttempt(prev => prev ? {
      ...prev,
      answers: updatedAnswers,
      score: newScore,
      percentage: newPercentage,
      timeSpent: prev.timeSpent + timeSpent,
    } : null);
  }, [quizAttempt, currentQuiz]);

  const completeQuiz = useCallback(async (): Promise<QuizAnalytics> => {
    if (!quizAttempt || !currentQuiz) {
      throw new Error('No active quiz attempt');
    }

    try {
      setIsLoading(true);

      const completedAttempt: QuizAttempt = {
        ...quizAttempt,
        endTime: new Date().toISOString(),
        completed: true,
        timeSpent: currentQuiz.timeLimit - timeRemaining,
      };

      const response = await quizApiService.submitQuizAttempt(completedAttempt);
      
      if (response.success) {
        setAnalytics(response.analytics);
        setQuizAttempt(completedAttempt);
        
        toast({
          title: 'Quiz Completed!',
          description: `You scored ${completedAttempt.percentage.toFixed(0)}%`,
        });

        return response.analytics;
      } else {
        throw new Error('Failed to submit quiz attempt');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete quiz';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [quizAttempt, currentQuiz, timeRemaining, toast]);

  // Computed values
  const progress = currentQuiz ? ((currentQuestionIndex + 1) / currentQuiz.totalQuestions) * 100 : 0;
  const score = quizAttempt ? quizAttempt.score : 0;
  const isCompleted = quizAttempt ? quizAttempt.completed : false;

  return {
    // Quiz state
    currentQuiz,
    quizAttempt,
    isLoading,
    error,
    
    // Student profile
    studentProfile,
    
    // Quiz actions
    generateQuiz,
    startQuiz,
    submitAnswer,
    completeQuiz,
    
    // Quiz progress
    currentQuestionIndex,
    progress,
    timeRemaining,
    
    // Quiz results
    score,
    isCompleted,
    analytics,
  };
};

export default usePersonalizedQuiz;
