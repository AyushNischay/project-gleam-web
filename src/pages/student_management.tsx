import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { studentAPI } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  UserPlus, Search, Edit, Trash2, Download, Upload,
  User, Mail, Phone, Calendar, MapPin, Users, Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentManagement = () => {
const [students, setStudents] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(false);


  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterSection, setFilterSection] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    class: '',
    rollNo: '',
    section: '',
    dateOfBirth: '',
    address: '',
    parentName: '',
    parentContact: '',
    bloodGroup: '',
    admissionDate: ''
  });
useEffect(() => {
  fetchStudents();
}, []);

const fetchStudents = async () => {
  setIsLoading(true);
  try {
    const response = await studentAPI.getAll();
    if (response.success) {
      setStudents(response.data);
    }
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive'
    });
  } finally {
    setIsLoading(false);
  }
};

const handleAddStudent = async () => {
  try {
    const response = await studentAPI.create(newStudent);
    if (response.success) {
      setStudents([...students, response.data]);
      setIsAddDialogOpen(false);
      toast({
        title: 'Student added successfully!',
        description: `${response.data.name} has been added to the system.`
      });
    }
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive'
    });
  }
};


  const { toast } = useToast(); // Fixed: Added toast hook

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.includes(searchQuery) ||
                         student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    const matchesSection = filterSection === 'all' || student.section === filterSection;
    return matchesSearch && matchesClass && matchesSection;
  });
  const handleEditStudent = () => {
    if (!selectedStudent) return;
    
    setStudents(students.map(s => 
      s.id === selectedStudent.id ? selectedStudent : s
    ));
    setIsEditDialogOpen(false);
    setSelectedStudent(null);
    
    toast({
      title: 'Student updated successfully!',
      description: 'Student information has been updated.'
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    setStudents(students.filter(s => s.id !== studentId));
    
    toast({
      title: 'Student removed',
      description: `${student?.name} has been removed from the system.`
    });
  };

  const openEditDialog = (student: any) => {
    setSelectedStudent({ ...student });
    setIsEditDialogOpen(true);
  };

  // Fixed: Added missing classes for gradient and colors
  const gradientClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600",
    success: "bg-green-100 text-green-800 border-green-200",
    info: "bg-blue-100 text-blue-800 border-blue-200", 
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    destructive: "text-red-600"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Student Management</h1>
            <p className="text-gray-600">Add, edit, and manage student records</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className={`${gradientClasses.primary} text-white hover:opacity-90`}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new student to the system
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-gray-600">Personal Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={newStudent.dateOfBirth}
                        onChange={(e) => setNewStudent({...newStudent, dateOfBirth: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="student@school.com"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={newStudent.phone}
                        onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select value={newStudent.bloodGroup} onValueChange={(value) => setNewStudent({...newStudent, bloodGroup: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter address"
                        value={newStudent.address}
                        onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-gray-600">Academic Information</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Class *</Label>
                      <Select value={newStudent.class} onValueChange={(value) => setNewStudent({...newStudent, class: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9-A">9-A</SelectItem>
                          <SelectItem value="9-B">9-B</SelectItem>
                          <SelectItem value="10-A">10-A</SelectItem>
                          <SelectItem value="10-B">10-B</SelectItem>
                          <SelectItem value="11-A">11-A</SelectItem>
                          <SelectItem value="11-B">11-B</SelectItem>
                          <SelectItem value="12-A">12-A</SelectItem>
                          <SelectItem value="12-B">12-B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rollNo">Roll Number *</Label>
                      <Input
                        id="rollNo"
                        placeholder="001"
                        value={newStudent.rollNo}
                        onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="section">Section *</Label>
                      <Select value={newStudent.section} onValueChange={(value) => setNewStudent({...newStudent, section: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admissionDate">Admission Date *</Label>
                    <Input
                      id="admissionDate"
                      type="date"
                      value={newStudent.admissionDate}
                      onChange={(e) => setNewStudent({...newStudent, admissionDate: e.target.value})}
                    />
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-gray-600">Parent/Guardian Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Parent Name *</Label>
                      <Input
                        id="parentName"
                        placeholder="Enter parent/guardian name"
                        value={newStudent.parentName}
                        onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="parentContact">Parent Contact *</Label>
                      <Input
                        id="parentContact"
                        placeholder="+91 98765 43211"
                        value={newStudent.parentContact}
                        onChange={(e) => setNewStudent({...newStudent, parentContact: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStudent} className={`${gradientClasses.primary} text-white hover:opacity-90`}>
                  Add Student
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{students.length}</p>
                <p className="text-xs text-gray-600">Total Students</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{students.filter(s => s.status === 'active').length}</p>
                <p className="text-xs text-gray-600">Active</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{students.filter(s => s.class.startsWith('12')).length}</p>
                <p className="text-xs text-gray-600">Class 12</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <p className="text-2xl font-bold">{students.filter(s => s.section === 'Science').length}</p>
                <p className="text-xs text-gray-600">Science Stream</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <CardDescription>View and manage all student records</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search by name, roll no, or student ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="12-A">12-A</SelectItem>
                  <SelectItem value="12-B">12-B</SelectItem>
                  <SelectItem value="11-A">11-A</SelectItem>
                  <SelectItem value="11-B">11-B</SelectItem>
                  <SelectItem value="10-A">10-A</SelectItem>
                  <SelectItem value="10-B">10-B</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterSection} onValueChange={setFilterSection}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>

            {/* Student Cards */}
            <div className="space-y-3">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-full ${gradientClasses.primary} text-white flex items-center justify-center font-bold flex-shrink-0`}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{student.name}</h3>
                            <Badge className={gradientClasses.success}>
                              {student.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>ID: {student.id}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>Class {student.class} • Roll {student.rollNo}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span className="truncate">{student.email}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>{student.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>DOB: {new Date(student.dateOfBirth).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => openEditDialog(student)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className={`w-4 h-4 ${gradientClasses.destructive}`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No students found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Student Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update student information
              </DialogDescription>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={selectedStudent.name}
                      onChange={(e) => setSelectedStudent({...selectedStudent, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={selectedStudent.email}
                      onChange={(e) => setSelectedStudent({...selectedStudent, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={selectedStudent.phone}
                      onChange={(e) => setSelectedStudent({...selectedStudent, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <Select value={selectedStudent.class} onValueChange={(value) => setSelectedStudent({...selectedStudent, class: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9-A">9-A</SelectItem>
                        <SelectItem value="10-A">10-A</SelectItem>
                        <SelectItem value="11-A">11-A</SelectItem>
                        <SelectItem value="12-A">12-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Parent Name</Label>
                    <Input
                      value={selectedStudent.parentName}
                      onChange={(e) => setSelectedStudent({...selectedStudent, parentName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Parent Contact</Label>
                    <Input
                      value={selectedStudent.parentContact}
                      onChange={(e) => setSelectedStudent({...selectedStudent, parentContact: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditStudent} className={`${gradientClasses.primary} text-white hover:opacity-90`}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default StudentManagement;
