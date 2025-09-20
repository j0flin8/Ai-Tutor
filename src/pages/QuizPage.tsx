import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  Target
} from "lucide-react";
import { quizQuestions } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const QuizPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quizQuestions.length).fill(false)
  );
  const [language, setLanguage] = useState("English");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);

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
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    const finalScore = (score / quizQuestions.length) * 100;
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${finalScore.toFixed(0)}%. Great job!`,
    });

    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate("/student-dashboard");
    }, 3000);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  if (quizCompleted) {
    const finalScore = (score / quizQuestions.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
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
                    {score} out of {quizQuestions.length} questions correct
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{score}</div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">
                      {quizQuestions.length - score}
                    </div>
                    <div className="text-sm text-muted-foreground">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">
                      {formatTime(300 - timeLeft)}
                    </div>
                    <div className="text-sm text-muted-foreground">Time Used</div>
                  </div>
                </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
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
                    <h1 className="text-2xl font-bold">{question.subject} Quiz</h1>
                    <p className="text-muted-foreground">{question.topic}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className={`font-mono text-lg ${timeLeft < 60 ? 'text-destructive' : ''}`}>
                      {formatTime(timeLeft)}
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
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <Badge variant={question.difficulty === 'easy' ? 'secondary' : question.difficulty === 'medium' ? 'default' : 'destructive'}>
                    {question.difficulty}
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
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="card-elevated mb-6">
              <CardHeader>
                <CardTitle className="text-xl leading-relaxed">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {question.options.map((option, index) => (
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
                            ? index === question.correctAnswer
                              ? 'border-success bg-success/10 text-success'
                              : 'border-destructive bg-destructive/10 text-destructive'
                            : 'border-primary bg-primary/10'
                          : showExplanation && index === question.correctAnswer
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
                            {index === question.correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-success" />
                            )}
                            {selectedAnswer === index && index !== question.correctAnswer && (
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
                    {question.explanation.text}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Video Explanation
                    </Button>
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
            Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
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
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Complete Quiz"}
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