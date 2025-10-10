import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Download, Calendar, TrendingUp, Users } from "lucide-react";

const Reports = () => {
  const monthlyData = [
    { month: "Jan", attendance: 92 },
    { month: "Feb", attendance: 88 },
    { month: "Mar", attendance: 90 },
    { month: "Apr", attendance: 85 },
    { month: "May", attendance: 89 },
  ];

  const classPerformance = [
    { class: "10-A", attendance: 92, students: 45 },
    { class: "10-B", attendance: 88, students: 42 },
    { class: "9-A", attendance: 90, students: 48 },
    { class: "9-B", attendance: 85, students: 44 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
              <p className="text-muted-foreground">Comprehensive insights into attendance patterns</p>
            </div>
            <div className="flex gap-3">
              <Select defaultValue="this-month">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Average Attendance</p>
                    <h3 className="text-3xl font-bold mb-2">88.8%</h3>
                    <p className="text-sm text-success">+3.2% from last month</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Classes</p>
                    <h3 className="text-3xl font-bold mb-2">24</h3>
                    <p className="text-sm text-info">Across all grades</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Working Days</p>
                    <h3 className="text-3xl font-bold mb-2">22</h3>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trend */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Monthly Attendance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data) => (
                    <div key={data.month}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{data.month}</span>
                        <span className="text-sm font-medium">{data.attendance}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all"
                          style={{ width: `${data.attendance}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Class Performance */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Class-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classPerformance.map((classData) => (
                    <div key={classData.class} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">Class {classData.class}</h4>
                          <p className="text-sm text-muted-foreground">{classData.students} students</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                            {classData.attendance}%
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-gradient-primary h-1.5 rounded-full"
                          style={{ width: `${classData.attendance}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
