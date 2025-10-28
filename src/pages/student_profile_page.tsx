import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Mail, Phone, MapPin, Calendar, Book, 
  TrendingUp, Award, Target, Clock, BookOpen 
} from 'lucide-react';
const StudentProfile = () => {
  const [student] = useState({
    id: 'STU001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@school.com',
    phone: '+91 98765 43210',
    class: '12-A',
    rollNo: '001',
    section: 'Science',
    dateOfBirth: '2005-03-15',
    address: '123 Main Street, Mumbai, Maharashtra',
    admissionDate: '2019-04-01',
    parentName: 'Mr. Rajesh Sharma',
    parentContact: '+91 98765 43211',
    bloodGroup: 'O+',
    avatar: '',
    attendance: 85,
    overallGrade: 'A',
    cgpa: 9.2,
    rank: 3,
    totalStudents: 50
  });

  const [subjects] = useState([
    { name: 'Mathematics', marks: 92, grade: 'A+', teacher: 'Dr. Singh', credits: 5 },
    { name: 'Physics', marks: 88, grade: 'A', teacher: 'Prof. Kumar', credits: 5 },
    { name: 'Chemistry', marks: 90, grade: 'A+', teacher: 'Dr. Patel', credits: 5 },
    { name: 'English', marks: 85, grade: 'A', teacher: 'Ms. Gupta', credits: 4 },
    { name: 'Computer Science', marks: 95, grade: 'A+', teacher: 'Mr. Verma', credits: 5 }
  ]);

  const [activities] = useState([
    { name: 'Science Club', role: 'Member', year: '2023-24' },
    { name: 'Basketball Team', role: 'Captain', year: '2023-24' },
    { name: 'Coding Competition', role: 'Winner', year: '2023' },
    { name: 'Annual Day', role: 'Performer', year: '2023' }
  ]);

  const [achievements] = useState([
    { title: 'First Prize in State Science Fair', date: '2023-11', icon: Award },
    { title: 'Best Student of the Month', date: '2023-10', icon: Target },
    { title: 'Perfect Attendance Award', date: '2023-09', icon: Calendar },
    { title: 'Coding Hackathon Winner', date: '2023-08', icon: BookOpen }
  ]);

  const averageMarks = Math.round(
    subjects.reduce((sum, subject) => sum + subject.marks, 0) / subjects.length
  );
const navigate = useNavigate();

const handleLogout = () => {
  // Optional: clear auth tokens if you’re storing them
  localStorage.removeItem('studentToken');
  navigate('/login');
};


  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Card */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 justify-between">
  <div className="flex items-center gap-6">
    <Avatar className="w-32 h-32">
      <AvatarImage src={student.avatar} />
      <AvatarFallback className="text-3xl bg-gradient-primary text-white">
        {student.name.split(' ').map(n => n[0]).join('')}
      </AvatarFallback>
    </Avatar>

    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold mb-1">{student.name}</h1>
        <p className="text-muted-foreground">
          Class {student.class} • Roll No: {student.rollNo} • {student.section} Stream
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span>{student.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{student.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>Born: {new Date(student.dateOfBirth).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          CGPA: {student.cgpa}
        </Badge>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Rank: #{student.rank}
        </Badge>
        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
          {student.overallGrade} Grade
        </Badge>
        <Badge variant="outline" className="bg-info/10 text-info border-info/20">
          Blood: {student.bloodGroup}
        </Badge>
      </div>
    </div>
  </div>

{/* Action Buttons */}
<Button 
  onClick={handleLogout} 
  variant="outline" 
  className="self-start md:self-center border-destructive/20 text-destructive hover:bg-destructive/10 transition-all"
>
  Logout
</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="text-2xl font-bold">{student.attendance}%</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <Progress value={student.attendance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Marks</p>
                  <p className="text-2xl font-bold">{averageMarks}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <Progress value={averageMarks} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Class Rank</p>
                  <p className="text-2xl font-bold">#{student.rank}</p>
                </div>
                <Award className="w-8 h-8 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                of {student.totalStudents} students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CGPA</p>
                  <p className="text-2xl font-bold">{student.cgpa}</p>
                </div>
                <Book className="w-8 h-8 text-warning" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Out of 10.0
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
            onClick={() => navigate("/study-material")}
            >
              📚 View Study Material
          </Button>
        </div>
        {/* Detailed Information Tabs */}
        <Tabs defaultValue="academics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="academics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Detailed marks and grades for all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{subject.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Teacher: {subject.teacher} • Credits: {subject.credits}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            {subject.marks}%
                          </div>
                          <Badge variant="outline" className="mt-1">
                            Grade {subject.grade}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={subject.marks} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Student and parent details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Student ID</p>
                      <p className="font-medium">{student.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                      <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Blood Group</p>
                      <p className="font-medium">{student.bloodGroup}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Address</p>
                      <p className="font-medium flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        {student.address}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Admission Date</p>
                      <p className="font-medium">{new Date(student.admissionDate).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Parent/Guardian Name</p>
                      <p className="font-medium">{student.parentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Parent Contact</p>
                      <p className="font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {student.parentContact}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Extra-Curricular Activities</CardTitle>
                <CardDescription>Clubs, sports, and other activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                      <h4 className="font-semibold mb-1">{activity.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{activity.role}</p>
                      <Badge variant="outline" className="text-xs">
                        {activity.year}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Awards</CardTitle>
                <CardDescription>Recognition and accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(achievement.date).toLocaleDateString('en-US', { 
                              year: 'numeric', month: 'long' 
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentProfile;