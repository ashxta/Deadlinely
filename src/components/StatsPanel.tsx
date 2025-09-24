import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Target, TrendingUp, Zap } from "lucide-react";
import type { Task } from "@/pages/Index";

interface StatsPanelProps {
  totalTasks: number;
  completedTasks: number;
  tasks: Task[];
}

const StatsPanel = ({ totalTasks, completedTasks, tasks }: StatsPanelProps) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate overdue tasks
  const overdueTasks = tasks.filter(task => 
    !task.completed && new Date(task.deadline) < new Date()
  ).length;

  // Calculate today's tasks
  const todaysTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.deadline).toDateString();
    return taskDate === today && !task.completed;
  }).length;

  // Calculate total estimated time remaining
  const remainingTime = tasks
    .filter(task => !task.completed)
    .reduce((total, task) => total + task.estimatedTime, 0);

  const stats = [
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: CheckCircle,
      color: completionRate >= 80 ? "text-neon-cyan" : completionRate >= 60 ? "text-priority-medium" : "text-priority-urgent",
      bgGradient: completionRate >= 80 ? "from-neon-cyan/20 to-neon-purple/10" : completionRate >= 60 ? "from-priority-medium/20 to-priority-medium/10" : "from-priority-urgent/20 to-priority-urgent/10",
    },
    {
      title: "Due Today",
      value: todaysTasks,
      icon: Target,
      color: todaysTasks > 0 ? "text-priority-high" : "text-neon-cyan",
      bgGradient: todaysTasks > 0 ? "from-priority-high/20 to-priority-high/10" : "from-neon-cyan/20 to-neon-purple/10",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: Clock,
      color: overdueTasks > 0 ? "text-priority-urgent" : "text-neon-cyan",
      bgGradient: overdueTasks > 0 ? "from-priority-urgent/20 to-priority-urgent/10" : "from-neon-cyan/20 to-neon-purple/10",
    },
    {
      title: "Hours Left",
      value: `${remainingTime}h`,
      icon: Zap,
      color: "text-neon-purple",
      bgGradient: "from-neon-purple/20 to-neon-cyan/10",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-orbitron font-bold neon-text mb-1">Productivity Stats</h2>
        <p className="text-muted-foreground text-sm">Performance metrics & insights</p>
      </div>
      
      {stats.map((stat, index) => (
        <Card key={index} className={`cyber-card p-5 hover-glow transition-smooth bg-gradient-to-br ${stat.bgGradient} border-${stat.color.replace('text-', '')}/30`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-inter uppercase tracking-wider mb-1">{stat.title}</p>
              <p className={`text-3xl font-orbitron font-bold ${stat.color} [text-shadow:0_0_10px_currentColor]`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl cyber-card flex items-center justify-center float`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}

      {/* AI Insights Panel */}
      <Card className="cyber-card p-6 mt-8 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 border-neon-purple/30">
        <h3 className="font-orbitron font-bold text-neon-purple mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          AI Insights
        </h3>
        <div className="space-y-3 text-sm">
          {completionRate >= 80 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
              <span className="text-lg">🎉</span>
              <p className="text-neon-cyan font-medium">Excellent work! You're crushing your goals.</p>
            </div>
          )}
          {overdueTasks > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-priority-urgent/10 border border-priority-urgent/30">
              <span className="text-lg">⚠️</span>
              <p className="text-priority-urgent font-medium">You have {overdueTasks} overdue task{overdueTasks > 1 ? 's' : ''}.</p>
            </div>
          )}
          {todaysTasks > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-priority-high/10 border border-priority-high/30">
              <span className="text-lg">🎯</span>
              <p className="text-priority-high font-medium">Focus on {todaysTasks} task{todaysTasks > 1 ? 's' : ''} due today.</p>
            </div>
          )}
          {remainingTime > 8 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-priority-medium/10 border border-priority-medium/30">
              <span className="text-lg">💡</span>
              <p className="text-priority-medium font-medium">Consider breaking down large tasks into smaller chunks.</p>
            </div>
          )}
          {totalTasks === 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
              <span className="text-lg">📝</span>
              <p className="text-neon-cyan font-medium">Start by adding your first task to track your productivity!</p>
            </div>
          )}
          {totalTasks > 0 && completionRate < 80 && overdueTasks === 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-neon-purple/10 border border-neon-purple/30">
              <span className="text-lg">🚀</span>
              <p className="text-neon-purple font-medium">You're on track! Keep the momentum going.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StatsPanel;