// Book Recommendation Card Component

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Star, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  ShoppingCart,
  Heart,
  Share2,
  TrendingUp,
  Award,
  Users,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Book, AffiliateLink } from '@/types/bookRecommendations';
import { bookRecommendationService } from '@/services/bookRecommendationService';

interface BookRecommendationCardProps {
  book: Book;
  recommendation: {
    reason: string;
    learningObjective: string;
    priority: 'high' | 'medium' | 'low';
    estimatedReadingTime: number;
  };
  onBookClick?: (book: Book) => void;
  onAddToReadingList?: (book: Book) => void;
  showAffiliateLinks?: boolean;
}

const BookRecommendationCard: React.FC<BookRecommendationCardProps> = ({
  book,
  recommendation,
  onBookClick,
  onAddToReadingList,
  showAffiliateLinks = true,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateLink | null>(
    book.affiliateLinks[0] || null
  );

  const handleAffiliateClick = async (affiliateLink: AffiliateLink) => {
    setIsLoading(true);
    try {
      // Track the click
      await bookRecommendationService.trackAffiliateClick(affiliateLink.id, 'student_123');
      
      // Open affiliate link in new tab
      window.open(affiliateLink.url, '_blank', 'noopener,noreferrer');
      
      toast({
        title: 'Opening Book Store',
        description: `Redirecting to ${affiliateLink.platform}...`,
      });
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
      toast({
        title: 'Error',
        description: 'Failed to track click. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToReadingList = () => {
    if (onAddToReadingList) {
      onAddToReadingList(book);
    }
    toast({
      title: 'Added to Reading List',
      description: `${book.title} has been added to your reading list.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="card-elevated h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        {/* Book Cover and Basic Info */}
        <div className="relative">
          <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg flex items-center justify-center">
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt={book.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
            ) : (
              <div className="text-center p-8">
                <BookOpen className="h-16 w-16 text-primary/50 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Book Cover</p>
              </div>
            )}
          </div>
          
          {/* Priority Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${getPriorityColor(recommendation.priority)} border`}>
              {recommendation.priority.toUpperCase()} PRIORITY
            </Badge>
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {book.rating.average.toFixed(1)}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="space-y-2">
            <CardTitle className="text-lg line-clamp-2 leading-tight">
              {book.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Book Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Badge variant="outline" className={getDifficultyColor(book.difficulty)}>
                  {book.difficulty}
                </Badge>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{recommendation.estimatedReadingTime}h</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                <span>{book.pageCount} pages</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{book.publicationYear}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="text-lg font-semibold text-success">
                ${book.price.amount}
              </span>
              {book.price.originalAmount && book.price.originalAmount > book.price.amount && (
                <span className="text-sm text-muted-foreground line-through">
                  ${book.price.originalAmount}
                </span>
              )}
            </div>
            {book.price.discount && (
              <Badge variant="destructive" className="text-xs">
                -{book.price.discount}%
              </Badge>
            )}
          </div>

          {/* Recommendation Reason */}
          <div className="bg-muted/30 rounded-lg p-3">
            <h4 className="text-sm font-medium mb-1">Why This Book?</h4>
            <p className="text-xs text-muted-foreground line-clamp-3">
              {recommendation.reason}
            </p>
          </div>

          {/* Learning Objective */}
          <div className="bg-primary/5 rounded-lg p-3">
            <h4 className="text-sm font-medium mb-1 text-primary">Learning Objective</h4>
            <p className="text-xs text-muted-foreground">
              {recommendation.learningObjective}
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1">
            {book.categories.slice(0, 3).map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {book.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{book.categories.length - 3} more
              </Badge>
            )}
          </div>

          {/* Affiliate Links */}
          {showAffiliateLinks && book.affiliateLinks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Available at:</h4>
              <div className="grid grid-cols-1 gap-2">
                {book.affiliateLinks.map((affiliate) => (
                  <Button
                    key={affiliate.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAffiliateClick(affiliate)}
                    disabled={isLoading}
                    className="w-full justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="capitalize">{affiliate.platform.replace('_', ' ')}</span>
                      {affiliate.commission.percentage > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {affiliate.commission.percentage}% commission
                        </Badge>
                      )}
                    </div>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              onClick={handleAddToReadingList}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Heart className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button
              onClick={() => onBookClick?.(book)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <BookOpen className="h-3 w-3 mr-1" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookRecommendationCard;
