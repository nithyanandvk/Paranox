import { ArrowLeft, TrendingUp, MapPin, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { accidentHotspots, ambulanceAvailability, hospitalReadiness } from "@/lib/mockData";

const Analytics = () => {
  const navigate = useNavigate();

  const COLORS = ["hsl(var(--emergency))", "hsl(var(--warning))", "hsl(var(--success))"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Predictive Analytics
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="gradient-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Active Rescues</p>
                  <h3 className="text-3xl font-bold mt-1">3</h3>
                </div>
                <Activity className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-secondary text-secondary-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Lives Saved (Month)</p>
                  <h3 className="text-3xl font-bold mt-1">127</h3>
                </div>
                <TrendingUp className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent text-accent-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Avg Response Time</p>
                  <h3 className="text-3xl font-bold mt-1">6.4 min</h3>
                </div>
                <MapPin className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accident Hotspots */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Accident-Prone Zones</CardTitle>
            <CardDescription>High-risk areas requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accidentHotspots.map((hotspot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        hotspot.severity === "high"
                          ? "bg-emergency animate-pulse"
                          : hotspot.severity === "medium"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    />
                    <div>
                      <p className="font-semibold">{hotspot.location}</p>
                      <p className="text-sm text-muted-foreground">
                        Lat: {hotspot.coordinates.lat}, Lng: {hotspot.coordinates.lng}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{hotspot.incidents}</p>
                    <p className="text-sm text-muted-foreground">incidents</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ambulance Availability Chart */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Ambulance Availability - 24 Hour Trend</CardTitle>
            <CardDescription>Peak usage at 8-10 PM</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ambulanceAvailability}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="available" fill="hsl(var(--success))" name="Available" />
                <Bar dataKey="busy" fill="hsl(var(--emergency))" name="Busy" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hospital Readiness */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Hospital Readiness Score</CardTitle>
            <CardDescription>Real-time capacity and preparedness</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hospitalReadiness}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hospital" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="readiness"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Readiness %"
                />
                <Line
                  type="monotone"
                  dataKey="beds"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  name="Available Beds"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-primary/50 bg-primary/5 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <p className="text-sm">
                  <strong>Recommendation:</strong> Deploy 2 additional ambulances near Tirupati Highway during evening hours
                  (6-10 PM) to reduce response time by 30%.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <p className="text-sm">
                  <strong>Alert:</strong> Apollo Hospital approaching 90% capacity. Consider pre-alerting SVIMS for
                  overflow cases.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <p className="text-sm">
                  <strong>Prediction:</strong> Based on historical data, expect 15% increase in accidents this weekend due
                  to festival season. Ensure all units are on standby.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;
