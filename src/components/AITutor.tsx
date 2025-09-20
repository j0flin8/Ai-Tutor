// AI Tutor Component - Interactive tutoring interface

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  CheckCircle, 
  Lightbulb,
  MessageSquare,
  BookOpen,
  Target,
  Clock,
  User,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAITutor } from '@/hooks/useAITutor';
import { AILesson, TutorSession, TutorPersonality } from '@/types/aiTutor';

interface AITutorProps {
  studentId: string;
  lessonId?: string;
  onLessonComplete?: (lesson: AILesson) => void;
}

const AITutor: React.FC<AITutorProps> = ({ 
  studentId, 
  lessonId, 
  onLessonComplete 
}) => {
  const { toast } = useToast();
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showAssessment, setShowAssessment] = useState(false);
  
  const {
    currentLesson,
    currentSession,
    tutorPersonality,
    isLoading,
    isGeneratingLesson,
    isStartingSession,
    error,
    generateLesson,
    startTutorSession,
    endTutorSession,
    pauseTutorSession,
    resumeTutorSession,
    nextStep,
    previousStep,
    submitResponse,
    progress,
    currentStep,
    totalSteps,
  } = useAITutor({
    studentId,
    autoGenerateLesson: !lessonId,
  });

  // Auto-start session when lesson is ready
  useEffect(() => {
    if (currentLesson && !currentSession && !isStartingSession) {
      startTutorSession(currentLesson.id);
    }
  }, [currentLesson, currentSession, isStartingSession, startTutorSession]);

  // Simulate typing effect for tutor messages
  useEffect(() => {
    if (tutorPersonality && !currentMessage) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentMessage(tutorPersonality.greeting);
        setIsTyping(false);
      }, 1000);
    }
  }, [tutorPersonality, currentMessage]);

  const handleStartLesson = async () => {
    if (!currentLesson) {
      await generateLesson({
        subject: 'Mathematics',
        topic: 'Algebra Basics',
        difficulty: 'intermediate',
      });
    }
  };

  const handleNextStep = () => {
    nextStep();
    // Simulate tutor response
    if (tutorPersonality) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentMessage(tutorPersonality.encouragement[Math.floor(Math.random() * tutorPersonality.encouragement.length)]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handlePreviousStep = () => {
    previousStep();
  };

  const handleSubmitAnswer = (answer: string, isCorrect: boolean) => {
    submitResponse(answer, isCorrect);
    
    if (tutorPersonality) {
      setIsTyping(true);
      setTimeout(() => {
        const message = isCorrect 
          ? tutorPersonality.praise[Math.floor(Math.random() * tutorPersonality.praise.length)]
          : tutorPersonality.corrections[Math.floor(Math.random() * tutorPersonality.corrections.length)];
        setCurrentMessage(message);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleCompleteLesson = async () => {
    await endTutorSession();
    if (currentLesson && onLessonComplete) {
      onLessonComplete(currentLesson);
    }
    setShowAssessment(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Your AI Tutor</h2>
          <p className="text-muted-foreground">Preparing your personalized learning experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="card-elevated">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Error Loading AI Tutor</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={handleStartLesson} variant="hero">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!currentLesson) {
    return (
      <div className="max-w-4xl mx-auto p-6">
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
            
            <h1 className="text-4xl font-bold mb-4">Meet Your AI Tutor</h1>
            <p className="text-xl text-muted-foreground mb-8">
              I'll create a personalized lesson just for you based on your learning needs and style.
            </p>
            
            {tutorPersonality && (
              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">{tutorPersonality.name}</h3>
                    <p className="text-muted-foreground capitalize">{tutorPersonality.style} Tutor</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{tutorPersonality.greeting}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {tutorPersonality.traits.map((trait, index) => (
                    <Badge key={index} variant="secondary">{trait}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              onClick={handleStartLesson} 
              disabled={isGeneratingLesson}
              variant="hero" 
              size="xl"
              className="w-full max-w-md"
            >
              {isGeneratingLesson ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Your Lesson...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Learning with AI Tutor
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <Card className="card-elevated mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                <p className="text-muted-foreground">{currentLesson.topic}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="font-semibold">{Math.round(progress)}%</div>
              </div>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{currentLesson.estimatedDuration} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm capitalize">{currentLesson.difficulty}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{currentStep + 1} of {totalSteps}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {currentSession?.status === 'paused' ? (
                <Button onClick={resumeTutorSession} variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              ) : (
                <Button onClick={pauseTutorSession} variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tutor Message */}
          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{tutorPersonality?.name || 'AI Tutor'}</CardTitle>
                  <p className="text-sm text-muted-foreground">Your personal learning assistant</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[100px] flex items-center">
                {isTyping ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-pulse">●</div>
                    <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</div>
                    <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</div>
                    <span className="text-muted-foreground ml-2">Typing...</span>
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed">{currentMessage}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lesson Content */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Lesson Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentLesson.content.slice(0, currentStep + 1).map((content, index) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      index === currentStep 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-muted/30'
                    }`}
                  >
                    <h3 className="font-semibold mb-2">{content.title}</h3>
                    <p className="text-muted-foreground">{content.content}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Elements */}
          {currentLesson.interactiveElements.length > 0 && (
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>Let's Practice</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentLesson.interactiveElements.map((element, index) => (
                    <div key={element.id} className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">{element.title}</h4>
                      <p className="text-muted-foreground mb-4">{element.content}</p>
                      
                      {element.type === 'quiz' && (
                        <div className="space-y-2">
                          {element.data.questions.map((question: any, qIndex: number) => (
                            <div key={qIndex} className="space-y-2">
                              <p className="font-medium">{question.question}</p>
                              <div className="grid grid-cols-2 gap-2">
                                {question.options.map((option: string, oIndex: number) => (
                                  <Button
                                    key={oIndex}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSubmitAnswer(option, oIndex === question.correctAnswer)}
                                    className="text-left justify-start"
                                  >
                                    {option}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Objectives */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentLesson.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Personalized Features */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Personalized For You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Learning Style</p>
                  <Badge variant="secondary" className="mt-1">
                    {currentLesson.personalizedFor.learningStyle}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Focus Areas</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentLesson.personalizedFor.weaknesses.map((area, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <SkipBack className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={currentStep >= totalSteps - 1}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Next
                    <SkipForward className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                
                {currentStep >= totalSteps - 1 && (
                  <Button
                    onClick={handleCompleteLesson}
                    variant="hero"
                    className="w-full"
                  >
                    Complete Lesson
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
