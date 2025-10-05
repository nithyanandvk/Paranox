// Mock Data for Garuda AI Accident Rescue Platform

export interface User {
  id: string;
  name: string;
  phone: string;
  bloodGroup: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  medicalConditions: string[];
  allergies: string[];
}

export interface Ambulance {
  id: string;
  vehicle: string;
  driver: string;
  phone: string;
  status: "available" | "busy" | "dispatched";
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  equipment: string[];
}

export interface Hospital {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  distance: number;
  eta: string;
  icuBeds: number;
  generalBeds: number;
  specialties: string[];
  rating: number;
  contact: string;
}

export interface AccidentReport {
  id: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  severity: "Critical" | "Moderate" | "Low";
  description: string;
  injuries: string;
  photos: string[];
  status: string;
  userId: string;
}

export interface RescueHistory {
  id: string;
  location: string;
  date: string;
  severity: "Critical" | "Moderate" | "Low";
  outcome: "Saved" | "In Progress";
  responseTime: string;
  hospital: string;
}

export interface Notification {
  id: string;
  type: "police" | "family" | "hospital" | "ambulance";
  title: string;
  message: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

// Current User
export const currentUser: User = {
  id: "user-001",
  name: "Vamsi Sanjeev",
  phone: "+91-9876543210",
  bloodGroup: "B+",
  emergencyContact: {
    name: "Sudarshan",
    phone: "+91-9123456789",
    relation: "Father",
  },
  medicalConditions: ["None"],
  allergies: ["Penicillin"],
};

// Ambulances
export const ambulances: Ambulance[] = [
  {
    id: "A1",
    vehicle: "KA-01-MH-2345",
    driver: "Ramesh Kumar",
    phone: "+91-9845612345",
    status: "available",
    location: {
      lat: 13.625,
      lng: 79.41,
      address: "Near RTC Bus Stand, Tirupati",
    },
    equipment: ["Oxygen Cylinder", "Defibrillator", "First Aid Kit", "Stretcher"],
  },
  {
    id: "A2",
    vehicle: "KA-01-MH-5678",
    driver: "Priya Sharma",
    phone: "+91-9876543211",
    status: "busy",
    location: {
      lat: 13.615,
      lng: 79.42,
      address: "Alipiri Road, Tirupati",
    },
    equipment: ["Oxygen Cylinder", "First Aid Kit", "Stretcher"],
  },
  {
    id: "A3",
    vehicle: "KA-01-MH-9012",
    driver: "Suresh Reddy",
    phone: "+91-9988776655",
    status: "available",
    location: {
      lat: 13.635,
      lng: 79.405,
      address: "Tirumala Road, Tirupati",
    },
    equipment: ["Advanced Life Support", "Oxygen Cylinder", "Defibrillator", "Stretcher"],
  },
];

// Hospitals
export const hospitals: Hospital[] = [
  {
    id: "H1",
    name: "Apollo Hospital",
    location: {
      lat: 13.632,
      lng: 79.415,
      address: "MG Road, Tirupati - 517501",
    },
    distance: 5,
    eta: "8 mins",
    icuBeds: 3,
    generalBeds: 12,
    specialties: ["Emergency Care", "Trauma Surgery", "ICU", "Neurology"],
    rating: 4.8,
    contact: "+91-877-2248888",
  },
  {
    id: "H2",
    name: "SVIMS Hospital",
    location: {
      lat: 13.648,
      lng: 79.428,
      address: "Alipiri Road, Tirupati - 517507",
    },
    distance: 8,
    eta: "12 mins",
    icuBeds: 1,
    generalBeds: 8,
    specialties: ["Emergency Care", "General Surgery", "Orthopedics"],
    rating: 4.5,
    contact: "+91-877-2287777",
  },
  {
    id: "H3",
    name: "Govt. General Hospital",
    location: {
      lat: 13.642,
      lng: 79.435,
      address: "Balaji Colony, Tirupati - 517502",
    },
    distance: 10,
    eta: "15 mins",
    icuBeds: 5,
    generalBeds: 20,
    specialties: ["Emergency Care", "Trauma Care", "General Surgery"],
    rating: 4.2,
    contact: "+91-877-2225555",
  },
];

// Recent Rescue History
export const rescueHistory: RescueHistory[] = [
  {
    id: "R-095",
    location: "MG Road, Bangalore",
    date: "2025-09-28",
    severity: "Moderate",
    outcome: "Saved",
    responseTime: "12 mins",
    hospital: "Apollo Hospital",
  },
  {
    id: "R-088",
    location: "Anna Salai, Chennai",
    date: "2025-09-15",
    severity: "Critical",
    outcome: "Saved",
    responseTime: "8 mins",
    hospital: "AIIMS Chennai",
  },
  {
    id: "R-079",
    location: "Sector 62, Noida",
    date: "2025-08-20",
    severity: "Low",
    outcome: "Saved",
    responseTime: "15 mins",
    hospital: "Max Hospital",
  },
];

// Current Accident (Active Rescue)
export const currentAccident: AccidentReport = {
  id: "ACC-101",
  location: {
    lat: 13.628,
    lng: 79.419,
    address: "Tirupati Highway, Near Tollgate, Tirupati - 517501",
  },
  timestamp: "2025-10-04T23:05:00Z",
  severity: "Critical",
  description: "Two-wheeler collision with auto-rickshaw. Victim unconscious.",
  injuries: "Head injury, bleeding, unconscious",
  photos: ["/placeholder.svg", "/placeholder.svg"],
  status: "Active",
  userId: "user-001",
};

// Rescue Timeline
export interface TimelineStage {
  id: string;
  title: string;
  time: string;
  status: "completed" | "in-progress" | "pending";
  description: string;
  icon: string;
}

export const rescueTimeline: TimelineStage[] = [
  {
    id: "1",
    title: "SOS Reported",
    time: "11:05 PM",
    status: "completed",
    description: "Emergency alert received from location",
    icon: "alert-circle",
  },
  {
    id: "2",
    title: "AI Verification",
    time: "11:06 PM",
    status: "completed",
    description: "Severity classified as Critical",
    icon: "cpu",
  },
  {
    id: "3",
    title: "Ambulance Dispatched",
    time: "11:08 PM",
    status: "in-progress",
    description: "Ambulance A1 (Ramesh Kumar) en route",
    icon: "ambulance",
  },
  {
    id: "4",
    title: "Hospital Allocated",
    time: "11:14 PM",
    status: "pending",
    description: "Apollo Hospital - ICU bed reserved",
    icon: "building-2",
  },
  {
    id: "5",
    title: "Police Notified",
    time: "11:15 PM",
    status: "pending",
    description: "Case #101 logged with local station",
    icon: "shield",
  },
  {
    id: "6",
    title: "Family Informed",
    time: "11:15 PM",
    status: "pending",
    description: "Emergency contact notified",
    icon: "users",
  },
  {
    id: "7",
    title: "Patient Reached Hospital",
    time: "11:28 PM (ETA)",
    status: "pending",
    description: "Ambulance arriving at emergency ward",
    icon: "check-circle",
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: "N1",
    type: "police",
    title: "Police Case Logged",
    message: "Case #101 registered at Tirupati Central Police Station at 11:07 PM",
    timestamp: "11:07 PM",
    status: "delivered",
  },
  {
    id: "N2",
    type: "family",
    title: "Emergency Contact Notified",
    message: "Your relative is safe. Ambulance arriving in 5 minutes. Apollo Hospital prepared.",
    timestamp: "11:08 PM",
    status: "delivered",
  },
  {
    id: "N3",
    type: "hospital",
    title: "Hospital Bed Reserved",
    message: "ICU bed reserved at Apollo Hospital. Medical team on standby.",
    timestamp: "11:14 PM",
    status: "sent",
  },
];

// Analytics Data
export interface AccidentHotspot {
  location: string;
  coordinates: { lat: number; lng: number };
  incidents: number;
  severity: "high" | "medium" | "low";
}

export const accidentHotspots: AccidentHotspot[] = [
  {
    location: "Tirupati Highway Near Tollgate",
    coordinates: { lat: 13.628, lng: 79.419 },
    incidents: 24,
    severity: "high",
  },
  {
    location: "Alipiri Road Junction",
    coordinates: { lat: 13.645, lng: 79.425 },
    incidents: 18,
    severity: "high",
  },
  {
    location: "RTC Bus Stand Circle",
    coordinates: { lat: 13.625, lng: 79.41 },
    incidents: 12,
    severity: "medium",
  },
];

export const ambulanceAvailability = [
  { time: "6 AM", available: 8, busy: 2 },
  { time: "8 AM", available: 6, busy: 4 },
  { time: "10 AM", available: 7, busy: 3 },
  { time: "12 PM", available: 5, busy: 5 },
  { time: "2 PM", available: 6, busy: 4 },
  { time: "4 PM", available: 4, busy: 6 },
  { time: "6 PM", available: 3, busy: 7 },
  { time: "8 PM", available: 2, busy: 8 },
  { time: "10 PM", available: 4, busy: 6 },
];

export const hospitalReadiness = [
  { hospital: "Apollo", readiness: 85, beds: 15 },
  { hospital: "SVIMS", readiness: 60, beds: 9 },
  { hospital: "Govt. General", readiness: 70, beds: 25 },
  { hospital: "RTC Hospital", readiness: 55, beds: 12 },
];
