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
import { Star, TrendingUp, FileText, X } from "lucide-react";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  summary: string;
  onStartNew?: () => void;
}

export function ResultsModal({
  isOpen,
  onClose,
  score,
  summary,
  onStartNew,
}: ResultsModalProps) {
  // Calculate star rating (assuming score is out of 100)
  const starRating = Math.round((score / 100) * 5);

  // Determine score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Interview Results
          </DialogTitle>
          <DialogDescription>
            Here's how you performed in your interview
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Score Section */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-lg font-semibold text-muted-foreground">
                Your Score
              </h3>
              
              {/* Large Score Display */}
              <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                {score}
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
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* Performance Label */}
              <div className="text-sm font-medium">
                {score >= 80 && (
                  <span className="text-green-500">Excellent Performance! 🎉</span>
                )}
                {score >= 60 && score < 80 && (
                  <span className="text-yellow-500">Good Performance! 👍</span>
                )}
                {score < 60 && (
                  <span className="text-orange-500">Keep Practicing! 💪</span>
                )}
              </div>
            </div>
          </Card>

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
