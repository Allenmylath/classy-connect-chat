import { useState } from "react";
import { VideoConsole } from "./VideoConsole";
import { ChatConsole } from "./ChatConsole";
import { ConnectionButton } from "./ConnectionButton";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

export function VideoCallApp() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  const handleToggleConnection = async () => {
    if (isConnected) {
      // Disconnect
      setIsConnected(false);
      toast({
        title: "Call ended",
        description: "You have disconnected from the call.",
        variant: "destructive",
      });
    } else {
      // Connect
      setIsConnecting(true);
      // Simulate connection process
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
        toast({
          title: "Connected!",
          description: "You are now connected to the video call.",
        });
      }, 2000);
    }
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isOwn: true,
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate receiving a response (for demo purposes)
    if (isConnected) {
      setTimeout(() => {
        const responses = [
          "Got it, thanks!",
          "Sounds good to me",
          "I agree with that",
          "Let me think about that",
          "That's interesting!",
        ];
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          isOwn: false,
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Unmuted" : "Muted",
      description: `Microphone is now ${isMuted ? "on" : "off"}.`,
    });
  };

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast({
      title: isVideoOff ? "Camera on" : "Camera off",
      description: `Video is now ${isVideoOff ? "enabled" : "disabled"}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            StreamConnect Pro
          </h1>
          <p className="text-muted-foreground">
            Next-generation video calling with seamless chat integration
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Video Section */}
          <div className="flex-1 flex flex-col gap-6">
            <VideoConsole
              isConnected={isConnected}
              isMuted={isMuted}
              isVideoOff={isVideoOff}
              onToggleMute={handleToggleMute}
              onToggleVideo={handleToggleVideo}
            />
            
            {/* Connection Controls */}
            <div className="flex justify-center">
              <ConnectionButton
                isConnected={isConnected}
                isConnecting={isConnecting}
                onToggleConnection={handleToggleConnection}
              />
            </div>
          </div>

          {/* Chat Section */}
          <ChatConsole
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Click connect to start your video call experience</p>
        </div>
      </div>
    </div>
  );
}