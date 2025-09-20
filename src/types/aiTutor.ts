// Types for AI Tutor System

export interface StudentAssessment {
  id: string;
  studentId: string;
  subject: string;
  topic: string;
  questions: AssessmentQuestion[];
  completedAt: string;
  score: number;
  percentage: number;
  timeSpent: number;
  strengths: string[];
  weaknesses: string[];
  learningStyle: 'visual' | 'text' | 'kinesthetic' | 'auditory';
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  recommendations: string[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  studentAnswer?: number;
  isCorrect?: boolean;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  explanation: string;
}

export interface AILesson {
  id: string;
  studentId: string;
  subject: string;
  topic: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in minutes
  learningObjectives: string[];
  prerequisites: string[];
  content: LessonContent[];
  interactiveElements: InteractiveElement[];
  assessment: LessonAssessment;
  personalizedFor: {
    learningStyle: string;
    weaknesses: string[];
    strengths: string[];
    interests: string[];
  };
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'paused';
}

export interface LessonContent {
  id: string;
  type: 'text' | 'video' | 'image' | 'interactive' | 'example' | 'exercise';
  title: string;
  content: string;
  order: number;
  metadata?: {
    videoUrl?: string;
    imageUrl?: string;
    interactiveType?: string;
    duration?: number;
  };
}

export interface InteractiveElement {
  id: string;
  type: 'quiz' | 'drag_drop' | 'fill_blank' | 'matching' | 'simulation' | 'discussion';
  title: string;
  content: string;
  order: number;
  data: any; // Flexible data structure for different interactive types
  feedback: string;
}

export interface LessonAssessment {
  id: string;
  questions: LessonQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface LessonQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TutorSession {
  id: string;
  studentId: string;
  lessonId: string;
  startTime: string;
  endTime?: string;
  currentStep: number;
  totalSteps: number;
  progress: number;
  interactions: TutorInteraction[];
  studentResponses: StudentResponse[];
  adaptiveAdjustments: AdaptiveAdjustment[];
  status: 'active' | 'paused' | 'completed' | 'abandoned';
}

export interface TutorInteraction {
  id: string;
  timestamp: string;
  type: 'question' | 'explanation' | 'encouragement' | 'hint' | 'correction' | 'praise';
  content: string;
  tutorPersonality: 'encouraging' | 'analytical' | 'casual' | 'professional';
  context: string;
}

export interface StudentResponse {
  id: string;
  interactionId: string;
  response: string;
  timestamp: string;
  isCorrect?: boolean;
  confidence?: 'low' | 'medium' | 'high';
  timeSpent: number;
}

export interface AdaptiveAdjustment {
  id: string;
  timestamp: string;
  type: 'difficulty' | 'pace' | 'style' | 'content' | 'approach';
  reason: string;
  oldValue: any;
  newValue: any;
  effectiveness?: number;
}

export interface TutorPersonality {
  name: string;
  style: 'encouraging' | 'analytical' | 'casual' | 'professional';
  traits: string[];
  greeting: string;
  encouragement: string[];
  corrections: string[];
  praise: string[];
  hints: string[];
}

export interface LearningPath {
  id: string;
  studentId: string;
  subject: string;
  currentLevel: string;
  targetLevel: string;
  lessons: LearningPathLesson[];
  milestones: Milestone[];
  estimatedCompletion: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface LearningPathLesson {
  id: string;
  lessonId: string;
  title: string;
  order: number;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  prerequisites: string[];
  estimatedDuration: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  achievedDate?: string;
  rewards: string[];
  requirements: string[];
}

export interface TutorAnalytics {
  studentId: string;
  totalSessions: number;
  totalTimeSpent: number;
  averageSessionLength: number;
  completionRate: number;
  improvementRate: number;
  favoriteTopics: string[];
  challengingTopics: string[];
  learningStyleEffectiveness: {
    visual: number;
    text: number;
    kinesthetic: number;
    auditory: number;
  };
  tutorPersonalityPreference: string;
  recommendations: {
    nextTopics: string[];
    suggestedApproach: string;
    optimalSessionLength: number;
    bestTimeOfDay: string;
  };
}

export interface LessonGenerationRequest {
  studentId: string;
  subject: string;
  topic?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  learningStyle?: 'visual' | 'text' | 'kinesthetic' | 'auditory';
  weaknesses?: string[];
  strengths?: string[];
  interests?: string[];
  duration?: number; // in minutes
  previousAssessments?: StudentAssessment[];
  tutorPersonality?: string;
}

export interface LessonGenerationResponse {
  success: boolean;
  lesson: AILesson;
  message: string;
  metadata: {
    generationTime: number;
    algorithm: string;
    confidence: number;
    personalizationScore: number;
  };
}
