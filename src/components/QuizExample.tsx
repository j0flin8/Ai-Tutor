// Example component demonstrating how to use the personalized quiz system

import { useState } from 'react';
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
import { Brain, Users, Settings } from 'lucide-react';
import { usePersonalizedQuiz } from '@/hooks/usePersonalizedQuiz';
import { QuizGenerationRequest } from '@/types/quiz';

const QuizExample: React.FC = () => {
  const [studentId, setStudentId] = useState('student_123');
  const [classId, setClassId] = useState('class_10a');
  const [showQuiz, setShowQuiz] = useState(false);

  // Example of using the personalized quiz hook
  const {
    currentQuiz,
    studentProfile,
    isLoading,
    error,
    generateQuiz,
    startQuiz,
    progress,
    score,
    isCompleted,
  } = usePersonalizedQuiz({
    studentId,
    classId,
    autoGenerate: false, // We'll generate manually in this example
  });

  const handleGenerateQuiz = async () => {
    const request: Partial<QuizGenerationRequest> = {
      subject: 'Mathematics',
      difficulty: 'medium',
      questionCount: 5,
      timeLimit: 600, // 10 minutes
      interests: ['Algebra', 'Geometry'],
      learningStyle: 'visual',
      language: 'English',
    };

    await generateQuiz(request);
    setShowQuiz(true);
  };

  const handleStartQuiz = () => {
    startQuiz();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span>Personalized Quiz System Example</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration */}
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Student Profile Display */}
          {studentProfile && (
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Student Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Name</p>
                    <p className="text-muted-foreground">{studentProfile.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Grade</p>
                    <p className="text-muted-foreground">{studentProfile.grade}</p>
                  </div>
                  <div>
                    <p className="font-medium">Learning Style</p>
                    <p className="text-muted-foreground">{studentProfile.learningStyle}</p>
                  </div>
                  <div>
                    <p className="font-medium">Average Score</p>
                    <p className="text-muted-foreground">{studentProfile.averageScore}%</p>
                  </div>
                  <div>
                    <p className="font-medium">Interests</p>
                    <p className="text-muted-foreground">{studentProfile.interests.join(', ')}</p>
                  </div>
                  <div>
                    <p className="font-medium">Weak Areas</p>
                    <p className="text-muted-foreground">{studentProfile.weakAreas.join(', ')}</p>
                  </div>
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-muted-foreground">{studentProfile.language}</p>
                  </div>
                  <div>
                    <p className="font-medium">Quizzes Completed</p>
                    <p className="text-muted-foreground">{studentProfile.totalQuizzesCompleted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <Button onClick={handleGenerateQuiz} disabled={isLoading} variant="hero">
              <Brain className="h-4 w-4 mr-2" />
              {isLoading ? 'Generating...' : 'Generate Personalized Quiz'}
            </Button>
            
            {currentQuiz && !showQuiz && (
              <Button onClick={handleStartQuiz} variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Start Quiz
              </Button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <Card className="border-destructive bg-destructive/5">
              <CardContent className="p-4">
                <p className="text-destructive font-medium">Error: {error}</p>
              </CardContent>
            </Card>
          )}

          {/* Quiz Preview */}
          {currentQuiz && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Generated Quiz Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{currentQuiz.totalQuestions}</p>
                    <p className="text-sm text-muted-foreground">Questions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">{Math.floor(currentQuiz.timeLimit / 60)}m</p>
                    <p className="text-sm text-muted-foreground">Time Limit</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{currentQuiz.difficulty}</p>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">{currentQuiz.subject}</p>
                    <p className="text-sm text-muted-foreground">Subject</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <h4 className="font-medium mb-2">Personalized Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Learning Style: {currentQuiz.personalizedFor.learningStyle}</li>
                    <li>• Interests: {currentQuiz.personalizedFor.interests.join(', ')}</li>
                    <li>• Difficulty: {currentQuiz.personalizedFor.difficultyLevel}</li>
                    <li>• Focus Areas: {currentQuiz.personalizedFor.weakAreas.join(', ')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress Display */}
          {showQuiz && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quiz Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Progress: {progress.toFixed(0)}%</span>
                    <span>Score: {score}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {isCompleted && (
                    <p className="text-success font-medium">Quiz completed successfully!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage Instructions */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>1. <strong>Set Student ID:</strong> Enter a student ID to load their profile and preferences</p>
              <p>2. <strong>Generate Quiz:</strong> Click "Generate Personalized Quiz" to create a quiz based on the student's profile</p>
              <p>3. <strong>Start Quiz:</strong> Begin the quiz to see the personalized questions</p>
              <p>4. <strong>View Results:</strong> See analytics and recommendations after completion</p>
              <p className="text-muted-foreground mt-4">
                <strong>Note:</strong> This example uses mock data. In production, replace the API service with your actual backend endpoints.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizExample;
