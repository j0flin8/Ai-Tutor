// Types for AR and Gaming Learning System

export interface ARExperience {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  type: '3d_model' | 'interactive_simulation' | 'virtual_lab' | 'augmented_reality' | 'mixed_reality';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in minutes
  prerequisites: string[];
  learningObjectives: string[];
  arContent: ARContent;
  interactions: ARInteraction[];
  assessment: ARAssessment;
  metadata: {
    version: string;
    createdBy: string;
    lastModified: string;
    compatibility: string[];
  };
}

export interface ARContent {
  id: string;
  type: '3d_model' | 'animation' | 'simulation' | 'video' | 'interactive_element';
  title: string;
  description: string;
  modelUrl?: string;
  animationUrl?: string;
  videoUrl?: string;
  interactiveData?: any;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
  properties: {
    color?: string;
    material?: string;
    physics?: boolean;
    collidable?: boolean;
    interactive?: boolean;
  };
}

export interface ARInteraction {
  id: string;
  type: 'tap' | 'drag' | 'rotate' | 'scale' | 'voice' | 'gesture' | 'gaze';
  trigger: string;
  action: string;
  feedback: string;
  learningObjective: string;
  hints: string[];
  successCriteria: string[];
}

export interface ARAssessment {
  id: string;
  questions: ARQuestion[];
  passingScore: number;
  timeLimit?: number;
  attempts: number;
}

export interface ARQuestion {
  id: string;
  question: string;
  type: 'manipulation' | 'identification' | 'measurement' | 'comparison' | 'prediction';
  arContent: ARContent;
  correctAnswer: any;
  explanation: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameExperience {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  type: 'puzzle' | 'simulation' | 'adventure' | 'strategy' | 'quiz_game' | 'building_game';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in minutes
  gameMechanics: GameMechanics;
  levels: GameLevel[];
  rewards: GameReward[];
  leaderboard: LeaderboardEntry[];
  achievements: Achievement[];
  metadata: {
    version: string;
    createdBy: string;
    lastModified: string;
    genre: string[];
  };
}

export interface GameMechanics {
  points: {
    basePoints: number;
    bonusMultiplier: number;
    streakBonus: number;
    timeBonus: number;
  };
  lives: {
    maxLives: number;
    lifeRegeneration: number;
    lifeCost: number;
  };
  powerUps: PowerUp[];
  challenges: Challenge[];
  socialFeatures: {
    multiplayer: boolean;
    teamPlay: boolean;
    chat: boolean;
    sharing: boolean;
  };
}

export interface GameLevel {
  id: string;
  number: number;
  title: string;
  description: string;
  objectives: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  scoreTarget: number;
  rewards: string[];
  unlockConditions: string[];
  content: GameContent[];
  assessment: GameAssessment;
}

export interface GameContent {
  id: string;
  type: 'question' | 'puzzle' | 'simulation' | 'mini_game' | 'story';
  title: string;
  description: string;
  data: any;
  interactions: GameInteraction[];
  feedback: GameFeedback;
}

export interface GameInteraction {
  id: string;
  type: 'click' | 'drag' | 'type' | 'select' | 'draw' | 'voice';
  element: string;
  action: string;
  validation: string;
  points: number;
}

export interface GameFeedback {
  correct: string;
  incorrect: string;
  hints: string[];
  encouragement: string[];
  celebration: string[];
}

export interface GameAssessment {
  id: string;
  questions: GameQuestion[];
  passingScore: number;
  timeLimit?: number;
  attempts: number;
  powerUpsAllowed: boolean;
}

export interface GameQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'drag_drop' | 'puzzle' | 'simulation';
  options?: string[];
  correctAnswer: any;
  explanation: string;
  points: number;
  timeLimit?: number;
  hints: string[];
  powerUps: string[];
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  type: 'hint' | 'time_extension' | 'skip' | 'double_points' | 'reveal_answer' | 'extra_life';
  cost: number;
  duration?: number;
  effect: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special' | 'social';
  objectives: string[];
  rewards: string[];
  timeLimit?: number;
  participants: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'completed' | 'expired' | 'locked';
}

export interface GameReward {
  id: string;
  name: string;
  description: string;
  type: 'points' | 'badge' | 'avatar' | 'power_up' | 'unlock' | 'currency';
  value: number;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockConditions: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'social' | 'exploration' | 'mastery' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlockConditions: string[];
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  studentId: string;
  name: string;
  avatar: string;
  score: number;
  level: number;
  rank: number;
  badges: string[];
  achievements: string[];
  lastActive: string;
}

export interface StudentGameProfile {
  studentId: string;
  level: number;
  experience: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  gamesPlayed: number;
  gamesWon: number;
  averageScore: number;
  favoriteSubjects: string[];
  unlockedAchievements: string[];
  currentBadges: string[];
  powerUps: {
    powerUpId: string;
    quantity: number;
  }[];
  statistics: {
    totalTimePlayed: number;
    averageSessionLength: number;
    bestScore: number;
    perfectGames: number;
    hintsUsed: number;
    powerUpsUsed: number;
  };
  preferences: {
    difficulty: 'easy' | 'medium' | 'hard';
    gameTypes: string[];
    notifications: boolean;
    soundEffects: boolean;
    music: boolean;
  };
}

export interface ARGamingSession {
  id: string;
  studentId: string;
  type: 'ar' | 'gaming' | 'mixed';
  experienceId: string;
  startTime: string;
  endTime?: string;
  duration: number;
  score: number;
  progress: number;
  interactions: SessionInteraction[];
  achievements: string[];
  rewards: string[];
  status: 'active' | 'completed' | 'paused' | 'abandoned';
}

export interface SessionInteraction {
  id: string;
  timestamp: string;
  type: string;
  action: string;
  result: 'success' | 'failure' | 'partial';
  points: number;
  feedback: string;
}

export interface ARGamingAnalytics {
  studentId: string;
  totalSessions: number;
  totalTimeSpent: number;
  averageScore: number;
  favoriteExperiences: {
    experienceId: string;
    title: string;
    playCount: number;
    averageScore: number;
  }[];
  learningProgress: {
    subject: string;
    topic: string;
    improvement: number;
    mastery: number;
  }[];
  engagementMetrics: {
    dailyActiveTime: number;
    weeklyActiveTime: number;
    sessionFrequency: number;
    retentionRate: number;
  };
  socialMetrics: {
    friendsCount: number;
    challengesCompleted: number;
    leaderboardRank: number;
    socialInteractions: number;
  };
}

export interface ARGamingRequest {
  studentId: string;
  subject: string;
  topic?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  type?: 'ar' | 'gaming' | 'mixed';
  preferences?: {
    gameTypes?: string[];
    arTypes?: string[];
    duration?: number;
    social?: boolean;
  };
  previousExperiences?: string[];
  learningObjectives?: string[];
}

export interface ARGamingResponse {
  success: boolean;
  experiences: (ARExperience | GameExperience)[];
  recommendations: {
    type: 'ar' | 'gaming';
    reason: string;
    experienceId: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  message: string;
  metadata: {
    generationTime: number;
    algorithm: string;
    confidence: number;
  };
}
