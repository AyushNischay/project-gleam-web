import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, LogOut, Search, CalendarCheck, TrendingUp, Award } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock student data
const studentsData = [
  {
    id: "STU001",
    name: "Rahul Sharma",
    class: "12-A",
    rollNo: "001",
    attendance: 85,
    marks: { math: 92, physics: 88, chemistry: 90, english: 85, computerScience: 95 },
    rank: 3,
  },
  {
    id: "STU002",
    name: "Priya Patel",
    class: "12-A",
    rollNo: "002",
    attendance: 92,
    marks: { math: 95, physics: 93, chemistry: 94, english: 90, computerScience: 96 },
    rank: 1,
  },
  {
    id: "STU003",
    name: "Amit Kumar",
    class: "12-A",
    rollNo: "003",
    attendance: 78,
    marks: { math: 88, physics: 85, chemistry: 87, english: 82, computerScience: 90 },
    rank: 5,
  },
  {
    id: "STU004",
    name: "Sneha Reddy",
    class: "12-B",
    rollNo: "004",
    attendance: 95,
    marks: { math: 94, physics: 92, chemistry: 93, english: 88, computerScience: 94 },
    rank: 2,
  },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(studentsData);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "teacher") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const filtered = studentsData.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.includes(searchQuery)
    );
    setFilteredStudents(filtered);
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleSelectStudent = (studentId: string) => {
    const student = studentsData.find((s) => s.id === studentId);
    setSelectedStudent(student);
  };

  const averageMarks = selectedStudent
    ? Math.round(
        (Object.values(selectedStudent.marks).reduce((a: any, b: any) => a + b, 0) as number) /
          Object.values(selectedStudent.marks).length
      )
    : 0;

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
              <p className="text-xs text-muted-foreground">Teacher Portal</p>
            </div>
          </div>
      <div className="flex items-center gap-2">
          <Button onClick={() => navigate('/management')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
          size="sm"
          >
            Manage Students
        </Button>

        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
            Logout
        </Button>
      </div>
 
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Teacher Dashboard</h2>
          <p className="text-muted-foreground">Select a student to view their performance</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card className="lg:col-span-1 shadow-card">
            <CardHeader>
              <CardTitle>Search Students</CardTitle>
              <CardDescription>Find by name, ID, or roll number</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>

              <Select onValueChange={handleSelectStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {filteredStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.rollNo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {filteredStudents.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No students found
                </p>
              )}
            </CardContent>
          </Card>

          {selectedStudent ? (
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">{selectedStudent.name}</h3>
                <p className="text-muted-foreground">
                  Class {selectedStudent.class} • Roll No: {selectedStudent.rollNo}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedStudent.attendance}%</div>
                    <Progress value={selectedStudent.attendance} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {selectedStudent.attendance >= 75 ? "Good standing" : "Below required"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Marks</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{averageMarks}%</div>
                    <Progress value={averageMarks} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Across all subjects</p>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">#{selectedStudent.rank}</div>
                    <p className="text-xs text-muted-foreground mt-2">In class {selectedStudent.class}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Subject-wise Performance</CardTitle>
                  <CardDescription>Marks in each subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(selectedStudent.marks).map(([subject, marks]: [string, any]) => (
                      <div key={subject}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium capitalize">
                            {subject.replace(/([A-Z])/g, " $1").trim()}
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
          ) : (
            <div className="lg:col-span-2 flex items-center justify-center">
              <Card className="w-full max-w-md shadow-card">
                <CardContent className="pt-6 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Student Selected</h3>
                  <p className="text-muted-foreground">
                    Search and select a student to view their performance data
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
