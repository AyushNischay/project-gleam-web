import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle2, XCircle, TrendingUp, Calendar, Clock } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: Users,
      trend: "+12%",
      color: "text-primary",
    },
    {
      title: "Present Today",
      value: "1,089",
      icon: CheckCircle2,
      trend: "+5%",
      color: "text-success",
    },
    {
      title: "Absent Today",
      value: "145",
      icon: XCircle,
      trend: "-3%",
      color: "text-destructive",
    },
    {
      title: "Attendance Rate",
      value: "88.2%",
      icon: TrendingUp,
      trend: "+2%",
      color: "text-info",
    },
  ];

  const recentActivity = [
    { name: "Class 10-A", status: "Completed", time: "2 mins ago" },
    { name: "Class 10-B", status: "Completed", time: "15 mins ago" },
    { name: "Class 9-A", status: "In Progress", time: "Just now" },
    { name: "Class 9-B", status: "Pending", time: "30 mins ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your attendance overview.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Today
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90">
                Mark Attendance
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-border hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                        <p className="text-sm text-success">{stat.trend} from last week</p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center ${stat.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2 border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'Completed' ? 'bg-success/10 text-success' :
                        activity.status === 'In Progress' ? 'bg-info/10 text-info' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-primary hover:opacity-90">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
