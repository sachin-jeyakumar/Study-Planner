import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Bell, 
  Settings, 
  Search,
  Plus,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'courses', label: 'Courses' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'chat', label: 'AI Chat' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center shadow-glow">
            <GraduationCap className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">LearnPilot</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Your AI Study Companion</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewChange(item.id)}
              className={cn(
                "font-medium",
                currentView === item.id && "bg-secondary"
              )}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
              3
            </span>
          </Button>

          <Button variant="hero" size="sm" className="hidden sm:flex">
            <Plus className="h-4 w-4 mr-1" />
            Add Course
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
