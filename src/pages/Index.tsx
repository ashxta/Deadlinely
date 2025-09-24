import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Brain, Target } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import StatsPanel from "@/components/StatsPanel";
import AIPlanningPanel from "@/components/AIPlanningPanel";
import ParticleBackground from "@/components/ParticleBackground";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  title: string;
  deadline: string;
  estimatedTime: number;
  priority: 1 | 2 | 3 | 4 | 5;
  completed: boolean;
  createdAt: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showAIPlanning, setShowAIPlanning] = useState(false);
  const { toast } = useToast();

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('deadlinely-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('deadlinely-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    setShowTaskForm(false);
    toast({
      title: "Task added successfully!",
      description: `"${taskData.title}" has been added to your list.`,
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
    });
  };

  // Sort tasks by priority and completion status
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.priority - a.priority;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <>
      <ParticleBackground />
      <main className="min-h-screen">
        {/* Futuristic Header */}
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-6xl mx-auto px-6">
          <div className="cyber-card rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-orbitron font-bold neon-text">
                  DEADLINELY
                </h1>
                <p className="text-xs text-muted-foreground font-inter">AI-Powered Productivity • Task Management • ML</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIPlanning(true)}
                className="hover-glow transition-smooth border-neon-cyan/20 text-neon-cyan"
              >
                <Brain className="w-4 h-4 mr-2" />
                Plan My Day
              </Button>
              <Button
                onClick={() => setShowTaskForm(true)}
                className="bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground hover-glow transition-smooth border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </header>

        <div className="pt-32 px-6 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section with Visual Elements */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Quick Actions and Productivity Score */}
              <div className="lg:col-span-1 space-y-4">
                <Card className="cyber-card p-6 hover-glow transition-smooth">
                  <h3 className="text-lg font-orbitron font-bold neon-text mb-3">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowTaskForm(true)}
                      className="w-full bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30 text-neon-cyan hover-glow transition-smooth"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Task
                    </Button>
                    <Button 
                      onClick={() => setShowAIPlanning(true)}
                      className="w-full bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border border-neon-purple/30 text-neon-purple hover-glow transition-smooth"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      AI Planning
                    </Button>
                  </div>
                </Card>

                <Card className="cyber-card p-6">
                  <h4 className="font-orbitron font-bold text-neon-cyan mb-2">Productivity Score</h4>
                  <div className="text-3xl font-orbitron font-bold neon-text">
                    {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Tasks completed</p>
                </Card>
              </div>
              
              {/* Stats Panel */}
              <div className="lg:col-span-1">
                <StatsPanel 
                  totalTasks={totalTasks}
                  completedTasks={completedTasks}
                  tasks={tasks}
                />
              </div>

              {/* Visual Stage */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <div className="relative w-full h-80 cyber-card rounded-2xl flex items-center justify-center overflow-visible">
                  {/* Floating cubes with neon effects */}
                  <div className="absolute top-8 left-8 cyber-cube w-16 h-16 float" style={{ animationDelay: '0s' }}>
                    <i className="fas fa-database text-neon-cyan text-xl"></i>
                  </div>
                  <div className="absolute top-16 right-8 cyber-cube w-20 h-20 float" style={{ animationDelay: '1s' }}>
                    <i className="fas fa-chart-line text-neon-cyan text-2xl"></i>
                  </div>
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cyber-cube w-14 h-14 float" style={{ animationDelay: '2s' }}>
                    <i className="fas fa-robot text-neon-purple text-lg"></i>
                  </div>
                  
                  {/* Animated spark */}
                  <div className="spark absolute bottom-8 left-16 animate-spark-slide"></div>
                </div>
              </div>
            </section>

            {/* Tasks Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-orbitron font-bold neon-text">Active Tasks</h2>
                  <p className="text-muted-foreground">Manage your productivity pipeline</p>
                </div>
                <div className="text-sm text-muted-foreground bg-card/30 px-4 py-2 rounded-full border border-neon-cyan/20">
                  {completedTasks}/{totalTasks} completed
                </div>
              </div>

              <Card className="cyber-card p-6">
                {tasks.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="cyber-cube w-24 h-24 mx-auto mb-6 float">
                      <Target className="w-12 h-12 text-neon-cyan" />
                    </div>
                    <h3 className="text-2xl font-orbitron font-bold neon-text mb-3">No Tasks Yet</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Create your first task to start your productivity journey with AI-powered planning and insights.
                    </p>
                    <Button 
                      onClick={() => setShowTaskForm(true)}
                      className="bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground hover-glow transition-smooth border-0"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Task
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                      />
                    ))}
                  </div>
                )}
              </Card>
            </section>
          </div>
        </div>

        {/* Task Creation Form Modal */}
        {showTaskForm && (
          <TaskForm
            onSubmit={addTask}
            onClose={() => setShowTaskForm(false)}
          />
        )}

        {/* AI Planning Modal */}
        {showAIPlanning && (
          <AIPlanningPanel
            tasks={tasks}
            onClose={() => setShowAIPlanning(false)}
          />
        )}
      </main>
    </>
  );
};

export default Index;
