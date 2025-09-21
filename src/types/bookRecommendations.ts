// Types for Book Recommendation System with Affiliate Integration

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publicationYear: number;
  description: string;
  coverImageUrl: string;
  price: {
    currency: string;
    amount: number;
    originalAmount?: number;
    discount?: number;
  };
  rating: {
    average: number;
    count: number;
  };
  categories: string[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  subject: string;
  topics: string[];
  language: string;
  pageCount: number;
  format: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  availability: {
    inStock: boolean;
    estimatedDelivery?: string;
  };
  affiliateLinks: AffiliateLink[];
  metadata: {
    source: string;
    lastUpdated: string;
    verified: boolean;
  };
}

export interface AffiliateLink {
  id: string;
  platform: 'amazon' | 'barnes_noble' | 'bookdepository' | 'local_bookstore' | 'ebook_platform';
  url: string;
  affiliateCode: string;
  commission: {
    percentage: number;
    fixed?: number;
  };
  isActive: boolean;
  expiresAt?: string;
  trackingId: string;
}

export interface BookRecommendation {
  id: string;
  studentId: string;
  assessmentId: string;
  subject: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  reason: string;
  learningObjective: string;
  estimatedReadingTime: number; // in hours
  priority: 'high' | 'medium' | 'low';
  books: Book[];
  alternatives: Book[];
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'purchased' | 'expired' | 'dismissed';
  feedback?: {
    rating?: number;
    comment?: string;
    purchased?: boolean;
    helpful?: boolean;
  };
}

export interface BookRecommendationRequest {
  studentId: string;
  assessmentId: string;
  subject: string;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'visual' | 'text' | 'kinesthetic' | 'auditory';
  interests: string[];
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  preferredFormats?: ('hardcover' | 'paperback' | 'ebook' | 'audiobook')[];
  language: string;
  excludeTopics?: string[];
  maxRecommendations?: number;
}

export interface BookRecommendationResponse {
  success: boolean;
  recommendations: BookRecommendation[];
  message: string;
  metadata: {
    generationTime: number;
    algorithm: string;
    confidence: number;
    totalBooksAnalyzed: number;
  };
}

export interface BookAnalytics {
  studentId: string;
  totalRecommendations: number;
  totalPurchases: number;
  totalCommission: number;
  favoriteCategories: string[];
  preferredFormats: string[];
  averageRating: number;
  readingProgress: {
    bookId: string;
    title: string;
    progress: number;
    lastRead: string;
  }[];
  recommendations: {
    subject: string;
    count: number;
    purchaseRate: number;
  }[];
}

export interface AffiliateAnalytics {
  totalClicks: number;
  totalPurchases: number;
  totalCommission: number;
  conversionRate: number;
  topPerformingBooks: {
    bookId: string;
    title: string;
    clicks: number;
    purchases: number;
    commission: number;
  }[];
  platformPerformance: {
    platform: string;
    clicks: number;
    purchases: number;
    commission: number;
  }[];
  monthlyTrends: {
    month: string;
    clicks: number;
    purchases: number;
    commission: number;
  }[];
}

export interface BookSearchFilters {
  subject?: string;
  topics?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: {
    min: number;
  };
  format?: ('hardcover' | 'paperback' | 'ebook' | 'audiobook')[];
  language?: string;
  availability?: boolean;
  sortBy?: 'relevance' | 'price' | 'rating' | 'publication_date';
  sortOrder?: 'asc' | 'desc';
}

export interface BookSearchRequest {
  query?: string;
  filters: BookSearchFilters;
  page: number;
  limit: number;
  studentId?: string;
}

export interface BookSearchResponse {
  success: boolean;
  books: Book[];
  totalCount: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
  metadata: {
    searchTime: number;
    filters: BookSearchFilters;
  };
}

export interface ReadingList {
  id: string;
  studentId: string;
  name: string;
  description: string;
  books: {
    bookId: string;
    addedAt: string;
    status: 'to_read' | 'reading' | 'completed' | 'abandoned';
    progress?: number;
    rating?: number;
    notes?: string;
  }[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BookReview {
  id: string;
  bookId: string;
  studentId: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
