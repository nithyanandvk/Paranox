import { AlertCircle, Activity, MapPin, Phone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { rescueHistory, currentAccident } from "@/lib/mockData";
import { useRescue } from "@/contexts/RescueContext";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { isRescueActive, activeAccident } = useRescue();

  const handleSOSClick = () => {
    toast.success("Emergency Alert Activated!", {
      description: "Connecting to rescue services...",
    });
    setTimeout(() => {
      navigate("/report");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Garuda
              </h1>
              <p className="text-xs text-muted-foreground">
                AI Rescue Platform
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Every Second Counts in the Golden Hour
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            AI-powered accident rescue platform connecting you to emergency
            services instantly
          </p>

          {/* Emergency SOS Button */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 blur-3xl bg-emergency/20 rounded-full animate-pulse" />
            <Button
              size="lg"
              onClick={handleSOSClick}
              className="relative w-64 h-64 rounded-full gradient-emergency text-white text-2xl font-bold shadow-2xl glow-emergency hover:scale-110 transition-all duration-300 animate-pulse"
            >
              <div className="flex flex-col items-center gap-3">
                <AlertCircle className="w-24 h-24 animate-pulse" />
                <span>SOS</span>
                <span className="text-sm font-normal">Tap for Emergency</span>
              </div>
            </Button>
            {isRescueActive && (
              <div className="mt-4 animate-fade-in">
                <p className="text-sm font-medium text-emergency">
                  🚨 Active Rescue in Progress
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeAccident?.location.address}
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-primary/20 hover:border-primary/50"
              onClick={() => navigate("/dashboard")}
            >
              <Activity className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Rescue Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Track active rescues
              </p>
            </Card>

            <Card
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-secondary/20 hover:border-secondary/50"
              onClick={() => navigate("/hospitals")}
            >
              <MapPin className="w-12 h-12 text-secondary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Nearby Hospitals</h3>
              <p className="text-sm text-muted-foreground">
                Find closest facilities
              </p>
            </Card>

            <Card
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-accent/20 hover:border-accent/50"
              onClick={() => navigate("/analytics")}
            >
              <Activity className="w-12 h-12 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                View insights & trends
              </p>
            </Card>
          </div>
        </div>

        {/* Recent Rescues */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Recent Rescue Logs</h3>
          <div className="space-y-4">
            {rescueHistory.slice(0, 3).map((rescue) => (
              <Card
                key={rescue.id}
                className="p-6 hover:shadow-lg transition-shadow animate-fade-in"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        rescue.severity === "Critical"
                          ? "bg-emergency/10"
                          : rescue.severity === "Moderate"
                          ? "bg-warning/10"
                          : "bg-success/10"
                      }`}
                    >
                      <MapPin
                        className={`w-6 h-6 ${
                          rescue.severity === "Critical"
                            ? "text-emergency"
                            : rescue.severity === "Moderate"
                            ? "text-warning"
                            : "text-success"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{rescue.location}</h4>
                      <p className="text-sm text-muted-foreground">
                        {rescue.date} • Response: {rescue.responseTime}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {rescue.hospital}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium block mb-1">
                      {rescue.outcome}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        rescue.severity === "Critical"
                          ? "text-emergency"
                          : rescue.severity === "Moderate"
                          ? "text-warning"
                          : "text-success"
                      }`}
                    >
                      {rescue.severity}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
