import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  Play, 
  Globe,
  ArrowRight,
  BookOpen,
  Target,
  Brain,
  Settings,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePersonalizedQuiz } from "@/hooks/usePersonalizedQuiz";
import { QuizQuestion } from "@/types/quiz";

const QuizPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Get student ID and class ID from URL params
  const studentId = searchParams.get('studentId') || 'student_123';
  const classId = searchParams.get('classId') || undefined;
  
  // Use personalized quiz hook
  const {
    currentQuiz,
    quizAttempt,
    studentProfile,
    isLoading,
    error,
    generateQuiz,
    startQuiz,
    submitAnswer,
    completeQuiz,
    currentQuestionIndex,
    progress,
    timeRemaining,
    score,
    isCompleted,
    analytics,
  } = usePersonalizedQuiz({
    studentId,
    classId,
    autoGenerate: true,
  });

  // Local state for current question
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [language, setLanguage] = useState("English");

  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];
  const isQuizStarted = quizAttempt !== null;

  // Update question start time when question changes
  useEffect(() => {
    setQuestionStartTime(Date.now());
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [currentQuestionIndex]);

  // Handle quiz completion
  useEffect(() => {
    if (isCompleted && analytics) {
      setTimeout(() => {
        navigate("/student-dashboard");
      }, 3000);
    }
  }, [isCompleted, analytics, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation || !currentQuestion) return;
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = async () => {
    if (selectedAnswer === null || !currentQuestion || !quizAttempt) return;

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    await submitAnswer(currentQuestion.id, selectedAnswer, timeSpent);

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setShowExplanation(true);

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect 
        ? "Well done! You got it right." 
        : "Don't worry, check the explanation below.",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNextQuestion = () => {
    if (!currentQuiz) return;
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      // Move to next question (handled by the hook)
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Complete the quiz
      handleQuizComplete();
    }
  };

  const handleQuizComplete = async () => {
    try {
      await completeQuiz();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete quiz. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStartQuiz = () => {
    startQuiz();
  };

  const handleRegenerateQuiz = async () => {
    try {
      await generateQuiz({
        subject: currentQuiz?.subject,
        difficulty: currentQuiz?.difficulty === 'mixed' ? 'adaptive' : currentQuiz?.difficulty,
        questionCount: currentQuiz?.totalQuestions,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate quiz. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  // Loading state
  if (isLoading && !currentQuiz) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Generating Your Personalized Quiz</h2>
          <p className="text-muted-foreground">
            Creating questions based on your interests and difficulty level...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="card-elevated text-center max-w-md">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Error Loading Quiz</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={handleRegenerateQuiz} variant="hero">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz not started state
  if (currentQuiz && !isQuizStarted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="card-elevated text-center">
            <CardContent className="p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Brain className="h-12 w-12 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold mb-4">Your Personalized Quiz is Ready!</h1>
              <p className="text-xl text-muted-foreground mb-8">
                This quiz has been tailored specifically for you based on your learning profile.
              </p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{currentQuiz.totalQuestions}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">{formatTime(currentQuiz.timeLimit)}</div>
                    <div className="text-sm text-muted-foreground">Time Limit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{currentQuiz.difficulty}</div>
                    <div className="text-sm text-muted-foreground">Difficulty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{currentQuiz.subject}</div>
                    <div className="text-sm text-muted-foreground">Subject</div>
                  </div>
                </div>

                {studentProfile && (
                  <div className="bg-muted/30 rounded-lg p-4 text-left">
                    <h3 className="font-semibold mb-2">Personalized for you:</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Learning Style:</span> {studentProfile.learningStyle}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Interests:</span> {studentProfile.interests.join(', ')}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Focus Areas:</span> {studentProfile.weakAreas.join(', ')}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Language:</span> {studentProfile.language}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 space-y-4">
                <Button onClick={handleStartQuiz} variant="hero" size="xl" className="w-full">
                  <Play className="mr-2 h-5 w-5" />
                  Start Quiz
                </Button>
                <Button onClick={handleRegenerateQuiz} variant="outline" size="lg" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate New Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Quiz completed state
  if (isCompleted && analytics) {
    const finalScore = quizAttempt?.percentage || 0;
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="card-elevated text-center">
            <CardContent className="p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Target className="h-12 w-12 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Excellent work! Here's how you performed:
              </p>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(finalScore)}`}>
                    {finalScore.toFixed(0)}%
                  </div>
                  <p className="text-muted-foreground">
                    {quizAttempt?.score} out of {currentQuiz?.totalQuestions} questions correct
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{quizAttempt?.score}</div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">
                      {(currentQuiz?.totalQuestions || 0) - (quizAttempt?.score || 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">
                      {formatTime(quizAttempt?.timeSpent || 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Time Used</div>
                  </div>
                </div>

                {analytics.recommendations && (
                  <div className="bg-muted/30 rounded-lg p-4 text-left">
                    <h3 className="font-semibold mb-2">Personalized Recommendations:</h3>
                    <ul className="text-sm space-y-1">
                      {analytics.recommendations.focusAreas.map((area, index) => (
                        <li key={index}>• Focus on {area}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <p className="text-muted-foreground mb-4">
                  Redirecting to your dashboard...
                </p>
                <Button onClick={() => navigate("/student-dashboard")} variant="hero">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Main quiz interface
  if (!currentQuiz || !currentQuestion || !isQuizStarted) {
    return null; // This should not happen, but just in case
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
                    <p className="text-muted-foreground">{currentQuestion.topic}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className={`font-mono text-lg ${timeRemaining < 60 ? 'text-destructive' : ''}`}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setLanguage(language === "English" ? "Hindi" : "English")}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {language}
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {currentQuiz.totalQuestions}
                  </span>
                  <Badge variant={currentQuestion.difficulty === 'easy' ? 'secondary' : currentQuestion.difficulty === 'medium' ? 'default' : 'destructive'}>
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="card-elevated mb-6">
              <CardHeader>
                <CardTitle className="text-xl leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: showExplanation ? 1 : 1.02 }}
                    whileTap={{ scale: showExplanation ? 1 : 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className={`w-full p-6 h-auto text-left justify-start text-wrap ${
                        selectedAnswer === index 
                          ? showExplanation
                            ? index === currentQuestion.correctAnswer
                              ? 'border-success bg-success/10 text-success'
                              : 'border-destructive bg-destructive/10 text-destructive'
                            : 'border-primary bg-primary/10'
                          : showExplanation && index === currentQuestion.correctAnswer
                            ? 'border-success bg-success/10 text-success'
                            : ''
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option}</span>
                        {showExplanation && (
                          <div>
                            {index === currentQuestion.correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-success" />
                            )}
                            {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                              <XCircle className="h-5 w-5 text-destructive" />
                            )}
                          </div>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Explanation Card */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-6"
            >
              <Card className="card-elevated border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">Explanation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {currentQuestion.explanation.text}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    {currentQuestion.explanation.video && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video Explanation
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1">
                      <Globe className="h-4 w-4 mr-2" />
                      View in {language === "English" ? "Hindi" : "English"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Score: {score}/{currentQuestionIndex + (showExplanation ? 1 : 0)}
          </div>
          
          <div className="space-x-4">
            {!showExplanation ? (
              <Button 
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                variant="hero"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} variant="hero">
                {currentQuestionIndex < currentQuiz.totalQuestions - 1 ? "Next Question" : "Complete Quiz"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;