import { Topic } from "@/types/course";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle2, Circle, PlayCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicNodeProps {
  topic: Topic;
  index: number;
  isLast?: boolean;
  onClick?: () => void;
}

export function TopicNode({ topic, index, isLast, onClick }: TopicNodeProps) {
  const statusConfig = {
    locked: {
      icon: Lock,
      color: 'text-muted-foreground',
      bg: 'bg-muted',
      border: 'border-muted',
    },
    available: {
      icon: Circle,
      color: 'text-accent',
      bg: 'bg-accent/10',
      border: 'border-accent',
    },
    'in-progress': {
      icon: PlayCircle,
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning',
    },
    completed: {
      icon: CheckCircle2,
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success',
    },
    mastered: {
      icon: Star,
      color: 'text-accent',
      bg: 'accent-gradient',
      border: 'border-accent',
    },
  };

  const config = statusConfig[topic.status];
  const Icon = config.icon;
  const isClickable = topic.status !== 'locked';

  return (
    <div className="relative flex gap-4">
      {/* Timeline Line */}
      {!isLast && (
        <div 
          className={cn(
            "absolute left-[23px] top-[48px] w-0.5 h-[calc(100%-24px)]",
            topic.status === 'locked' ? 'bg-muted' : 'bg-accent/30'
          )}
        />
      )}

      {/* Node Circle */}
      <div
        className={cn(
          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
          config.border,
          config.bg,
          isClickable && "cursor-pointer hover:scale-110"
        )}
        onClick={isClickable ? onClick : undefined}
      >
        <Icon className={cn("h-6 w-6", config.color)} />
      </div>

      {/* Content */}
      <div 
        className={cn(
          "flex-1 pb-8 transition-opacity",
          topic.status === 'locked' && "opacity-50"
        )}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground font-medium">
                Module {index + 1}
              </span>
              <Badge 
                variant={topic.status === 'mastered' ? 'accent' : topic.status === 'completed' ? 'success' : 'secondary'}
                className="text-xs capitalize"
              >
                {topic.status.replace('-', ' ')}
              </Badge>
            </div>
            <h4 className={cn(
              "font-display font-semibold text-lg",
              isClickable && "hover:text-accent transition-colors cursor-pointer"
            )}>
              {topic.name}
            </h4>
          </div>
          {topic.masteryLevel > 0 && (
            <div className="text-right">
              <div className="text-2xl font-display font-bold text-foreground">
                {topic.masteryLevel}%
              </div>
              <div className="text-xs text-muted-foreground">mastery</div>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          {topic.description}
        </p>

        {topic.masteryLevel > 0 && (
          <Progress 
            value={topic.masteryLevel} 
            variant={topic.masteryLevel >= 80 ? 'success' : 'accent'}
            className="h-2"
          />
        )}

        <div className="mt-3 text-xs text-muted-foreground">
          Estimated: {topic.estimatedHours} hours
        </div>
      </div>
    </div>
  );
}
