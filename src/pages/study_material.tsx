import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Video, FileText, ExternalLink, Search,
  TrendingDown, AlertCircle, CheckCircle2, Clock,
  Bookmark, BookmarkCheck, Play, Download, Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { studyMaterialAPI } from '@/lib/api'; // Import API

// Types for backend API integration
interface WeakSubject {
  subjectId: string;
  subjectName: string;
  averageScore: number;
  classAverage: number;
  trend: 'improving' | 'declining' | 'stable';
  lastExamScore: number;
  weakTopics: string[];
}

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'article' | 'practice';
  url: string;
  duration?: string; // for videos
  pages?: number; // for PDFs
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  views: number;
  isBookmarked: boolean;
  thumbnailUrl?: string;
  subjectId: string;
  topicsCovered: string[];
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const StudyMaterialRecommendation = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  // Mock data - Replace with API calls
  const [weakSubjects, setWeakSubjects] = useState<WeakSubject[]>([
    {
      subjectId: 'math',
      subjectName: 'Mathematics',
      averageScore: 68,
      classAverage: 82,
      trend: 'declining',
      lastExamScore: 65,
      weakTopics: ['Calculus', 'Trigonometry', 'Algebra']
    },
    {
      subjectId: 'physics',
      subjectName: 'Physics',
      averageScore: 72,
      classAverage: 80,
      trend: 'stable',
      lastExamScore: 72,
      weakTopics: ['Electromagnetism', 'Optics']
    },
    {
      subjectId: 'english',
      subjectName: 'English',
      averageScore: 75,
      classAverage: 81,
      trend: 'improving',
      lastExamScore: 78,
      weakTopics: ['Essay Writing', 'Grammar']
    }
  ]);

  const [recommendedMaterials, setRecommendedMaterials] = useState<StudyMaterial[]>([
    {
      id: 'mat1',
      title: 'Complete Calculus Masterclass',
      description: 'Learn calculus from basics to advanced concepts with practical examples and problem-solving techniques.',
      type: 'video',
      url: 'https://youtube.com/watch?v=example1',
      duration: '2h 30m',
      difficulty: 'intermediate',
      rating: 4.8,
      views: 125000,
      isBookmarked: false,
      thumbnailUrl: 'https://placehold.co/400x225/3b82f6/ffffff?text=Calculus+Video',
      subjectId: 'math',
      topicsCovered: ['Differentiation', 'Integration', 'Limits']
    },
    {
      id: 'mat2',
      title: 'Trigonometry Problem Solving Guide',
      description: 'Comprehensive PDF guide with 200+ solved problems and practice questions.',
      type: 'pdf',
      url: 'https://example.com/trig-guide.pdf',
      pages: 150,
      difficulty: 'beginner',
      rating: 4.5,
      views: 89000,
      isBookmarked: true,
      subjectId: 'math',
      topicsCovered: ['Sin, Cos, Tan', 'Identities', 'Equations']
    },
    {
      id: 'phy1',
      title: 'Electromagnetism Explained Simply',
      description: 'Interactive video lectures explaining electromagnetic concepts with animations.',
      type: 'video',
      url: 'https://youtube.com/watch?v=example2',
      duration: '1h 45m',
      difficulty: 'intermediate',
      rating: 4.7,
      views: 95000,
      isBookmarked: false,
      thumbnailUrl: 'https://placehold.co/400x225/8b5cf6/ffffff?text=Physics+Video',
      subjectId: 'physics',
      topicsCovered: ['Electric Fields', 'Magnetic Fields', 'Induction']
    },
    {
      id: 'eng1',
      title: 'Essay Writing Masterclass',
      description: 'Learn to write compelling essays with proper structure, arguments, and examples.',
      type: 'article',
      url: 'https://example.com/essay-guide',
      difficulty: 'beginner',
      rating: 4.6,
      views: 67000,
      isBookmarked: false,
      subjectId: 'english',
      topicsCovered: ['Structure', 'Arguments', 'Examples']
    },
    {
      id: 'mat3',
      title: 'Algebra Practice Problems',
      description: '500+ practice problems with detailed solutions for mastering algebra.',
      type: 'practice',
      url: 'https://example.com/algebra-practice',
      difficulty: 'intermediate',
      rating: 4.4,
      views: 54000,
      isBookmarked: true,
      subjectId: 'math',
      topicsCovered: ['Equations', 'Polynomials', 'Factoring']
    }
  ]);

  // API call functions (ready for backend integration)
