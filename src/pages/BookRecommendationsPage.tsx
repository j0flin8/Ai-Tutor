// Book Recommendations Page - Display personalized book recommendations

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  TrendingUp,
  Clock,
  DollarSign,
  ShoppingCart,
  Heart,
  Share2,
  Target,
  Brain,
  Award,
  Users,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BookRecommendationCard from '@/components/BookRecommendationCard';
import { 
  BookRecommendation, 
  Book, 
  BookSearchFilters,
  BookAnalytics 
} from '@/types/bookRecommendations';
import { bookRecommendationService } from '@/services/bookRecommendationService';

const BookRecommendationsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const studentId = searchParams.get('studentId') || 'student_123';
  const assessmentId = searchParams.get('assessmentId') || 'assessment_123';
  
  const [recommendations, setRecommendations] = useState<BookRecommendation[]>([]);
  const [analytics, setAnalytics] = useState<BookAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('recommendations');

  useEffect(() => {
    loadRecommendations();
    loadAnalytics();
  }, [studentId, assessmentId]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await bookRecommendationService.generateRecommendations({
        studentId,
        assessmentId,
        subject: 'Mathematics',
        topics: ['Algebra', 'Geometry', 'Calculus'],
        difficulty: 'intermediate',
        learningStyle: 'visual',
        interests: ['Mathematics', 'Science'],
        language: 'English',
        maxRecommendations: 10,
      });
      
      if (response.success) {
        setRecommendations(response.recommendations);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load book recommendations.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const analyticsData = await bookRecommendationService.getBookAnalytics(studentId);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const handleBookClick = (book: Book) => {
    // Navigate to book details page or open modal
    console.log('Book clicked:', book);
  };

  const handleAddToReadingList = (book: Book) => {
    // Add book to reading list
    console.log('Adding to reading list:', book);
  };

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesSearch = searchQuery === '' || 
      rec.books.some(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesSubject = selectedSubject === 'all' || 
      rec.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    const matchesDifficulty = selectedDifficulty === 'all' || 
      rec.difficulty === selectedDifficulty;
    
    const matchesPriority = selectedPriority === 'all' || 
      rec.priority === selectedPriority;
    
    return matchesSearch && matchesSubject && matchesDifficulty && matchesPriority;
  });

  const allBooks = filteredRecommendations.flatMap(rec => rec.books);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Book Recommendations</h2>
          <p className="text-muted-foreground">Finding the perfect books for your learning journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={handleBackToDashboard}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Personalized Book Recommendations</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on your assessment results, we've curated the perfect books to help you learn and grow.
            </p>
          </motion.div>
        </div>

        {/* Analytics Summary */}
        {analytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Recommendations</p>
                    <p className="text-2xl font-bold">{analytics.totalRecommendations}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Books Purchased</p>
                    <p className="text-2xl font-bold">{analytics.totalPurchases}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Commission</p>
                    <p className="text-2xl font-bold">${analytics.totalCommission.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold">{analytics.averageRating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search books by title or author..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="all-books">All Books</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            {filteredRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-5 w-5 text-primary" />
                          <span>{recommendation.subject} - {recommendation.topic}</span>
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">{recommendation.reason}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {recommendation.priority} Priority
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {recommendation.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recommendation.books.map((book) => (
                        <BookRecommendationCard
                          key={book.id}
                          book={book}
                          recommendation={{
                            reason: recommendation.reason,
                            learningObjective: recommendation.learningObjective,
                            priority: recommendation.priority,
                            estimatedReadingTime: recommendation.estimatedReadingTime,
                          }}
                          onBookClick={handleBookClick}
                          onAddToReadingList={handleAddToReadingList}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="all-books" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BookRecommendationCard
                    book={book}
                    recommendation={{
                      reason: 'Recommended based on your learning needs',
                      learningObjective: 'Enhance your understanding',
                      priority: 'medium',
                      estimatedReadingTime: 10,
                    }}
                    onBookClick={handleBookClick}
                    onAddToReadingList={handleAddToReadingList}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Reading Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.readingProgress.map((progress) => (
                        <div key={progress.bookId} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{progress.title}</span>
                            <span>{progress.progress}%</span>
                          </div>
                          <Progress value={progress.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Recommendation Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.recommendations.map((rec) => (
                        <div key={rec.subject} className="flex justify-between items-center">
                          <span className="font-medium">{rec.subject}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {rec.count} books
                            </span>
                            <Badge variant="outline">
                              {(rec.purchaseRate * 100).toFixed(0)}% purchase rate
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookRecommendationsPage;
