import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Star, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/pages/Index";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  onClose: () => void;
}

const TaskForm = ({ onSubmit, onClose }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(1);
  const [priority, setPriority] = useState<1 | 2 | 3 | 4 | 5>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    onSubmit({
      title: title.trim(),
      deadline,
      estimatedTime,
      priority,
    });
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  const getPriorityLabel = (priority: number) => {
    switch(priority) {
      case 1: return "Very Low";
      case 2: return "Low";
      case 3: return "Medium";
      case 4: return "High";
      case 5: return "Urgent";
      default: return "Medium";
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 5) return "text-priority-urgent";
    if (priority >= 4) return "text-priority-high";
    if (priority >= 3) return "text-priority-medium";
    return "text-priority-low";
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <Card className="cyber-card w-full max-w-lg p-8 animate-fade-in border-neon-cyan/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-orbitron font-bold neon-text">Create New Task</h2>
            <p className="text-muted-foreground text-sm mt-1">Add a task to your productivity pipeline</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-destructive/10 hover:text-destructive">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-inter font-semibold text-foreground">
              Task Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be accomplished?"
              className="cyber-card border-neon-cyan/20 bg-transparent text-foreground placeholder:text-muted-foreground focus:border-neon-cyan focus:ring-neon-cyan/20"
              required
            />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-sm font-inter font-semibold text-foreground">
              Deadline
            </Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={today}
              className="cyber-card border-neon-cyan/20 bg-transparent text-foreground focus:border-neon-cyan focus:ring-neon-cyan/20"
              required
            />
          </div>

          {/* Estimated Time */}
          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-inter font-semibold text-foreground">
              Estimated Time (hours)
            </Label>
            <Input
              id="time"
              type="number"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(Math.max(0.5, parseFloat(e.target.value) || 1))}
              min="0.5"
              step="0.5"
              className="cyber-card border-neon-cyan/20 bg-transparent text-foreground focus:border-neon-cyan focus:ring-neon-cyan/20"
              required
            />
          </div>

          {/* Priority Selector */}
          <div className="space-y-4">
            <Label className="text-sm font-inter font-semibold text-foreground">
              Priority Level
            </Label>
            <div className="cyber-card p-4 border-neon-purple/20 bg-gradient-to-br from-neon-purple/5 to-neon-cyan/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }, (_, i) => {
                    const starValue = (i + 1) as 1 | 2 | 3 | 4 | 5;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPriority(starValue)}
                        className={cn(
                          "transition-all duration-200 hover:scale-110 focus:outline-none",
                          starValue <= priority ? getPriorityColor(starValue) : "text-muted-foreground/40"
                        )}
                      >
                        <Star 
                          className={cn(
                            "w-7 h-7",
                            starValue <= priority && "fill-current [filter:drop-shadow(0_0_4px_currentColor)]"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-sm font-orbitron font-bold",
                    getPriorityColor(priority)
                  )}>
                    {getPriorityLabel(priority)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Priority Level {priority}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 border-muted-foreground/20 text-muted-foreground hover:bg-muted/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground hover-glow transition-smooth border-0 disabled:opacity-50"
              disabled={!title.trim() || !deadline}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TaskForm;