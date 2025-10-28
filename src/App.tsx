import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";
import AttendanceDetails from "./pages/AttendanceDetails";
import StudyMaterialRecommendation from "./pages/study_material"; 
import StudentProfile from '@/pages/student_profile_page';
import StudentManagement from "./pages/student_management";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/study-material" element={<StudyMaterialRecommendation />} />
          <Route path="/study-material" element={<StudyMaterialRecommendation />} /> 
          <Route path="/student/dashboard" element={<StudentProfile />} />
          <Route path="/attendance" element={<AttendanceDetails />} />
          <Route path="/" element={<Login />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/management" element={<StudentManagement />} />
          <Route path="/student/dashboard" element={<StudentProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>   
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
