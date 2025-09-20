// AI Tutor Service for generating and managing personalized lessons

import { 
  LessonGenerationRequest, 
  LessonGenerationResponse, 
  AILesson, 
  TutorSession,
  StudentAssessment,
  TutorPersonality,
  LearningPath,
  TutorAnalytics,
  LessonContent,
  InteractiveElement,
  LessonAssessment
} from '@/types/aiTutor';

// Mock API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.aiclassroomtutor.com';

class AITutorService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Generate personalized lesson based on assessment
  async generateLesson(request: LessonGenerationRequest): Promise<LessonGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tutor/generate-lesson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating lesson:', error);
      // Fallback to mock data
      return this.generateMockLesson(request);
    }
  }

  // Start a tutoring session
  async startTutorSession(lessonId: string, studentId: string): Promise<TutorSession> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tutor/session/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({ lessonId, studentId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error starting tutor session:', error);
      return this.createMockSession(lessonId, studentId);
    }
  }

  // Get tutor personality based on student preferences
  async getTutorPersonality(studentId: string): Promise<TutorPersonality> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tutor/personality/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tutor personality:', error);
      return this.getMockTutorPersonality();
    }
  }

  // Generate learning path based on assessments
  async generateLearningPath(studentId: string, assessments: StudentAssessment[]): Promise<LearningPath> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tutor/learning-path`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({ studentId, assessments }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating learning path:', error);
      return this.generateMockLearningPath(studentId, assessments);
    }
  }

  // Get tutor analytics
  async getTutorAnalytics(studentId: string): Promise<TutorAnalytics> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tutor/analytics/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tutor analytics:', error);
      return this.getMockAnalytics(studentId);
    }
  }

  // Mock data generators
  private generateMockLesson(request: LessonGenerationRequest): LessonGenerationResponse {
    const lesson = this.createMockLesson(request);
    
    return {
      success: true,
      lesson,
      message: 'Lesson generated successfully based on your assessment',
      metadata: {
        generationTime: 2.1,
        algorithm: 'AI-Tutor-v3.0',
        confidence: 0.89,
        personalizationScore: 0.92,
      },
    };
  }

  private createMockLesson(request: LessonGenerationRequest): AILesson {
    const subject = request.subject || 'Mathematics';
    const topic = request.topic || 'Algebra Basics';
    const difficulty = request.difficulty || 'intermediate';
    const learningStyle = request.learningStyle || 'visual';

    return {
      id: `lesson_${Date.now()}`,
      studentId: request.studentId,
      subject,
      topic,
      title: `Personalized ${topic} Lesson`,
      description: `A customized lesson on ${topic} designed specifically for your learning style and needs.`,
      difficulty,
      estimatedDuration: request.duration || 30,
      learningObjectives: this.generateLearningObjectives(topic, difficulty),
      prerequisites: this.generatePrerequisites(topic, difficulty),
      content: this.generateLessonContent(topic, learningStyle, difficulty),
      interactiveElements: this.generateInteractiveElements(topic, learningStyle),
      assessment: this.generateLessonAssessment(topic, difficulty),
      personalizedFor: {
        learningStyle: learningStyle,
        weaknesses: request.weaknesses || ['Problem Solving'],
        strengths: request.strengths || ['Basic Concepts'],
        interests: request.interests || [subject],
      },
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
  }

  private generateLearningObjectives(topic: string, difficulty: string): string[] {
    const objectives = {
      'Algebra Basics': [
        'Understand basic algebraic concepts',
        'Solve simple linear equations',
        'Apply algebraic thinking to word problems',
        'Master variable manipulation'
      ],
      'Geometry': [
        'Identify geometric shapes and properties',
        'Calculate area and perimeter',
        'Understand angle relationships',
        'Apply geometric principles to real-world problems'
      ],
      'Physics': [
        'Understand fundamental physics concepts',
        'Apply Newton\'s laws of motion',
        'Solve basic physics problems',
        'Connect physics to everyday phenomena'
      ]
    };

    return objectives[topic as keyof typeof objectives] || [
      'Master the fundamental concepts',
      'Apply knowledge to solve problems',
      'Develop critical thinking skills',
      'Build confidence in the subject'
    ];
  }

  private generatePrerequisites(topic: string, difficulty: string): string[] {
    if (difficulty === 'beginner') {
      return ['Basic arithmetic skills'];
    } else if (difficulty === 'intermediate') {
      return ['Basic arithmetic', 'Elementary algebra'];
    } else {
      return ['Advanced arithmetic', 'Intermediate algebra', 'Problem-solving skills'];
    }
  }

  private generateLessonContent(topic: string, learningStyle: string, difficulty: string): LessonContent[] {
    const content: LessonContent[] = [];

    // Introduction
    content.push({
      id: 'intro_1',
      type: 'text',
      title: 'Welcome to Your Personalized Lesson',
      content: `Today we'll explore ${topic} in a way that matches your ${learningStyle} learning style. Let's start with the basics and build up your understanding step by step.`,
      order: 1,
    });

    // Visual content for visual learners
    if (learningStyle === 'visual') {
      content.push({
        id: 'visual_1',
        type: 'image',
        title: 'Visual Concept Map',
        content: 'Here\'s a visual representation of the key concepts we\'ll cover today.',
        order: 2,
        metadata: {
          imageUrl: '/images/concept-map.png',
        },
      });
    }

    // Interactive content
    content.push({
      id: 'interactive_1',
      type: 'interactive',
      title: 'Let\'s Practice Together',
      content: 'Now let\'s work through some examples together. I\'ll guide you step by step.',
      order: 3,
      metadata: {
        interactiveType: 'guided_practice',
        duration: 10,
      },
    });

    // Examples based on difficulty
    content.push({
      id: 'example_1',
      type: 'example',
      title: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level Example`,
      content: this.generateExample(topic, difficulty),
      order: 4,
    });

    return content;
  }

  private generateInteractiveElements(topic: string, learningStyle: string): InteractiveElement[] {
    return [
      {
        id: 'quiz_1',
        type: 'quiz',
        title: 'Quick Check',
        content: 'Let\'s see how well you understand the concept so far.',
        order: 1,
        data: {
          questions: [
            {
              question: 'What is the main concept we\'re learning?',
              options: ['Option A', 'Option B', 'Option C', 'Option D'],
              correctAnswer: 0,
            },
          ],
        },
        feedback: 'Great job! You\'re understanding the concept well.',
      },
      {
        id: 'exercise_1',
        type: 'fill_blank',
        title: 'Practice Exercise',
        content: 'Now let\'s practice what you\'ve learned.',
        order: 2,
        data: {
          exercise: 'Complete the following: 2x + 5 = ___',
          answer: '2x + 5',
        },
        feedback: 'Excellent! You\'re getting the hang of it.',
      },
    ];
  }

  private generateLessonAssessment(topic: string, difficulty: string): LessonAssessment {
    return {
      id: `assessment_${Date.now()}`,
      questions: [
        {
          id: 'q1',
          question: 'What is the primary focus of this lesson?',
          type: 'multiple_choice',
          options: ['Basic concepts', 'Advanced techniques', 'Problem solving', 'All of the above'],
          correctAnswer: 3,
          explanation: 'This lesson covers all aspects to give you a complete understanding.',
          difficulty: 'easy',
        },
        {
          id: 'q2',
          question: 'How confident do you feel about this topic now?',
          type: 'multiple_choice',
          options: ['Very confident', 'Somewhat confident', 'Not very confident', 'Need more practice'],
          correctAnswer: 0,
          explanation: 'Your confidence level helps me adjust future lessons.',
          difficulty: 'easy',
        },
      ],
      passingScore: 70,
      timeLimit: 15,
    };
  }

  private generateExample(topic: string, difficulty: string): string {
    const examples = {
      'Algebra Basics': {
        beginner: 'If x = 3, what is 2x + 1? Answer: 2(3) + 1 = 6 + 1 = 7',
        intermediate: 'Solve for x: 2x + 5 = 13. Answer: 2x = 8, so x = 4',
        advanced: 'Solve the system: x + y = 5, 2x - y = 1. Answer: x = 2, y = 3',
      },
      'Geometry': {
        beginner: 'A rectangle has length 5 and width 3. What is its area? Answer: 5 × 3 = 15 square units',
        intermediate: 'Find the area of a triangle with base 6 and height 4. Answer: (1/2) × 6 × 4 = 12 square units',
        advanced: 'A circle has radius 5. Find its circumference and area. Answer: C = 2π(5) = 10π, A = π(5)² = 25π',
      },
    };

    const topicExamples = examples[topic as keyof typeof examples];
    return topicExamples?.[difficulty as keyof typeof topicExamples] || 'Let\'s work through this step by step together.';
  }

  private createMockSession(lessonId: string, studentId: string): TutorSession {
    return {
      id: `session_${Date.now()}`,
      studentId,
      lessonId,
      startTime: new Date().toISOString(),
      currentStep: 0,
      totalSteps: 5,
      progress: 0,
      interactions: [],
      studentResponses: [],
      adaptiveAdjustments: [],
      status: 'active',
    };
  }

  private getMockTutorPersonality(): TutorPersonality {
    return {
      name: 'Alex',
      style: 'encouraging',
      traits: ['patient', 'supportive', 'clear', 'motivating'],
      greeting: 'Hi there! I\'m Alex, your AI tutor. I\'m here to help you learn and grow!',
      encouragement: [
        'You\'re doing great!',
        'Keep up the excellent work!',
        'I can see you\'re really understanding this!',
        'Don\'t worry, we\'ll work through this together!',
      ],
      corrections: [
        'Not quite, but you\'re on the right track!',
        'Let me help you with that.',
        'Good thinking, but let\'s try a different approach.',
        'Almost there! Let\'s review this concept.',
      ],
      praise: [
        'Excellent work!',
        'You\'ve got it!',
        'Perfect! You understand this concept well.',
        'Outstanding! You\'re mastering this topic.',
      ],
      hints: [
        'Think about what we learned earlier...',
        'Remember the key concept we discussed...',
        'Try breaking this down into smaller steps...',
        'What pattern do you notice here?',
      ],
    };
  }

  private generateMockLearningPath(studentId: string, assessments: StudentAssessment[]): LearningPath {
    return {
      id: `path_${Date.now()}`,
      studentId,
      subject: 'Mathematics',
      currentLevel: 'Intermediate',
      targetLevel: 'Advanced',
      lessons: [
        {
          id: 'lesson_1',
          lessonId: 'lesson_1',
          title: 'Algebra Fundamentals',
          order: 1,
          status: 'completed',
          prerequisites: [],
          estimatedDuration: 30,
          difficulty: 'easy',
        },
        {
          id: 'lesson_2',
          lessonId: 'lesson_2',
          title: 'Linear Equations',
          order: 2,
          status: 'in_progress',
          prerequisites: ['lesson_1'],
          estimatedDuration: 45,
          difficulty: 'medium',
        },
        {
          id: 'lesson_3',
          lessonId: 'lesson_3',
          title: 'Quadratic Equations',
          order: 3,
          status: 'locked',
          prerequisites: ['lesson_2'],
          estimatedDuration: 60,
          difficulty: 'hard',
        },
      ],
      milestones: [
        {
          id: 'milestone_1',
          title: 'Algebra Master',
          description: 'Complete all algebra lessons',
          targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          rewards: ['Certificate', 'Badge'],
          requirements: ['lesson_1', 'lesson_2', 'lesson_3'],
        },
      ],
      estimatedCompletion: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 45,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  private getMockAnalytics(studentId: string): TutorAnalytics {
    return {
      studentId,
      totalSessions: 15,
      totalTimeSpent: 450, // minutes
      averageSessionLength: 30,
      completionRate: 87,
      improvementRate: 23,
      favoriteTopics: ['Algebra', 'Geometry'],
      challengingTopics: ['Calculus', 'Statistics'],
      learningStyleEffectiveness: {
        visual: 85,
        text: 72,
        kinesthetic: 68,
        auditory: 75,
      },
      tutorPersonalityPreference: 'encouraging',
      recommendations: {
        nextTopics: ['Advanced Algebra', 'Trigonometry'],
        suggestedApproach: 'Visual learning with interactive exercises',
        optimalSessionLength: 25,
        bestTimeOfDay: 'Afternoon (2-4 PM)',
      },
    };
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || 'mock-token';
  }
}

// Export singleton instance
export const aiTutorService = new AITutorService();
export default aiTutorService;
