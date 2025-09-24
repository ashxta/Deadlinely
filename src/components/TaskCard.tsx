import { Check, Clock, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Task } from "@/pages/Index";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  const getPriorityClass = (priority: number, completed: boolean) => {
    if (completed) return "task-completed";
    if (priority >= 5) return "task-urgent";
    if (priority >= 4) return "task-high";
    if (priority >= 3) return "task-medium";
    return "task-low";
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 5) return "text-priority-urgent";
    if (priority >= 4) return "text-priority-high";
    if (priority >= 3) return "text-priority-medium";
    return "text-priority-low";
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  const isOverdue = new Date(task.deadline) < new Date() && !task.completed;

  return (
    <Card 
      className={cn(
        "group cyber-card p-5 transition-smooth hover:scale-[1.02] hover-glow",
        getPriorityClass(task.priority, task.completed),
        task.completed && "opacity-70"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Futuristic Completion Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggle(task.id)}
          className={cn(
            "w-8 h-8 rounded-xl p-0 transition-smooth border-2 relative overflow-hidden",
            task.completed 
              ? "bg-gradient-to-br from-neon-cyan to-neon-purple border-neon-cyan text-primary-foreground" 
              : "border-muted-foreground hover:border-neon-cyan hover:bg-neon-cyan/10"
          )}
        >
          {task.completed && (
            <>
              <Check className="w-4 h-4 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 animate-pulse"></div>
            </>
          )}
        </Button>

        {/* Task Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className={cn(
              "font-inter font-semibold text-lg transition-smooth",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="text-muted-foreground hover:text-destructive transition-smooth opacity-0 group-hover:opacity-100 hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Enhanced Task Meta Information */}
          <div className="flex items-center gap-6 text-sm">
            {/* Priority Stars with neon glow */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4 transition-smooth",
                    i < task.priority 
                      ? `${getPriorityColor(task.priority)} fill-current drop-shadow-[0_0_4px_currentColor]` 
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            {/* Estimated Time with icon */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{task.estimatedTime}h</span>
            </div>

            {/* Deadline with status styling */}
            <div className={cn(
              "font-mono font-semibold px-3 py-1 rounded-full text-xs border",
              isOverdue && "text-priority-urgent border-priority-urgent/30 bg-priority-urgent/10",
              formatDeadline(task.deadline) === "Today" && "text-priority-high border-priority-high/30 bg-priority-high/10",
              !isOverdue && formatDeadline(task.deadline) !== "Today" && "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10"
            )}>
              {formatDeadline(task.deadline)}
            </div>
          </div>

          {/* Progress indicator for visual appeal */}
          <div className="w-full h-1 bg-muted/20 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500 rounded-full",
                task.completed 
                  ? "w-full bg-gradient-to-r from-neon-cyan to-neon-purple" 
                  : "w-0 bg-gradient-to-r from-neon-cyan to-neon-purple"
              )}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;