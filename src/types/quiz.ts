// Types for personalized quiz system

export interface StudentProfile {
  id: string;
  name: string;
  grade: string;
  interests: string[];
  learningStyle: 'visual' | 'text' | 'kinesthetic' | 'auditory';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  weakAreas: string[];
  strongAreas: string[];
  preferredSubjects: string[];
  language: 'English' | 'Hindi' | 'Tamil' | 'Telugu';
  timeZone: string;
  lastActive: string;
  totalQuizzesCompleted: number;
  averageScore: number;
}

export interface ClassProfile {
  id: string;
  name: string;
  grade: string;
  subject: string;
  teacherId: string;
  students: StudentProfile[];
  curriculum: string[];
  averageDifficulty: 'beginner' | 'intermediate' | 'advanced';
  lastQuizDate: string;
  totalQuizzes: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: {
    text: string;
    video?: string;
    image?: string;
  };
  tags: string[];
  learningStyle: 'visual' | 'text' | 'kinesthetic' | 'auditory';
  estimatedTime: number; // in seconds
  language: string;
  metadata: {
    source: string;
    createdBy: string;
    lastModified: string;
    version: string;
  };
}

export interface PersonalizedQuiz {
  id: string;
  studentId: string;
  classId?: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
  totalQuestions: number;
  timeLimit: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  personalizedFor: {
    interests: string[];
    learningStyle: string;
    difficultyLevel: string;
    weakAreas: string[];
  };
  createdAt: string;
  expiresAt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'expired';
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  score: number;
  percentage: number;
  timeSpent: number;
  completed: boolean;
  feedback: {
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  };
}

export interface QuizGenerationRequest {
  studentId: string;
  classId?: string;
  subject?: string;
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'adaptive';
  questionCount: number;
  timeLimit?: number;
  interests?: string[];
  learningStyle?: string;
  weakAreas?: string[];
  language?: string;
  excludeTopics?: string[];
  includeTopics?: string[];
}

export interface QuizGenerationResponse {
  success: boolean;
  quiz: PersonalizedQuiz;
  message: string;
  metadata: {
    generationTime: number;
    algorithm: string;
    confidence: number;
  };
}

export interface QuizAnalytics {
  studentId: string;
  totalQuizzes: number;
  averageScore: number;
  improvementRate: number;
  timeSpent: number;
  subjectBreakdown: {
    subject: string;
    score: number;
    questionsAnswered: number;
    timeSpent: number;
  }[];
  difficultyProgress: {
    easy: { score: number; count: number };
    medium: { score: number; count: number };
    hard: { score: number; count: number };
  };
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
  };
}

export interface ClassQuizAnalytics {
  classId: string;
  totalStudents: number;
  averageScore: number;
  completionRate: number;
  studentProgress: {
    studentId: string;
    name: string;
    score: number;
    completionTime: number;
    weakAreas: string[];
  }[];
  topicPerformance: {
    topic: string;
    averageScore: number;
    difficulty: string;
    studentCount: number;
  }[];
  recommendations: {
    classFocusAreas: string[];
    individualAttention: string[];
    curriculumAdjustments: string[];
  };
}
