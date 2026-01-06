import { Course } from "@/types/course";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ProgressRing";
import { Clock, BookOpen, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'destructive',
  } as const;

  return (
    <Card
      variant="interactive"
      className={cn("group overflow-hidden")}
      onClick={onClick}
    >
      {/* Gradient Header */}
      <div className={cn("h-2 bg-gradient-to-r", course.color)} />
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{course.icon}</span>
            <div>
              <Badge variant="secondary" className="mb-1 text-xs">
                {course.code}
              </Badge>
              <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-accent transition-colors">
                {course.name}
              </h3>
            </div>
          </div>
          <ProgressRing 
            progress={course.progress} 
            size={64} 
            strokeWidth={5}
            showPercentage={true}
            color={course.progress >= 80 ? 'success' : 'accent'}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>{course.completedTopics}/{course.totalTopics} topics</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{course.weeklyHours}h/week</span>
          </div>
        </div>

        {course.nextDeadline && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Next deadline:</span>
            <span className="font-medium text-foreground">
              {new Date(course.nextDeadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <Badge variant={difficultyColors[course.difficulty]}>
            {course.difficulty}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Click to view roadmap →
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
