// Mock data for AI Classroom Tutor

export const quizQuestions = [
  {
    id: 1,
    question: "What is the value of x in the equation 2x + 5 = 13?",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correctAnswer: 1,
    subject: "Mathematics",
    topic: "Linear Equations",
    difficulty: "easy",
    explanation: {
      text: "To solve 2x + 5 = 13, first subtract 5 from both sides: 2x = 8. Then divide both sides by 2: x = 4.",
      video: "https://example.com/algebra-basics",
    }
  },
  {
    id: 2,
    question: "Which of the following is a renewable source of energy?",
    options: ["Coal", "Natural Gas", "Solar Power", "Petroleum"],
    correctAnswer: 2,
    subject: "Science",
    topic: "Energy Sources",
    difficulty: "medium",
    explanation: {
      text: "Solar power is renewable because it comes from the sun, which is an inexhaustible source of energy that naturally replenishes itself.",
      video: "https://example.com/renewable-energy",
    }
  },
  {
    id: 3,
    question: "What is the past tense of 'go'?",
    options: ["goed", "went", "gone", "going"],
    correctAnswer: 1,
    subject: "English",
    topic: "Grammar",
    difficulty: "easy",
    explanation: {
      text: "'Went' is the correct past tense of 'go'. This is an irregular verb, so it doesn't follow the typical -ed pattern.",
      video: "https://example.com/irregular-verbs",
    }
  },
  {
    id: 4,
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 1,
    subject: "Mathematics",
    topic: "Percentages",
    difficulty: "medium",
    explanation: {
      text: "To find 15% of 200, multiply 200 by 0.15: 200 × 0.15 = 30.",
      video: "https://example.com/percentages",
    }
  },
  {
    id: 5,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: 1,
    subject: "Science",
    topic: "Solar System",
    difficulty: "easy",
    explanation: {
      text: "Mercury is the closest planet to the Sun in our solar system, with an average distance of about 36 million miles.",
      video: "https://example.com/solar-system",
    }
  }
];

export const studentProgress = {
  overallScore: 78,
  completedQuizzes: 24,
  totalQuizzes: 50,
  subjects: [
    { name: "Mathematics", progress: 85, color: "#3b82f6" },
    { name: "Science", progress: 72, color: "#10b981" },
    { name: "English", progress: 90, color: "#8b5cf6" },
    { name: "History", progress: 65, color: "#f59e0b" },
  ],
  weeklyProgress: [
    { day: "Mon", score: 75 },
    { day: "Tue", score: 82 },
    { day: "Wed", score: 78 },
    { day: "Thu", score: 88 },
    { day: "Fri", score: 85 },
    { day: "Sat", score: 92 },
    { day: "Sun", score: 89 },
  ],
  recentQuizzes: [
    { subject: "Mathematics", score: 92, date: "2024-01-15", topic: "Algebra" },
    { subject: "Science", score: 88, date: "2024-01-14", topic: "Chemistry" },
    { subject: "English", score: 95, date: "2024-01-13", topic: "Grammar" },
    { subject: "History", score: 82, date: "2024-01-12", topic: "World War II" },
  ]
};

export const knowledgeGraph = {
  mathematics: {
    title: "Mathematics",
    topics: [
      {
        id: "algebra",
        title: "Algebra",
        completed: true,
        subtopics: ["Linear Equations", "Quadratic Equations", "Polynomials"]
      },
      {
        id: "geometry",
        title: "Geometry",
        completed: false,
        subtopics: ["Angles", "Triangles", "Circles", "Area & Perimeter"]
      },
      {
        id: "calculus",
        title: "Calculus",
        completed: false,
        subtopics: ["Limits", "Derivatives", "Integrals"]
      }
    ]
  },
  science: {
    title: "Science",
    topics: [
      {
        id: "physics",
        title: "Physics",
        completed: false,
        subtopics: ["Motion", "Forces", "Energy", "Waves"]
      },
      {
        id: "chemistry",
        title: "Chemistry",
        completed: true,
        subtopics: ["Atoms", "Elements", "Chemical Reactions"]
      },
      {
        id: "biology",
        title: "Biology",
        completed: false,
        subtopics: ["Cells", "Genetics", "Evolution", "Ecology"]
      }
    ]
  }
};

export const classroomStats = [
  {
    id: 1,
    name: "Alice Johnson",
    grade: "10th",
    progress: 95,
    weakAreas: ["Trigonometry"],
    lastActive: "2024-01-15",
    averageScore: 92
  },
  {
    id: 2,
    name: "Bob Smith",
    grade: "10th",
    progress: 78,
    weakAreas: ["Algebra", "Geometry"],
    lastActive: "2024-01-14",
    averageScore: 75
  },
  {
    id: 3,
    name: "Carol Davis",
    grade: "10th",
    progress: 88,
    weakAreas: ["Physics"],
    lastActive: "2024-01-15",
    averageScore: 85
  },
  {
    id: 4,
    name: "David Wilson",
    grade: "10th",
    progress: 67,
    weakAreas: ["Chemistry", "Biology"],
    lastActive: "2024-01-13",
    averageScore: 68
  }
];

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Student, Grade 11",
    content: "AI Classroom Tutor helped me improve my math grades from C to A in just 3 months!",
    avatar: "/avatars/sarah.jpg",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Parent",
    content: "My daughter loves the personalized learning approach. It's like having a tutor available 24/7.",
    avatar: "/avatars/michael.jpg",
    rating: 5
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "High School Teacher",
    content: "This platform has revolutionized how my students learn. The progress tracking is incredible.",
    avatar: "/avatars/emily.jpg",
    rating: 5
  }
];

export const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: [
      "5 quizzes per day",
      "Basic progress tracking",
      "English language only",
      "Community support"
    ],
    popular: false,
    cta: "Get Started"
  },
  {
    name: "Student",
    price: "₹299",
    period: "per month",
    features: [
      "Unlimited quizzes",
      "Advanced progress analytics",
      "Multi-language support",
      "Personalized learning path",
      "Video explanations",
      "Priority support"
    ],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    name: "School",
    price: "₹49",
    period: "per student/month",
    features: [
      "Everything in Student plan",
      "Teacher dashboard",
      "Class management",
      "Parent reports",
      "Custom curriculum",
      "API access",
      "Dedicated support"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

export const learningStyles = [
  {
    id: "visual",
    title: "Visual Learner",
    description: "You learn best with diagrams, charts, and visual aids",
    icon: "👁️",
    color: "text-blue-600"
  },
  {
    id: "text",
    title: "Reading/Writing Learner",
    description: "You prefer text-based explanations and written materials",
    icon: "📝",
    color: "text-green-600"
  },
  {
    id: "quiz",
    title: "Kinesthetic Learner",
    description: "You learn through practice, quizzes, and hands-on activities",
    icon: "🎯",
    color: "text-purple-600"
  }
];