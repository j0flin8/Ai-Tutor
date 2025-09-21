// Enhanced Assessment Page - Comprehensive assessment with AI tutor and book recommendations

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  ArrowLeft, 
  BookOpen, 
  Target, 
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Star,
  Users,
  Award,
  Lightbulb
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  EnhancedAssessment,
  EnhancedAssessmentQuestion,
  AssessmentStrength,
  AssessmentWeakness,
  AssessmentRecommendation,
  AITutorSuggestion,
  BookRecommendationSuggestion,
  LearningPathSuggestion
} from '@/types/enhancedAssessment';
import { enhancedAssessmentService } from '@/services/enhancedAssessmentService';

const EnhancedAssessmentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const studentId = searchParams.get('studentId') || 'student_123';
  const subject = searchParams.get('subject') || 'Mathematics';
  
  const [assessment, setAssessment] = useState<EnhancedAssessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadAssessment();
  }, [studentId, subject]);

  useEffect(() => {
    if (assessment && !showResults) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [assessment, showResults]);

  const loadAssessment = async () => {
    setIsLoading(true);
    try {
      const response = await enhancedAssessmentService.generateEnhancedAssessment({
        studentId,
        subject,
        topics: ['Algebra', 'Geometry', 'Calculus'],
        difficulty: 'intermediate',
        questionCount: 10,
        timeLimit: 1800,
        learningStyle: 'visual',
        language: 'English',
        includeVisualAids: true,
        adaptiveDifficulty: true,
      });
      
      if (response.success) {
        setAssessment(response.assessment);
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
      toast({
        title: 'Error',
        description: 'Failed to load assessment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (assessment?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!assessment) return;
    
    setIsSubmitting(true);
    try {
      // Calculate score
      let correctAnswers = 0;
      assessment.questions.forEach(question => {
        if (answers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      
      const score = Math.round((correctAnswers / assessment.questions.length) * 100);
      
      // Update assessment with results
      const completedAssessment = {
        ...assessment,
        score,
        percentage: score,
        timeSpent,
        completedAt: new Date().toISOString(),
      };
      
      // Submit for analysis
      const analysisResponse = await enhancedAssessmentService.submitAssessment(completedAssessment);
      
      if (analysisResponse.success) {
        setAssessment(prev => prev ? {
          ...prev,
          ...analysisResponse.analysis
        } : null);
        setShowResults(true);
        
        toast({
          title: 'Assessment Completed!',
          description: `You scored ${score}%. Check your personalized recommendations below.`,
        });
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit assessment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartAITutoring = () => {
    navigate(`/ai-tutor?studentId=${studentId}&assessmentId=${assessment?.id}`);
  };

  const handleViewBookRecommendations = () => {
    navigate(`/book-recommendations?studentId=${studentId}&assessmentId=${assessment?.id}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Assessment</h2>
          <p className="text-muted-foreground">Preparing your personalized assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Assessment Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested assessment could not be loaded.</p>
          <Button onClick={() => navigate('/student-dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button
              onClick={() => navigate('/student-dashboard')}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Assessment Complete!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your personalized learning plan is ready. Let's help you improve and grow!
            </p>
          </motion.div>

          {/* Score Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{assessment.percentage}%</h3>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-success">{formatTime(timeSpent)}</h3>
                <p className="text-sm text-muted-foreground">Time Spent</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-warning" />
                </div>
                <h3 className="text-2xl font-bold text-warning">{assessment.strengths.length}</h3>
                <p className="text-sm text-muted-foreground">Strengths</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-info" />
                </div>
                <h3 className="text-2xl font-bold text-info">{assessment.weaknesses.length}</h3>
                <p className="text-sm text-muted-foreground">Areas to Improve</p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Tutor Suggestions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <span>AI Tutor Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessment.aiTutorSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">{suggestion.topic}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{suggestion.suggestedApproach}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="capitalize">
                          {suggestion.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {suggestion.estimatedDuration} min
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button onClick={handleStartAITutoring} variant="hero" className="w-full">
                    <Brain className="mr-2 h-4 w-4" />
                    Start AI Tutoring
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Book Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>Book Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessment.bookRecommendations.map((rec, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">{rec.subject}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="capitalize">
                          {rec.priority} Priority
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {rec.estimatedReadingTime}h reading
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button onClick={handleViewBookRecommendations} variant="hero" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Book Recommendations
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Learning Path */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Your Learning Path</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{assessment.learningPath.title}</h4>
                      <p className="text-sm text-muted-foreground">{assessment.learningPath.description}</p>
                    </div>
                    <Badge variant="secondary">
                      {assessment.learningPath.estimatedDuration} weeks
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {assessment.learningPath.phases.map((phase, index) => (
                      <div key={phase.id} className="p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">{index + 1}</span>
                          </div>
                          <h5 className="font-medium text-sm">{phase.title}</h5>
                        </div>
                        <p className="text-xs text-muted-foreground">{phase.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {phase.duration} weeks
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => navigate('/student-dashboard')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Assessment Header */}
        <Card className="card-elevated mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{assessment.title}</h1>
                <p className="text-muted-foreground">{assessment.subject} Assessment</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Time</div>
                <div className="font-semibold">{formatTime(timeSpent)}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{currentQuestion + 1} of {assessment.questions.length}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="card-elevated mb-6">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Question {currentQuestion + 1}</h2>
                <p className="text-lg leading-relaxed">{currentQ.question}</p>
              </div>

              {currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={answers[currentQ.id] === index ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto p-4"
                      onClick={() => handleAnswerSelect(currentQ.id, index)}
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                      <span>{option}</span>
                    </Button>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                
                {currentQuestion === assessment.questions.length - 1 ? (
                  <Button
                    onClick={handleSubmitAssessment}
                    disabled={isSubmitting}
                    variant="hero"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!answers[currentQ.id] && currentQ.type !== 'short_answer'}
                    variant="hero"
                  >
                    Next Question
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedAssessmentPage;