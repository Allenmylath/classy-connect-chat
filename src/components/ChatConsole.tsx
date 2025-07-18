import { useState, useCallback, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, MicOff } from "lucide-react";
import { usePipecatClient, useRTVIClientEvent } from "@pipecat-ai/client-react";
import { RTVIEvent } from "@pipecat-ai/client-js";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  type: 'text' | 'transcription' | 'interim';
  final?: boolean;
}

interface ChatConsoleProps {
  isConnected?: boolean;
}

export function ChatConsole({ isConnected = false }: ChatConsoleProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentInterim, setCurrentInterim] = useState<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const pipecatClient = usePipecatClient();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Listen to user transcription events (what the user says)
  useRTVIClientEvent(
    RTVIEvent.UserTranscript,
    useCallback((data: any) => {
      console.log("User transcription:", data);
      
      if (data.final) {
        // Final transcription - add as a permanent message
        if (data.text.trim()) {
          const message: Message = {
            id: `user-${Date.now()}`,
            text: data.text,
            timestamp: new Date(data.timestamp || Date.now()),
            isOwn: true,
            type: 'transcription',
            final: true
          };
          setMessages(prev => [...prev, message]);
        }
        setCurrentInterim(""); // Clear interim text
      } else {
        // Interim transcription - show as temporary text
        setCurrentInterim(data.text);
      }
    }, [])
  );

  // Listen to bot transcription (what the bot says) - ONLY THIS EVENT
  useRTVIClientEvent(
    RTVIEvent.BotTranscript,
    useCallback((data: any) => {
      console.log("Bot transcription:", data);
      
      // Only add if there's actual text content
      if (data.text && data.text.trim()) {
        const message: Message = {
          id: `bot-transcript-${Date.now()}-${Math.random()}`,
          text: data.text.trim(),
          timestamp: new Date(),
          isOwn: false,
          type: 'transcription'
        };
        
        setMessages(prev => [...prev, message]);
      }
    }, [])
  );

  // Listen to user started/stopped speaking
  useRTVIClientEvent(
    RTVIEvent.UserStartedSpeaking,
    useCallback(() => {
      console.log("User started speaking");
      setIsListening(true);
    }, [])
  );

  useRTVIClientEvent(
    RTVIEvent.UserStoppedSpeaking,
    useCallback(() => {
      console.log("User stopped speaking");
      setIsListening(false);
    }, [])
  );

  // Send text message through Pipecat (this will be processed by the bot)
  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() || !isConnected) return;

    try {
      // Add the user's typed message to the chat immediately
      const userMessage: Message = {
        id: `user-text-${Date.now()}`,
        text: newMessage.trim(),
        timestamp: new Date(),
        isOwn: true,
        type: 'text'
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Send message to the bot through Pipecat
      // This would typically be handled by injecting text into the conversation
      // For now, we'll use a simple approach - in a real implementation,
      // you might need to use specific Pipecat methods or your backend API
      
      console.log("Sending message to bot:", newMessage.trim());
      
      // Clear the input
      setNewMessage("");
      
      // Note: The actual message sending might need to be handled differently
      // depending on your Pipecat backend configuration
      
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [newMessage, isConnected]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageIcon = (message: Message) => {
    if (message.type === 'transcription' && message.isOwn) {
      return <Mic size={12} className="opacity-70" />;
    }
    return null;
  };

  const getMessageTypeLabel = (message: Message) => {
    if (message.type === 'transcription') {
      return message.isOwn ? 'Spoken' : 'Bot Response';
    }
    return message.isOwn ? 'You' : 'Bot';
  };

  return (
    <Card className="w-80 bg-gradient-card border-border/50 shadow-card flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Chat</h3>
          <div className="flex items-center gap-2">
            {isListening && (
              <div className="flex items-center gap-1 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs">Listening</span>
              </div>
            )}
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success animate-pulse-glow' : 'bg-muted'}`} />
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && !currentInterim ? (
            <div className="text-center text-muted-foreground py-8">
              {isConnected ? (
                <>
                  <p>Connected! Start speaking or type a message.</p>
                  <p className="text-sm mt-2">The AI will respond in real-time.</p>
                </>
              ) : (
                <>
                  <p>Connect to start chatting</p>
                  <p className="text-sm">AI-powered conversation awaits!</p>
                </>
              )}
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg shadow-sm animate-fade-in ${
                      message.isOwn
                        ? 'bg-gradient-button text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {getMessageIcon(message)}
                      <span className="text-xs opacity-70 font-medium">
                        {getMessageTypeLabel(message)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Show interim transcription */}
              {currentInterim && (
                <div className="flex justify-end">
                  <div className="max-w-[85%] p-3 rounded-lg bg-gradient-button/50 text-primary-foreground border-2 border-primary/30">
                    <div className="flex items-center gap-1 mb-1">
                      <Mic size={12} className="opacity-70" />
                      <span className="text-xs opacity-70 font-medium">Speaking...</span>
                    </div>
                    <p className="text-sm leading-relaxed italic">{currentInterim}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
      
      {/* Message Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type a message..." : "Connect to start chatting"}
            disabled={!isConnected}
            className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !isConnected}
            size="icon"
            variant="connect"
            className="rounded-full"
          >
            <Send size={16} />
          </Button>
        </div>
        
        {isConnected && (
          <div className="mt-2 text-xs text-muted-foreground text-center">
            {isListening ? (
              <span className="flex items-center justify-center gap-1">
                <MicOff size={12} />
                Voice detected - speaking to AI
              </span>
            ) : (
              <span>Speak naturally or type your message</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}