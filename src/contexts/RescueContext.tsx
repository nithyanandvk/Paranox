import React, { createContext, useContext, useState, ReactNode } from "react";
import { AccidentReport, Ambulance, Hospital, TimelineStage, currentAccident, ambulances, hospitals, rescueTimeline } from "@/lib/mockData";

interface RescueContextType {
  activeAccident: AccidentReport | null;
  assignedAmbulance: Ambulance | null;
  allocatedHospital: Hospital | null;
  timeline: TimelineStage[];
  isRescueActive: boolean;
  startRescue: (accident: AccidentReport) => void;
  updateTimeline: (stageId: string, status: "completed" | "in-progress" | "pending") => void;
  assignAmbulance: (ambulance: Ambulance) => void;
  allocateHospital: (hospital: Hospital) => void;
  completeRescue: () => void;
}

const RescueContext = createContext<RescueContextType | undefined>(undefined);

export const RescueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeAccident, setActiveAccident] = useState<AccidentReport | null>(currentAccident);
  const [assignedAmbulance, setAssignedAmbulance] = useState<Ambulance | null>(ambulances[0]);
  const [allocatedHospital, setAllocatedHospital] = useState<Hospital | null>(hospitals[0]);
  const [timeline, setTimeline] = useState<TimelineStage[]>(rescueTimeline);
  const [isRescueActive, setIsRescueActive] = useState(true);

  const startRescue = (accident: AccidentReport) => {
    setActiveAccident(accident);
    setIsRescueActive(true);
    // Auto-assign closest ambulance
    const closestAmbulance = ambulances.find(a => a.status === "available");
    if (closestAmbulance) {
      setAssignedAmbulance(closestAmbulance);
    }
    // Auto-allocate best hospital
    setAllocatedHospital(hospitals[0]);
  };

  const updateTimeline = (stageId: string, status: "completed" | "in-progress" | "pending") => {
    setTimeline(prev =>
      prev.map(stage => (stage.id === stageId ? { ...stage, status } : stage))
    );
  };

  const assignAmbulance = (ambulance: Ambulance) => {
    setAssignedAmbulance(ambulance);
  };

  const allocateHospital = (hospital: Hospital) => {
    setAllocatedHospital(hospital);
  };

  const completeRescue = () => {
    setIsRescueActive(false);
    setTimeline(prev =>
      prev.map(stage => ({ ...stage, status: "completed" as const }))
    );
  };

  return (
    <RescueContext.Provider
      value={{
        activeAccident,
        assignedAmbulance,
        allocatedHospital,
        timeline,
        isRescueActive,
        startRescue,
        updateTimeline,
        assignAmbulance,
        allocateHospital,
        completeRescue,
      }}
    >
      {children}
    </RescueContext.Provider>
  );
};

export const useRescue = () => {
  const context = useContext(RescueContext);
  if (context === undefined) {
    throw new Error("useRescue must be used within a RescueProvider");
  }
  return context;
};
