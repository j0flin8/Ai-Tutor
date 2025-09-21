// Gaming Experience Component - Gamified learning interface

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  HelpCircle,
  Target,
  Zap,
  Star,
  Trophy,
  Heart,
  Clock,
  Award,
  Gift,
  Users,
  MessageSquare,
  Share2,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  Home,
  BookOpen,
  Brain,
  CheckCircle,
  AlertCircle,
  Info,
  Crown,
  Flame,
  Shield,
  Sword,
  Gem,
  Coins
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GameExperience, GameLevel, PowerUp, Achievement } from '@/types/arGaming';

interface GamingExperienceProps {
  experience: GameExperience;
  onComplete: (score: number, achievements: string[]) => void;
  onExit: () => void;
}

const GamingExperience: React.FC<GamingExperienceProps> = ({ experience, onComplete, onExit }) => {
  const { toast } = useToast();
  
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(experience.levels[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(experience.gameMechanics.lives.maxLives);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(currentLevel.timeLimit || 300);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [showPowerUps, setShowPowerUps] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isPaused, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft]);

  const handleStartGame = () => {
    setIsPlaying(true);
    toast({
      title: 'Game Started!',
      description: 'Good luck on your learning adventure!',
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const question = currentLevel.assessment.questions[currentQuestion];
    const correct = answerIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      const points = question.points + (streak * 10);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      
      // Check for streak achievements
      if (streak + 1 === 5 && !achievements.includes('streak_master')) {
        setAchievements(prev => [...prev, 'streak_master']);
        toast({
          title: 'Achievement Unlocked!',
          description: 'Streak Master - 5 correct answers in a row!',
        });
      }
    } else {
      setStreak(0);
      setLives(prev => prev - 1);
      
      if (lives - 1 === 0) {
        handleGameOver();
      }
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentQuestion < currentLevel.assessment.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        handleLevelComplete();
      }
    }, 2000);
  };

  const handleTimeUp = () => {
    setIsPlaying(false);
    toast({
      title: 'Time\'s Up!',
      description: 'Better luck next time!',
      variant: 'destructive',
    });
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    toast({
      title: 'Game Over',
      description: `Final Score: ${score} points`,
      variant: 'destructive',
    });
  };

  const handleLevelComplete = () => {
    setIsPlaying(false);
    const finalScore = score + (timeLeft * 10); // Time bonus
    setScore(finalScore);
    
    toast({
      title: 'Level Complete!',
      description: `Congratulations! Score: ${finalScore}`,
    });
    
    // Check for achievements
    if (finalScore >= 1000 && !achievements.includes('high_scorer')) {
      setAchievements(prev => [...prev, 'high_scorer']);
      toast({
        title: 'Achievement Unlocked!',
        description: 'High Scorer - You scored 1000+ points!',
      });
    }
  };

  const handleUsePowerUp = (powerUp: PowerUp) => {
    // Implement power-up logic
    toast({
      title: 'Power-Up Used!',
      description: `${powerUp.name} activated!`,
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestionData = currentLevel.assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentLevel.assessment.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Game Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onExit}
                variant="outline"
                size="sm"
                className="bg-black/50 border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit
              </Button>
              
              <div>
                <h1 className="text-xl font-bold">{experience.title}</h1>
                <p className="text-sm text-white/70">{currentLevel.title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                variant="outline"
                size="sm"
                className="bg-black/50 border-white/20 text-white hover:bg-white/10"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </Button>
              
              <Button
                onClick={() => setShowPowerUps(!showPowerUps)}
                variant="outline"
                size="sm"
                className="bg-black/50 border-white/20 text-white hover:bg-white/10"
              >
                <Gift className="h-4 w-4 mr-2" />
                Power-Ups
              </Button>
              
              <Button
                onClick={() => setShowSettings(!showSettings)}
                variant="outline"
                size="sm"
                className="bg-black/50 border-white/20 text-white hover:bg-white/10"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Stats Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Score and Level */}
            <Card className="bg-black/20 border-white/10">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Score</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="font-bold">{score}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Level</span>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      {currentLevel.number}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Streak</span>
                    <div className="flex items-center space-x-1">
                      <Flame className="h-4 w-4 text-orange-400" />
                      <span className="font-bold">{streak}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lives */}
            <Card className="bg-black/20 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Lives</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: experience.gameMechanics.lives.maxLives }).map((_, index) => (
                      <Heart
                        key={index}
                        className={`h-5 w-5 ${
                          index < lives ? 'text-red-400 fill-current' : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time */}
            <Card className="bg-black/20 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Time</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className={`font-bold ${timeLeft < 30 ? 'text-red-400' : 'text-white'}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {achievements.slice(-3).map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-400" />
                    <span className="text-xs">{achievement.replace('_', ' ')}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-3">
            {!isPlaying ? (
              <Card className="bg-black/20 border-white/10">
                <CardContent className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{currentLevel.title}</h2>
                      <p className="text-white/70 mb-4">{currentLevel.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                      <div className="bg-white/10 rounded-lg p-4">
                        <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-sm text-white/70">Target Score</div>
                        <div className="font-bold">{currentLevel.scoreTarget}</div>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <Clock className="h-6 w-6 text-green-400 mx-auto mb-2" />
                        <div className="text-sm text-white/70">Time Limit</div>
                        <div className="font-bold">{formatTime(currentLevel.timeLimit || 300)}</div>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                        <div className="text-sm text-white/70">Difficulty</div>
                        <div className="font-bold capitalize">{currentLevel.difficulty}</div>
                      </div>
                    </div>
                    
                    <Button onClick={handleStartGame} variant="hero" size="lg">
                      <Play className="mr-2 h-5 w-5" />
                      Start Level
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Progress Bar */}
                <Card className="bg-black/20 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Question {currentQuestion + 1} of {currentLevel.assessment.questions.length}</span>
                      <span className="text-sm">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </CardContent>
                </Card>

                {/* Question Card */}
                <Card className="bg-black/20 border-white/10">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">{currentQuestionData.question}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestionData.options?.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={selectedAnswer !== null}
                            variant="outline"
                            className={`h-auto p-4 text-left justify-start ${
                              selectedAnswer === index
                                ? isCorrect
                                  ? 'border-green-500 bg-green-500/20 text-green-300'
                                  : 'border-red-500 bg-red-500/20 text-red-300'
                                : 'border-white/20 bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswer === index
                                  ? isCorrect
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-red-500 bg-red-500'
                                  : 'border-white/30'
                              }`}>
                                {selectedAnswer === index && (
                                  <CheckCircle className="h-4 w-4 text-white" />
                                )}
                              </div>
                              <span>{option}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                      
                      {/* Feedback */}
                      <AnimatePresence>
                        {showFeedback && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`p-4 rounded-lg ${
                              isCorrect ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-green-400" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-red-400" />
                              )}
                              <span className="font-medium">
                                {isCorrect ? 'Correct!' : 'Incorrect!'}
                              </span>
                            </div>
                            <p className="text-sm mt-2 text-white/70">
                              {currentQuestionData.explanation}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>

                {/* Game Controls */}
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={handlePause}
                    variant="outline"
                    className="bg-black/50 border-white/20 text-white hover:bg-white/10"
                  >
                    {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                  
                  <Button
                    onClick={() => setShowPowerUps(true)}
                    variant="outline"
                    className="bg-black/50 border-white/20 text-white hover:bg-white/10"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Power-Ups
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Power-Ups Modal */}
      <AnimatePresence>
        {showPowerUps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPowerUps(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader>
                  <CardTitle className="text-center">Power-Ups</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experience.gameMechanics.powerUps.map((powerUp) => (
                      <Card key={powerUp.id} className="bg-white/10 border-white/20">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{powerUp.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{powerUp.name}</h4>
                              <p className="text-sm text-white/70">{powerUp.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Coins className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm">{powerUp.cost}</span>
                              </div>
                            </div>
                            <Button
                              onClick={() => handleUsePowerUp(powerUp)}
                              variant="outline"
                              size="sm"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              Use
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamingExperience;
