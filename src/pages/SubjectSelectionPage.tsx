// Subject Selection Page - Choose your subject to start learning

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  BookOpen, 
  MessageSquare, 
  Calculator,
  Atom,
  Globe,
  History,
  Music,
  Palette,
  Code,
  Brain,
  Target,
  Clock,
  Users,
  Star,
  TrendingUp,
  Camera,
  Gamepad2,
  Zap
} from 'lucide-react';

const SubjectSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: Calculator,
      description: 'Algebra, Geometry, Calculus, Statistics',
      color: 'from-blue-500 to-blue-600',
      topics: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'],
      difficulty: 'Beginner to Advanced',
      estimatedTime: '30-45 minutes',
      students: '2.5M+',
      rating: 4.8
    },
    {
      id: 'science',
      name: 'Science',
      icon: Atom,
      description: 'Physics, Chemistry, Biology, Earth Science',
      color: 'from-green-500 to-green-600',
      topics: ['Physics', 'Chemistry', 'Biology', 'Earth Science', 'Environmental Science'],
      difficulty: 'Beginner to Advanced',
      estimatedTime: '35-50 minutes',
      students: '2.1M+',
      rating: 4.7
    },
    {
      id: 'english',
      name: 'English',
      icon: BookOpen,
      description: 'Grammar, Literature, Writing, Reading Comprehension',
      color: 'from-purple-500 to-purple-600',
      topics: ['Grammar', 'Literature', 'Writing', 'Reading Comprehension', 'Vocabulary'],
      difficulty: 'Beginner to Advanced',
      estimatedTime: '25-40 minutes',
      students: '1.8M+',
      rating: 4.6
    },
    {
      id: 'social-studies',
      name: 'Social Studies',
      icon: Globe,
      description: 'History, Geography, Civics, Economics',
      color: 'from-orange-500 to-orange-600',
      topics: ['History', 'Geography', 'Civics', 'Economics', 'Culture'],
      difficulty: 'Beginner to Intermediate',
      estimatedTime: '20-35 minutes',
      students: '1.2M+',
      rating: 4.5
    },
    {
      id: 'computer-science',
      name: 'Computer Science',
      icon: Code,
      description: 'Programming, Algorithms, Data Structures',
      color: 'from-indigo-500 to-indigo-600',
      topics: ['Programming', 'Algorithms', 'Data Structures', 'Web Development', 'AI Basics'],
      difficulty: 'Intermediate to Advanced',
      estimatedTime: '45-60 minutes',
      students: '800K+',
      rating: 4.9
    },
    {
      id: 'art',
      name: 'Art & Design',
      icon: Palette,
      description: 'Drawing, Painting, Digital Art, Design Principles',
      color: 'from-pink-500 to-pink-600',
      topics: ['Drawing', 'Painting', 'Digital Art', 'Design Principles', 'Art History'],
      difficulty: 'Beginner to Intermediate',
      estimatedTime: '30-45 minutes',
      students: '600K+',
      rating: 4.4
    }
  ];

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  const handleStartAssessment = () => {
    if (selectedSubject) {
      const subject = subjects.find(s => s.id === selectedSubject);
      if (subject) {
        navigate(`/enhanced-assessment?subject=${subject.name}&studentId=demo_student`);
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={handleBackToHome}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Choose Your Subject</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a subject to start your personalized learning journey with AI-powered assessments and tutoring.
            </p>
          </motion.div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`card-elevated cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedSubject === subject.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:scale-105'
                }`}
                onClick={() => handleSubjectSelect(subject.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center`}>
                      <subject.icon className="h-8 w-8 text-white" />
                    </div>
                    {selectedSubject === subject.id && (
                      <Badge variant="default" className="bg-primary">
                        Selected
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{subject.name}</CardTitle>
                  <p className="text-muted-foreground">{subject.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Topics */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-1">
                        {subject.topics.slice(0, 3).map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {subject.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{subject.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{subject.difficulty}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{subject.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{subject.students}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-warning fill-current" />
                        <span className="text-muted-foreground">{subject.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4"
        >
          {selectedSubject && (
            <div className="mb-6">
              <Card className="card-elevated max-w-md mx-auto">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Ready to Start?</h3>
                      <p className="text-sm text-muted-foreground">
                        Begin with an AI-powered assessment to personalize your learning experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
            <Button
              onClick={handleStartAssessment}
              disabled={!selectedSubject}
              variant="hero"
              size="xl"
              className="w-full"
            >
              <Brain className="mr-2 h-5 w-5" />
              AI Assessment
            </Button>
            
            <Button
              onClick={() => navigate('/ai-tutor')}
              variant="outline"
              size="xl"
              className="w-full"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              AI Tutor
            </Button>

            <Button
              onClick={() => navigate(`/ar-gaming?subject=${selectedSubject}&type=ar&studentId=demo_student`)}
              disabled={!selectedSubject}
              variant="outline"
              size="xl"
              className="w-full"
            >
              <Camera className="mr-2 h-5 w-5" />
              AR Learning
            </Button>

            <Button
              onClick={() => navigate(`/ar-gaming?subject=${selectedSubject}&type=gaming&studentId=demo_student`)}
              disabled={!selectedSubject}
              variant="outline"
              size="xl"
              className="w-full"
            >
              <Gamepad2 className="mr-2 h-5 w-5" />
              Gaming
            </Button>
          </div>

          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Our AI will analyze your responses and create a personalized learning path with book recommendations and tutoring sessions.
          </p>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-center">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Take Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete a personalized assessment to identify your strengths and areas for improvement.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">2. AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes your responses and creates a customized learning plan just for you.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Start Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Begin your personalized learning journey with AI tutoring and book recommendations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SubjectSelectionPage;
