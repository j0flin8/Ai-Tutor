// AR Experience Component - Interactive AR learning interface

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize, 
  Minimize,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  Target,
  Zap,
  Eye,
  Hand,
  Mic,
  MicOff,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowLeft,
  ArrowRight,
  Home,
  BookOpen,
  Brain,
  Award,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ARExperience as ARExperienceType, ARContent, ARInteraction } from '@/types/arGaming';

interface ARExperienceProps {
  experience: ARExperienceType;
  onComplete: (score: number, achievements: string[]) => void;
  onExit: () => void;
}

const ARExperience: React.FC<ARExperienceProps> = ({ experience, onComplete, onExit }) => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isARActive, setIsARActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentContent, setCurrentContent] = useState<ARContent>(experience.arContent);
  const [currentInteraction, setCurrentInteraction] = useState<ARInteraction | null>(null);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [interactionFeedback, setInteractionFeedback] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartAR = async () => {
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsARActive(true);
        setIsPlaying(true);
        setShowInstructions(false);
        
        toast({
          title: 'AR Experience Started',
          description: 'Point your camera at a flat surface to begin.',
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: 'Camera Access Required',
        description: 'Please allow camera access to use AR features.',
        variant: 'destructive',
      });
    }
  };

  const handleInteraction = (interaction: ARInteraction) => {
    setCurrentInteraction(interaction);
    
    // Simulate interaction feedback
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      const feedback = isSuccess ? interaction.feedback : 'Try again!';
      setInteractionFeedback(feedback);
      
      if (isSuccess) {
        setScore(prev => prev + 100);
        setProgress(prev => Math.min(prev + 10, 100));
        
        // Check for achievements
        if (score >= 500 && !achievements.includes('high_scorer')) {
          setAchievements(prev => [...prev, 'high_scorer']);
          toast({
            title: 'Achievement Unlocked!',
            description: 'High Scorer - You scored 500+ points!',
          });
        }
      }
      
      setTimeout(() => {
        setInteractionFeedback(null);
        setCurrentInteraction(null);
      }, 2000);
    }, 1000);
  };

  const handleComplete = () => {
    onComplete(score, achievements);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* AR Camera View */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted={isMuted}
        />
        
        {/* AR Overlay Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* AR Content Overlay */}
        {isARActive && (
          <div className="absolute inset-0 pointer-events-none">
            {/* 3D Model Placeholder */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center backdrop-blur-sm"
              >
                <Brain className="h-16 w-16 text-primary" />
              </motion.div>
            </div>
            
            {/* Interaction Points */}
            {experience.interactions.map((interaction, index) => (
              <motion.div
                key={interaction.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.5 }}
                className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto"
                onClick={() => handleInteraction(interaction)}
              >
                <Target className="h-4 w-4 text-black" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto">
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
            
            <Badge variant="secondary" className="bg-black/50 text-white">
              {experience.subject}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              size="sm"
              className="bg-black/50 border-white/20 text-white hover:bg-white/10"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
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

        {/* Progress Bar */}
        <div className="absolute top-20 left-4 right-4 pointer-events-auto">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Score and Time */}
        <div className="absolute top-32 left-4 pointer-events-auto">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">{score} pts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-sm">{formatTime(timeSpent)}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-4 left-4 right-4 pointer-events-auto"
            >
              <Card className="bg-black/80 border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">AR Learning Experience</h3>
                      <p className="text-muted-foreground mb-4">
                        {experience.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-blue-400" />
                        <span>Point camera at a flat surface</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Hand className="h-4 w-4 text-green-400" />
                        <span>Tap on interactive elements</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-yellow-400" />
                        <span>Complete learning objectives</span>
                      </div>
                    </div>
                    
                    <Button onClick={handleStartAR} variant="hero" className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Start AR Experience
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interaction Feedback */}
        <AnimatePresence>
          {interactionFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <Card className="bg-black/80 border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="font-medium">{interactionFeedback}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Learning Objectives */}
        {isARActive && (
          <div className="absolute bottom-4 left-4 pointer-events-auto">
            <Card className="bg-black/80 border-white/20 text-white max-w-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {experience.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Completion Button */}
        {progress >= 100 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 right-4 pointer-events-auto"
          >
            <Button onClick={handleComplete} variant="hero" size="lg">
              <Award className="mr-2 h-4 w-4" />
              Complete Experience
            </Button>
          </motion.div>
        )}
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-4 right-4 w-80 bg-black/90 backdrop-blur-sm rounded-lg p-4 pointer-events-auto"
          >
            <div className="space-y-4">
              <h3 className="font-semibold">AR Settings</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sound Effects</span>
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    variant="outline"
                    size="sm"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Haptic Feedback</span>
                  <Button variant="outline" size="sm">
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Hints</span>
                  <Button variant="outline" size="sm">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ARExperience;
