import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Crown,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { pricingPlans } from "@/data/mockData";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const features = {
    free: [
      "5 quizzes per day",
      "Basic progress tracking",
      "English language only",
      "Community support",
      "Mobile app access"
    ],
    student: [
      "Everything in Free",
      "Unlimited quizzes",
      "Advanced progress analytics",
      "Multi-language support (7 languages)",
      "Personalized learning path",
      "Video explanations",
      "AI-powered recommendations",
      "Priority support",
      "Offline mode",
      "Parent reports"
    ],
    school: [
      "Everything in Student plan",
      "Teacher dashboard",
      "Class management tools",
      "Bulk student enrollment",
      "Advanced analytics & reporting",
      "Parent portal access",
      "Custom curriculum builder",
      "API access",
      "White-label option",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations"
    ]
  };

  const testimonials = [
    {
      quote: "Reduced our tutoring costs by 80% while improving student outcomes significantly.",
      author: "Dr. Priya Sharma",
      role: "Principal, Delhi Public School",
      rating: 5
    },
    {
      quote: "My daughter's math grades went from C to A+ in just 2 months. Incredible results!",
      author: "Rajesh Kumar",
      role: "Parent",
      rating: 5
    },
    {
      quote: "The AI adaptation is remarkable. It truly understands each student's learning style.",
      author: "Anita Desai",
      role: "Mathematics Teacher",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How does the AI personalization work?",
      answer: "Our AI analyzes learning patterns, response times, and error types to adapt difficulty, explanation style, and topic progression for each student."
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes, we offer a 14-day free trial for both Student and School plans. No credit card required to start."
    },
    {
      question: "What languages are supported?",
      answer: "We currently support English, Hindi, Tamil, Telugu, Kannada, Bengali, and Marathi with more languages coming soon."
    },
    {
      question: "How does school pricing work?",
      answer: "School pricing is per student per month. Bulk discounts are available for larger institutions. Contact us for custom quotes."
    }
  ];

  const getAnnualPrice = (monthlyPrice: string) => {
    if (monthlyPrice === "₹0") return "₹0";
    const numeric = parseInt(monthlyPrice.replace("₹", ""));
    const annual = Math.round(numeric * 10); // 10 months price for 12 months
    return `₹${annual}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-gradient-hero text-white">
              <Sparkles className="w-4 h-4 mr-1" />
              No Hidden Fees • Cancel Anytime
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Simple, Transparent</span>
              <br />
              Pricing for Everyone
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From individual students to entire schools - find the perfect plan 
              to transform learning with AI-powered personalization.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm ${!isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-gradient-hero"
              />
              <span className={`text-sm ${isAnnual ? 'font-medium' : 'text-muted-foreground'}`}>
                Annual
              </span>
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-elevated h-full relative">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">₹0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground mt-2">Perfect for trying out the platform</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.free.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <div className="pt-6">
                    <Link to="/student-onboarding" className="block">
                      <Button variant="outline" className="w-full">
                        Get Started Free
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Student Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-gradient-hero text-white px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <Card className="card-elevated h-full ring-2 ring-primary relative">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Student</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {isAnnual ? getAnnualPrice("₹299") : "₹299"}
                    </span>
                    <span className="text-muted-foreground">
                      /{isAnnual ? "year" : "month"}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-success mt-2">Save ₹598 annually!</p>
                  )}
                  <p className="text-muted-foreground mt-2">Complete learning solution</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.student.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <div className="pt-6">
                    <Link to="/student-onboarding" className="block">
                      <Button variant="hero" className="w-full">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      14-day free trial • No credit card required
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* School Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="card-elevated h-full relative">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">School</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {isAnnual ? getAnnualPrice("₹49") : "₹49"}
                    </span>
                    <span className="text-muted-foreground">
                      /student/{isAnnual ? "year" : "month"}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-success mt-2">Bulk discount available</p>
                  )}
                  <p className="text-muted-foreground mt-2">Complete institution solution</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.school.slice(0, 8).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  <div className="text-center text-sm text-muted-foreground">
                    +{features.school.length - 8} more features
                  </div>
                  <div className="pt-6">
                    <Button variant="secondary" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Contact Sales
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Custom pricing for 100+ students
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground">
              See what students, parents, and educators are saying
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
                    <blockquote className="text-muted-foreground mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
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
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of students and schools already benefiting from 
              AI-powered personalized education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student-onboarding">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                <Users className="mr-2 h-5 w-5" />
                Contact Sales
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;