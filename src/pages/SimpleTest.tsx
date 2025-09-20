// Simple test page to debug the quiz system

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Users, CheckCircle } from 'lucide-react';

const SimpleTest = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testQuizPage = () => {
    addResult('Testing quiz page navigation...');
    navigate('/quiz?studentId=test_student');
  };

  const testTeacherDashboard = () => {
    addResult('Testing teacher dashboard navigation...');
    navigate('/teacher-dashboard');
  };

  const testStudentDashboard = () => {
    addResult('Testing student dashboard navigation...');
    navigate('/student-dashboard');
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🧪 Simple Test Page</h1>
          <p className="text-xl text-muted-foreground">
            Testing the personalized quiz system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span>Student Quiz</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={testQuizPage} variant="hero" className="w-full">
                Test Quiz Page
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Navigate to personalized quiz
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-success" />
                <span>Teacher Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={testTeacherDashboard} variant="hero" className="w-full">
                Test Teacher Dashboard
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Navigate to teacher dashboard
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-warning" />
                <span>Student Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={testStudentDashboard} variant="hero" className="w-full">
                Test Student Dashboard
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Navigate to student dashboard
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            {testResults.length === 0 ? (
              <p className="text-muted-foreground">No tests run yet. Click the buttons above to test navigation.</p>
            ) : (
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono bg-muted/30 p-2 rounded">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Direct Links */}
        <Card className="card-elevated mt-6">
          <CardHeader>
            <CardTitle>Direct Links (Copy & Paste)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm font-mono">
              <div className="p-2 bg-muted/30 rounded">
                <strong>Quiz Page:</strong> http://localhost:8081/quiz?studentId=student_123
              </div>
              <div className="p-2 bg-muted/30 rounded">
                <strong>Teacher Dashboard:</strong> http://localhost:8081/teacher-dashboard
              </div>
              <div className="p-2 bg-muted/30 rounded">
                <strong>Student Dashboard:</strong> http://localhost:8081/student-dashboard
              </div>
              <div className="p-2 bg-muted/30 rounded">
                <strong>Landing Page:</strong> http://localhost:8081/
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="card-elevated mt-6">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">✅ Components Created:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• QuizPage with personalized system</li>
                  <li>• TeacherDashboard with quiz manager</li>
                  <li>• usePersonalizedQuiz hook</li>
                  <li>• quizApiService with mock data</li>
                  <li>• ClassQuizManager component</li>
                  <li>• TypeScript types for quiz system</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🔧 Technical Setup:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Server running on port 8081</li>
                  <li>• React Router configured</li>
                  <li>• Tailwind CSS with white theme</li>
                  <li>• Shadcn/ui components</li>
                  <li>• Framer Motion animations</li>
                  <li>• TypeScript type safety</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleTest;
