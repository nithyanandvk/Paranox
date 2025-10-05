import { MapPin, Navigation, Clock, Phone, Activity, Zap, ArrowLeft, Ambulance as AmbulanceIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRescue } from "@/contexts/RescueContext";
import { useState, useEffect } from "react";

const AmbulanceTracking = () => {
  const navigate = useNavigate();
  const { assignedAmbulance, allocatedHospital } = useRescue();
  const [distance, setDistance] = useState(5.0);
  const [eta, setEta] = useState(8);

  // Simulate real-time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(prev => Math.max(0.1, prev - 0.1));
      setEta(prev => Math.max(1, prev - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ambulance Tracking
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium animate-pulse">
            <Activity className="w-4 h-4" />
            Live Tracking
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Live Map */}
        <Card className="p-8 mb-8 bg-muted/30 border-primary/20 animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
          <div className="relative flex items-center justify-center text-muted-foreground h-96">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full gradient-emergency flex items-center justify-center animate-pulse glow-emergency">
                  <AmbulanceIcon className="w-16 h-16 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-emergency/30 animate-ping"></div>
                <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-success flex items-center justify-center animate-bounce">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-xl font-semibold mb-2 text-foreground">Ambulance {assignedAmbulance?.vehicle}</p>
              <p className="text-sm mb-4">Driver: {assignedAmbulance?.driver}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="font-medium">Live GPS • AI Route Optimization Active</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Ambulance Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-primary/20 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              Route Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Distance Remaining</span>
                <span className="text-3xl font-bold text-primary animate-pulse">{distance.toFixed(1)} km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated Time</span>
                <span className="text-3xl font-bold text-secondary animate-pulse">{eta} mins</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Current Speed</span>
                <span className="text-xl font-semibold">52 km/h</span>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-success/10 text-success text-sm font-medium text-center">
                ✓ On fastest route • 2 min saved
              </div>
            </div>
          </Card>

          <Card className="p-6 border-secondary/20 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AmbulanceIcon className="w-5 h-5 text-secondary" />
              Ambulance & Crew Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehicle</span>
                <span className="font-semibold">{assignedAmbulance?.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Driver</span>
                <span className="font-semibold">{assignedAmbulance?.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Equipment</span>
                <span className="text-xs text-muted-foreground">{assignedAmbulance?.equipment.length} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destination</span>
                <span className="font-semibold text-sm">{allocatedHospital?.name}</span>
              </div>
              <Button className="w-full mt-4 gradient-primary text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call {assignedAmbulance?.phone}
              </Button>
            </div>
          </Card>
        </div>

        {/* AI Route Optimization */}
        <Card className="p-6 border-accent/50 bg-accent/5 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center flex-shrink-0 animate-pulse">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                🤖 AI Route Optimization Active
              </h3>
              <p className="text-muted-foreground mb-4">
                AI is continuously monitoring <strong>real-time traffic patterns</strong>, <strong>road conditions</strong>, and 
                <strong> emergency lanes</strong>. The ambulance has been rerouted <strong>2 times</strong> to avoid traffic congestion, 
                saving an estimated <strong className="text-success">3 minutes</strong>. Current route is 15% faster than standard GPS.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="px-4 py-2 rounded-lg bg-success/10 text-success font-medium flex items-center gap-1">
                  ✓ Traffic-aware routing
                </div>
                <div className="px-4 py-2 rounded-lg bg-success/10 text-success font-medium flex items-center gap-1">
                  ✓ Real-time rerouting
                </div>
                <div className="px-4 py-2 rounded-lg bg-success/10 text-success font-medium flex items-center gap-1">
                  ✓ Emergency lane detection
                </div>
                <div className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium flex items-center gap-1 animate-pulse">
                  <Zap className="w-4 h-4" />
                  Optimizing...
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Journey Timeline */}
        <Card className="mt-8 p-6 animate-fade-in">
          <h3 className="text-xl font-semibold mb-6">Journey Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center text-white flex-shrink-0">
                ✓
              </div>
              <div className="flex-1">
                <p className="font-semibold">Ambulance Dispatched</p>
                <p className="text-sm text-muted-foreground">11:08 PM - From {assignedAmbulance?.location.address}</p>
              </div>
              <span className="text-xs text-success font-medium">Completed</span>
            </div>
            <div className="ml-5 w-0.5 h-8 bg-gradient-to-b from-success to-primary"></div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 animate-pulse glow-primary">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">En Route to Accident Site</p>
                <p className="text-sm text-muted-foreground">ETA: {eta} minutes • {distance.toFixed(1)} km remaining</p>
              </div>
              <span className="text-xs text-primary font-medium animate-pulse">In Progress</span>
            </div>
            <div className="ml-5 w-0.5 h-8 bg-gradient-to-b from-primary to-muted"></div>
            <div className="flex items-center gap-4 opacity-60">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Arriving at Hospital</p>
                <p className="text-sm text-muted-foreground">{allocatedHospital?.name} • ICU Bed Reserved</p>
              </div>
              <span className="text-xs text-muted-foreground font-medium">Pending</span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AmbulanceTracking;
