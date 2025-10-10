import { Card, CardContent } from "@/components/ui/card";
import { Users, BarChart3, Clock, Shield, Zap, Bell } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Management",
    description: "Easily manage student records, classes, and attendance history in one place.",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Mark and monitor attendance in real-time with instant updates and notifications.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Generate comprehensive reports and insights with powerful analytics tools.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Your data is protected with enterprise-grade security and regular backups.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Lightning-fast interface ensures smooth operation even with large datasets.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated alerts for absences, late arrivals, and important updates.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make attendance management simple and efficient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-card"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
