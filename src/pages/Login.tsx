import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && password) {
      // Mock login - store student ID in localStorage
      localStorage.setItem("userRole", "student");
      localStorage.setItem("userId", studentId);
      toast({
        title: "Login Successful",
        description: "Welcome back, student!",
      });
      navigate("/student-dashboard");
    }
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherId && password) {
      // Mock login - store teacher role
      localStorage.setItem("userRole", "teacher");
      localStorage.setItem("userId", teacherId);
      toast({
        title: "Login Successful",
        description: "Welcome back, teacher!",
      });
      navigate("/teacher-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-glow">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Student Analyzer
          </h1>
          <p className="text-muted-foreground mt-2">
            Track attendance, marks, and rankings
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Choose your role to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input
                      id="student-id"
                      placeholder="Enter your student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                    Login as Student
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="teacher">
                <form onSubmit={handleTeacherLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-id">Teacher ID</Label>
                    <Input
                      id="teacher-id"
                      placeholder="Enter your teacher ID"
                      value={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-password">Password</Label>
                    <Input
                      id="teacher-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                    Login as Teacher
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
