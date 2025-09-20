// Class Quiz Manager Component for Teachers

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen,
  Play,
  BarChart3,
  Settings,
  Plus,
  Eye,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  ClassProfile, 
  QuizGenerationRequest, 
  PersonalizedQuiz,
  ClassQuizAnalytics 
} from '@/types/quiz';
import { quizApiService } from '@/services/quizApi';

interface ClassQuizManagerProps {
  classId: string;
  teacherId: string;
}

const ClassQuizManager: React.FC<ClassQuizManagerProps> = ({ classId, teacherId }) => {
  const { toast } = useToast();
  const [classProfile, setClassProfile] = useState<ClassProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analytics, setAnalytics] = useState<ClassQuizAnalytics | null>(null);
  const [showQuizGenerator, setShowQuizGenerator] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<PersonalizedQuiz | null>(null);

  // Quiz generation form state
  const [quizForm, setQuizForm] = useState({
    subject: '',
    topic: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard' | 'adaptive',
    questionCount: 10,
    timeLimit: 1800,
    includeTopics: [] as string[],
    excludeTopics: [] as string[],
  });

  useEffect(() => {
    loadClassProfile();
    loadAnalytics();
  }, [classId]);

  const loadClassProfile = async () => {
    try {
      setIsLoading(true);
      const profile = await quizApiService.getClassProfile(classId);
      setClassProfile(profile);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load class profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const analyticsData = await quizApiService.getClassAnalytics(classId);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const generateClassQuiz = async () => {
    try {
      setIsLoading(true);
      
      const request: Partial<QuizGenerationRequest> = {
        classId,
        subject: quizForm.subject,
        topic: quizForm.topic,
        difficulty: quizForm.difficulty,
        questionCount: quizForm.questionCount,
        timeLimit: quizForm.timeLimit,
        includeTopics: quizForm.includeTopics,
        excludeTopics: quizForm.excludeTopics,
      };

      const response = await quizApiService.generateClassQuiz(classId, request);
      
      if (response.success) {
        setGeneratedQuiz(response.quiz);
        setShowQuizGenerator(false);
        
        toast({
          title: 'Quiz Generated',
          description: `Class quiz created with ${response.quiz.totalQuestions} questions`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate class quiz',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading && !classProfile) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading class data...</p>
        </div>
      </div>
    );
  }

  if (!classProfile) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Class not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Class Header */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{classProfile.name}</CardTitle>
                <p className="text-muted-foreground">
                  {classProfile.grade} • {classProfile.subject} • {classProfile.students.length} students
                </p>
              </div>
            </div>
            <Button onClick={() => setShowQuizGenerator(true)} variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              Generate Quiz
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{analytics.totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">{analytics.averageScore}%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{analytics.completionRate}%</p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{classProfile.totalQuizzes}</p>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Student Progress */}
      {analytics && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Student Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.studentProgress.map((student, index) => (
                <motion.div
                  key={student.studentId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Weak areas: {student.weakAreas.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-lg">{student.score}%</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(student.completionTime)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Topic Performance */}
      {analytics && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Topic Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topicPerformance.map((topic, index) => (
                <motion.div
                  key={topic.topic}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{topic.topic}</p>
                      <p className="text-sm text-muted-foreground">
                        {topic.studentCount} students • {topic.difficulty} difficulty
                      </p>
                    </div>
                    <Badge variant={topic.averageScore >= 80 ? 'default' : topic.averageScore >= 60 ? 'secondary' : 'destructive'}>
                      {topic.averageScore}%
                    </Badge>
                  </div>
                  <Progress value={topic.averageScore} className="h-2" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quiz Generator Modal */}
      <AnimatePresence>
        {showQuizGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowQuizGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Generate Class Quiz</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowQuizGenerator(false)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={quizForm.subject}
                      onValueChange={(value) => setQuizForm(prev => ({ ...prev, subject: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={quizForm.difficulty}
                      onValueChange={(value: any) => setQuizForm(prev => ({ ...prev, difficulty: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="adaptive">Adaptive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="topic">Topic (Optional)</Label>
                  <Input
                    id="topic"
                    value={quizForm.topic}
                    onChange={(e) => setQuizForm(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="e.g., Algebra, Photosynthesis"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="questionCount">Number of Questions</Label>
                    <Input
                      id="questionCount"
                      type="number"
                      min="5"
                      max="50"
                      value={quizForm.questionCount}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input
                      id="timeLimit"
                      type="number"
                      min="5"
                      max="120"
                      value={quizForm.timeLimit / 60}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value) * 60 }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowQuizGenerator(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={generateClassQuiz}
                    disabled={isLoading || !quizForm.subject}
                    variant="hero"
                  >
                    {isLoading ? 'Generating...' : 'Generate Quiz'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Quiz Preview */}
      {generatedQuiz && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Quiz: {generatedQuiz.title}</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="hero" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Start Quiz
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{generatedQuiz.totalQuestions}</p>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{formatTime(generatedQuiz.timeLimit)}</p>
                <p className="text-sm text-muted-foreground">Time Limit</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{generatedQuiz.difficulty}</p>
                <p className="text-sm text-muted-foreground">Difficulty</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{classProfile.students.length}</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClassQuizManager;
