// API service for personalized quiz generation and management

import { 
  QuizGenerationRequest, 
  QuizGenerationResponse, 
  PersonalizedQuiz, 
  QuizAttempt, 
  StudentProfile, 
  ClassProfile,
  QuizAnalytics,
  ClassQuizAnalytics
} from '@/types/quiz';

// Mock API base URL - replace with your actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.aiclassroomtutor.com';

class QuizApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Generate personalized quiz for individual student
  async generatePersonalizedQuiz(request: QuizGenerationRequest): Promise<QuizGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/quiz/generate`, {
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
      console.error('Error generating personalized quiz:', error);
      // Fallback to mock data for development
      return this.generateMockQuiz(request);
    }
  }

  // Generate quiz for entire class
  async generateClassQuiz(classId: string, request: Partial<QuizGenerationRequest>): Promise<QuizGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/quiz/class/${classId}/generate`, {
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
      console.error('Error generating class quiz:', error);
      return this.generateMockClassQuiz(classId, request);
    }
  }

  // Submit quiz attempt
  async submitQuizAttempt(attempt: QuizAttempt): Promise<{ success: boolean; analytics: QuizAnalytics }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/quiz/attempt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(attempt),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting quiz attempt:', error);
      return this.generateMockAnalytics(attempt);
    }
  }

  // Get student profile
  async getStudentProfile(studentId: string): Promise<StudentProfile> {
    try {
      const response = await fetch(`${this.baseUrl}/api/students/${studentId}`, {
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
      console.error('Error fetching student profile:', error);
      return this.getMockStudentProfile(studentId);
    }
  }

  // Get class profile
  async getClassProfile(classId: string): Promise<ClassProfile> {
    try {
      const response = await fetch(`${this.baseUrl}/api/classes/${classId}`, {
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
      console.error('Error fetching class profile:', error);
      return this.getMockClassProfile(classId);
    }
  }

  // Get quiz analytics for student
  async getStudentAnalytics(studentId: string): Promise<QuizAnalytics> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analytics/student/${studentId}`, {
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
      console.error('Error fetching student analytics:', error);
      return this.getMockStudentAnalytics(studentId);
    }
  }

  // Get class analytics
  async getClassAnalytics(classId: string): Promise<ClassQuizAnalytics> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analytics/class/${classId}`, {
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
      console.error('Error fetching class analytics:', error);
      return this.getMockClassAnalytics(classId);
    }
  }

  // Update student profile
  async updateStudentProfile(studentId: string, profile: Partial<StudentProfile>): Promise<StudentProfile> {
    try {
      const response = await fetch(`${this.baseUrl}/api/students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating student profile:', error);
      throw error;
    }
  }

  // Mock data generators for development
  private generateMockQuiz(request: QuizGenerationRequest): QuizGenerationResponse {
    const mockQuestions = this.generateMockQuestions(request);
    
    return {
      success: true,
      quiz: {
        id: `quiz_${Date.now()}`,
        studentId: request.studentId,
        classId: request.classId,
        title: `${request.subject || 'Personalized'} Quiz`,
        subject: request.subject || 'Mathematics',
        questions: mockQuestions,
        totalQuestions: mockQuestions.length,
        timeLimit: request.timeLimit || 1800, // 30 minutes
        difficulty: request.difficulty || 'medium',
        personalizedFor: {
          interests: request.interests || ['Mathematics'],
          learningStyle: request.learningStyle || 'visual',
          difficultyLevel: request.difficulty || 'medium',
          weakAreas: request.weakAreas || ['Algebra'],
        },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        status: 'pending',
      },
      message: 'Quiz generated successfully',
      metadata: {
        generationTime: 1.2,
        algorithm: 'AI-Personalized-v2.1',
        confidence: 0.87,
      },
    };
  }

  private generateMockClassQuiz(classId: string, request: Partial<QuizGenerationRequest>): QuizGenerationResponse {
    return this.generateMockQuiz({
      studentId: 'class_student',
      classId,
      subject: request.subject || 'Mathematics',
      topic: request.topic || 'General',
      difficulty: request.difficulty || 'medium',
      questionCount: request.questionCount || 10,
      timeLimit: request.timeLimit || 1800,
      interests: request.interests || ['Mathematics'],
      learningStyle: request.learningStyle || 'visual',
      weakAreas: request.weakAreas || [],
      language: request.language || 'English',
    });
  }

  private generateMockQuestions(request: QuizGenerationRequest) {
    const subjects = request.subject ? [request.subject] : ['Mathematics', 'Science', 'English'];
    const difficulties = request.difficulty === 'adaptive' ? ['easy', 'medium', 'hard'] : [request.difficulty || 'medium'];
    
    const questions = [];
    for (let i = 0; i < request.questionCount; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      
      questions.push({
        id: `q_${i + 1}`,
        question: this.generateMockQuestion(subject, difficulty),
        options: this.generateMockOptions(subject, difficulty),
        correctAnswer: Math.floor(Math.random() * 4),
        subject,
        topic: this.getRandomTopic(subject),
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
        explanation: {
          text: `This is a detailed explanation for the ${subject} question.`,
          video: `https://example.com/videos/${subject.toLowerCase()}_${difficulty}`,
        },
        tags: [subject.toLowerCase(), difficulty, request.topic || 'general'],
        learningStyle: request.learningStyle || 'visual',
        estimatedTime: difficulty === 'easy' ? 60 : difficulty === 'medium' ? 90 : 120,
        language: request.language || 'English',
        metadata: {
          source: 'AI-Generated',
          createdBy: 'system',
          lastModified: new Date().toISOString(),
          version: '1.0',
        },
      });
    }
    
    return questions;
  }

  private generateMockQuestion(subject: string, difficulty: string): string {
    const questions = {
      Mathematics: {
        easy: "What is 5 + 3?",
        medium: "Solve for x: 2x + 5 = 13",
        hard: "Find the derivative of f(x) = x³ + 2x² - 5x + 1"
      },
      Science: {
        easy: "What is the chemical symbol for water?",
        medium: "Which planet is closest to the Sun?",
        hard: "Explain the process of photosynthesis in detail"
      },
      English: {
        easy: "What is the past tense of 'go'?",
        medium: "Identify the metaphor in the sentence: 'Time is a thief'",
        hard: "Analyze the literary devices used in Shakespeare's Sonnet 18"
      }
    };
    
    return questions[subject as keyof typeof questions]?.[difficulty as keyof typeof questions['Mathematics']] || "Sample question";
  }

  private generateMockOptions(subject: string, difficulty: string): string[] {
    const options = {
      Mathematics: {
        easy: ["6", "7", "8", "9"],
        medium: ["x = 3", "x = 4", "x = 5", "x = 6"],
        hard: ["3x² + 4x - 5", "3x² + 4x + 5", "3x² - 4x - 5", "3x² - 4x + 5"]
      },
      Science: {
        easy: ["H2O", "CO2", "O2", "H2"],
        medium: ["Venus", "Mercury", "Earth", "Mars"],
        hard: ["Option A", "Option B", "Option C", "Option D"]
      },
      English: {
        easy: ["goed", "went", "gone", "going"],
        medium: ["Time", "thief", "is", "a"],
        hard: ["Option A", "Option B", "Option C", "Option D"]
      }
    };
    
    return options[subject as keyof typeof options]?.[difficulty as keyof typeof options['Mathematics']] || ["Option A", "Option B", "Option C", "Option D"];
  }

  private getRandomTopic(subject: string): string {
    const topics = {
      Mathematics: ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
      Science: ['Physics', 'Chemistry', 'Biology', 'Earth Science'],
      English: ['Grammar', 'Literature', 'Writing', 'Reading Comprehension']
    };
    
    const subjectTopics = topics[subject as keyof typeof topics] || ['General'];
    return subjectTopics[Math.floor(Math.random() * subjectTopics.length)];
  }

  private getMockStudentProfile(studentId: string): StudentProfile {
    return {
      id: studentId,
      name: 'John Doe',
      grade: '10th',
      interests: ['Mathematics', 'Science', 'Technology'],
      learningStyle: 'visual',
      difficultyLevel: 'intermediate',
      weakAreas: ['Algebra', 'Chemistry'],
      strongAreas: ['Geometry', 'Physics'],
      preferredSubjects: ['Mathematics', 'Science'],
      language: 'English',
      timeZone: 'UTC+5:30',
      lastActive: new Date().toISOString(),
      totalQuizzesCompleted: 25,
      averageScore: 78,
    };
  }

  private getMockClassProfile(classId: string): ClassProfile {
    return {
      id: classId,
      name: 'Grade 10 Mathematics',
      grade: '10th',
      subject: 'Mathematics',
      teacherId: 'teacher_123',
      students: [this.getMockStudentProfile('student_1'), this.getMockStudentProfile('student_2')],
      curriculum: ['Algebra', 'Geometry', 'Trigonometry'],
      averageDifficulty: 'intermediate',
      lastQuizDate: new Date().toISOString(),
      totalQuizzes: 15,
    };
  }

  private generateMockAnalytics(attempt: QuizAttempt): { success: boolean; analytics: QuizAnalytics } {
    return {
      success: true,
      analytics: {
        studentId: attempt.studentId,
        totalQuizzes: 25,
        averageScore: 78,
        improvementRate: 12.5,
        timeSpent: attempt.timeSpent,
        subjectBreakdown: [
          { subject: 'Mathematics', score: 85, questionsAnswered: 50, timeSpent: 1200 },
          { subject: 'Science', score: 72, questionsAnswered: 30, timeSpent: 900 },
          { subject: 'English', score: 90, questionsAnswered: 40, timeSpent: 800 },
        ],
        difficultyProgress: {
          easy: { score: 95, count: 20 },
          medium: { score: 78, count: 30 },
          hard: { score: 65, count: 15 },
        },
        learningStyleEffectiveness: {
          visual: 85,
          text: 72,
          kinesthetic: 68,
          auditory: 75,
        },
        recommendations: {
          focusAreas: ['Algebra', 'Chemistry'],
          suggestedDifficulty: 'medium',
          learningStyleAdjustments: ['Use more visual aids', 'Practice with interactive exercises'],
        },
      },
    };
  }

  private getMockStudentAnalytics(studentId: string): QuizAnalytics {
    return this.generateMockAnalytics({
      id: 'attempt_1',
      quizId: 'quiz_1',
      studentId,
      startTime: new Date().toISOString(),
      answers: [],
      score: 0,
      percentage: 0,
      timeSpent: 0,
      completed: false,
      feedback: { strengths: [], improvements: [], recommendations: [] },
    }).analytics;
  }

  private getMockClassAnalytics(classId: string): ClassQuizAnalytics {
    return {
      classId,
      totalStudents: 25,
      averageScore: 78,
      completionRate: 92,
      studentProgress: [
        { studentId: 'student_1', name: 'John Doe', score: 85, completionTime: 1200, weakAreas: ['Algebra'] },
        { studentId: 'student_2', name: 'Jane Smith', score: 72, completionTime: 1500, weakAreas: ['Geometry'] },
      ],
      topicPerformance: [
        { topic: 'Algebra', averageScore: 75, difficulty: 'medium', studentCount: 25 },
        { topic: 'Geometry', averageScore: 82, difficulty: 'medium', studentCount: 25 },
      ],
      recommendations: {
        classFocusAreas: ['Algebra fundamentals'],
        individualAttention: ['student_2 needs geometry help'],
        curriculumAdjustments: ['Add more practice problems for algebra'],
      },
    };
  }

  private getAuthToken(): string {
    // In a real app, this would get the token from localStorage or a context
    return localStorage.getItem('authToken') || 'mock-token';
  }
}

// Export singleton instance
export const quizApiService = new QuizApiService();
export default quizApiService;
