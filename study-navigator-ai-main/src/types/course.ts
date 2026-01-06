export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  color: string;
  icon: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  weeklyHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  nextDeadline?: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed' | 'mastered';
  masteryLevel: number;
  estimatedHours: number;
  resources: Resource[];
  prerequisites: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'slides' | 'notes' | 'quiz';
  url?: string;
  duration?: string;
}

export interface StudyPlan {
  id: string;
  courseId: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  goals: StudyGoal[];
  totalHours: number;
  completedHours: number;
}

export interface StudyGoal {
  id: string;
  topicId: string;
  topicName: string;
  targetMastery: number;
  currentMastery: number;
  hours: number;
  activities: Activity[];
  completed: boolean;
}

export interface Activity {
  id: string;
  type: 'read' | 'watch' | 'practice' | 'quiz' | 'review';
  title: string;
  duration: string;
  completed: boolean;
}

export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number;
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Source[];
}

export interface Source {
  title: string;
  page?: number;
  relevance: number;
}

export interface UserProgress {
  totalStudyHours: number;
  coursesEnrolled: number;
  quizzesCompleted: number;
  averageMastery: number;
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}
