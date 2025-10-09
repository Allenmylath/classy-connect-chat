import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Video, Sparkles } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <Video className="w-12 h-12 text-primary" />
            <Sparkles className="w-8 h-8 text-primary-glow" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            WhiteKitty Interview Bot
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of recruitment with our AI-powered video interview platform. 
            Professional, efficient, and designed to help you showcase your best self.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-foreground">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>AI-Powered Interviews</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Real-time Video Chat</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Instant Feedback</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          variant="connect"
          size="lg"
          onClick={() => navigate('/job-description')}
          className="text-lg px-12 py-6 h-auto"
        >
          Join Interview
        </Button>

        {/* Footer Info */}
        <p className="text-sm text-muted-foreground mt-12">
          Powered by advanced AI technology for a seamless interview experience
        </p>
      </div>
    </div>
  );
};

export default Home;