const fetchWeakSubjects = async (studentId: number) => {
  setIsLoading(true);
  try {
    const response = await studyMaterialAPI.getWeakSubjects(studentId);
    if (response.success) {
      setWeakSubjects(response.data);
    }
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error.message || 'Failed to load weak subjects',
      variant: 'destructive'
    });
  } finally {
    setIsLoading(false);
  }
};

const fetchRecommendedMaterials = async (studentId: number, subjectId?: number) => {
  setIsLoading(true);
  try {
    const response = await studyMaterialAPI.getRecommendations(studentId, subjectId);
    if (response.success) {
      setRecommendedMaterials(response.data);
    }
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error.message || 'Failed to load study materials',
      variant: 'destructive'
    });
  } finally {
    setIsLoading(false);
  }
};


  const toggleBookmark = async (materialId: string) => {
    try {
      const material = recommendedMaterials.find(m => m.id === materialId);
      if (!material) return;

      // TODO: Replace with actual API call
      // const response = await fetch(`/api/study-materials/${materialId}/bookmark`, {
      //   method: material.isBookmarked ? 'DELETE' : 'POST',
      // });
      // const data: ApiResponse<boolean> = await response.json();
      
      // Optimistic update
      setRecommendedMaterials(prev =>
        prev.map(m => m.id === materialId ? { ...m, isBookmarked: !m.isBookmarked } : m)
      );

      toast({
        title: material.isBookmarked ? 'Bookmark removed' : 'Bookmark added',
        description: material.isBookmarked 
          ? 'Material removed from your bookmarks' 
          : 'Material saved to your bookmarks'
      });
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to update bookmark',
        variant: 'destructive'
      });
    }
  };

  const trackMaterialView = async (materialId: string) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/study-materials/${materialId}/view`, {
      //   method: 'POST',
      // });
      console.log('Material viewed:', materialId);
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

useEffect(() => {
  const studentId = localStorage.getItem('userId');
  if (studentId) {
    fetchWeakSubjects(Number(studentId));
  }
}, []);


  // Filter materials
  const filteredMaterials = recommendedMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || material.subjectId === selectedSubject;
    const matchesType = filterType === 'all' || material.type === filterType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'practice': return <CheckCircle2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-600 border-red-200';
      case 'pdf': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'article': return 'bg-green-100 text-green-600 border-green-200';
      case 'practice': return 'bg-purple-100 text-purple-600 border-purple-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-600 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-blue-100 text-blue-600 border-blue-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingDown className="w-5 h-5 text-green-600 rotate-180" />;
      case 'declining': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <TrendingDown className="w-5 h-5 text-yellow-600 rotate-90" />;
    }
  };

  // Fixed: Added gradient classes
  const gradientClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Study Material Recommendations</h1>
          <p className="text-gray-600">
            Personalized learning resources based on your performance
          </p>
        </div>

        {/* Weak Subjects Overview */}
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <CardTitle>Subjects Needing Attention</CardTitle>
            </div>
            <CardDescription>
              Focus on these areas to improve your overall performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {weakSubjects.map((subject) => (
                <Card 
                  key={subject.subjectId}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedSubject === subject.subjectId ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => {
  const studentId = Number(localStorage.getItem('userId'));
  if (!studentId) {
    toast({
      title: 'Error',
      description: 'Student ID not found. Please log in again.',
      variant: 'destructive'
    });
    return;
  }

  // Toggle selection
  const newSelected = selectedSubject === subject.subjectId ? null : subject.subjectId;
  setSelectedSubject(newSelected);

  // Fetch only when a subject is selected
  if (newSelected) {
    fetchRecommendedMaterials(studentId, Number(subject.subjectId));
  }
}}

                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{subject.subjectName}</h3>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(subject.trend)}
                          <span className="text-sm text-gray-600 capitalize">
                            {subject.trend}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-600">
                          {subject.averageScore}%
                        </div>
                        <div className="text-xs text-gray-600">
                          vs {subject.classAverage}%
                        </div>
                      </div>
                    </div>

                    <Progress 
                      value={subject.averageScore} 
                      className="h-2 mb-3"
                    />

                    <div>
                      <p className="text-xs text-gray-600 mb-2">Weak Topics:</p>
                      <div className="flex flex-wrap gap-1">
                        {subject.weakTopics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-gray-100">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search study materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
              className={filterType === 'all' ? gradientClasses.primary : ''}
            >
              All
            </Button>
            <Button
              variant={filterType === 'video' ? 'default' : 'outline'}
              onClick={() => setFilterType('video')}
              className={filterType === 'video' ? gradientClasses.primary : ''}
            >
              <Video className="w-4 h-4 mr-2" />
              Videos
            </Button>
            <Button
              variant={filterType === 'pdf' ? 'default' : 'outline'}
              onClick={() => setFilterType('pdf')}
              className={filterType === 'pdf' ? gradientClasses.primary : ''}
            >
              <FileText className="w-4 h-4 mr-2" />
              PDFs
            </Button>
            <Button
              variant={filterType === 'article' ? 'default' : 'outline'}
              onClick={() => setFilterType('article')}
              className={filterType === 'article' ? gradientClasses.primary : ''}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Articles
            </Button>
          </div>
        </div>

        {/* Study Materials Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {selectedSubject 
                ? `${weakSubjects.find(s => s.subjectId === selectedSubject)?.subjectName} Materials`
                : 'Recommended Materials'
              }
            </h2>
            <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200">
              {filteredMaterials.length} materials found
            </Badge>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400 animate-spin" />
              <p className="text-gray-600">Loading materials...</p>
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No materials found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow group">
                  <CardContent className="p-0">
                    {/* Thumbnail for videos */}
                    {material.type === 'video' && material.thumbnailUrl && (
                      <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                        <img 
                          src={material.thumbnailUrl} 
                          alt={material.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        {material.duration && (
                          <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
                            {material.duration}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold line-clamp-2 flex-1">
                          {material.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0"
                          onClick={() => toggleBookmark(material.id)}
                        >
                          {material.isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-blue-600 fill-blue-600" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {material.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={getTypeColor(material.type)}>
                          {getTypeIcon(material.type)}
                          <span className="ml-1 capitalize">{material.type}</span>
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(material.difficulty)}>
                          {material.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{material.rating}</span>
                        </div>
                        <div>{(material.views / 1000).toFixed(1)}K views</div>
                        {material.pages && <div>{material.pages} pages</div>}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {material.topicsCovered.slice(0, 3).map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-gray-100">
                            {topic}
                          </Badge>
                        ))}
                        {material.topicsCovered.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-100">
                            +{material.topicsCovered.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <Button 
                        className={`w-full ${gradientClasses.primary} hover:opacity-90`}
                        onClick={() => {
                          trackMaterialView(material.id);
                          window.open(material.url, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {material.type === 'video' ? 'Watch Now' : 
                         material.type === 'pdf' ? 'Download PDF' :
                         material.type === 'practice' ? 'Start Practice' :
                         'Read Article'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Bookmarked Materials Section */}
        {recommendedMaterials.some(m => m.isBookmarked) && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-blue-600" />
                <CardTitle>Your Bookmarks</CardTitle>
              </div>
              <CardDescription>
                Materials you've saved for later
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendedMaterials
                  .filter(m => m.isBookmarked)
                  .map((material) => (
                    <div 
                      key={material.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(material.type)}`}>
                          {getTypeIcon(material.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{material.title}</h4>
                          <p className="text-sm text-gray-600">
                            {weakSubjects.find(s => s.subjectId === material.subjectId)?.subjectName}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          trackMaterialView(material.id);
                          window.open(material.url, '_blank');
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudyMaterialRecommendation;