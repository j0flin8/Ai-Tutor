import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  ChevronRight,
  Download,
  Filter,
  Plus,
  BarChart3,
  Clock,
  Target,
  Brain,
  Settings
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { classroomStats } from "@/data/mockData";
import ClassQuizManager from "@/components/ClassQuizManager";
import QuickActions from "@/components/QuickActions";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'quiz-manager'>('overview');
  
  const classStats = {
    totalStudents: classroomStats.length,
    averageProgress: Math.round(classroomStats.reduce((acc, student) => acc + student.progress, 0) / classroomStats.length),
    studentsAtRisk: classroomStats.filter(student => student.progress < 70).length,
    activeToday: classroomStats.filter(student => student.lastActive === "2024-01-15").length
  };

  const progressData = [
    { range: "90-100%", count: classroomStats.filter(s => s.progress >= 90).length },
    { range: "80-89%", count: classroomStats.filter(s => s.progress >= 80 && s.progress < 90).length },
    { range: "70-79%", count: classroomStats.filter(s => s.progress >= 70 && s.progress < 80).length },
    { range: "60-69%", count: classroomStats.filter(s => s.progress >= 60 && s.progress < 70).length },
    { range: "Below 60%", count: classroomStats.filter(s => s.progress < 60).length },
  ];

  const subjectPerformance = [
    { subject: "Mathematics", average: 78, color: "#3b82f6" },
    { subject: "Physics", average: 72, color: "#10b981" },
    { subject: "Chemistry", average: 85, color: "#8b5cf6" },
    { subject: "Biology", average: 80, color: "#f59e0b" },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-success";
    if (progress >= 60) return "text-warning";
    return "text-destructive";
  };

  const getProgressBadge = (progress: number) => {
    if (progress >= 80) return { variant: "default" as const, label: "Excellent" };
    if (progress >= 60) return { variant: "secondary" as const, label: "Good" };
    return { variant: "destructive" as const, label: "Needs Help" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Class 10-A Dashboard</h1>
              <p className="text-muted-foreground">Monitor student progress and identify learning opportunities</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('overview')}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </Button>
            <Button
              variant={activeTab === 'quiz-manager' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('quiz-manager')}
              className="flex items-center space-x-2"
            >
              <Brain className="h-4 w-4" />
              <span>Quiz Manager</span>
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' ? (
          <>
            {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-3xl font-bold text-primary">{classStats.totalStudents}</p>
                    <p className="text-sm text-muted-foreground mt-1">Active learners</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Class Average</p>
                    <p className="text-3xl font-bold text-success">{classStats.averageProgress}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Overall progress</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-success rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">At Risk</p>
                    <p className="text-3xl font-bold text-warning">{classStats.studentsAtRisk}</p>
                    <p className="text-sm text-muted-foreground mt-1">Need attention</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-warning to-destructive rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Today</p>
                    <p className="text-3xl font-bold text-accent">{classStats.activeToday}</p>
                    <p className="text-sm text-muted-foreground mt-1">Learning now</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Distribution */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Progress Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformance} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="subject" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="average" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Student Performance Table */}
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Student Performance</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead>Weak Areas</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classroomStats.map((student) => {
                      const badge = getProgressBadge(student.progress);
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-16">
                                <div className="bg-muted rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      student.progress >= 80 ? 'bg-success' : 
                                      student.progress >= 60 ? 'bg-warning' : 'bg-destructive'
                                    }`}
                                    style={{ width: `${student.progress}%` }}
                                  />
                                </div>
                              </div>
                              <span className={`text-sm font-medium ${getProgressColor(student.progress)}`}>
                                {student.progress}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{student.averageScore}%</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {student.weakAreas.slice(0, 2).map((area, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {area}
                                </Badge>
                              ))}
                              {student.weakAreas.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{student.weakAreas.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={badge.variant}>
                              {badge.label}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Insights */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <QuickActions onActionComplete={(action, data) => {
              console.log('Quick action completed:', action, data);
            }} />

            {/* Top Performers */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {classroomStats
                  .filter(student => student.progress >= 85)
                  .sort((a, b) => b.progress - a.progress)
                  .map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-success to-secondary rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.averageScore}% avg</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-success">
                        {student.progress}%
                      </Badge>
                    </motion.div>
                  ))}
              </CardContent>
            </Card>

            {/* Needs Attention */}
            <Card className="card-elevated border-l-4 border-l-warning">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
                  Needs Attention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {classroomStats
                  .filter(student => student.progress < 70)
                  .map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="p-3 bg-warning/5 border border-warning/20 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">Progress: {student.progress}%</p>
                        </div>
                        <Badge variant="outline" className="text-warning border-warning">
                          At Risk
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Weak areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {student.weakAreas.map((area, areaIndex) => (
                            <Badge key={areaIndex} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="card-elevated bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm font-medium mb-1">Class Trend</p>
                  <p className="text-xs text-muted-foreground">
                    Mathematics scores improved by 12% this week. Consider advancing to more complex topics.
                  </p>
                </div>
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm font-medium mb-1">Recommendation</p>
                  <p className="text-xs text-muted-foreground">
                    3 students would benefit from additional algebra practice. Create targeted assignments.
                  </p>
                </div>
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm font-medium mb-1">Best Time</p>
                  <p className="text-xs text-muted-foreground">
                    Students are most active between 4-6 PM. Schedule live sessions during this time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
          </>
        ) : (
          <ClassQuizManager 
            classId="class_10a" 
            teacherId="teacher_123" 
          />
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;