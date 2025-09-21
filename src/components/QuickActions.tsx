// Quick Actions Component for Teacher Dashboard

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Send,
  Calendar,
  Clock,
  Target,
  Brain,
  Mail,
  CheckCircle,
  X,
  Plus,
  Filter,
  Download,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { classroomStats } from '@/data/mockData';

interface QuickActionsProps {
  onActionComplete?: (action: string, data?: any) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionComplete }) => {
  const { toast } = useToast();
  
  // State for different modals
  const [assignQuizOpen, setAssignQuizOpen] = useState(false);
  const [parentReportOpen, setParentReportOpen] = useState(false);
  const [reviewSessionOpen, setReviewSessionOpen] = useState(false);
  const [atRiskOpen, setAtRiskOpen] = useState(false);
  
  // Form states
  const [quizForm, setQuizForm] = useState({
    title: '',
    subject: '',
    difficulty: '',
    questionCount: 10,
    timeLimit: 30,
    students: [] as string[],
    dueDate: '',
    instructions: ''
  });
  
  const [reportForm, setReportForm] = useState({
    students: [] as string[],
    reportType: 'progress',
    includeRecommendations: true,
    includeBookSuggestions: true,
    message: ''
  });
  
  const [sessionForm, setSessionForm] = useState({
    title: '',
    type: 'review',
    students: [] as string[],
    date: '',
    time: '',
    duration: 60,
    topics: [] as string[],
    description: ''
  });

  const atRiskStudents = classroomStats.filter(student => student.progress < 70);

  const handleAssignQuiz = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Quiz Assigned Successfully',
        description: `Quiz "${quizForm.title}" has been assigned to ${quizForm.students.length} students.`,
      });
      
      setAssignQuizOpen(false);
      setQuizForm({
        title: '',
        subject: '',
        difficulty: '',
        questionCount: 10,
        timeLimit: 30,
        students: [],
        dueDate: '',
        instructions: ''
      });
      
      onActionComplete?.('assign_quiz', quizForm);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to assign quiz. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSendParentReport = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Parent Reports Sent',
        description: `Progress reports have been sent to ${reportForm.students.length} parents.`,
      });
      
      setParentReportOpen(false);
      setReportForm({
        students: [],
        reportType: 'progress',
        includeRecommendations: true,
        includeBookSuggestions: true,
        message: ''
      });
      
      onActionComplete?.('send_parent_report', reportForm);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send parent reports. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleScheduleReviewSession = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Review Session Scheduled',
        description: `Review session "${sessionForm.title}" has been scheduled for ${sessionForm.students.length} students.`,
      });
      
      setReviewSessionOpen(false);
      setSessionForm({
        title: '',
        type: 'review',
        students: [],
        date: '',
        time: '',
        duration: 60,
        topics: [],
        description: ''
      });
      
      onActionComplete?.('schedule_review_session', sessionForm);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule review session. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleIdentifyAtRiskStudents = () => {
    setAtRiskOpen(true);
    onActionComplete?.('identify_at_risk_students', atRiskStudents);
  };

  const toggleStudentSelection = (studentId: string, formType: 'quiz' | 'report' | 'session') => {
    if (formType === 'quiz') {
      setQuizForm(prev => ({
        ...prev,
        students: prev.students.includes(studentId)
          ? prev.students.filter(id => id !== studentId)
          : [...prev.students, studentId]
      }));
    } else if (formType === 'report') {
      setReportForm(prev => ({
        ...prev,
        students: prev.students.includes(studentId)
          ? prev.students.filter(id => id !== studentId)
          : [...prev.students, studentId]
      }));
    } else if (formType === 'session') {
      setSessionForm(prev => ({
        ...prev,
        students: prev.students.includes(studentId)
          ? prev.students.filter(id => id !== studentId)
          : [...prev.students, studentId]
      }));
    }
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Assign New Quiz */}
        <Dialog open={assignQuizOpen} onOpenChange={setAssignQuizOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Assign New Quiz
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Assign New Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quiz-title">Quiz Title</Label>
                  <Input
                    id="quiz-title"
                    value={quizForm.title}
                    onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <Label htmlFor="quiz-subject">Subject</Label>
                  <Select value={quizForm.subject} onValueChange={(value) => setQuizForm(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quiz-difficulty">Difficulty</Label>
                  <Select value={quizForm.difficulty} onValueChange={(value) => setQuizForm(prev => ({ ...prev, difficulty: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="question-count">Questions</Label>
                  <Input
                    id="question-count"
                    type="number"
                    value={quizForm.questionCount}
                    onChange={(e) => setQuizForm(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                    min="1"
                    max="50"
                  />
                </div>
                <div>
                  <Label htmlFor="time-limit">Time Limit (min)</Label>
                  <Input
                    id="time-limit"
                    type="number"
                    value={quizForm.timeLimit}
                    onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                    min="5"
                    max="180"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="datetime-local"
                  value={quizForm.dueDate}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  value={quizForm.instructions}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, instructions: e.target.value }))}
                  placeholder="Enter quiz instructions..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Select Students</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {classroomStats.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`quiz-student-${student.id}`}
                        checked={quizForm.students.includes(student.id)}
                        onCheckedChange={() => toggleStudentSelection(student.id, 'quiz')}
                      />
                      <Label htmlFor={`quiz-student-${student.id}`} className="text-sm">
                        {student.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setAssignQuizOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignQuiz} disabled={!quizForm.title || !quizForm.subject || quizForm.students.length === 0}>
                  <Send className="mr-2 h-4 w-4" />
                  Assign Quiz
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Send Parent Report */}
        <Dialog open={parentReportOpen} onOpenChange={setParentReportOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Send Parent Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Send Parent Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportForm.reportType} onValueChange={(value) => setReportForm(prev => ({ ...prev, reportType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="progress">Progress Report</SelectItem>
                    <SelectItem value="behavior">Behavior Report</SelectItem>
                    <SelectItem value="attendance">Attendance Report</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Include in Report</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-recommendations"
                      checked={reportForm.includeRecommendations}
                      onCheckedChange={(checked) => setReportForm(prev => ({ ...prev, includeRecommendations: !!checked }))}
                    />
                    <Label htmlFor="include-recommendations" className="text-sm">
                      AI Recommendations
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-book-suggestions"
                      checked={reportForm.includeBookSuggestions}
                      onCheckedChange={(checked) => setReportForm(prev => ({ ...prev, includeBookSuggestions: !!checked }))}
                    />
                    <Label htmlFor="include-book-suggestions" className="text-sm">
                      Book Suggestions
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="report-message">Additional Message</Label>
                <Textarea
                  id="report-message"
                  value={reportForm.message}
                  onChange={(e) => setReportForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Add a personal message to parents..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Select Students</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {classroomStats.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`report-student-${student.id}`}
                        checked={reportForm.students.includes(student.id)}
                        onCheckedChange={() => toggleStudentSelection(student.id, 'report')}
                      />
                      <Label htmlFor={`report-student-${student.id}`} className="text-sm">
                        {student.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setParentReportOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendParentReport} disabled={reportForm.students.length === 0}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reports
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Schedule Review Session */}
        <Dialog open={reviewSessionOpen} onOpenChange={setReviewSessionOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Schedule Review Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Schedule Review Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session-title">Session Title</Label>
                  <Input
                    id="session-title"
                    value={sessionForm.title}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter session title"
                  />
                </div>
                <div>
                  <Label htmlFor="session-type">Session Type</Label>
                  <Select value={sessionForm.type} onValueChange={(value) => setSessionForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="review">Review Session</SelectItem>
                      <SelectItem value="tutoring">One-on-One Tutoring</SelectItem>
                      <SelectItem value="group">Group Study</SelectItem>
                      <SelectItem value="assessment">Assessment Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="session-date">Date</Label>
                  <Input
                    id="session-date"
                    type="date"
                    value={sessionForm.date}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="session-time">Time</Label>
                  <Input
                    id="session-time"
                    type="time"
                    value={sessionForm.time}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="session-duration">Duration (min)</Label>
                  <Input
                    id="session-duration"
                    type="number"
                    value={sessionForm.duration}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    min="15"
                    max="180"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="session-description">Description</Label>
                <Textarea
                  id="session-description"
                  value={sessionForm.description}
                  onChange={(e) => setSessionForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what will be covered in this session..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Select Students</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {classroomStats.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`session-student-${student.id}`}
                        checked={sessionForm.students.includes(student.id)}
                        onCheckedChange={() => toggleStudentSelection(student.id, 'session')}
                      />
                      <Label htmlFor={`session-student-${student.id}`} className="text-sm">
                        {student.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setReviewSessionOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleScheduleReviewSession} disabled={!sessionForm.title || !sessionForm.date || sessionForm.students.length === 0}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Identify At-Risk Students */}
        <AlertDialog open={atRiskOpen} onOpenChange={setAtRiskOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Identify At-Risk Students
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle>At-Risk Students Analysis</AlertDialogTitle>
              <AlertDialogDescription>
                Students with progress below 70% who may need additional support.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="space-y-4">
              {atRiskStudents.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Great News!</h3>
                  <p className="text-muted-foreground">No students are currently at risk. All students are performing well.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">At-Risk Students ({atRiskStudents.length})</h3>
                    <Badge variant="destructive">Needs Attention</Badge>
                  </div>
                  
                  {atRiskStudents.map((student) => (
                    <Card key={student.id} className="border-l-4 border-l-warning">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">Grade: {student.grade}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-warning">{student.progress}% Progress</p>
                            <p className="text-xs text-muted-foreground">{student.averageScore}% Avg Score</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium">{student.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-warning h-2 rounded-full" 
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-sm text-muted-foreground mb-2">Weak Areas:</p>
                          <div className="flex flex-wrap gap-1">
                            {student.weakAreas.map((area, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Brain className="mr-1 h-3 w-3" />
                            AI Tutor
                          </Button>
                          <Button size="sm" variant="outline">
                            <BookOpen className="mr-1 h-3 w-3" />
                            Book Recommendations
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="mr-1 h-3 w-3" />
                            Contact Parent
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Schedule one-on-one tutoring sessions</li>
                      <li>• Provide additional practice materials</li>
                      <li>• Contact parents to discuss support strategies</li>
                      <li>• Consider AI tutor recommendations for personalized learning</li>
                      <li>• Suggest relevant books for independent study</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              {atRiskStudents.length > 0 && (
                <AlertDialogAction onClick={() => {
                  toast({
                    title: 'Action Plan Created',
                    description: 'Support plan has been generated for at-risk students.',
                  });
                  setAtRiskOpen(false);
                }}>
                  Create Support Plan
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
