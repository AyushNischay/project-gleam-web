import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Filter } from "lucide-react";
import { useState } from "react";

const Attendance = () => {
  const [students] = useState([
    { id: 1, name: "John Doe", rollNo: "001", class: "10-A", status: "present" },
    { id: 2, name: "Jane Smith", rollNo: "002", class: "10-A", status: "present" },
    { id: 3, name: "Mike Johnson", rollNo: "003", class: "10-A", status: "absent" },
    { id: 4, name: "Sarah Williams", rollNo: "004", class: "10-A", status: "present" },
    { id: 5, name: "Tom Brown", rollNo: "005", class: "10-A", status: "late" },
    { id: 6, name: "Emily Davis", rollNo: "006", class: "10-A", status: "present" },
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      present: "bg-success/10 text-success border-success/20",
      absent: "bg-destructive/10 text-destructive border-destructive/20",
      late: "bg-warning/10 text-warning border-warning/20",
    };
    return styles[status as keyof typeof styles] || styles.present;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Mark Attendance</h1>
            <p className="text-muted-foreground">Track and manage student attendance efficiently</p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Student List - Class 10-A</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search students..." 
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="10-a">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-a">Class 10-A</SelectItem>
                    <SelectItem value="10-b">Class 10-B</SelectItem>
                    <SelectItem value="9-a">Class 9-A</SelectItem>
                    <SelectItem value="9-b">Class 9-B</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>

              {/* Table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Roll No</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{student.rollNo}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(student.status)}`}>
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-success hover:bg-success/10">
                              Present
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">
                              Absent
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary */}
              <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Present: </span>
                    <span className="font-semibold text-success">4</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Absent: </span>
                    <span className="font-semibold text-destructive">1</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Late: </span>
                    <span className="font-semibold text-warning">1</span>
                  </div>
                </div>
                <Button className="bg-gradient-primary hover:opacity-90">
                  Save Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
