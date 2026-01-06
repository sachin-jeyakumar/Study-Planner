import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { TopicNode } from "@/components/TopicNode";
import { StudyPlanCard } from "@/components/StudyPlanCard";
import { QuizInterface } from "@/components/QuizInterface";
import { ChatInterface } from "@/components/ChatInterface";
import { StatsCard } from "@/components/StatsCard";
import { FileUpload } from "@/components/FileUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  mockCourses, 
  mockStudyPlan, 
  mockQuiz, 
  mockUserProgress,
  mockChatHistory 
} from "@/data/mockData";
import { ArrowLeft, Sparkles } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);

  const handleGetStarted = () => {
    setCurrentView('dashboard');
  };

  const handleCourseClick = (course: typeof mockCourses[0]) => {
    setSelectedCourse(course);
    setCurrentView('roadmap');
  };

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-background">
        <Header currentView={currentView} onViewChange={setCurrentView} />
        <Hero onGetStarted={handleGetStarted} />
        
        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="accent" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by AI
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI analyzes your course materials and creates a personalized learning path
                that adapts to your progress and schedule.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Smart Roadmaps",
                  description: "AI generates week-by-week study plans based on your syllabus and available time",
                  icon: "🗺️",
                },
                {
                  title: "Adaptive Quizzes",
                  description: "Questions that adjust to your mastery level, focusing on weak areas",
                  icon: "🎯",
                },
                {
                  title: "RAG-Powered Q&A",
                  description: "Ask anything and get accurate answers with citations from your materials",
                  icon: "💬",
                },
              ].map((feature, index) => (
                <Card key={index} variant="interactive" className="text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <Card variant="hero" className="max-w-4xl mx-auto">
              <CardContent className="py-12 text-center">
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Ready to Transform Your Learning?
                </h2>
                <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                  Join thousands of students who've improved their grades with personalized AI guidance.
                </p>
                <Button 
                  variant="hero-outline" 
                  size="xl"
                  onClick={handleGetStarted}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="container py-8">
        {currentView === 'dashboard' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Welcome */}
              <div>
                <h2 className="font-display text-3xl font-bold mb-2">
                  Welcome back, Alex! 👋
                </h2>
                <p className="text-muted-foreground">
                  You're on a {mockUserProgress.currentStreak}-day streak! Keep up the great work.
                </p>
              </div>

              {/* File Upload */}
              <FileUpload />

              {/* Courses */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-semibold">Your Courses</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {mockCourses.map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={course}
                      onClick={() => handleCourseClick(course)}
                    />
                  ))}
                </div>
              </div>

              {/* Study Plan */}
              <StudyPlanCard plan={mockStudyPlan} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <StatsCard stats={mockUserProgress} />
              <ChatInterface initialMessages={mockChatHistory} />
            </div>
          </div>
        )}

        {currentView === 'courses' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-6">My Courses</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {mockCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  onClick={() => handleCourseClick(course)}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'roadmap' && (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => setCurrentView('courses')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>

            <Card variant="glass" className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{selectedCourse.icon}</span>
                  <div>
                    <Badge variant="secondary" className="mb-1">
                      {selectedCourse.code}
                    </Badge>
                    <CardTitle className="text-2xl">{selectedCourse.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      {selectedCourse.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <h3 className="font-display text-xl font-semibold mb-6">Learning Path</h3>
            <div className="space-y-0">
              {selectedCourse.topics.map((topic, index) => (
                <TopicNode
                  key={topic.id}
                  topic={topic}
                  index={index}
                  isLast={index === selectedCourse.topics.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'quiz' && (
          <div className="py-8">
            <QuizInterface quiz={mockQuiz} />
          </div>
        )}

        {currentView === 'chat' && (
          <div className="max-w-3xl mx-auto py-8">
            <ChatInterface initialMessages={mockChatHistory} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
