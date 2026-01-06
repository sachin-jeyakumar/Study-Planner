import { StudyPlan, StudyGoal } from "@/types/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Target, BookOpen, Video, Code, HelpCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyPlanCardProps {
  plan: StudyPlan;
  onActivityToggle?: (goalId: string, activityId: string) => void;
}

const activityIcons = {
  read: BookOpen,
  watch: Video,
  practice: Code,
  quiz: HelpCircle,
  review: RotateCcw,
};

export function StudyPlanCard({ plan, onActivityToggle }: StudyPlanCardProps) {
  const progressPercent = (plan.completedHours / plan.totalHours) * 100;

  return (
    <Card variant="glass" className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="accent" className="mb-2">
              Week {plan.weekNumber}
            </Badge>
            <CardTitle className="text-xl">Weekly Study Plan</CardTitle>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-foreground">
              {plan.completedHours}/{plan.totalHours}
            </div>
            <div className="text-sm text-muted-foreground">hours completed</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(plan.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
              {new Date(plan.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        <Progress value={progressPercent} variant="accent" className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {plan.goals.map((goal) => (
          <GoalSection 
            key={goal.id} 
            goal={goal} 
            onActivityToggle={(activityId) => onActivityToggle?.(goal.id, activityId)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function GoalSection({ 
  goal, 
  onActivityToggle 
}: { 
  goal: StudyGoal; 
  onActivityToggle?: (activityId: string) => void;
}) {
  const completedActivities = goal.activities.filter(a => a.completed).length;
  const totalActivities = goal.activities.length;

  return (
    <div className="rounded-lg border bg-card/50 p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-4 w-4 text-accent" />
            <span className="font-medium">{goal.topicName}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Target: {goal.targetMastery}% mastery • {goal.hours} hours allocated
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">
            {completedActivities}/{totalActivities}
          </div>
          <div className="text-xs text-muted-foreground">tasks</div>
        </div>
      </div>

      <div className="space-y-2">
        {goal.activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          return (
            <div
              key={activity.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all",
                activity.completed 
                  ? "bg-success/5 border-success/20" 
                  : "bg-background hover:bg-muted/50"
              )}
            >
              <Checkbox
                checked={activity.completed}
                onCheckedChange={() => onActivityToggle?.(activity.id)}
                className="data-[state=checked]:bg-success data-[state=checked]:border-success"
              />
              <Icon className={cn(
                "h-4 w-4",
                activity.completed ? "text-success" : "text-muted-foreground"
              )} />
              <span className={cn(
                "flex-1 text-sm",
                activity.completed && "line-through text-muted-foreground"
              )}>
                {activity.title}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {activity.duration}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Current mastery:</span>
          <Progress value={goal.currentMastery} variant="accent" className="w-24 h-2" />
          <span className="text-sm font-medium">{goal.currentMastery}%</span>
        </div>
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
}
