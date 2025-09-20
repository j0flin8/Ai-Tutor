import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  GraduationCap, 
  Globe, 
  BookOpen,
  CheckCircle,
  Brain
} from "lucide-react";
import { learningStyles } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const StudentOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    language: "",
    subjects: [] as string[],
    learningStyle: ""
  });

  const totalSteps = 5;

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Academic Level", icon: GraduationCap },
    { number: 3, title: "Language", icon: Globe },
    { number: 4, title: "Subjects", icon: BookOpen },
    { number: 5, title: "Learning Style", icon: Brain }
  ];

  const grades = [
    "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade",
    "11th Grade", "12th Grade", "Undergraduate", "Graduate"
  ];

  const languages = [
    "English", "Hindi", "Tamil", "Telugu", "Kannada", "Bengali", "Marathi"
  ];

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English", 
    "History", "Geography", "Computer Science", "Economics"
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      toast({
        title: "Welcome to AI Classroom!",
        description: "Your personalized learning journey starts now.",
      });
      navigate("/student-dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.name.length > 0;
      case 2: return formData.grade.length > 0;
      case 3: return formData.language.length > 0;
      case 4: return formData.subjects.length > 0;
      case 5: return formData.learningStyle.length > 0;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Let's get started!</h2>
              <p className="text-muted-foreground">Tell us a bit about yourself</p>
            </div>
            <div className="space-y-4">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="h-12 text-lg"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Academic Level</h2>
              <p className="text-muted-foreground">What grade or level are you currently in?</p>
            </div>
            <div className="space-y-4">
              <Label>Grade/Class</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Preferred Language</h2>
              <p className="text-muted-foreground">Which language would you like to learn in?</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((language) => (
                <Button
                  key={language}
                  variant={formData.language === language ? "default" : "outline"}
                  className="h-16 text-lg"
                  onClick={() => setFormData(prev => ({ ...prev, language }))}
                >
                  {language}
                </Button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Subjects of Interest</h2>
              <p className="text-muted-foreground">Select the subjects you'd like to focus on</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={formData.subjects.includes(subject) ? "default" : "outline"}
                  className="h-16 text-sm relative"
                  onClick={() => toggleSubject(subject)}
                >
                  {subject}
                  {formData.subjects.includes(subject) && (
                    <CheckCircle className="absolute -top-2 -right-2 h-5 w-5 text-success bg-background rounded-full" />
                  )}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Selected: {formData.subjects.length} subjects
            </p>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Learning Style Assessment</h2>
              <p className="text-muted-foreground">How do you learn best? This helps us personalize your experience.</p>
            </div>
            <div className="space-y-4">
              {learningStyles.map((style) => (
                <Card
                  key={style.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                    formData.learningStyle === style.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, learningStyle: style.id }))}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{style.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{style.title}</h3>
                        <p className="text-muted-foreground">{style.description}</p>
                      </div>
                      {formData.learningStyle === style.id && (
                        <CheckCircle className="h-6 w-6 text-success" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-muted-foreground/30 text-muted-foreground'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-16 md:w-24 mx-2 rounded transition-all duration-300 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Badge variant="outline" className="text-sm">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
        </div>

        {/* Content Card */}
        <Card className="card-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {steps[currentStep - 1]?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="text-sm text-muted-foreground">
                {currentStep}/{totalSteps}
              </div>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex items-center space-x-2"
                variant={currentStep === totalSteps ? "hero" : "default"}
              >
                <span>{currentStep === totalSteps ? "Complete" : "Next"}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentOnboarding;