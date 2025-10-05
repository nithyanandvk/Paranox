import { CheckCircle, Clock, MapPin, Phone, Users, Ambulance, Shield, Building2, Activity, AlertCircle, Cpu, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRescue } from "@/contexts/RescueContext";
import { notifications } from "@/lib/mockData";

const RescueDashboard = () => {
  const navigate = useNavigate();
  const { timeline, activeAccident, assignedAmbulance, allocatedHospital } = useRescue();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-white";
      case "in-progress": return "bg-primary text-white animate-pulse";
      case "pending": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      "alert-circle": AlertCircle,
      "cpu": Cpu,
      "ambulance": Ambulance,
      "building-2": Building2,
      "shield": Shield,
      "users": Users,
      "check-circle": CheckCircle,
    };
    return icons[iconName] || Activity;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Home
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rescue Timeline
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
            <Activity className="w-4 h-4" />
            Live Tracking
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Active Rescue Alert */}
        <Card className="p-6 mb-8 border-primary/50 bg-primary/5 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-16 h-16 rounded-full gradient-emergency flex items-center justify-center animate-pulse glow-emergency flex-shrink-0">
              <Ambulance className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Active Rescue in Progress</h2>
              <p className="text-sm text-muted-foreground mb-2">{activeAccident?.location.address}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1 text-primary">
                  <Ambulance className="w-4 h-4" />
                  {assignedAmbulance?.vehicle} ({assignedAmbulance?.driver})
                </span>
                <span className="flex items-center gap-1 text-secondary">
                  <Building2 className="w-4 h-4" />
                  {allocatedHospital?.name}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">11:28 PM</p>
              <p className="text-sm text-muted-foreground">Expected Completion</p>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <div className="relative mb-12">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-success via-primary to-muted rounded-full"></div>

          <div className="space-y-6">
            {timeline.map((stage, index) => {
              const IconComponent = getIconComponent(stage.icon);
              return (
                <div
                  key={stage.id}
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className={`ml-20 p-6 transition-all hover:shadow-xl ${
                    stage.status === "completed" ? "border-success/50 bg-success/5" :
                    stage.status === "in-progress" ? "border-primary/50 shadow-lg glow-primary" :
                    "border-border/50 opacity-70"
                  }`}>
                    {/* Icon circle */}
                    <div className={`absolute -left-14 top-6 w-16 h-16 rounded-full flex items-center justify-center ${getStatusColor(stage.status)}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{stage.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{stage.description}</p>
                        <div className="flex items-center gap-2">
                          {stage.status === "completed" && (
                            <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success font-medium">
                              ✓ Completed
                            </span>
                          )}
                          {stage.status === "in-progress" && (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium animate-pulse">
                              🔄 In Progress
                            </span>
                          )}
                          {stage.status === "pending" && (
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                              ⏳ Pending
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{stage.time}</p>
                        <p className="text-xs text-muted-foreground">Timestamp</p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <Card className="p-6 mb-8 animate-fade-in">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Recent Notifications
          </h3>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notif.type === "police" ? "bg-primary/10 text-primary" :
                  notif.type === "family" ? "bg-secondary/10 text-secondary" :
                  notif.type === "hospital" ? "bg-accent/10 text-accent" :
                  "bg-success/10 text-success"
                }`}>
                  {notif.type === "police" && <Shield className="w-5 h-5" />}
                  {notif.type === "family" && <Users className="w-5 h-5" />}
                  {notif.type === "hospital" && <Building2 className="w-5 h-5" />}
                  {notif.type === "ambulance" && <Ambulance className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-1">{notif.title}</p>
                  <p className="text-sm text-muted-foreground">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.timestamp}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  notif.status === "delivered" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}>
                  {notif.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all border-primary/20 hover:border-primary/50" onClick={() => navigate("/ambulance")}>
            <Ambulance className="w-12 h-12 text-primary mb-4 mx-auto" />
            <h3 className="font-semibold mb-2 text-center">Track Ambulance</h3>
            <p className="text-sm text-muted-foreground text-center">Live GPS tracking</p>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all border-secondary/20 hover:border-secondary/50" onClick={() => navigate("/hospitals")}>
            <Building2 className="w-12 h-12 text-secondary mb-4 mx-auto" />
            <h3 className="font-semibold mb-2 text-center">Hospital Details</h3>
            <p className="text-sm text-muted-foreground text-center">Bed availability</p>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition-all border-accent/20 hover:border-accent/50">
            <Phone className="w-12 h-12 text-accent mb-4 mx-auto" />
            <h3 className="font-semibold mb-2 text-center">Emergency Contacts</h3>
            <p className="text-sm text-muted-foreground text-center">Call 108/112</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RescueDashboard;
