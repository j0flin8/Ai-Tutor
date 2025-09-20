// AI Tutor Page - Main interface for AI tutoring

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  ArrowLeft, 
  BookOpen, 
  Target, 
  Clock,
  TrendingUp,
  Users,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AITutor from '@/components/AITutor';
import { useAITutor } from '@/hooks/useAITutor';
import { AILesson } from '@/types/aiTutor';

const AITutorPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const studentId = searchParams.get('studentId') || 'student_123';
  const lessonId = searchParams.get('lessonId') || undefined;
  const [showTutor, setShowTutor] = useState(false);
  const [completedLesson, setCompletedLesson] = useState<AILesson | null>(null);

  const {
    currentLesson,
    tutorPersonality,
    analytics,
    isLoading,
    generateLesson,
  } = useAITutor({
    studentId,
    autoGenerateLesson: false,
  });

  const handleStartTutoring = () => {
    setShowTutor(true);
  };

  const handleLessonComplete = (lesson: AILesson) => {
    setCompletedLesson(lesson);
    setShowTutor(false);
    
    toast({
      title: 'Lesson Completed!',
      description: `Great job completing ${lesson.title}!`,
    });
  };

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const handleStartNewLesson = async () => {
    await generateLesson({
      subject: 'Mathematics',
      topic: 'Advanced Algebra',
      difficulty: 'intermediate',
    });
    setShowTutor(true);
    setCompletedLesson(null);
  };

  if (showTutor) {
    return (
      <AITutor
        studentId={studentId}
        lessonId={lessonId}
        onLessonComplete={handleLessonComplete}
      />
    );
  }

  if (completedLesson) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              onClick={handleBackToDashboard}
              variant="outline"
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Lesson Completed!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Congratulations! You've successfully completed your AI tutoring session.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Lesson Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Title</p>
                    <p className="text-lg font-semibold">{completedLesson.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Topic</p>
                    <p className="text-muted-foreground">{completedLesson.topic}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Difficulty</p>
                    <Badge variant="secondary" className="capitalize">
                      {completedLesson.difficulty}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-muted-foreground">{completedLesson.estimatedDuration} minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Learning Objectives</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {completedLesson.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-4">
            <Button onClick={handleStartNewLesson} variant="hero" size="lg">
              <Brain className="h-5 w-5 mr-2" />
              Start New Lesson
            </Button>
            <div>
              <Button onClick={handleBackToDashboard} variant="outline">
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading AI Tutor</h2>
          <p className="text-muted-foreground">Preparing your personalized learning experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={handleBackToDashboard}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">AI Tutor</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your personal AI tutor that adapts to your learning style and creates 
              personalized lessons based on your assessments and progress.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tutor Introduction */}
            {tutorPersonality && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-6 w-6 text-primary" />
                    <span>Meet Your AI Tutor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{tutorPersonality.name}</h3>
                      <p className="text-muted-foreground mb-4 capitalize">
                        {tutorPersonality.style} AI Tutor
                      </p>
                      <p className="text-muted-foreground mb-4">
                        {tutorPersonality.greeting}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tutorPersonality.traits.map((trait, index) => (
                          <Badge key={index} variant="secondary">{trait}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Features */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>How AI Tutoring Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Personalized Lessons</h4>
                        <p className="text-sm text-muted-foreground">
                          Lessons tailored to your learning style and skill level
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Adaptive Learning</h4>
                        <p className="text-sm text-muted-foreground">
                          AI adjusts difficulty and pace based on your responses
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">24/7 Availability</h4>
                        <p className="text-sm text-muted-foreground">
                          Learn at your own pace, whenever you're ready
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Progress Tracking</h4>
                        <p className="text-sm text-muted-foreground">
                          Detailed analytics and recommendations for improvement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Analytics */}
            {analytics && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Your Learning Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Sessions</span>
                      <span className="font-semibold">{analytics.totalSessions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Time Spent</span>
                      <span className="font-semibold">{analytics.totalTimeSpent} min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Completion Rate</span>
                      <span className="font-semibold">{analytics.completionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Improvement</span>
                      <span className="font-semibold text-success">+{analytics.improvementRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Start */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Ready to Start?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Begin your personalized learning journey with AI tutoring.
                  </p>
                  <Button onClick={handleStartTutoring} variant="hero" className="w-full">
                    <Brain className="h-4 w-4 mr-2" />
                    Start AI Tutoring
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {analytics && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Next Topics</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {analytics.recommendations.nextTopics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Best Time</p>
                      <p className="text-sm text-muted-foreground">
                        {analytics.recommendations.bestTimeOfDay}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Session Length</p>
                      <p className="text-sm text-muted-foreground">
                        {analytics.recommendations.optimalSessionLength} minutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutorPage;
