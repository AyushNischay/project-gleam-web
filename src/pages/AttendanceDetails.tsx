import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";

const subjectAttendance = [
  { subject: "Mathematics", attended: 18, total: 20 },
  { subject: "Physics", attended: 16, total: 20 },
  { subject: "Chemistry", attended: 15, total: 20 },
  { subject: "English", attended: 19, total: 20 },
  { subject: "Computer Science", attended: 20, total: 20 },
];

const AttendanceDetails = () => {
  const navigate = useNavigate();

  // Transform data for chart
  const chartData = subjectAttendance.map((s) => ({
    subject: s.subject,
    Attendance: Math.round((s.attended / s.total) * 100),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="shadow-card mb-6">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Attendance" fill="#4f46e5" radius={[10, 10, 0, 0]} />
                  <ReferenceLine y={75} stroke="red" strokeWidth={3} ifOverflow="extendDomain" label={{value:'75%',position:'right',fill:'green',fontWeight:600}} />
                  
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Detailed Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-muted">
                  <tr>
                    <th className="border p-2 text-left">Subject</th>
                    <th className="border p-2 text-center">Hours Attended</th>
                    <th className="border p-2 text-center">Total Hours</th>
                    <th className="border p-2 text-center">Missed Hours</th>
                    <th className="border p-2 text-center">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectAttendance.map((s) => {
                    const missed = s.total - s.attended;
                    const percentage = Math.round((s.attended / s.total) * 100);
                    return (
                      <tr key={s.subject}>
                        <td className="border p-2">{s.subject}</td>
                        <td className="border p-2 text-center">{s.attended}</td>
                        <td className="border p-2 text-center">{s.total}</td>
                        <td className="border p-2 text-center text-red-500">{missed}</td>
                        <td className="border p-2 text-center font-semibold">
                          {percentage}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceDetails;
