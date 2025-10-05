import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RescueProvider } from "./contexts/RescueContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AccidentReport from "./pages/AccidentReport";
import RescueDashboard from "./pages/RescueDashboard";
import HospitalAllocation from "./pages/HospitalAllocation";
import AmbulanceTracking from "./pages/AmbulanceTracking";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RescueProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><AccidentReport /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><RescueDashboard /></ProtectedRoute>} />
            <Route path="/hospitals" element={<ProtectedRoute><HospitalAllocation /></ProtectedRoute>} />
            <Route path="/ambulance" element={<ProtectedRoute><AmbulanceTracking /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RescueProvider>
  </QueryClientProvider>
);

export default App;
