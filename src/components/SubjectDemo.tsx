// Subject Demo Component - Shows what happens when selecting a subject

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  BookOpen, 
  Target, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

interface SubjectDemoProps {
  subject: 'Mathematics' | 'Science';
  onStartAssessment: () => void;
  onClose: () => void;
}

const SubjectDemo: React.FC<SubjectDemoProps> = ({ subject, onStartAssessment, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      title: 'Welcome to AI-Powered Learning',
      description: `Let's explore ${subject} with our intelligent assessment system.`,
      icon: Brain,
      color: 'text-primary'
    },
    {
      title: 'Personalized Assessment',
      description: 'Take a quick assessment to identify your strengths and learning style.',
      icon: Target,
      color: 'text-success'
    },
    {
      title: 'AI Analysis',
      description: 'Our AI analyzes your responses and creates a customized learning plan.',
      icon: TrendingUp,
      color: 'text-warning'
    },
    {
      title: 'Start Learning',
      description: 'Begin your personalized journey with AI tutoring and book recommendations.',
      icon: BookOpen,
      color: 'text-info'
    }
  ];

  const subjectStats = {
    Mathematics: {
      students: '2.5M+',
      averageImprovement: '35%',
      topics: ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
      rating: 4.8
    },
    Science: {
      students: '2.1M+',
      averageImprovement: '42%',
      topics: ['Physics', 'Chemistry', 'Biology', 'Earth Science'],
      rating: 4.7
    }
  };

  const stats = subjectStats[subject];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleStartAssessment = async () => {
    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onStartAssessment();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-2xl">{subject} Learning Journey</CardTitle>
            <p className="text-muted-foreground">
              Experience personalized learning powered by AI
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Subject Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-lg font-bold">{stats.students}</div>
                <div className="text-xs text-muted-foreground">Students</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                <div className="text-lg font-bold">{stats.averageImprovement}</div>
                <div className="text-xs text-muted-foreground">Avg Improvement</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Award className="h-6 w-6 text-warning mx-auto mb-2" />
                <div className="text-lg font-bold">{stats.rating}</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Clock className="h-6 w-6 text-info mx-auto mb-2" />
                <div className="text-lg font-bold">30min</div>
                <div className="text-xs text-muted-foreground">Assessment</div>
              </div>
            </div>

            {/* Topics Covered */}
            <div>
              <h3 className="font-semibold mb-3">Topics Covered:</h3>
              <div className="flex flex-wrap gap-2">
                {stats.topics.map((topic, index) => (
                  <Badge key={index} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Learning Steps */}
            <div>
              <h3 className="font-semibold mb-4">How It Works:</h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                      currentStep === index 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-muted/30'
                    }`}
                    animate={{
                      scale: currentStep === index ? 1.02 : 1,
                    }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep === index ? 'bg-primary' : 'bg-muted'
                    }`}>
                      <step.icon className={`h-5 w-5 ${
                        currentStep === index ? 'text-white' : step.color
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {currentStep === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Learning Progress</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleStartAssessment}
                disabled={isLoading}
                variant="hero"
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Starting...
                  </>
                ) : (
                  <>
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button onClick={onClose} variant="outline">
                Maybe Later
              </Button>
            </div>

            {/* Benefits */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">What You'll Get:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Personalized learning path</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>AI-powered tutoring sessions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Book recommendations with affiliate links</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Progress tracking and analytics</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SubjectDemo;
