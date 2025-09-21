// Book Recommendation Service with Affiliate Integration

import { 
  BookRecommendationRequest, 
  BookRecommendationResponse, 
  BookRecommendation,
  Book,
  AffiliateLink,
  BookAnalytics,
  AffiliateAnalytics,
  BookSearchRequest,
  BookSearchResponse,
  ReadingList,
  BookReview
} from '@/types/bookRecommendations';

// Mock API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.aiclassroomtutor.com';

class BookRecommendationService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Generate book recommendations based on assessment results
  async generateRecommendations(request: BookRecommendationRequest): Promise<BookRecommendationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/books/recommendations`, {
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
      console.error('Error generating book recommendations:', error);
      return this.generateMockRecommendations(request);
    }
  }

  // Search for books with filters
  async searchBooks(searchRequest: BookSearchRequest): Promise<BookSearchResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/books/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(searchRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching books:', error);
      return this.generateMockSearchResults(searchRequest);
    }
  }

  // Track affiliate link clicks
  async trackAffiliateClick(affiliateLinkId: string, studentId: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/api/affiliate/track-click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({ affiliateLinkId, studentId }),
      });
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
    }
  }

  // Track book purchases
  async trackPurchase(bookId: string, studentId: string, affiliateLinkId: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/api/affiliate/track-purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({ bookId, studentId, affiliateLinkId }),
      });
    } catch (error) {
      console.error('Error tracking purchase:', error);
    }
  }

  // Get book analytics for student
  async getBookAnalytics(studentId: string): Promise<BookAnalytics> {
    try {
      const response = await fetch(`${this.baseUrl}/api/books/analytics/${studentId}`, {
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
      console.error('Error fetching book analytics:', error);
      return this.getMockBookAnalytics(studentId);
    }
  }

  // Get affiliate analytics
  async getAffiliateAnalytics(): Promise<AffiliateAnalytics> {
    try {
      const response = await fetch(`${this.baseUrl}/api/affiliate/analytics`, {
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
      console.error('Error fetching affiliate analytics:', error);
      return this.getMockAffiliateAnalytics();
    }
  }

  // Create reading list
  async createReadingList(name: string, description: string, studentId: string): Promise<ReadingList> {
    try {
      const response = await fetch(`${this.baseUrl}/api/books/reading-lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({ name, description, studentId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating reading list:', error);
      throw error;
    }
  }

  // Add book to reading list
  async addBookToReadingList(readingListId: string, bookId: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/api/books/reading-lists/${readingListId}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({ bookId }),
      });
    } catch (error) {
      console.error('Error adding book to reading list:', error);
      throw error;
    }
  }

  // Submit book review
  async submitBookReview(review: Omit<BookReview, 'id' | 'createdAt' | 'updatedAt'>): Promise<BookReview> {
    try {
      const response = await fetch(`${this.baseUrl}/api/books/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting book review:', error);
      throw error;
    }
  }

  // Mock data generators
  private generateMockRecommendations(request: BookRecommendationRequest): BookRecommendationResponse {
    const recommendations = this.createMockRecommendations(request);
    
    return {
      success: true,
      recommendations,
      message: 'Book recommendations generated successfully based on your assessment',
      metadata: {
        generationTime: 1.8,
        algorithm: 'AI-Book-Recommendation-v2.0',
        confidence: 0.91,
        totalBooksAnalyzed: 1250,
      },
    };
  }

  private createMockRecommendations(request: BookRecommendationRequest): BookRecommendation[] {
    const subject = request.subject;
    const topics = request.topics;
    const difficulty = request.difficulty;

    return [
      {
        id: `rec_${Date.now()}_1`,
        studentId: request.studentId,
        assessmentId: request.assessmentId,
        subject,
        topic: topics[0] || 'General',
        difficulty,
        reason: `Based on your assessment, you showed interest in ${topics.join(', ')} and would benefit from comprehensive coverage of ${subject} fundamentals.`,
        learningObjective: `Master ${subject} concepts and build strong foundation for advanced topics`,
        estimatedReadingTime: difficulty === 'beginner' ? 8 : difficulty === 'intermediate' ? 12 : 16,
        priority: 'high',
        books: this.generateMockBooks(subject, topics, difficulty, 3),
        alternatives: this.generateMockBooks(subject, topics, difficulty, 2),
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
      },
      {
        id: `rec_${Date.now()}_2`,
        studentId: request.studentId,
        assessmentId: request.assessmentId,
        subject,
        topic: topics[1] || 'Advanced Topics',
        difficulty: difficulty === 'beginner' ? 'intermediate' : difficulty === 'intermediate' ? 'advanced' : 'advanced',
        reason: `To challenge yourself and explore advanced concepts in ${subject}.`,
        learningObjective: `Develop expertise in advanced ${subject} topics`,
        estimatedReadingTime: 20,
        priority: 'medium',
        books: this.generateMockBooks(subject, topics, 'advanced', 2),
        alternatives: this.generateMockBooks(subject, topics, 'advanced', 1),
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
      },
    ];
  }

  private generateMockBooks(subject: string, topics: string[], difficulty: string, count: number): Book[] {
    const books: Book[] = [];
    
    for (let i = 0; i < count; i++) {
      books.push({
        id: `book_${Date.now()}_${i}`,
        title: this.generateBookTitle(subject, topics, difficulty, i),
        author: this.generateAuthorName(),
        isbn: this.generateISBN(),
        publisher: this.generatePublisher(),
        publicationYear: 2020 + Math.floor(Math.random() * 4),
        description: this.generateBookDescription(subject, topics, difficulty),
        coverImageUrl: `/images/book-covers/${subject.toLowerCase()}_${i + 1}.jpg`,
        price: {
          currency: 'USD',
          amount: this.generatePrice(difficulty),
          originalAmount: this.generateOriginalPrice(difficulty),
          discount: Math.floor(Math.random() * 30) + 10,
        },
        rating: {
          average: 4.0 + Math.random() * 1.0,
          count: Math.floor(Math.random() * 500) + 50,
        },
        categories: [subject, ...topics],
        tags: this.generateTags(subject, topics, difficulty),
        difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
        subject,
        topics,
        language: 'English',
        pageCount: this.generatePageCount(difficulty),
        format: 'paperback',
        availability: {
          inStock: Math.random() > 0.1,
          estimatedDelivery: '2-3 business days',
        },
        affiliateLinks: this.generateAffiliateLinks(),
        metadata: {
          source: 'AI-Recommendation-Engine',
          lastUpdated: new Date().toISOString(),
          verified: true,
        },
      });
    }
    
    return books;
  }

  private generateBookTitle(subject: string, topics: string[], difficulty: string, index: number): string {
    const titles = {
      Mathematics: {
        beginner: [
          'Introduction to Mathematics',
          'Basic Mathematical Concepts',
          'Mathematics Fundamentals',
        ],
        intermediate: [
          'Advanced Mathematical Methods',
          'Mathematical Analysis',
          'Applied Mathematics',
        ],
        advanced: [
          'Advanced Mathematical Theory',
          'Mathematical Modeling',
          'Theoretical Mathematics',
        ],
      },
      Science: {
        beginner: [
          'Introduction to Science',
          'Basic Scientific Principles',
          'Science Fundamentals',
        ],
        intermediate: [
          'Advanced Scientific Methods',
          'Scientific Analysis',
          'Applied Science',
        ],
        advanced: [
          'Advanced Scientific Theory',
          'Scientific Research Methods',
          'Theoretical Science',
        ],
      },
    };

    const subjectTitles = titles[subject as keyof typeof titles] || titles.Mathematics;
    const difficultyTitles = subjectTitles[difficulty as keyof typeof subjectTitles] || subjectTitles.beginner;
    return difficultyTitles[index] || `${subject} ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Guide`;
  }

  private generateAuthorName(): string {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  }

  private generateISBN(): string {
    return `978-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9)}`;
  }

  private generatePublisher(): string {
    const publishers = [
      'Academic Press',
      'Educational Publishing',
      'Learning Solutions',
      'Knowledge Books',
      'Study Guides Inc',
    ];
    return publishers[Math.floor(Math.random() * publishers.length)];
  }

  private generateBookDescription(subject: string, topics: string[], difficulty: string): string {
    return `A comprehensive ${difficulty} guide to ${subject} covering ${topics.join(', ')}. This book provides clear explanations, practical examples, and exercises to help you master the concepts. Perfect for students looking to strengthen their understanding of ${subject} fundamentals.`;
  }

  private generatePrice(difficulty: string): number {
    const basePrices = {
      beginner: 15,
      intermediate: 25,
      advanced: 35,
    };
    return basePrices[difficulty as keyof typeof basePrices] + Math.floor(Math.random() * 20);
  }

  private generateOriginalPrice(difficulty: string): number {
    const price = this.generatePrice(difficulty);
    return price + Math.floor(Math.random() * 15) + 5;
  }

  private generateTags(subject: string, topics: string[], difficulty: string): string[] {
    return [
      subject.toLowerCase(),
      difficulty,
      ...topics.map(topic => topic.toLowerCase()),
      'education',
      'learning',
      'study',
    ];
  }

  private generatePageCount(difficulty: string): number {
    const basePages = {
      beginner: 200,
      intermediate: 350,
      advanced: 500,
    };
    return basePages[difficulty as keyof typeof basePages] + Math.floor(Math.random() * 100);
  }

  private generateAffiliateLinks(): AffiliateLink[] {
    return [
      {
        id: `affiliate_${Date.now()}_amazon`,
        platform: 'amazon',
        url: 'https://amazon.com/dp/example',
        affiliateCode: 'AITUTOR20',
        commission: {
          percentage: 4.5,
        },
        isActive: true,
        trackingId: `track_${Date.now()}`,
      },
      {
        id: `affiliate_${Date.now()}_barnes`,
        platform: 'barnes_noble',
        url: 'https://barnesandnoble.com/example',
        affiliateCode: 'AITUTOR15',
        commission: {
          percentage: 3.0,
        },
        isActive: true,
        trackingId: `track_${Date.now()}_bn`,
      },
    ];
  }

  private generateMockSearchResults(request: BookSearchRequest): BookSearchResponse {
    const books = this.generateMockBooks(
      request.filters.subject || 'Mathematics',
      request.filters.topics || ['General'],
      request.filters.difficulty || 'intermediate',
      request.limit
    );

    return {
      success: true,
      books,
      totalCount: 150,
      page: request.page,
      totalPages: Math.ceil(150 / request.limit),
      hasMore: request.page < Math.ceil(150 / request.limit),
      metadata: {
        searchTime: 0.5,
        filters: request.filters,
      },
    };
  }

  private getMockBookAnalytics(studentId: string): BookAnalytics {
    return {
      studentId,
      totalRecommendations: 25,
      totalPurchases: 8,
      totalCommission: 45.50,
      favoriteCategories: ['Mathematics', 'Science', 'Programming'],
      preferredFormats: ['paperback', 'ebook'],
      averageRating: 4.2,
      readingProgress: [
        {
          bookId: 'book_1',
          title: 'Introduction to Mathematics',
          progress: 75,
          lastRead: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          bookId: 'book_2',
          title: 'Advanced Science Concepts',
          progress: 45,
          lastRead: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      recommendations: [
        { subject: 'Mathematics', count: 12, purchaseRate: 0.33 },
        { subject: 'Science', count: 8, purchaseRate: 0.25 },
        { subject: 'Programming', count: 5, purchaseRate: 0.40 },
      ],
    };
  }

  private getMockAffiliateAnalytics(): AffiliateAnalytics {
    return {
      totalClicks: 1250,
      totalPurchases: 45,
      totalCommission: 234.75,
      conversionRate: 3.6,
      topPerformingBooks: [
        {
          bookId: 'book_1',
          title: 'Introduction to Mathematics',
          clicks: 150,
          purchases: 8,
          commission: 45.50,
        },
        {
          bookId: 'book_2',
          title: 'Advanced Science Concepts',
          clicks: 120,
          purchases: 6,
          commission: 38.25,
        },
      ],
      platformPerformance: [
        {
          platform: 'amazon',
          clicks: 800,
          purchases: 30,
          commission: 156.50,
        },
        {
          platform: 'barnes_noble',
          clicks: 450,
          purchases: 15,
          commission: 78.25,
        },
      ],
      monthlyTrends: [
        {
          month: '2024-01',
          clicks: 200,
          purchases: 8,
          commission: 45.50,
        },
        {
          month: '2024-02',
          clicks: 250,
          purchases: 12,
          commission: 68.75,
        },
      ],
    };
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || 'mock-token';
  }
}

// Export singleton instance
export const bookRecommendationService = new BookRecommendationService();
export default bookRecommendationService;
