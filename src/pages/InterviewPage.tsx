import { useState, useEffect } from "react";
import { VideoConsole } from "@/components/VideoConsole";
import { ChatConsole } from "@/components/ChatConsole";
import { ConnectionButton } from "@/components/ConnectionButton";
import { ResultsModal } from "@/components/ResultsModal";
import { Clock } from "lucide-react";

export default function InterviewPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Results modal state
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [interviewScore, setInterviewScore] = useState(0);
  const [interviewSummary, setInterviewSummary] = useState("");

  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
    
    // Reset timer when disconnected
    if (!connected) {
      setElapsedTime(0);
    }
  };

  const handleConversationEnd = (score: number, summary: string) => {
    console.log("🎯 Interview ended with score:", score);
    console.log("📋 Summary:", summary);
    
    // Store the results
    setInterviewScore(score);
    setInterviewSummary(summary);
    
    // Show the results modal
    setShowResultsModal(true);
  };

  const handleStartNewInterview = () => {
    // Reset all state
    setShowResultsModal(false);
    setInterviewScore(0);
    setInterviewSummary("");
    setElapsedTime(0);
    
    // Optionally reload the page for a fresh start
    // window.location.reload();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isConnected) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            WhiteKitty Interview Bot
          </h1>
          <p className="text-muted-foreground">AI-powered video interview experience</p>
          
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-2xl font-mono font-semibold text-foreground">
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[calc(100vh-200px)]">
          {/* Video Section */}
          <div className="flex flex-col gap-4 lg:flex-1 h-1/2 lg:h-full">
            <VideoConsole isConnected={isConnected} />
            
            {/* Connection Controls */}
            <div className="flex justify-center">
              <ConnectionButton 
                onConnectionChange={handleConnectionChange}
                onConversationEnd={handleConversationEnd}
              />
            </div>
          </div>

          {/* Chat Section */}
          <div className="h-1/2 lg:h-full lg:w-96">
            <ChatConsole isConnected={isConnected} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Click connect to start your AI-powered video call experience</p>
        </div>
      </div>

      {/* Results Modal */}
      <ResultsModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        score={interviewScore}
        summary={interviewSummary}
        onStartNew={handleStartNewInterview}
      />
    </div>
  );
}
