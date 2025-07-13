import { Card } from "@/components/ui/card";
import { Video, VideoOff, Mic, MicOff, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoConsoleProps {
  isConnected: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
}

export function VideoConsole({ 
  isConnected, 
  isMuted, 
  isVideoOff, 
  onToggleMute, 
  onToggleVideo 
}: VideoConsoleProps) {
  return (
    <Card className="relative flex-1 bg-gradient-card border-border/50 shadow-card overflow-hidden">
      {/* Video Area */}
      <div className="aspect-video bg-muted/20 flex items-center justify-center relative">
        {isVideoOff ? (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <VideoOff size={64} />
            <p className="text-lg">Camera is off</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Video size={64} />
            <p className="text-lg">Video preview</p>
          </div>
        )}
        
        {/* Connection Status Indicator */}
        {isConnected && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-success/20 backdrop-blur-sm px-3 py-1 rounded-full border border-success/30">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow" />
            <span className="text-success text-sm font-medium">Connected</span>
          </div>
        )}
      </div>
      
      {/* Video Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMute}
          className={`rounded-full transition-all duration-300 ${
            isMuted 
              ? 'bg-destructive/20 text-destructive hover:bg-destructive/30' 
              : 'hover:bg-primary/20 text-foreground'
          }`}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleVideo}
          className={`rounded-full transition-all duration-300 ${
            isVideoOff 
              ? 'bg-destructive/20 text-destructive hover:bg-destructive/30' 
              : 'hover:bg-primary/20 text-foreground'
          }`}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-primary/20 text-foreground transition-all duration-300"
        >
          <Settings size={20} />
        </Button>
      </div>
    </Card>
  );
}