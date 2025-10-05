import { User, Heart, Phone, MapPin, Clock, Award, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { currentUser, rescueHistory } from "@/lib/mockData";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success("Profile Updated!", {
      description: "Your emergency information has been saved",
    });
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
              Your Profile
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Profile & Medical */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="p-6 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                  <p className="text-muted-foreground">{currentUser.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Phone Number</Label>
                  <Input defaultValue={currentUser.phone} />
                </div>
                <div>
                  <Label>User ID</Label>
                  <Input defaultValue={currentUser.id} disabled />
                </div>
                <div>
                  <Label>Blood Group</Label>
                  <Input defaultValue={currentUser.bloodGroup} />
                </div>
                <div>
                  <Label>Member Since</Label>
                  <Input defaultValue="January 2023" disabled />
                </div>
              </div>
            </Card>

            {/* Medical Information */}
            <Card className="p-6 border-secondary/20 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary" />
                Medical Information
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Known Allergies</Label>
                  <Input placeholder="e.g., Penicillin, Peanuts" defaultValue={currentUser.allergies.join(", ")} />
                </div>
                <div>
                  <Label>Medical Conditions</Label>
                  <Input placeholder="e.g., Diabetes, Asthma" defaultValue={currentUser.medicalConditions.join(", ")} />
                </div>
                <div>
                  <Label>Blood Group</Label>
                  <Input defaultValue={currentUser.bloodGroup} className="font-bold text-emergency" />
                </div>
                <div>
                  <Label>Emergency Notes</Label>
                  <Input placeholder="Any critical information for paramedics" />
                </div>
              </div>
            </Card>

            {/* Emergency Contacts */}
            <Card className="p-6 border-accent/20 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-accent" />
                Emergency Contacts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-semibold">{currentUser.emergencyContact.name}</p>
                    <p className="text-sm text-muted-foreground">{currentUser.emergencyContact.phone}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {currentUser.emergencyContact.relation}
                  </span>
                </div>
                <Button variant="outline" className="w-full">
                  + Add Emergency Contact
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Stats & History */}
          <div className="space-y-6">
            {/* Rescue Stats */}
            <Card className="p-6 gradient-primary text-white animate-fade-in">
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <p className="text-sm opacity-90 mb-2">Total Rescues</p>
                <p className="text-5xl font-bold mb-2">{rescueHistory.length}</p>
                <p className="text-sm opacity-90">Lives saved with Garuda</p>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 animate-fade-in">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Response Time</span>
                  <span className="font-bold text-primary">
                    {(rescueHistory.reduce((acc, r) => acc + parseInt(r.responseTime), 0) / rescueHistory.length).toFixed(0)} mins
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className="font-bold text-success">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="font-semibold">Jan 2023</span>
                </div>
              </div>
            </Card>

            {/* Rescue History */}
            <Card className="p-6 animate-fade-in">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Rescue History
              </h3>
              <div className="space-y-3">
                {rescueHistory.map((rescue, index) => (
                  <div key={rescue.id} className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className={`w-4 h-4 mt-0.5 ${
                        rescue.severity === "Critical" ? "text-emergency" :
                        rescue.severity === "Moderate" ? "text-warning" : "text-success"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{rescue.location}</p>
                        <p className="text-xs text-muted-foreground">{rescue.date}</p>
                        <p className="text-xs text-muted-foreground">{rescue.hospital}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-success">✓ {rescue.outcome}</span>
                      <span className="text-muted-foreground">Response: {rescue.responseTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex gap-4">
          <Button variant="outline" className="flex-1" onClick={() => navigate("/")}>
            Cancel Changes
          </Button>
          <Button className="flex-1 gradient-secondary text-white" onClick={handleSave}>
            Save Profile
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
