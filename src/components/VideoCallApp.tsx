import { useState } from "react";
import { VideoConsole } from "./VideoConsole";
import { ChatConsole } from "./ChatConsole";
import { ConnectionButton } from "./ConnectionButton";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

export function VideoCallApp() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isOwn: true,
    };
    setMessages(prev => [...prev, newMessage]);

    // Note: With Pipecat, user messages will be sent through the client
    // and bot responses will come through RTVI events
    // We'll implement this in the next step
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Integrate with Pipecat mic controls
  };

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // TODO: Integrate with Pipecat camera controls
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
            Next-generation AI video calling with Pipecat integration
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
              <ConnectionButton onConnectionChange={handleConnectionChange} />
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
          <p>Click connect to start your AI-powered video call experience</p>
        </div>
      </div>
    </div>
  );
}