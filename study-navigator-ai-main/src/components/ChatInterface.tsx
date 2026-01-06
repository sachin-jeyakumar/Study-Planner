import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types/course";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, BookOpen, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  initialMessages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
}

export function ChatInterface({ initialMessages = [], onSendMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    onSendMessage?.(input.trim());

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(input.trim()),
        timestamp: new Date(),
        sources: [
          { title: 'Chapter 5: Tree Fundamentals', page: 42, relevance: 0.92 },
          { title: 'Lecture 8 Slides', page: 15, relevance: 0.85 },
        ],
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Explain BST insertion step by step",
    "What's the difference between BFS and DFS?",
    "Quiz me on tree traversals",
    "Create a study plan for this week",
  ];

  return (
    <Card variant="glass" className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full accent-gradient flex items-center justify-center">
            <Bot className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Learning Copilot</h3>
            <p className="text-xs text-muted-foreground">Ask anything about your courses</p>
          </div>
          <Badge variant="success" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-accent" />
            </div>
            <h4 className="font-display font-semibold mb-2">How can I help you today?</h4>
            <p className="text-sm text-muted-foreground mb-6">
              I can explain concepts, create quizzes, or help plan your study schedule
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-slide-up",
              message.role === 'user' && "flex-row-reverse"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              message.role === 'user' 
                ? "bg-primary text-primary-foreground"
                : "accent-gradient text-accent-foreground"
            )}>
              {message.role === 'user' ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>
            
            <div className={cn(
              "max-w-[80%] rounded-2xl p-4",
              message.role === 'user' 
                ? "bg-primary text-primary-foreground rounded-tr-sm"
                : "bg-muted rounded-tl-sm"
            )}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    Sources
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {message.sources.map((source, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {source.title} {source.page && `(p.${source.page})`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full accent-gradient flex items-center justify-center">
              <Bot className="h-4 w-4 text-accent-foreground" />
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-accent" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your courses..."
              className="w-full resize-none rounded-xl border bg-background px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-accent min-h-[48px] max-h-32"
              rows={1}
            />
          </div>
          <Button 
            variant="hero" 
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="h-12 w-12"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function generateMockResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('bst') || lowerInput.includes('binary search tree')) {
    return `Great question about Binary Search Trees! 🌳

**BST Insertion Steps:**
1. Start at the root node
2. Compare the new value with current node
3. If smaller, go left; if larger, go right
4. Repeat until you find an empty spot
5. Insert the new node there

**Time Complexity:** O(log n) average, O(n) worst case

Would you like me to create a practice quiz on BST operations?`;
  }
  
  if (lowerInput.includes('quiz')) {
    return `I'd be happy to quiz you! 📝

Based on your current progress, I recommend focusing on:
- Tree traversal methods (you're at 45% mastery)
- BST operations (need more practice)

Ready to start? Click the "Take Quiz" button in your study plan, or I can ask you questions right here in chat!`;
  }
  
  if (lowerInput.includes('study plan') || lowerInput.includes('schedule')) {
    return `Here's my recommendation for your study plan this week: 📅

**Priority Focus:**
1. Complete the BST practice problems (2 hours)
2. Watch the heap operations video (30 min)
3. Take the Trees assessment quiz (20 min)

**Optimal Study Times:**
Based on your patterns, you learn best in 45-minute sessions with breaks.

Would you like me to adjust the plan based on your available time?`;
  }
  
  return `I understand you're asking about "${input}". 

Based on your course materials, here's what I found:

This topic relates to your current module on Trees & Binary Search Trees. The key concepts involve understanding hierarchical data structures and efficient search operations.

Would you like me to:
- Explain this concept in more detail?
- Create practice problems?
- Show related examples from your lectures?`;
}
