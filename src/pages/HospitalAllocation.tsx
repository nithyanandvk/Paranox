import { MapPin, Bed, Activity, Clock, Navigation, Phone, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { hospitals } from "@/lib/mockData";
import { useRescue } from "@/contexts/RescueContext";
import { toast } from "sonner";

const HospitalAllocation = () => {
  const navigate = useNavigate();
  const { allocatedHospital, allocateHospital } = useRescue();

  const handleSelectHospital = (hospital: typeof hospitals[0]) => {
    allocateHospital(hospital);
    toast.success("Hospital Allocated!", {
      description: `${hospital.name} - ICU bed reserved`,
    });
  };

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
              Hospital Allocation
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {allocatedHospital && (
              <span className="px-3 py-1 rounded-full bg-success/10 text-success">
                ✓ {allocatedHospital.name} Selected
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Map Placeholder */}
        <Card className="p-8 mb-8 bg-muted/30 border-primary/20 animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
          <div className="relative flex items-center justify-center text-muted-foreground h-64">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-primary animate-bounce" />
              <p className="text-lg font-semibold">Live Hospital Map View</p>
              <p className="text-sm">Showing {hospitals.length} nearby hospitals with real-time bed availability</p>
              <div className="flex gap-3 justify-center mt-4">
                {hospitals.map((h, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Hospitals List */}
        <div className="space-y-6">
          {hospitals.map((hospital, index) => (
            <Card 
              key={hospital.id}
              className={`p-6 transition-all hover:shadow-xl animate-slide-up ${
                hospital.icuBeds > 0
                  ? "border-success/50 hover:border-success" 
                  : "border-border/50 opacity-75"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Hospital Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{hospital.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {hospital.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {hospital.eta} ETA
                        </span>
                        <span className="flex items-center gap-1">
                          ⭐ {hospital.rating}
                        </span>
                      </div>
                    </div>
                    {hospital.icuBeds > 0 ? (
                      <Badge className="bg-success text-white">Available</Badge>
                    ) : (
                      <Badge variant="secondary">Full Capacity</Badge>
                    )}
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hospital.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="border-primary/50">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Bed Availability */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">ICU Beds</span>
                      </div>
                      <p className="text-3xl font-bold text-primary">
                        {hospital.icuBeds}
                        <span className="text-sm text-muted-foreground ml-2">available</span>
                      </p>
                    </div>

                    <div className="bg-secondary/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Bed className="w-5 h-5 text-secondary" />
                        <span className="text-sm font-medium">General Beds</span>
                      </div>
                      <p className="text-3xl font-bold text-secondary">
                        {hospital.generalBeds}
                        <span className="text-sm text-muted-foreground ml-2">available</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 md:w-48">
                  <Button
                    className="w-full gradient-primary text-white"
                    disabled={!hospital.icuBeds}
                    onClick={() => handleSelectHospital(hospital)}
                  >
                    {allocatedHospital?.id === hospital.id ? "✓ Selected" : "Select Hospital"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Recommendation */}
        <Card className="mt-8 p-6 border-accent/50 bg-accent/5 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 animate-pulse">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                🤖 AI Recommendation
              </h3>
              <p className="text-muted-foreground mb-4">
                Based on <strong>distance ({hospitals[0].distance})</strong>, <strong>ICU bed availability ({hospitals[0].icuBeds} beds)</strong>, 
                and <strong>critical severity level</strong>, <span className="text-primary font-semibold">{hospitals[0].name}</span> is 
                the optimal choice for this emergency. Hospital has trauma specialists on standby and fastest ETA ({hospitals[0].eta}).
              </p>
              <div className="flex gap-3">
                <Button 
                  className="gradient-secondary text-white"
                  onClick={() => handleSelectHospital(hospitals[0])}
                >
                  Accept AI Recommendation
                </Button>
                <Button variant="outline">
                  View Full Analysis
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default HospitalAllocation;
