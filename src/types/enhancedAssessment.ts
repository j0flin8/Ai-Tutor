// Enhanced Assessment Types for AI Tutor Integration

export interface EnhancedAssessment {
  id: string;
  studentId: string;
  title: string;
  subject: string;
  topics: string[];
  questions: EnhancedAssessmentQuestion[];
  completedAt: string;
  score: number;
  percentage: number;
  timeSpent: number;
  strengths: AssessmentStrength[];
  weaknesses: AssessmentWeakness[];
  learningStyle: 'visual' | 'text' | 'kinesthetic' | 'auditory';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  recommendations: AssessmentRecommendation[];
  aiTutorSuggestions: AITutorSuggestion[];
  bookRecommendations: BookRecommendationSuggestion[];
  learningPath: LearningPathSuggestion;
  metadata: {
    version: string;
    algorithm: string;
    confidence: number;
    generatedAt: string;
  };
}

export interface EnhancedAssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer' | 'problem_solving';
  options?: string[];
  correctAnswer: string | number;
  studentAnswer?: string | number;
  isCorrect?: boolean;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  subtopic?: string;
  explanation: string;
  learningObjective: string;
  prerequisiteSkills: string[];
  relatedConcepts: string[];
  hints: string[];
  visualAids?: {
    type: 'image' | 'diagram' | 'chart' | 'video';
    url: string;
    description: string;
  }[];
  metadata: {
    source: string;
    createdBy: string;
    lastModified: string;
    version: string;
  };
}

export interface AssessmentStrength {
  topic: string;
  subtopic?: string;
  score: number;
  confidence: number;
  evidence: string[];
  recommendations: string[];
  nextSteps: string[];
}

export interface AssessmentWeakness {
  topic: string;
  subtopic?: string;
  score: number;
  confidence: number;
  evidence: string[];
  improvementAreas: string[];
  suggestedResources: string[];
  practiceExercises: string[];
}

export interface AssessmentRecommendation {
  type: 'study_plan' | 'practice_exercises' | 'additional_resources' | 'tutoring' | 'peer_study';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  estimatedTime: number; // in hours
  resources: {
    type: 'book' | 'video' | 'exercise' | 'tutorial' | 'practice_test';
    title: string;
    url?: string;
    description: string;
  }[];
  milestones: {
    title: string;
    description: string;
    estimatedCompletion: string;
  }[];
}

export interface AITutorSuggestion {
  subject: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'visual' | 'text' | 'kinesthetic' | 'auditory';
  focusAreas: string[];
  estimatedDuration: number; // in minutes
  learningObjectives: string[];
  prerequisites: string[];
  suggestedApproach: string;
  interactiveElements: {
    type: 'quiz' | 'simulation' | 'problem_solving' | 'discussion';
    description: string;
    estimatedTime: number;
  }[];
  assessmentCriteria: {
    skill: string;
    targetLevel: string;
    measurementMethod: string;
  }[];
}

export interface BookRecommendationSuggestion {
  subject: string;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'visual' | 'text' | 'kinesthetic' | 'auditory';
  reason: string;
  learningObjective: string;
  estimatedReadingTime: number; // in hours
  priority: 'high' | 'medium' | 'low';
  bookCategories: {
    category: string;
    description: string;
    estimatedBooks: number;
  }[];
  specificRecommendations: {
    title: string;
    author: string;
    reason: string;
    difficulty: string;
    estimatedTime: number;
  }[];
}

export interface LearningPathSuggestion {
  subject: string;
  currentLevel: string;
  targetLevel: string;
  estimatedDuration: number; // in weeks
  phases: LearningPhase[];
  milestones: LearningMilestone[];
  prerequisites: string[];
  successCriteria: string[];
  adaptiveElements: {
    type: 'difficulty_adjustment' | 'pace_adjustment' | 'content_personalization';
    description: string;
    triggers: string[];
  }[];
}

export interface LearningPhase {
  id: string;
  title: string;
  description: string;
  duration: number; // in weeks
  order: number;
  topics: string[];
  learningObjectives: string[];
  activities: {
    type: 'ai_tutoring' | 'reading' | 'practice' | 'assessment' | 'project';
    title: string;
    description: string;
    estimatedTime: number;
    resources: string[];
  }[];
  assessments: {
    type: 'formative' | 'summative' | 'self_assessment';
    title: string;
    description: string;
    criteria: string[];
  }[];
  prerequisites: string[];
  completionCriteria: string[];
}

export interface LearningMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  criteria: string[];
  rewards: string[];
  celebrationMessage: string;
  nextSteps: string[];
}

export interface AssessmentGenerationRequest {
  studentId: string;
  subject: string;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'adaptive';
  questionCount: number;
  timeLimit?: number;
  learningStyle?: 'visual' | 'text' | 'kinesthetic' | 'auditory';
  previousAssessments?: string[];
  focusAreas?: string[];
  excludeTopics?: string[];
  includeTopics?: string[];
  language: string;
  includeVisualAids?: boolean;
  adaptiveDifficulty?: boolean;
}

export interface AssessmentGenerationResponse {
  success: boolean;
  assessment: EnhancedAssessment;
  message: string;
  metadata: {
    generationTime: number;
    algorithm: string;
    confidence: number;
    personalizationScore: number;
  };
}

export interface AssessmentAnalytics {
  studentId: string;
  totalAssessments: number;
  averageScore: number;
  improvementRate: number;
  timeSpent: number;
  subjectBreakdown: {
    subject: string;
    score: number;
    assessments: number;
    timeSpent: number;
    improvement: number;
  }[];
  topicPerformance: {
    topic: string;
    score: number;
    difficulty: string;
    assessments: number;
    trend: 'improving' | 'stable' | 'declining';
  }[];
  learningStyleEffectiveness: {
    visual: number;
    text: number;
    kinesthetic: number;
    auditory: number;
  };
  recommendations: {
    focusAreas: string[];
    suggestedDifficulty: string;
    learningStyleAdjustments: string[];
    nextSteps: string[];
  };
  aiTutorEngagement: {
    totalSessions: number;
    averageSessionLength: number;
    completionRate: number;
    effectiveness: number;
  };
  bookRecommendationEngagement: {
    totalRecommendations: number;
    purchaseRate: number;
    readingProgress: number;
    satisfaction: number;
  };
}

export interface AdaptiveAssessmentConfig {
  studentId: string;
  subject: string;
  initialDifficulty: 'beginner' | 'intermediate' | 'advanced';
  adaptationRules: {
    increaseDifficulty: {
      conditions: string[];
      threshold: number;
    };
    decreaseDifficulty: {
      conditions: string[];
      threshold: number;
    };
  };
  timeConstraints: {
    maxTimePerQuestion: number;
    totalTimeLimit: number;
    breakIntervals: number[];
  };
  feedbackSettings: {
    immediateFeedback: boolean;
    detailedExplanations: boolean;
    hintsAvailable: boolean;
    retryAllowed: boolean;
  };
  personalizationFactors: {
    learningStyle: string;
    interests: string[];
    previousPerformance: number;
    timeOfDay: string;
  };
}
