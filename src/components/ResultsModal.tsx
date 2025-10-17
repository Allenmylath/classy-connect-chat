import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, FileText, X, AlertTriangle, Wrench, Lightbulb, Shield, MessageCircle, Handshake } from "lucide-react";
import { InterviewResults } from "@/components/ConnectionButton";

const MAX_SCORES = {
  technical_knowledge: 30,
  problem_solving: 25,
  safety_awareness: 20,
  soft_skills: 15,
  cultural_fit: 10,
};

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: InterviewResults | null;
  onStartNew?: () => void;
}

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore: number;
  icon: React.ReactNode;
}

const ScoreBar = ({ label, score, maxScore, icon }: ScoreBarProps) => {
  const percentage = Math.round((score / maxScore) * 100);
  
  const getColor = (pct: number) => {
    if (pct >= 80) return "bg-green-500";
    if (pct >= 60) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const getTextColor = (pct: number) => {
    if (pct >= 80) return "text-green-500";
    if (pct >= 60) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium flex items-center gap-2">
          {icon}
          {label}
        </span>
        <span className={`text-sm font-semibold ${getTextColor(percentage)}`}>
          {score}/{maxScore} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`${getColor(percentage)} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export function ResultsModal({
  isOpen,
  onClose,
  results,
  onStartNew,
}: ResultsModalProps) {
  if (!results) return null;

  const { totalScore, scoreBreakdown, summary, redFlags } = results;
  const starRating = Math.round((totalScore / 100) * 5);

  // Determine score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-orange-500";
  };

  // Category icons mapping
  const categoryIcons = {
    technical_knowledge: <Wrench className="w-4 h-4" />,
    problem_solving: <Lightbulb className="w-4 h-4" />,
    safety_awareness: <Shield className="w-4 h-4" />,
    soft_skills: <MessageCircle className="w-4 h-4" />,
    cultural_fit: <Handshake className="w-4 h-4" />,
  };

  // Format category names
  const formatCategoryName = (key: string) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Interview Results
          </DialogTitle>
          <DialogDescription>
            Here's your detailed performance breakdown
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Overall Score Section */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-semibold text-muted-foreground">
                Overall Score
              </h3>
              
              {/* Large Score Display */}
              <div className={`text-6xl font-bold ${getScoreColor(totalScore)}`}>
                {totalScore}
                <span className="text-3xl text-muted-foreground">/100</span>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={24}
                    className={
                      index < starRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted"
                    }
                  />
                ))}
              </div>

              {/* Performance Label */}
              <div className="text-sm font-medium">
                {totalScore >= 80 && (
                  <span className="text-green-500">Excellent Performance! 🎉</span>
                )}
                {totalScore >= 60 && totalScore < 80 && (
                  <span className="text-yellow-500">Good Performance! 👍</span>
                )}
                {totalScore < 60 && (
                  <span className="text-orange-500">Keep Practicing! 💪</span>
                )}
              </div>
            </div>
          </Card>

          {/* Score Breakdown Section */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Score Breakdown</h3>
              </div>
              
              <div className="space-y-4">
                {Object.entries(scoreBreakdown)
                  .filter(([key]) => key !== 'total_score')
                  .map(([key, value]) => (
                    <ScoreBar
                      key={key}
                      label={formatCategoryName(key)}
                      score={value as number}
                      maxScore={MAX_SCORES[key as keyof typeof MAX_SCORES]}
                      icon={categoryIcons[key as keyof typeof categoryIcons]}
                    />
                  ))}
              </div>
            </div>
          </Card>

          {/* Red Flags Section - Only show if there are red flags */}
          {redFlags && redFlags.length > 0 && (
            <Card className="p-6 bg-gradient-card border-border/50 border-orange-500/20">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-orange-500">Areas for Improvement</h3>
                </div>
                
                <ul className="space-y-2 ml-7">
                  {redFlags.map((flag, index) => (
                    <li key={index} className="text-sm text-foreground leading-relaxed">
                      • {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )}

          {/* Summary Section */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Interview Summary</h3>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
          
          {onStartNew && (
            <Button
              variant="default"
              onClick={() => {
                onClose();
                onStartNew();
              }}
              className="flex-1"
            >
              Start New Interview
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
