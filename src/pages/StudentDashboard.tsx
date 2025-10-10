import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, LogOut, TrendingUp, Award, CalendarCheck } from "lucide-react";

// Mock student data
const mockStudentData = {
  STU001: {
    name: "Rahul Sharma",
    class: "12-A",
    rollNo: "001",
    attendance: 85,
    marks: {
      math: 92,
      physics: 88,
      chemistry: 90,
      english: 85,
      computerScience: 95,
    },
    rank: 3,
    totalStudents: 50,
  },
  STU002: {
    name: "Priya Patel",
    class: "12-A",
    rollNo: "002",
    attendance: 92,
    marks: {
      math: 95,
      physics: 93,
      chemistry: 94,
      english: 90,
      computerScience: 96,
    },
    rank: 1,
    totalStudents: 50,
  },
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    if (userRole !== "student" || !userId) {
      navigate("/");
      return;
    }

    // Load mock data
    const data = mockStudentData[userId as keyof typeof mockStudentData] || mockStudentData.STU001;
    setStudentData(data);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (!studentData) return null;

  const averageMarks = Math.round(
    (Object.values(studentData.marks).reduce((a: any, b: any) => a + b, 0) as number) / 
    Object.values(studentData.marks).length
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Student Analyzer</h1>
              <p className="text-xs text-muted-foreground">Student Portal</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome, {studentData.name}!</h2>
          <p className="text-muted-foreground">
            Class {studentData.class} • Roll No: {studentData.rollNo}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentData.attendance}%</div>
              <Progress value={studentData.attendance} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {studentData.attendance >= 75 ? "Good standing" : "Below required"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Marks</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageMarks}%</div>
              <Progress value={averageMarks} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Across all subjects
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">#{studentData.rank}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Out of {studentData.totalStudents} students
              </p>
              <p className="text-xs text-success mt-1">
                Top {Math.round((studentData.rank / studentData.totalStudents) * 100)}%
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
            <CardDescription>Your marks in each subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(studentData.marks).map(([subject, marks]: [string, any]) => (
                <div key={subject}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium capitalize">
                      {subject.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-bold">{marks}%</span>
                  </div>
                  <Progress value={marks} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
