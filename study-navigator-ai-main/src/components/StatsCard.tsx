import { UserProgress } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, BookOpen, Target, Clock, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  stats: UserProgress;
}

export function StatsCard({ stats }: StatsCardProps) {
  const weeklyProgressPercent = (stats.weeklyProgress / stats.weeklyGoal) * 100;

  const statItems = [
    {
      icon: Clock,
      label: "Total Study Hours",
      value: stats.totalStudyHours,
      suffix: "hrs",
      color: "text-accent",
    },
    {
      icon: BookOpen,
      label: "Courses Enrolled",
      value: stats.coursesEnrolled,
      color: "text-success",
    },
    {
      icon: Target,
      label: "Quizzes Completed",
      value: stats.quizzesCompleted,
      color: "text-warning",
    },
    {
      icon: Trophy,
      label: "Average Mastery",
      value: stats.averageMastery,
      suffix: "%",
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Streak Card */}
      <Card variant="hero" className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-6 w-6 text-accent animate-bounce-subtle" />
                <span className="text-primary-foreground/80 text-sm">Current Streak</span>
              </div>
              <div className="font-display text-4xl font-bold">
                {stats.currentStreak} days
              </div>
              <p className="text-sm text-primary-foreground/60 mt-1">
                Longest: {stats.longestStreak} days
              </p>
            </div>
            <div className="text-right">
              <Zap className="h-16 w-16 text-primary-foreground/20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card variant="glass">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Weekly Goal</span>
            <span className="text-sm text-muted-foreground">
              {stats.weeklyProgress}/{stats.weeklyGoal} hours
            </span>
          </div>
          <Progress value={weeklyProgressPercent} variant="accent" className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {stats.weeklyGoal - stats.weeklyProgress} hours remaining this week
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item, index) => (
          <Card key={index} variant="glass">
            <CardContent className="p-4">
              <item.icon className={cn("h-5 w-5 mb-2", item.color)} />
              <div className="font-display text-2xl font-bold">
                {item.value}{item.suffix}
              </div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
