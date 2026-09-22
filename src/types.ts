export type UserMode = "driver" | "transport" | "farmer";

export interface UserSession {
  id: string; // User ID / Driver ID / Transporter ID (e.g. NER-DRV-8492)
  email: string; // Email ID
  phone: string; // Mobile phone number
  name: string; // Full Name
  mode: UserMode;
  vehicleNo?: string;
  licenseNo?: string;
  companyName?: string;
  roleTitle?: string;
  state?: string;
  district?: string;
  token?: string;
}

export interface RouteSearchNode {
  id: string;
  name: string;
  state: string;
  district: string;
  coords: [number, number];
  type: "city" | "mandi" | "checkpost" | "border_gate" | "industrial_hub";
}

export interface CalculatedRouteResult {
  origin: RouteSearchNode;
  destination: RouteSearchNode;
  totalDistanceKm: number;
  estimatedHours: number;
  highwayNames: string[];
  waypoints: [number, number][];
  hazardsOnRoute: RoadHazard[];
  bypassActive: boolean;
  bypassRoadName?: string;
  bypassCoords?: [number, number][];
  bypassDistanceKm?: number;
  bypassDelayMinutes?: number;
  elevationGainMeters: number;
  terrainType: string;
  tollsAndCheckpostsCount: number;
  fuelStopsCount: number;
  emergencyHospitalsCount: number;
}

export type POIType = "hospital" | "petrol_pump" | "police" | "garage" | "relief_camp";

export interface POI {
  id: string;
  name: string;
  type: POIType;
  state: string;
  district: string;
  lat: number;
  lng: number;
  phone: string;
  address: string;
  distanceKm?: number; // Calculated or relative to current driver position
  details?: {
    beds?: number;
    icu?: boolean;
    fuelTypes?: string[];
    dieselPrice?: number;
    open24x7?: boolean;
    mechanicSpecialty?: string[];
    capacity?: number;
    officerInCharge?: string;
  };
}

export type HazardType = "landslide" | "flash_flood" | "heavy_rain_warning" | "bridge_damage" | "boulder_fall" | "road_cavity";

export interface RoadHazard {
  id: string;
  roadName: string;
  roadType: "NH" | "SH" | "URBAN" | "RURAL";
  state: string;
  locationName: string;
  lat: number;
  lng: number;
  hazardType: HazardType;
  severity: "critical" | "high" | "moderate";
  reportedAt: string;
  status: "blocked" | "restricted" | "clearing_in_progress";
  bypassAvailable: boolean;
  bypassRoadName: string;
  bypassCoords: [number, number][];
  bypassDistanceKm: number;
  estimatedDelayMinutes: number;
  weatherCondition: {
    temp: string;
    precipitation: string;
    visibility: string;
    windSpeed: string;
  };
  advisory: string;
  photoUrl?: string;
  reportedBy?: string;
  isLiveCameraReport?: boolean;
  gpsAccuracyMeters?: number;
  alternateRouteAdvisory?: string;
}

export interface HazardAlertNotification {
  id: string;
  hazardId: string;
  title: string;
  roadName: string;
  locationName: string;
  state: string;
  hazardType: HazardType;
  severity: "critical" | "high" | "moderate";
  reportedAt: string;
  photoUrl?: string;
  reportedBy: string;
  lat: number;
  lng: number;
  alternateBypassName: string;
  bypassDistanceKm: number;
  estimatedDelayMinutes: number;
  bypassCoords: [number, number][];
  advisory: string;
}

export interface HighwayRoute {
  id: string;
  name: string;
  code: string;
  type: "NH" | "SH" | "URBAN" | "BYPASS";
  statesCovered: string[];
  totalLengthKm: number;
  elevationProfile: string;
  coordinates: [number, number][];
  color: string;
  condition: "good" | "mountain_gorge" | "high_landslide_risk" | "seasonal_flood";
}

export interface MSMEFarmerCluster {
  id: string;
  name: string;
  communityType: "farmer" | "msme";
  state: string;
  district: string;
  lat: number;
  lng: number;
  produceName: string;
  annualVolumeTons: number;
  primaryMarket: string;
  farmGatePricePerKg: number;
  retailMandiPricePerKg: number;
  transportCostPerKmPerTon: number;
  avgDistanceToHubKm: number;
  totalFreightCostPerKg: number;
  farmerProfitMarginPercent: number;
  economicImpactAnalysis: string;
  cooperativeName: string;
  contactPerson: string;
  phone: string;
}

export interface TransitPermit {
  id: string;
  permitType: "ILP" | "HILL_FITNESS" | "E_WAY_BILL" | "GREEN_CORRIDOR" | "CARGO_TRANSIT";
  title: string;
  state: string;
  appliesTo: string;
  validityDays: number;
  documentsNeeded: string[];
  feeINR: number;
  officialPortal: string;
  status: "active" | "pending_verification" | "required";
}

export interface DriverTrip {
  id: string;
  origin: string;
  destination: string;
  originCoords: [number, number];
  destCoords: [number, number];
  distanceKm: number;
  estimatedHours: number;
  cargo: string;
  truckNo: string;
  driverName: string;
  activeHazardsOnRoute: RoadHazard[];
  suggestedBypass?: {
    name: string;
    extraKm: number;
    delayMinutes: number;
    description: string;
  };
}
