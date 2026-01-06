import { useState } from "react";
import { Quiz, QuizQuestion } from "@/types/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Clock, Brain, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizInterfaceProps {
  quiz: Quiz;
  onComplete?: (score: number) => void;
}

export function QuizInterface({ quiz, onComplete }: QuizInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const correctCount = answers.reduce((count, answer, index) => {
        return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
      }, selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      
      const score = Math.round((correctCount / quiz.questions.length) * 100);
      setIsComplete(true);
      onComplete?.(score);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers(new Array(quiz.questions.length).fill(null));
    setIsComplete(false);
  };

  if (isComplete) {
    const correctCount = answers.reduce((count, answer, index) => {
      return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <Card variant="glass" className="max-w-2xl mx-auto">
        <CardContent className="pt-8 text-center">
          <div className={cn(
            "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
            passed ? "bg-success/10" : "bg-destructive/10"
          )}>
            {passed ? (
              <CheckCircle2 className="h-12 w-12 text-success" />
            ) : (
              <XCircle className="h-12 w-12 text-destructive" />
            )}
          </div>
          
          <h2 className="font-display text-3xl font-bold mb-2">
            {passed ? "Congratulations!" : "Keep Practicing!"}
          </h2>
          <p className="text-muted-foreground mb-6">
            You scored {score}% ({correctCount}/{quiz.questions.length} correct)
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant={passed ? "success" : "destructive"} className="text-lg px-4 py-2">
              {passed ? "PASSED" : "NEEDS REVIEW"}
            </Badge>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleRestart}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button variant="hero">
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="accent">
            <Brain className="h-3 w-3 mr-1" />
            {quiz.title}
          </Badge>
          {quiz.timeLimit && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {quiz.timeLimit} min
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Progress value={progress} variant="accent" className="flex-1" />
          <span className="text-sm font-medium">
            {currentIndex + 1}/{quiz.questions.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <Badge 
            variant={
              currentQuestion.difficulty === 'easy' ? 'success' : 
              currentQuestion.difficulty === 'medium' ? 'warning' : 'destructive'
            }
            className="mb-3"
          >
            {currentQuestion.difficulty}
          </Badge>
          <h3 className="font-display text-xl font-semibold">
            {currentQuestion.question}
          </h3>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showResult = showExplanation;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showExplanation}
                className={cn(
                  "w-full p-4 rounded-lg border-2 text-left transition-all duration-200",
                  !showResult && isSelected && "border-accent bg-accent/5",
                  !showResult && !isSelected && "border-border hover:border-accent/50 hover:bg-muted/50",
                  showResult && isCorrect && "border-success bg-success/10",
                  showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                  showResult && !isSelected && !isCorrect && "opacity-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                    !showResult && isSelected && "bg-accent text-accent-foreground",
                    !showResult && !isSelected && "bg-muted text-muted-foreground",
                    showResult && isCorrect && "bg-success text-success-foreground",
                    showResult && isSelected && !isCorrect && "bg-destructive text-destructive-foreground"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="p-4 rounded-lg bg-muted/50 border animate-fade-in">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-accent" />
              Explanation
            </h4>
            <p className="text-sm text-muted-foreground">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          {!showExplanation ? (
            <Button 
              variant="hero" 
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button variant="hero" onClick={handleNext}>
              {currentIndex < quiz.questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                "See Results"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
