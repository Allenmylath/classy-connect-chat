import { Button } from "@/components/ui/button";
import { Phone, PhoneOff } from "lucide-react";

interface ConnectionButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onToggleConnection: () => void;
}

export function ConnectionButton({ 
  isConnected, 
  isConnecting, 
  onToggleConnection 
}: ConnectionButtonProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={onToggleConnection}
        disabled={isConnecting}
        variant={isConnected ? "disconnect" : "connect"}
        size="lg"
        className="px-8 py-4 text-lg font-semibold rounded-full shadow-elegant hover:shadow-glow transition-all duration-300"
      >
        {isConnecting ? (
          <>
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Connecting...
          </>
        ) : isConnected ? (
          <>
            <PhoneOff size={20} />
            Disconnect
          </>
        ) : (
          <>
            <Phone size={20} />
            Connect
          </>
        )}
      </Button>
      
      <p className="text-sm text-muted-foreground text-center">
        {isConnected 
          ? "Click to end the call" 
          : "Click to start a video call"
        }
      </p>
    </div>
  );
}