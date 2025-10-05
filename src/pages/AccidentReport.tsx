import { AlertCircle, MapPin, Clock, Camera, Upload, Loader2, CheckCircle, AlertTriangle, ArrowLeft, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useRescue } from "@/contexts/RescueContext";
import { currentAccident } from "@/lib/mockData";

const AccidentReport = () => {
  const navigate = useNavigate();
  const { startRescue } = useRescue();
  const [location, setLocation] = useState(currentAccident.location.address);
  const [coordinates, setCoordinates] = useState(`${currentAccident.location.lat}, ${currentAccident.location.lng}`);
  const [timestamp] = useState(new Date(currentAccident.timestamp).toLocaleString());
  const [description, setDescription] = useState(currentAccident.description);
  const [injuries, setInjuries] = useState(currentAccident.injuries);
  const [severity, setSeverity] = useState<"Critical" | "Moderate" | "Low" | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeSeverity = () => {
    setAnalyzing(true);
    toast.info("AI analyzing accident severity...", {
      description: "Processing location, injuries, and context",
    });
    
    setTimeout(() => {
      setSeverity("Critical");
      setAnalyzing(false);
      toast.success("AI Analysis Complete", {
        description: `Severity: Critical - Immediate response required`,
      });
    }, 2500);
  };

  const submitReport = () => {
    if (!severity) {
      toast.error("Please analyze severity first");
      return;
    }

    const updatedAccident = {
      ...currentAccident,
      description,
      injuries,
      severity,
      timestamp: new Date().toISOString(),
    };

    startRescue(updatedAccident);
    
    toast.success("🚨 Emergency Dispatch Initiated!", {
      description: "Ambulance A1 dispatched • Hospital notified",
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case "Critical": return "text-emergency";
      case "Moderate": return "text-warning";
      case "Low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityIcon = (sev: string) => {
    switch (sev) {
      case "Critical": return <AlertCircle className="w-12 h-12" />;
      case "Moderate": return <AlertTriangle className="w-12 h-12" />;
      case "Low": return <CheckCircle className="w-12 h-12" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Accident Report - SOS
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emergency/10 text-emergency text-sm font-medium animate-pulse">
            <AlertCircle className="w-4 h-4" />
            Emergency Mode
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-6">
          {/* Auto-detected Info */}
          <Card className="p-6 border-primary/20 animate-fade-in">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Auto-Detected Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20 animate-fade-in">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">GPS Location</p>
                  <p className="text-sm text-muted-foreground mb-2">{location}</p>
                  <Input 
                    value={coordinates} 
                    onChange={(e) => setCoordinates(e.target.value)}
                    className="text-xs bg-background/50"
                    placeholder="Coordinates"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-secondary/5 rounded-lg border border-secondary/20 animate-fade-in">
                <Clock className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="text-sm font-medium">Timestamp</p>
                  <p className="text-sm text-muted-foreground">{timestamp}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Accident Details */}
          <Card className="p-6 animate-fade-in">
            <h3 className="font-semibold mb-4">Accident Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the accident (injuries, vehicles involved, etc.)"
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Injuries Reported</label>
                <Textarea
                  value={injuries}
                  onChange={(e) => setInjuries(e.target.value)}
                  placeholder="Detail any visible injuries"
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Upload Photo/Video Evidence</label>
                <Card className="p-8 border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <Camera className="w-12 h-12" />
                    <p className="text-sm">Tap to upload photo or video</p>
                    <div className="flex gap-2 mt-2">
                      <div className="w-16 h-16 rounded bg-muted animate-pulse" />
                      <div className="w-16 h-16 rounded bg-muted animate-pulse" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* AI Severity Analysis */}
          <Card className="p-6 border-accent/20 animate-fade-in">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              AI Severity Analysis
            </h3>

            {!severity && !analyzing && (
              <Button
                onClick={analyzeSeverity}
                size="lg"
                className="w-full gradient-primary text-white"
              >
                <Activity className="w-5 h-5 mr-2" />
                Analyze Accident Severity
              </Button>
            )}

            {analyzing && (
              <div className="text-center py-8">
                <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">AI is analyzing the situation...</p>
                <p className="text-sm text-muted-foreground mt-2">Processing: Location • Injuries • Context</p>
              </div>
            )}

            {severity && !analyzing && (
              <div className="text-center py-8 animate-slide-up">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                  severity === "Critical" ? "bg-emergency/10 animate-pulse" :
                  severity === "Moderate" ? "bg-warning/10" :
                  "bg-success/10"
                }`}>
                  <span className={getSeverityColor(severity)}>
                    {getSeverityIcon(severity)}
                  </span>
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${getSeverityColor(severity)}`}>
                  {severity}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {severity === "Critical" && "⚠️ Immediate medical attention required"}
                  {severity === "Moderate" && "Medical attention recommended soon"}
                  {severity === "Low" && "✓ Minor injuries - First aid sufficient"}
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Accident ID: #{currentAccident.id}
                </div>
              </div>
            )}
          </Card>

          {/* Submit Actions */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1"
              size="lg"
            >
              Cancel
            </Button>
            <Button
              onClick={submitReport}
              disabled={!severity}
              className="flex-1 gradient-emergency text-white glow-emergency"
              size="lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              Submit & Dispatch Emergency
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccidentReport;
