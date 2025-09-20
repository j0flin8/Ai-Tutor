import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import StudentOnboarding from "./pages/StudentOnboarding";
import QuizPage from "./pages/QuizPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import PricingPage from "./pages/PricingPage";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import QuizTest from "./pages/QuizTest";
import SimpleTest from "./pages/SimpleTest";
import AITutorPage from "./pages/AITutorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/student-onboarding" element={<StudentOnboarding />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
              <Route path="/quiz-test" element={<QuizTest />} />
              <Route path="/simple-test" element={<SimpleTest />} />
              <Route path="/ai-tutor" element={<AITutorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
