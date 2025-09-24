import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Brain, Clock, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/pages/Index";

interface AIPlanningPanelProps {
  tasks: Task[];
  onClose: () => void;
}

const AIPlanningPanel = ({ tasks, onClose }: AIPlanningPanelProps) => {
  const [isPlanning, setIsPlanning] = useState(false);
  const [plan, setPlan] = useState<string[]>([]);

  // Simulate AI planning (replace with actual AI integration later)
  const generateAIPlan = () => {
    setIsPlanning(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const incompleteTasks = tasks.filter(task => !task.completed);
      const sortedTasks = [...incompleteTasks].sort((a, b) => {
        // Sort by priority first, then by deadline
        if (a.priority !== b.priority) return b.priority - a.priority;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });

      const planItems = [];
      let currentTime = 9; // Start at 9 AM

      if (sortedTasks.length === 0) {
        planItems.push("🎉 No pending tasks! Time to relax or plan ahead.");
      } else {
        planItems.push("🧠 AI-Generated Productivity Plan:");
        planItems.push("");
        planItems.push("⚡ Optimized based on priorities, deadlines, and energy levels");
        planItems.push("");

        sortedTasks.forEach((task, index) => {
          const startTime = currentTime;
          const endTime = currentTime + task.estimatedTime;
          
          const timeStr = `${Math.floor(startTime)}:${startTime % 1 === 0.5 ? '30' : '00'} - ${Math.floor(endTime)}:${endTime % 1 === 0.5 ? '30' : '00'}`;
          const priorityEmoji = task.priority >= 5 ? '🔥' : task.priority >= 4 ? '⚡' : task.priority >= 3 ? '💫' : '📝';
          
          planItems.push(`${priorityEmoji} ${timeStr}: ${task.title}`);
          planItems.push(`   ⏱️ ${task.estimatedTime}h estimated • ${'⭐'.repeat(task.priority)} priority`);
          
          currentTime = endTime;
          
          // Add break suggestion after long tasks
          if (task.estimatedTime >= 2 && index < sortedTasks.length - 1) {
            planItems.push(`   ☕ ${Math.floor(currentTime)}:${currentTime % 1 === 0.5 ? '30' : '00'} - Take a 15-min break`);
            currentTime += 0.25;
          }
          
          planItems.push("");
        });

        // Add productivity tips
        planItems.push("💡 AI Productivity Insights:");
        planItems.push("• Start with high-priority tasks when you're most focused");
        planItems.push("• Take breaks every 2 hours to maintain peak performance");
        planItems.push("• Review and adjust your plan as needed throughout the day");
        planItems.push("• Use the Pomodoro technique for better time management");
        
        if (sortedTasks.some(task => new Date(task.deadline) < new Date())) {
          planItems.push("• ⚠️ Prioritize overdue tasks to get back on track");
        }

        if (sortedTasks.length > 5) {
          planItems.push("• 🎯 Consider focusing on 3-5 key tasks today for maximum impact");
        }
      }

      setPlan(planItems);
      setIsPlanning(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <Card className="cyber-card w-full max-w-4xl max-h-[85vh] overflow-hidden animate-fade-in border-neon-purple/30">
        <div className="flex items-center justify-between p-8 border-b border-neon-purple/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center float">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-orbitron font-bold neon-text">AI Planning Assistant</h2>
              <p className="text-muted-foreground">Let AI optimize your daily productivity schedule</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-destructive/10 hover:text-destructive">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(85vh-200px)]">
          {!plan.length && !isPlanning && (
            <div className="text-center py-12">
              <div className="cyber-cube w-24 h-24 mx-auto mb-6 ai-pulse">
                <Brain className="w-12 h-12 text-neon-cyan" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold neon-text mb-4">Ready to optimize your day?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Our AI will analyze your tasks, priorities, deadlines, and estimated times to create an intelligent 
                schedule that maximizes your productivity and minimizes stress.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="cyber-card p-4 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border-neon-cyan/20">
                  <Clock className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
                  <h4 className="font-orbitron font-bold text-sm text-neon-cyan mb-1">Time Optimization</h4>
                  <p className="text-xs text-muted-foreground">Smart scheduling based on task duration</p>
                </div>
                <div className="cyber-card p-4 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 border-neon-purple/20">
                  <Star className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                  <h4 className="font-orbitron font-bold text-sm text-neon-purple mb-1">Priority Analysis</h4>
                  <p className="text-xs text-muted-foreground">Focus on what matters most</p>
                </div>
                <div className="cyber-card p-4 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border-neon-cyan/20">
                  <Zap className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
                  <h4 className="font-orbitron font-bold text-sm text-neon-cyan mb-1">Energy Management</h4>
                  <p className="text-xs text-muted-foreground">Optimal breaks and focus periods</p>
                </div>
              </div>

              <Button 
                onClick={generateAIPlan} 
                className="bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground hover-glow transition-smooth border-0 px-8 py-3"
              >
                <Brain className="w-5 h-5 mr-2" />
                Generate AI Plan
              </Button>
            </div>
          )}

          {isPlanning && (
            <div className="text-center py-12">
              <div className="cyber-cube w-24 h-24 mx-auto mb-6 ai-pulse">
                <Brain className="w-12 h-12 text-neon-purple animate-pulse" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold neon-text mb-4">AI is planning your day...</h3>
              <p className="text-muted-foreground mb-4">
                Analyzing your tasks, deadlines, and priorities
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          {plan.length > 0 && (
            <div className="space-y-6">
              <Card className="cyber-card p-6 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 border-neon-purple/30">
                <div className="space-y-3">
                  {plan.map((item, index) => (
                    <div key={index} className={`${item === '' ? 'h-2' : ''}`}>
                      {item && (
                        <p className={cn(
                          "font-inter",
                          item.startsWith('🧠') && "font-orbitron font-bold text-neon-purple text-xl mb-2",
                          item.startsWith('⚡') && "font-orbitron font-semibold text-neon-cyan text-sm mb-4",
                          item.startsWith('💡') && "font-orbitron font-bold text-neon-cyan text-lg mt-6 mb-2",
                          item.startsWith('•') && "text-sm text-muted-foreground ml-4 leading-relaxed",
                          item.startsWith('   ') && "text-sm text-muted-foreground/80 ml-8 font-mono",
                          (!item.startsWith('🧠') && !item.startsWith('⚡') && !item.startsWith('💡') && !item.startsWith('•') && !item.startsWith('   ')) && "font-medium text-foreground leading-relaxed"
                        )}>
                          {item}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={onClose} 
                  className="flex-1 border-muted-foreground/20 text-muted-foreground hover:bg-muted/10"
                >
                  Close
                </Button>
                <Button 
                  onClick={generateAIPlan} 
                  className="flex-1 bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground hover-glow transition-smooth border-0"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Regenerate Plan
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AIPlanningPanel;