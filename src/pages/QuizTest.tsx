// Test page for the personalized quiz system

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Brain, Users, BookOpen, Target } from 'lucide-react';

const QuizTest = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('student_123');
  const [classId, setClassId] = useState('class_10a');
  const [subject, setSubject] = useState('Mathematics');
  const [difficulty, setDifficulty] = useState('medium');

  const handleStartStudentQuiz = () => {
    navigate(`/quiz?studentId=${studentId}&classId=${classId}`);
  };

  const handleGoToTeacherDashboard = () => {
    navigate('/teacher-dashboard');
  };

  const handleGoToStudentDashboard = () => {
    navigate('/student-dashboard');
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🧪 Quiz System Test Page</h1>
          <p className="text-xl text-muted-foreground">
            Test the personalized quiz system with different configurations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Quiz Test */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span>Student Quiz Test</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student ID"
                />
              </div>
              
              <div>
                <Label htmlFor="classId">Class ID (Optional)</Label>
                <Input
                  id="classId"
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  placeholder="Enter class ID"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue />
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
                <Select value={difficulty} onValueChange={setDifficulty}>
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

              <Button 
                onClick={handleStartStudentQuiz} 
                variant="hero" 
                className="w-full"
              >
                <Brain className="h-4 w-4 mr-2" />
                Start Personalized Quiz
              </Button>

              <div className="text-sm text-muted-foreground">
                <p><strong>What you'll see:</strong></p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Loading screen with quiz generation</li>
                  <li>Student profile information</li>
                  <li>Personalized quiz preview</li>
                  <li>Interactive quiz interface</li>
                  <li>Real-time progress tracking</li>
                  <li>Detailed results and analytics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Teacher Dashboard Test */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-success" />
                <span>Teacher Dashboard Test</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button 
                  onClick={handleGoToTeacherDashboard} 
                  variant="hero" 
                  className="w-full"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Open Teacher Dashboard
                </Button>

                <div className="text-sm text-muted-foreground">
                  <p><strong>Features to test:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Class analytics and student progress</li>
                    <li>Quiz Manager tab</li>
                    <li>Generate class-wide quizzes</li>
                    <li>Student performance monitoring</li>
                    <li>Topic performance analysis</li>
                    <li>Individual student recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Test Buttons */}
        <Card className="card-elevated mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-warning" />
              <span>Quick Test Scenarios</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate('/quiz?studentId=student_math&subject=Mathematics&difficulty=medium')}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <BookOpen className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Math Student</div>
                  <div className="text-sm text-muted-foreground">Medium difficulty</div>
                </div>
              </Button>

              <Button 
                onClick={() => navigate('/quiz?studentId=student_science&subject=Science&difficulty=hard')}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <BookOpen className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Science Student</div>
                  <div className="text-sm text-muted-foreground">Hard difficulty</div>
                </div>
              </Button>

              <Button 
                onClick={() => navigate('/quiz?studentId=student_beginner&difficulty=easy')}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <BookOpen className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Beginner Student</div>
                  <div className="text-sm text-muted-foreground">Easy difficulty</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="card-elevated mt-8">
          <CardHeader>
            <CardTitle>System Status & Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">✅ Implemented Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Personalized quiz generation</li>
                  <li>• Student profile management</li>
                  <li>• Class-level quiz management</li>
                  <li>• Real-time progress tracking</li>
                  <li>• Analytics and recommendations</li>
                  <li>• Multi-language support</li>
                  <li>• Adaptive difficulty</li>
                  <li>• Learning style personalization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔧 Technical Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• TypeScript type safety</li>
                  <li>• Custom React hooks</li>
                  <li>• API service with mock data</li>
                  <li>• Error handling and loading states</li>
                  <li>• Responsive design</li>
                  <li>• Animation and transitions</li>
                  <li>• Clean white UI theme</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizTest;
