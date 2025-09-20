import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  ChevronRight,
  Play,
  Calendar,
  Star,
  Brain,
  Zap
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { studentProgress, knowledgeGraph } from "@/data/mockData";

const StudentDashboard = () => {
  const { overallScore, completedQuizzes, totalQuizzes, subjects, weeklyProgress, recentQuizzes } = studentProgress;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-success";
    if (progress >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const stats = [
    {
      title: "Overall Score",
      value: `${overallScore}%`,
      color: getScoreColor(overallScore),
      icon: Target,
      description: "Average across all subjects"
    },
    {
      title: "Quizzes Completed", 
      value: `${completedQuizzes}/${totalQuizzes}`,
      color: "text-primary",
      icon: BookOpen,
      description: `${Math.round((completedQuizzes / totalQuizzes) * 100)}% complete`
    },
    {
      title: "Study Streak",
      value: "7 days",
      color: "text-accent",
      icon: Calendar,
      description: "Keep it up!"
    },
    {
      title: "Time Saved",
      value: "24h",
      color: "text-secondary",
      icon: Clock,
      description: "vs traditional tutoring"
    }
  ];

  const recommendations = [
    {
      title: "Strengthen Algebra Skills",
      description: "Focus on quadratic equations - detected weak area",
      action: "Start Practice",
      priority: "high",
      subject: "Mathematics"
    },
    {
      title: "Physics Motion Problems",
      description: "Great progress! Continue with advanced concepts",
      action: "Continue",
      priority: "medium", 
      subject: "Physics"
    },
    {
      title: "English Grammar Review",
      description: "Perfect your sentence structure skills",
      action: "Review",
      priority: "low",
      subject: "English"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Alex! 👋</h1>
              <p className="text-muted-foreground">Ready to continue your learning journey?</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/quiz">
                <Button variant="hero">
                  <Play className="mr-2 h-4 w-4" />
                  Start Quiz
                </Button>
              </Link>
              <Button variant="outline">
                <Brain className="mr-2 h-4 w-4" />
                AI Tutor
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress Chart */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subject Progress */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {subjects.map((subject, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.name}</span>
                      <span className={`font-bold ${getScoreColor(subject.progress)}`}>
                        {subject.progress}%
                      </span>
                    </div>
                    <Progress value={subject.progress} className="h-3" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Quizzes */}
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Quizzes</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{quiz.subject}</p>
                          <p className="text-sm text-muted-foreground">{quiz.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getScoreColor(quiz.score)}`}>{quiz.score}%</p>
                        <p className="text-sm text-muted-foreground">{quiz.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* AI Recommendations */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="p-4 border border-border rounded-lg space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{rec.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                      </div>
                      <Badge 
                        variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {rec.action}
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Knowledge Graph Navigation */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Learning Path</CardTitle>
                <p className="text-sm text-muted-foreground">Navigate your knowledge journey</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(knowledgeGraph).map(([subject, data]) => (
                  <div key={subject} className="space-y-2">
                    <h4 className="font-medium text-sm">{data.title}</h4>
                    {data.topics.slice(0, 2).map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${topic.completed ? 'bg-success' : 'bg-muted-foreground/30'}`} />
                          <span className="text-sm">{topic.title}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ))}
                <Link to="/knowledge-graph">
                  <Button variant="outline" className="w-full mt-4">
                    Explore Full Map
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card className="card-elevated bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">Week Champion!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You've maintained your study streak for 7 days
                </p>
                <Badge className="bg-gradient-hero text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Achievement Unlocked
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;