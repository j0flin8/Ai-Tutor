import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Globe, 
  Star, 
  CheckCircle,
  Zap,
  Target,
  Award,
  BookOpen,
  MessageSquare,
  BarChart3,
  Play,
  Clock,
  GraduationCap,
  Pencil,
  HelpCircle,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Phone,
  ShoppingCart
} from "lucide-react";
import { testimonials, pricingPlans } from "@/data/mockData";

const LandingPage = () => {
  const popularCourses = [
    {
      title: "2-Year JEE",
      icon: Clock,
      color: "bg-purple-500",
      description: "Complete JEE preparation"
    },
    {
      title: "2-Year NEET",
      icon: Play,
      color: "bg-yellow-500",
      description: "Medical entrance coaching"
    },
    {
      title: "Offline Centres",
      icon: GraduationCap,
      color: "bg-green-500",
      description: "Physical learning centers"
    },
    {
      title: "Olympiad",
      icon: Pencil,
      color: "bg-pink-500",
      description: "Competitive exam prep"
    },
    {
      title: "Early Learning",
      icon: HelpCircle,
      color: "bg-orange-400",
      description: "LKG - Class 5 courses"
    },
    {
      title: "One to One Classes",
      icon: UserCheck,
      color: "bg-blue-400",
      description: "Personalized tutoring"
    }
  ];

  const exploreCourses = [
    {
      title: "Class 3 - 13 Competitive Exams",
      description: "JEE, NEET, Olympiad preparation"
    },
    {
      title: "Class 3 - 12 School Tuition",
      description: "CBSE, ICSE, State boards"
    },
    {
      title: "Class 1 - 5 Courses for kids",
      description: "Foundation building programs"
    }
  ];
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Gemini 2.0 adapts to each student's learning style and pace"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Learn in English, Hindi, Tamil, Telugu, and more languages"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Real-time analytics and detailed progress reports"
    },
    {
      icon: Target,
      title: "Adaptive Quizzes",
      description: "Smart difficulty adjustment based on performance"
    },
    {
      icon: MessageSquare,
      title: "Instant Explanations",
      description: "Text and video explanations for every question"
    },
    {
      icon: BarChart3,
      title: "Knowledge Graph",
      description: "Navigate through interconnected learning topics"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary">AI Tutor</div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/quiz" className="text-foreground hover:text-primary">Courses</Link>
              <Link to="/ai-tutor" className="text-foreground hover:text-primary">AI Tutor</Link>
              <Link to="/student-dashboard" className="text-foreground hover:text-primary">Dashboard</Link>
              <Link to="/teacher-dashboard" className="text-foreground hover:text-primary">For Teachers</Link>
              <Link to="/pricing" className="text-foreground hover:text-primary">Pricing</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>Talk to our experts 1800-120-456-456</span>
              </div>
              <Button variant="outline" size="sm">Sign in</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-foreground"
            >
              <Badge className="mb-4 bg-accent text-primary border-0">
                For Class 1 - Grade 12
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Explore our <span className="text-primary">AI-powered courses</span>
              </h1>
              
              <p className="text-xl mb-6 text-muted-foreground">
                • LIVE Online Classes
              </p>
              
              <Link to="/student-onboarding">
                <Button size="xl" variant="hero" className="px-8 py-4 text-lg">
                  Enrol Now
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="bg-white border border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">MATHEMATICS</h3>
                  <p className="text-muted-foreground">Interactive Learning</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">SCIENCE</h3>
                  <p className="text-muted-foreground">Hands-on Experiments</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-8 h-2 bg-black rounded-full"></div>
            <div className="w-8 h-2 bg-white/50 rounded-full"></div>
            <div className="w-8 h-2 bg-white/50 rounded-full"></div>
            <div className="w-8 h-2 bg-white/50 rounded-full"></div>
            <div className="w-8 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The Learning Crisis
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Traditional education fails to adapt to individual learning styles, 
              leaving millions of students struggling with one-size-fits-all approaches.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { stat: "70%", desc: "of students struggle with traditional teaching methods" },
                { stat: "₹50,000+", desc: "average annual cost of private tutoring" },
                { stat: "1:30", desc: "teacher-to-student ratio in most classrooms" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-destructive mb-2">{item.stat}</div>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">AI-Powered Solution</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform uses advanced AI to create personalized learning experiences 
              that adapt to each student's unique needs, preferences, and learning pace.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-feature h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6">
                Adaptive Learning That Works
              </h3>
              <div className="space-y-4">
                {[
                  "AI analyzes learning patterns and adjusts difficulty in real-time",
                  "Personalized curriculum based on individual strengths and weaknesses",
                  "Multiple explanation formats: text, visual, and interactive",
                  "Progress tracking with detailed analytics for students and parents"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Brain, label: "AI Tutor", color: "from-primary to-accent" },
                { icon: Target, label: "Personalized", color: "from-secondary to-success" },
                { icon: Award, label: "Achievement", color: "from-accent to-primary" },
                { icon: BookOpen, label: "Knowledge", color: "from-success to-secondary" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`card-elevated p-6 text-center bg-gradient-to-br ${item.color}`}
                >
                  <item.icon className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-white font-medium">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Students & Teachers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from real students and educators
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="card-elevated h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-warning fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-medium">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for you
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-hero text-white">Most Popular</Badge>
                  </div>
                )}
                <Card className={`card-elevated h-full ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    <Link to="/pricing" className="block w-full mt-6">
                      <Button 
                        variant={plan.popular ? "hero" : "outline"} 
                        className="w-full"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Learning?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of students already learning smarter with AI Classroom Tutor
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student-onboarding">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;