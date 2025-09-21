// AR & Gaming Page - Interactive learning experiences

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Brain, 
  Gamepad2, 
  Camera, 
  Target, 
  Star, 
  Trophy, 
  Users, 
  Clock, 
  Zap,
  Award,
  Play,
  Eye,
  Hand,
  Volume2,
  Settings,
  HelpCircle,
  TrendingUp,
  Crown,
  Flame,
  Shield,
  Sword,
  Gem,
  Coins,
  Heart,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ARExperience from '@/components/ARExperience';
import GamingExperience from '@/components/GamingExperience';
import { 
  ARExperience as ARExperienceType, 
  GameExperience, 
  StudentGameProfile,
  LeaderboardEntry,
  Achievement,
  PowerUp,
  Challenge
} from '@/types/arGaming';
import { arGamingService } from '@/services/arGamingService';

const ARGamingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const studentId = searchParams.get('studentId') || 'demo_student';
  const subject = searchParams.get('subject') || 'Mathematics';
  const type = searchParams.get('type') as 'ar' | 'gaming' | 'mixed' || 'mixed';
  
  const [experiences, setExperiences] = useState<(ARExperienceType | GameExperience)[]>([]);
  const [gameProfile, setGameProfile] = useState<StudentGameProfile | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ar' | 'gaming' | 'leaderboard' | 'achievements'>('ar');
  const [selectedExperience, setSelectedExperience] = useState<ARExperienceType | GameExperience | null>(null);

  useEffect(() => {
    loadData();
  }, [studentId, subject, type]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [experiencesResponse, profile, leaderboardData, achievementsData, powerUpsData, challengesData] = await Promise.all([
        arGamingService.getARGamingExperiences({
          studentId,
          subject,
          type,
          difficulty: 'intermediate',
        }),
        arGamingService.getStudentGameProfile(studentId),
        arGamingService.getLeaderboard(subject, 'weekly'),
        arGamingService.getAchievements(studentId),
        arGamingService.getPowerUps(),
        arGamingService.getChallenges(studentId),
      ]);

      if (experiencesResponse.success) {
        setExperiences(experiencesResponse.experiences);
      }
      setGameProfile(profile);
      setLeaderboard(leaderboardData);
      setAchievements(achievementsData);
      setPowerUps(powerUpsData);
      setChallenges(challengesData);
    } catch (error) {
      console.error('Error loading AR/Gaming data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load AR and Gaming experiences.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartExperience = (experience: ARExperienceType | GameExperience) => {
    setSelectedExperience(experience);
  };

  const handleExperienceComplete = (score: number, achievements: string[]) => {
    setSelectedExperience(null);
    toast({
      title: 'Experience Complete!',
      description: `You scored ${score} points and unlocked ${achievements.length} achievements!`,
    });
  };

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  if (selectedExperience) {
    if (selectedExperience.type === 'augmented_reality' || selectedExperience.type === '3d_model' || selectedExperience.type === 'interactive_simulation') {
      return (
        <ARExperience
          experience={selectedExperience as ARExperienceType}
          onComplete={handleExperienceComplete}
          onExit={() => setSelectedExperience(null)}
        />
      );
    } else {
      return (
        <GamingExperience
          experience={selectedExperience as GameExperience}
          onComplete={handleExperienceComplete}
          onExit={() => setSelectedExperience(null)}
        />
      );
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading AR & Gaming Experiences</h2>
          <p className="text-muted-foreground">Preparing your interactive learning adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={handleBackToDashboard}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">AR & Gaming Learning</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience {subject} through immersive AR and engaging games. Learn, play, and achieve!
            </p>
          </motion.div>
        </div>

        {/* Game Profile Stats */}
        {gameProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{gameProfile.level}</h3>
                <p className="text-sm text-muted-foreground">Level</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-warning">{gameProfile.totalPoints.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-success">{gameProfile.currentStreak}</h3>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-info">{gameProfile.gamesWon}</h3>
                <p className="text-sm text-muted-foreground">Games Won</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ar" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>AR Experiences</span>
            </TabsTrigger>
            <TabsTrigger value="gaming" className="flex items-center space-x-2">
              <Gamepad2 className="h-4 w-4" />
              <span>Gaming</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Achievements</span>
            </TabsTrigger>
          </TabsList>

          {/* AR Experiences Tab */}
          <TabsContent value="ar" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.filter(exp => exp.type === 'augmented_reality' || exp.type === '3d_model' || exp.type === 'interactive_simulation').map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="card-elevated hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {(experience as ARExperienceType).type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{experience.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{experience.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{(experience as ARExperienceType).estimatedDuration} min</span>
                          </div>
                          <Badge variant="secondary" className="capitalize">
                            {(experience as ARExperienceType).difficulty}
                          </Badge>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Learning Objectives:</h4>
                          <ul className="space-y-1">
                            {(experience as ARExperienceType).learningObjectives.slice(0, 2).map((objective, objIndex) => (
                              <li key={objIndex} className="flex items-start space-x-2 text-xs">
                                <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                                <span>{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          onClick={() => handleStartExperience(experience)}
                          variant="hero"
                          className="w-full"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Start AR Experience
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Gaming Tab */}
          <TabsContent value="gaming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.filter(exp => exp.type === 'puzzle' || exp.type === 'simulation' || exp.type === 'adventure' || exp.type === 'strategy' || exp.type === 'quiz_game' || exp.type === 'building_game').map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="card-elevated hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Gamepad2 className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {(experience as GameExperience).type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{experience.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{experience.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{(experience as GameExperience).estimatedDuration} min</span>
                          </div>
                          <Badge variant="secondary" className="capitalize">
                            {(experience as GameExperience).difficulty}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span>{(experience as GameExperience).gameMechanics.points.basePoints} pts</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Heart className="h-4 w-4 text-red-400" />
                            <span>{(experience as GameExperience).gameMechanics.lives.maxLives} lives</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Levels:</h4>
                          <div className="flex space-x-2">
                            {(experience as GameExperience).levels.slice(0, 3).map((level, levelIndex) => (
                              <Badge key={levelIndex} variant="outline" className="text-xs">
                                L{level.number}
                              </Badge>
                            ))}
                            {(experience as GameExperience).levels.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{(experience as GameExperience).levels.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleStartExperience(experience)}
                          variant="hero"
                          className="w-full"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Start Game
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  <span>Weekly Leaderboard - {subject}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200' :
                        index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200' :
                        index === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200' :
                        'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-500 text-white' :
                          index === 2 ? 'bg-orange-500 text-white' :
                          'bg-primary text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{entry.name}</h4>
                          <p className="text-sm text-muted-foreground">Level {entry.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{entry.score.toLocaleString()}</div>
                        <div className="flex space-x-1">
                          {entry.badges.slice(0, 3).map((badge, badgeIndex) => (
                            <Badge key={badgeIndex} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`card-elevated ${achievement.unlocked ? 'ring-2 ring-success' : 'opacity-60'}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        achievement.unlocked ? 'bg-success/20' : 'bg-muted/30'
                      }`}>
                        <span className="text-3xl">{achievement.icon}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                      <div className="space-y-2">
                        <Badge variant="outline" className="capitalize">
                          {achievement.rarity}
                        </Badge>
                        <div className="flex items-center justify-center space-x-2">
                          <Star className="h-4 w-4 text-warning" />
                          <span className="text-sm font-medium">{achievement.points} pts</span>
                        </div>
                        {achievement.unlocked && (
                          <div className="text-xs text-success">
                            Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ARGamingPage;
