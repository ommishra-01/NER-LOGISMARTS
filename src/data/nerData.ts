import { 
  HighwayRoute, 
  RoadHazard, 
  POI, 
  MSMEFarmerCluster, 
  TransitPermit, 
  DriverTrip,
  RouteSearchNode,
  CalculatedRouteResult 
} from "../types";

export const NER_HIGHWAYS: HighwayRoute[] = [
  {
    id: "nh-27-chickens-neck",
    name: "NH-27 (Siliguri 'Chicken's Neck' to Guwahati National Lifeline)",
    code: "NH-27",
    type: "NH",
    statesCovered: ["West Bengal", "Assam"],
    totalLengthKm: 475,
    elevationProfile: "Plains & Foothills Corridor (90m - 140m)",
    color: "#3b82f6", // blue
    condition: "good",
    coordinates: [
      [26.72, 88.42], // Siliguri
      [26.54, 88.71], // Jalpaiguri
      [26.51, 89.37], // Alipurduar
      [26.49, 89.87], // Srirampur Checkpost (Assam Border)
      [26.50, 90.50], // Bongaigaon
      [26.44, 91.43], // Nalbari
      [26.14, 91.78], // Guwahati
    ],
  },
  {
    id: "nh-12-bengal",
    name: "NH-12 (Kolkata - Malda - Siliguri Arterial to NER)",
    code: "NH-12",
    type: "NH",
    statesCovered: ["West Bengal"],
    totalLengthKm: 580,
    elevationProfile: "Bengal Delta Plains (15m - 90m)",
    color: "#06b6d4", // cyan
    condition: "good",
    coordinates: [
      [22.57, 88.36], // Kolkata
      [23.41, 88.50], // Krishnanagar
      [24.18, 88.27], // Baharampur
      [25.01, 88.14], // Malda
      [25.78, 88.16], // Dalkhola
      [26.72, 88.42], // Siliguri
    ],
  },
  {
    id: "nh-27",
    name: "NH-27 (East-West Mountain & Valley Corridor)",
    code: "NH-27",
    type: "NH",
    statesCovered: ["Assam"],
    totalLengthKm: 650,
    elevationProfile: "Plains to Dima Hasao Foothills (50m - 850m)",
    color: "#f59e0b", // amber
    condition: "good",
    coordinates: [
      [26.18, 91.75], // Guwahati
      [26.21, 92.35], // Jagiroad
      [26.15, 92.86], // Nagaon
      [25.85, 93.18], // Lumding
      [25.18, 93.02], // Haflong
      [24.83, 92.80], // Silchar
    ],
  },
  {
    id: "nh-6",
    name: "NH-6 (Guwahati - Shillong - Silchar - Aizawl Lifeline)",
    code: "NH-6",
    type: "NH",
    statesCovered: ["Assam", "Meghalaya", "Mizoram"],
    totalLengthKm: 420,
    elevationProfile: "Steep Khasi-Jaintia Cloud Plateau (100m - 1500m)",
    color: "#ea580c", // orange
    condition: "high_landslide_risk",
    coordinates: [
      [26.14, 91.78], // Guwahati
      [25.90, 91.88], // Nongpoh
      [25.57, 91.89], // Shillong
      [25.44, 92.20], // Jowai
      [25.12, 92.37], // Sonapur (Landslide hotspot)
      [24.83, 92.79], // Silchar
      [24.23, 92.75], // Vairengte (Mizoram border)
      [23.73, 92.71], // Aizawl
    ],
  },
  {
    id: "nh-29",
    name: "NH-29 (Dimapur - Kohima - Imphal Lifeline)",
    code: "NH-29",
    type: "NH",
    statesCovered: ["Assam", "Nagaland", "Manipur"],
    totalLengthKm: 210,
    elevationProfile: "Mountainous Terrain, Paglapahar Chasm (150m - 1440m)",
    color: "#e11d48", // rose
    condition: "high_landslide_risk",
    coordinates: [
      [25.90, 93.72], // Dimapur
      [25.80, 93.85], // Chumukedima
      [25.72, 94.02], // Paglapahar
      [25.67, 94.11], // Kohima
      [25.42, 94.15], // Mao Checkpost
      [25.05, 94.02], // Senapati
      [24.81, 93.93], // Imphal
    ],
  },
  {
    id: "nh-37",
    name: "NH-37 (Upper Assam Brahmaputra Trunk)",
    code: "NH-37",
    type: "NH",
    statesCovered: ["Assam"],
    totalLengthKm: 380,
    elevationProfile: "Riverine Valley Plains (90m - 120m)",
    color: "#10b981", // emerald
    condition: "seasonal_flood",
    coordinates: [
      [26.15, 92.86], // Nagaon
      [26.58, 93.17], // Kaziranga
      [26.65, 93.95], // Bokakhat
      [26.75, 94.22], // Jorhat
      [27.47, 94.91], // Dibrugarh
      [27.50, 95.35], // Tinsukia
    ],
  },
  {
    id: "nh-13",
    name: "NH-13 (Trans-Arunachal Highway)",
    code: "NH-13",
    type: "NH",
    statesCovered: ["Arunachal Pradesh"],
    totalLengthKm: 320,
    elevationProfile: "High Himalayan Ridges (300m - 2200m)",
    color: "#6366f1", // indigo
    condition: "mountain_gorge",
    coordinates: [
      [27.10, 93.61], // Itanagar
      [27.53, 93.82], // Ziro Valley
      [27.98, 94.20], // Daporijo
      [28.06, 95.32], // Pasighat
    ],
  },
  {
    id: "nh-10",
    name: "NH-10 (Sevoke - Teesta - Gangtok Lifeline)",
    code: "NH-10",
    type: "NH",
    statesCovered: ["Sikkim", "West Bengal Corridor"],
    totalLengthKm: 120,
    elevationProfile: "Steep Teesta River Canyon (120m - 1650m)",
    color: "#8b5cf6", // violet
    condition: "high_landslide_risk",
    coordinates: [
      [26.88, 88.47], // Sevoke
      [27.05, 88.46], // Teesta Bazaar
      [27.17, 88.52], // Rangpo Checkpost
      [27.23, 88.51], // Singtam
      [27.33, 88.61], // Gangtok
    ],
  },
  {
    id: "nh-8",
    name: "NH-8 (Tripura Agro-Transit Corridor)",
    code: "NH-8",
    type: "NH",
    statesCovered: ["Assam", "Tripura"],
    totalLengthKm: 250,
    elevationProfile: "Rolling Hills & Valley Basins",
    color: "#0284c7", // sky
    condition: "good",
    coordinates: [
      [24.83, 92.79], // Silchar
      [24.37, 92.17], // Dharmanagar
      [23.95, 91.68], // Teliamura
      [23.83, 91.28], // Agartala
      [23.53, 91.49], // Udaipur
    ],
  },
  {
    id: "sh-12-bypass",
    name: "SH-12 (Jowai - Khanduli - Umrangso Mountain Bypass)",
    code: "SH-12",
    type: "BYPASS",
    statesCovered: ["Meghalaya", "Assam"],
    totalLengthKm: 165,
    elevationProfile: "Secondary Mountain Bypass Road (450m - 1100m)",
    color: "#14b8a6", // teal
    condition: "mountain_gorge",
    coordinates: [
      [25.44, 92.20], // Jowai
      [25.62, 92.42], // Nartiang
      [25.75, 92.65], // Khanduli
      [25.52, 92.78], // Umrangso
      [25.18, 93.02], // Haflong
    ],
  },
  {
    id: "sh-kohima-bypass",
    name: "Niuland - Zubza - Kohima Heavy Vehicle Bypass",
    code: "SH-Kohima-BP",
    type: "BYPASS",
    statesCovered: ["Nagaland"],
    totalLengthKm: 78,
    elevationProfile: "Hill Ridge Bypass Avoids Paglapahar",
    color: "#14b8a6",
    condition: "good",
    coordinates: [
      [25.90, 93.72], // Dimapur
      [25.88, 93.92], // Niuland
      [25.76, 94.03], // Medziphema Bypass
      [25.69, 94.08], // Zubza
      [25.67, 94.11], // Kohima
    ],
  },
];

export const NER_ROAD_HAZARDS: RoadHazard[] = [
  {
    id: "haz-sonapur-landslide",
    roadName: "NH-6 (East Jaintia Hills)",
    roadType: "NH",
    state: "Meghalaya",
    locationName: "Sonapur Tunnel & Lukha River Descent",
    lat: 25.12,
    lng: 92.37,
    hazardType: "landslide",
    severity: "critical",
    reportedAt: "Today, 05:30 AM",
    status: "blocked",
    bypassAvailable: true,
    bypassRoadName: "Jowai-Khanduli-Umrangso-Haflong Bypass (SH-12)",
    bypassDistanceKm: 142,
    estimatedDelayMinutes: 180,
    weatherCondition: {
      temp: "19°C",
      precipitation: "Continuous Torrential Downpour (92mm)",
      visibility: "Poor (<150m dense fog)",
      windSpeed: "38 km/h",
    },
    advisory: "Debris flow spanning 220 meters completely blocking both carriage lanes near Sonapur tunnel entrance. 3 BRO excavators on site. Multi-axle trucks must divert to SH-12 bypass via Khanduli or halt at designated truck laybys in Jowai.",
    bypassCoords: [
      [25.44, 92.20],
      [25.62, 92.42],
      [25.75, 92.65],
      [25.52, 92.78],
      [25.18, 93.02],
    ],
  },
  {
    id: "haz-paglapahar-landslide",
    roadName: "NH-29 (Dimapur - Kohima)",
    roadType: "NH",
    state: "Nagaland",
    locationName: "Paglapahar Boulder Fall Zone",
    lat: 25.72,
    lng: 94.02,
    hazardType: "landslide",
    severity: "critical",
    reportedAt: "Today, 03:15 AM",
    status: "blocked",
    bypassAvailable: true,
    bypassRoadName: "Niuland - Ghotovi - Zubza Hill Bypass",
    bypassDistanceKm: 68,
    estimatedDelayMinutes: 120,
    weatherCondition: {
      temp: "21°C",
      precipitation: "Heavy Thunderstorm (65mm)",
      visibility: "Moderate (400m)",
      windSpeed: "26 km/h",
    },
    advisory: "Massive rockfall and slope instability between km 124 and 128. BRO team clearing mud and rocks. Light commercial vehicles permitted via Niuland-Zubza road; 10+ wheel trucks advised to halt at Chumukedima police checkpoint.",
    bypassCoords: [
      [25.80, 93.85],
      [25.88, 93.92],
      [25.76, 94.03],
      [25.69, 94.08],
      [25.67, 94.11],
    ],
  },
  {
    id: "haz-barak-flood",
    roadName: "NH-37 / Old NH-53 (Barak Valley)",
    roadType: "NH",
    state: "Assam",
    locationName: "Silchar - Badarpur River Basin",
    lat: 24.86,
    lng: 92.62,
    hazardType: "flash_flood",
    severity: "high",
    reportedAt: "Today, 06:00 AM",
    status: "restricted",
    bypassAvailable: true,
    bypassRoadName: "Hailakandi - Panchgram High Embankment Bypass",
    bypassDistanceKm: 34,
    estimatedDelayMinutes: 75,
    weatherCondition: {
      temp: "28°C",
      precipitation: "River Barak flowing 1.2m above danger mark",
      visibility: "Normal (1.5 km)",
      windSpeed: "18 km/h",
    },
    advisory: "Submerged pavement at 3 locations up to 0.8 meters depth. Only high-ground heavy vehicles permitted one-by-one under SDRF supervision. Small cargo trucks must take Hailakandi elevated bypass.",
    bypassCoords: [
      [24.83, 92.79],
      [24.68, 92.56],
      [24.87, 92.58],
    ],
  },
  {
    id: "haz-sevoke-sikkim",
    roadName: "NH-10 (Sevoke - Rangpo)",
    roadType: "NH",
    state: "Sikkim",
    locationName: "29th Mile & Teesta Lowland",
    lat: 27.05,
    lng: 88.46,
    hazardType: "landslide",
    severity: "critical",
    reportedAt: "Yesterday, 11:40 PM",
    status: "blocked",
    bypassAvailable: true,
    bypassRoadName: "Mungpoo - Labha - Algarah - Reshi Alternate Hill Pass",
    bypassDistanceKm: 85,
    estimatedDelayMinutes: 210,
    weatherCondition: {
      temp: "16°C",
      precipitation: "Flash Flood Surge along Teesta bank",
      visibility: "Low (200m)",
      windSpeed: "30 km/h",
    },
    advisory: "River scouring washed out 40m road formation at 29th Mile. Traffic towards Gangtok redirected via Lava-Algarah-Reshi pass. Only emergency fuel and medical carriers allowed priority slots.",
    bypassCoords: [
      [26.88, 88.47],
      [26.98, 88.58],
      [27.08, 88.72],
      [27.17, 88.52],
    ],
  },
  {
    id: "haz-dhemaji-bridge",
    roadName: "NH-15 (North Bank Trunk Road)",
    roadType: "NH",
    state: "Assam",
    locationName: "Jiabhoroli & Gai River Crossing, Dhemaji",
    lat: 27.48,
    lng: 94.58,
    hazardType: "flash_flood",
    severity: "high",
    reportedAt: "Today, 04:10 AM",
    status: "restricted",
    bypassAvailable: true,
    bypassRoadName: "North Lakhimpur - Gogamukh Elevated Corridor",
    bypassDistanceKm: 42,
    estimatedDelayMinutes: 50,
    weatherCondition: {
      temp: "27°C",
      precipitation: "Monsoon river overflow",
      visibility: "Moderate (800m)",
      windSpeed: "22 km/h",
    },
    advisory: "Approach ramp submerged under 0.5m river water. Single lane regulated traffic.",
    bypassCoords: [
      [27.24, 94.11],
      [27.40, 94.35],
      [27.48, 94.58],
    ],
  },
];

export const NER_POIS: POI[] = [
  // Hospitals
  {
    id: "hosp-gmch",
    name: "Gauhati Medical College & Hospital (GMCH)",
    type: "hospital",
    state: "Assam",
    district: "Kamrup Metropolitan",
    lat: 26.155,
    lng: 91.776,
    phone: "+91-361-2529457",
    address: "Bhangagarh, Guwahati, Assam - 781032",
    details: { beds: 2185, icu: true, open24x7: true },
  },
  {
    id: "hosp-neigrihms",
    name: "NEIGRIHMS Super-Speciality Hospital",
    type: "hospital",
    state: "Meghalaya",
    district: "East Khasi Hills",
    lat: 25.592,
    lng: 91.932,
    phone: "+91-364-2538025",
    address: "Mawdiangdiang, Shillong, Meghalaya - 793018",
    details: { beds: 531, icu: true, open24x7: true },
  },
  {
    id: "hosp-smch",
    name: "Silchar Medical College & Hospital",
    type: "hospital",
    state: "Assam",
    district: "Cachar",
    lat: 24.786,
    lng: 92.793,
    phone: "+91-3842-240222",
    address: "Ghungoor, Silchar, Assam - 788014",
    details: { beds: 800, icu: true, open24x7: true },
  },
  {
    id: "hosp-rims-imphal",
    name: "Regional Institute of Medical Sciences (RIMS)",
    type: "hospital",
    state: "Manipur",
    district: "Imphal West",
    lat: 24.821,
    lng: 93.924,
    phone: "+91-385-2414629",
    address: "Lamphelpat, Imphal, Manipur - 795004",
    details: { beds: 1074, icu: true, open24x7: true },
  },
  {
    id: "hosp-naga-hospital",
    name: "Naga Hospital Authority Kohima",
    type: "hospital",
    state: "Nagaland",
    district: "Kohima",
    lat: 25.669,
    lng: 94.108,
    phone: "+91-370-2244453",
    address: "Hospital Colony, Kohima, Nagaland - 797001",
    details: { beds: 350, icu: true, open24x7: true },
  },
  {
    id: "hosp-tomo-riba",
    name: "Tomo Riba Institute of Health (TRIHMS)",
    type: "hospital",
    state: "Arunachal Pradesh",
    district: "Papum Pare",
    lat: 27.112,
    lng: 93.633,
    phone: "+91-360-2350331",
    address: "Naharlagun, Itanagar, Arunachal Pradesh - 791110",
    details: { beds: 500, icu: true, open24x7: true },
  },
  {
    id: "hosp-stnm-gangtok",
    name: "STNM Multi-Speciality Hospital",
    type: "hospital",
    state: "Sikkim",
    district: "East Sikkim",
    lat: 27.319,
    lng: 88.599,
    phone: "+91-3592-202944",
    address: "Sochagang, Sichey, Gangtok, Sikkim - 737101",
    details: { beds: 1000, icu: true, open24x7: true },
  },
  {
    id: "hosp-civil-aizawl",
    name: "Aizawl Civil Hospital & Trauma Centre",
    type: "hospital",
    state: "Mizoram",
    district: "Aizawl",
    lat: 23.731,
    lng: 92.717,
    phone: "+91-389-2322318",
    address: "Dawrpui, Aizawl, Mizoram - 796001",
    details: { beds: 400, icu: true, open24x7: true },
  },

  // Petrol & Diesel Pumps
  {
    id: "petrol-nongpoh",
    name: "IndianOil 24x7 Highway Fuel Care - Nongpoh",
    type: "petrol_pump",
    state: "Meghalaya",
    district: "Ri-Bhoi",
    lat: 25.903,
    lng: 91.881,
    phone: "+91-94361-22901",
    address: "NH-6 Midpoint, Nongpoh, Meghalaya",
    details: {
      fuelTypes: ["Diesel (High Hill Grade)", "Petrol", "DEF (AdBlue)"],
      dieselPrice: 87.42,
      open24x7: true,
    },
  },
  {
    id: "petrol-jowai",
    name: "Bharat Petroleum Mega Hill Outpost - Jowai",
    type: "petrol_pump",
    state: "Meghalaya",
    district: "West Jaintia Hills",
    lat: 25.438,
    lng: 92.202,
    phone: "+91-94363-11840",
    address: "Ladthalaboh, Jowai, NH-6 Junction",
    details: {
      fuelTypes: ["Diesel", "Petrol", "Lubricants"],
      dieselPrice: 88.15,
      open24x7: true,
    },
  },
  {
    id: "petrol-dimapur",
    name: "HPCL Highway Oasis - Chumukedima Checkpoint",
    type: "petrol_pump",
    state: "Nagaland",
    district: "Chumukedima",
    lat: 25.803,
    lng: 93.848,
    phone: "+91-98622-44119",
    address: "NH-29 Entry Gate, Dimapur Foothills",
    details: {
      fuelTypes: ["Diesel", "Petrol", "High-Torque Additives"],
      dieselPrice: 89.2,
      open24x7: true,
    },
  },
  {
    id: "petrol-lumding",
    name: "IndianOil Dima Hasao Transit Pump",
    type: "petrol_pump",
    state: "Assam",
    district: "Hojai",
    lat: 25.849,
    lng: 93.178,
    phone: "+91-94350-67210",
    address: "NH-27 Junction, Lumding Bypass",
    details: {
      fuelTypes: ["Diesel", "Heavy Truck High-Flow Dispenser"],
      dieselPrice: 86.8,
      open24x7: true,
    },
  },
  {
    id: "petrol-rangpo",
    name: "IndianOil Mountain Tanker Depot - Rangpo",
    type: "petrol_pump",
    state: "Sikkim",
    district: "Pakyong",
    lat: 27.175,
    lng: 88.523,
    phone: "+91-97330-88123",
    address: "NH-10 Border Checkpost, Rangpo, Sikkim",
    details: {
      fuelTypes: ["Low-Temperature Diesel", "Petrol"],
      dieselPrice: 89.95,
      open24x7: true,
    },
  },
  {
    id: "petrol-vairengte",
    name: "BPCL Border Fuel Hub - Vairengte",
    type: "petrol_pump",
    state: "Mizoram",
    district: "Kolasib",
    lat: 24.232,
    lng: 92.753,
    phone: "+91-94361-55821",
    address: "NH-306 Entry Gate, Vairengte",
    details: {
      fuelTypes: ["Diesel", "Petrol"],
      dieselPrice: 88.9,
      open24x7: true,
    },
  },

  // Police Stations & Border Gates
  {
    id: "pol-jowai",
    name: "Jowai District Police Station & Highway Unit",
    type: "police",
    state: "Meghalaya",
    district: "West Jaintia Hills",
    lat: 25.441,
    lng: 92.208,
    phone: "+91-3656-216223",
    address: "Main Market Road, Jowai",
    details: { officerInCharge: "DSP Transport Security", open24x7: true },
  },
  {
    id: "pol-chumukedima",
    name: "Chumukedima ILP & Inter-State Checkgate",
    type: "police",
    state: "Nagaland",
    district: "Chumukedima",
    lat: 25.801,
    lng: 93.852,
    phone: "+91-3862-240112",
    address: "NH-29 Checkpoint, Nagaland Border",
    details: { officerInCharge: "Inspector ILP Enforcement", open24x7: true },
  },
  {
    id: "pol-banderdewa",
    name: "Banderdewa Border Integrated Checkpost",
    type: "police",
    state: "Arunachal Pradesh",
    district: "Papum Pare",
    lat: 27.121,
    lng: 93.824,
    phone: "+91-360-2266224",
    address: "NH-415 Border Gate, Banderdewa",
    details: { officerInCharge: "Border Security Wing", open24x7: true },
  },
  {
    id: "pol-silchar",
    name: "Rangirkhari Highway Police Station",
    type: "police",
    state: "Assam",
    district: "Cachar",
    lat: 24.819,
    lng: 92.791,
    phone: "+91-3842-233400",
    address: "Silchar Town, Assam",
    details: { officerInCharge: "Traffic Control Wing", open24x7: true },
  },
  {
    id: "pol-kangpokpi",
    name: "Kangpokpi Highway Security Post",
    type: "police",
    state: "Manipur",
    district: "Kangpokpi",
    lat: 25.148,
    lng: 93.971,
    phone: "+91-3871-222100",
    address: "NH-2 Hill Corridor, Manipur",
    details: { officerInCharge: "Highway Protection Force", open24x7: true },
  },

  // 24/7 Garages & Truck Mechanics
  {
    id: "gar-sonapur",
    name: "Baba Vishwakarma Heavy Mountain Garage & Crane Services",
    type: "garage",
    state: "Meghalaya",
    district: "East Jaintia Hills",
    lat: 25.18,
    lng: 92.31,
    phone: "+91-98560-12845",
    address: "NH-6 Km 118 (Before Sonapur Tunnel)",
    details: {
      open24x7: true,
      mechanicSpecialty: [
        "Heavy Hydraulic Crane Recovery (50 Ton)",
        "Mountain Air-Brake Overhaul",
        "Leaf Spring & Suspension Welding",
        "Truck Tire Vulcanizing & Spares",
      ],
    },
  },
  {
    id: "gar-dimapur",
    name: "Nagaland Express Heavy Vehicle Works & Towing",
    type: "garage",
    state: "Nagaland",
    district: "Dimapur",
    lat: 25.885,
    lng: 93.738,
    phone: "+91-94360-09321",
    address: "Purana Bazar, Dimapur Bypass",
    details: {
      open24x7: true,
      mechanicSpecialty: [
        "Turbo & Engine Overheating Recovery",
        "Chassis Straightening",
        "Heavy 12-Wheeler Winch Towing",
      ],
    },
  },
  {
    id: "gar-lumding",
    name: "Assam Valley Auto Repair & Mobile Van",
    type: "garage",
    state: "Assam",
    district: "Hojai",
    lat: 25.852,
    lng: 93.175,
    phone: "+91-94351-88992",
    address: "NH-27 Junction Haflong Turn",
    details: {
      open24x7: true,
      mechanicSpecialty: ["Electrical & Alternator", "Differential & Gearbox", "Mobile Roadside Van"],
    },
  },
  {
    id: "gar-sevoke",
    name: "Himalayan Hill Truck Pitstop & Brake Specialist",
    type: "garage",
    state: "West Bengal / Sikkim Border",
    district: "Darjeeling",
    lat: 26.89,
    lng: 88.472,
    phone: "+91-98320-44912",
    address: "Sevoke Bridge Approach, NH-10",
    details: {
      open24x7: true,
      mechanicSpecialty: ["Steep Incline Brake Cooling", "Tire Chain Installation", "High Pressure Hydraulics"],
    },
  },

  // Relief Camps & Emergency High Ground Laybys
  {
    id: "rel-jowai",
    name: "SDRF Disaster Relief Hub & Heavy Layby - Jowai",
    type: "relief_camp",
    state: "Meghalaya",
    district: "West Jaintia Hills",
    lat: 25.452,
    lng: 92.215,
    phone: "1070 (Disaster Control)",
    address: "District Sports Ground & Staging Area",
    details: {
      capacity: 350,
      open24x7: true,
      officerInCharge: "State Disaster Management Authority (SDMA)",
    },
  },
  {
    id: "rel-silchar",
    name: "Cachar Flood Relief Camp & High Ground Shelter",
    type: "relief_camp",
    state: "Assam",
    district: "Cachar",
    lat: 24.838,
    lng: 92.785,
    phone: "1077 (District Emergency)",
    address: "India Club Stadium High Grounds, Silchar",
    details: {
      capacity: 800,
      open24x7: true,
      officerInCharge: "Assam SDRF Unit",
    },
  },
  {
    id: "rel-chumukedima",
    name: "BRO Paglapahar Stranded Drivers Rest Shelter",
    type: "relief_camp",
    state: "Nagaland",
    district: "Chumukedima",
    lat: 25.805,
    lng: 93.855,
    phone: "+91-3862-248900",
    address: "BRO Transit Depot, Chumukedima",
    details: {
      capacity: 250,
      open24x7: true,
      officerInCharge: "Border Roads Organisation (BRO)",
    },
  },
];

export const NER_FARMER_MSME_CLUSTERS: MSMEFarmerCluster[] = [
  {
    id: "cluster-lakadong",
    name: "Lakadong Organic Turmeric Farmers Collective",
    communityType: "farmer",
    state: "Meghalaya",
    district: "West Jaintia Hills",
    lat: 25.412,
    lng: 92.268,
    produceName: "High Curcumin (7.5%) Lakadong Turmeric",
    annualVolumeTons: 1850,
    primaryMarket: "Guwahati Export Terminal & Mumbai Mandi",
    farmGatePricePerKg: 140,
    retailMandiPricePerKg: 320,
    transportCostPerKmPerTon: 5.8, // ₹ per ton-km
    avgDistanceToHubKm: 280,
    totalFreightCostPerKg: 28.5,
    farmerProfitMarginPercent: 43.7,
    economicImpactAnalysis: "High transport friction across NH-6 landslides eats 22% of producer net revenues. Guaranteed bypass routing protects ₹14.2 Crore annual regional value addition.",
    cooperativeName: "Shangpung Spice Producers Cooperative",
    contactPerson: "Daphida Pale",
    phone: "+91-94361-88902",
  },
  {
    id: "cluster-naga-mircha",
    name: "Kohima GI Naga King Chilli (Bhut Jolokia) Growers",
    communityType: "farmer",
    state: "Nagaland",
    district: "Kohima",
    lat: 25.645,
    lng: 94.135,
    produceName: "Naga King Chilli & Organic Ginger",
    annualVolumeTons: 620,
    primaryMarket: "Dimapur Railhead & Kolkata Food Processing Hub",
    farmGatePricePerKg: 280,
    retailMandiPricePerKg: 650,
    transportCostPerKmPerTon: 7.2,
    avgDistanceToHubKm: 195,
    totalFreightCostPerKg: 45.0,
    farmerProfitMarginPercent: 41.2,
    economicImpactAnalysis: "Paglapahar landslides routinely delay perishables by 3-5 days causing 18% spoilage. Reefer truck bypass via Niuland boosts net farmer realization by 26%.",
    cooperativeName: "Angami Tribal Agro-Allied Society",
    contactPerson: "Keviletuo Angami",
    phone: "+91-98621-33418",
  },
  {
    id: "cluster-assam-tea",
    name: "Golaghat Small Tea Growers Consortium",
    communityType: "msme",
    state: "Assam",
    district: "Golaghat",
    lat: 26.518,
    lng: 93.968,
    produceName: "CTC Green Tea Leaves & Orthodox Grade",
    annualVolumeTons: 14500,
    primaryMarket: "Guwahati Tea Auction Centre (GTAC)",
    farmGatePricePerKg: 32,
    retailMandiPricePerKg: 180,
    transportCostPerKmPerTon: 3.4,
    avgDistanceToHubKm: 260,
    totalFreightCostPerKg: 9.2,
    farmerProfitMarginPercent: 28.5,
    economicImpactAnalysis: "Flood-induced diversions on NH-37 add ₹1.4 per kg in diesel logistics costs, impacting 45,000 small grower families across Upper Assam.",
    cooperativeName: "All Assam Small Tea Growers Association",
    contactPerson: "Bhaben Kalita",
    phone: "+91-94350-11234",
  },
  {
    id: "cluster-chakhao",
    name: "Imphal Valley Chak-Hao (Black Rice) FPO",
    communityType: "farmer",
    state: "Manipur",
    district: "Imphal East",
    lat: 24.815,
    lng: 93.978,
    produceName: "Aromatic GI Chak-Hao Black Rice",
    annualVolumeTons: 980,
    primaryMarket: "Silchar Transshipment Depot & Delhi Organic Mandi",
    farmGatePricePerKg: 120,
    retailMandiPricePerKg: 290,
    transportCostPerKmPerTon: 6.5,
    avgDistanceToHubKm: 340,
    totalFreightCostPerKg: 36.8,
    farmerProfitMarginPercent: 35.8,
    economicImpactAnalysis: "Single-corridor reliance on NH-37 / NH-2 makes Imphal freight costs 48% higher than Guwahati, underscoring need for integrated corridor intelligence.",
    cooperativeName: "Manipur Organic Mission Agency Cluster",
    contactPerson: "N. Tomba Singh",
    phone: "+91-98561-99201",
  },
  {
    id: "cluster-arunachal-kiwi",
    name: "Ziro Valley Organic Kiwi & Apple Producers",
    communityType: "farmer",
    state: "Arunachal Pradesh",
    district: "Lower Subansiri",
    lat: 27.545,
    lng: 93.835,
    produceName: "Certified Organic Kiwi & Wild Honey",
    annualVolumeTons: 840,
    primaryMarket: "Guwahati Air Cargo & Siliguri Cold Storage",
    farmGatePricePerKg: 95,
    retailMandiPricePerKg: 240,
    transportCostPerKmPerTon: 8.4,
    avgDistanceToHubKm: 420,
    totalFreightCostPerKg: 42.0,
    farmerProfitMarginPercent: 32.1,
    economicImpactAnalysis: "Mountain hairpin roads limit payloads to 6 tons instead of 16 tons. Cold chain visibility increases farm gate earnings by 34%.",
    cooperativeName: "Apatani Organic Farming Cooperative",
    contactPerson: "Tage Tado",
    phone: "+91-94360-77123",
  },
  {
    id: "cluster-tripura-pineapple",
    name: "Sepahijala Queen Pineapple MSME Cluster",
    communityType: "msme",
    state: "Tripura",
    district: "Sepahijala",
    lat: 23.682,
    lng: 91.318,
    produceName: "GI Queen Pineapple & Canned Pulp",
    annualVolumeTons: 5200,
    primaryMarket: "Agartala Rail Cargo & Chittagong Port (Multimodal)",
    farmGatePricePerKg: 18,
    retailMandiPricePerKg: 65,
    transportCostPerKmPerTon: 4.2,
    avgDistanceToHubKm: 180,
    totalFreightCostPerKg: 8.5,
    farmerProfitMarginPercent: 44.0,
    economicImpactAnalysis: "Perishable shelf life is only 6 days; road bottlenecks directly cause 12% dump wastage. Smart corridor bypasses protect rural livelihoods.",
    cooperativeName: "Tripura Fruit Processing Agro Union",
    contactPerson: "Sujit Debbarma",
    phone: "+91-94365-44319",
  },
  {
    id: "cluster-sikkim-cardamom",
    name: "Mangan Large Cardamom Growers Union",
    communityType: "farmer",
    state: "Sikkim",
    district: "North Sikkim",
    lat: 27.502,
    lng: 88.528,
    produceName: "Organic Large Cardamom (Bara Elaichi)",
    annualVolumeTons: 1120,
    primaryMarket: "Sevoke Mandi & Siliguri Export Center",
    farmGatePricePerKg: 920,
    retailMandiPricePerKg: 1550,
    transportCostPerKmPerTon: 9.8,
    avgDistanceToHubKm: 160,
    totalFreightCostPerKg: 68.0,
    farmerProfitMarginPercent: 54.0,
    economicImpactAnalysis: "NH-10 Teesta scouring disruptions strand cardamom consignments; real-time pass status via Lava saves ₹3.8 Lakh in transit insurance claims.",
    cooperativeName: "Himalayan Organic Spices Union",
    contactPerson: "Lhakpa Lepcha",
    phone: "+91-97330-66442",
  },
  {
    id: "cluster-mizoram-anthurium",
    name: "Champhai Ginger & Anthurium Flower Growers",
    communityType: "farmer",
    state: "Mizoram",
    district: "Champhai",
    lat: 23.475,
    lng: 93.328,
    produceName: "Export-Grade Anthurium & Dry Ginger",
    annualVolumeTons: 750,
    primaryMarket: "Aizawl Lengpui Airport & Silchar Railhead",
    farmGatePricePerKg: 160,
    retailMandiPricePerKg: 380,
    transportCostPerKmPerTon: 7.9,
    avgDistanceToHubKm: 310,
    totalFreightCostPerKg: 46.5,
    farmerProfitMarginPercent: 38.5,
    economicImpactAnalysis: "High gradient mountain fuel surcharge reduces farmer take-home profit. FPO freight pooling lowers per-kg shipping overhead by 29%.",
    cooperativeName: "Zoram Floriculture & Spice Mission",
    contactPerson: "Lalramhluna",
    phone: "+91-94361-99881",
  },
];

export const NER_TRANSIT_PERMITS: TransitPermit[] = [
  {
    id: "permit-arunachal-ilp",
    permitType: "ILP",
    title: "Inner Line Permit (ILP) - Arunachal Commercial Crew & Freight",
    state: "Arunachal Pradesh",
    appliesTo: "Drivers, co-drivers, and cargo entering Arunachal boundary gates",
    validityDays: 30,
    feeINR: 200,
    documentsNeeded: [
      "Government Photo ID (Aadhaar / Voter ID)",
      "Commercial Driver's License (HMV category)",
      "Consignor Invoice with Destination Gate specified",
      "Vehicle RC & PUC Certificate",
    ],
    officialPortal: "arunachalilp.com / Banderdewa Checkpost",
    status: "active",
  },
  {
    id: "permit-nagaland-ilp",
    permitType: "ILP",
    title: "Nagaland Commercial Vehicle Entry & Transit Pass",
    state: "Nagaland",
    appliesTo: "All goods transport crossing Dimapur / Kohima / Chumukedima",
    validityDays: 15,
    feeINR: 150,
    documentsNeeded: [
      "Driver License with Hill Endorsement",
      "Goods Consignment Note (Bilty / LR)",
      "Vehicle GPS Tracking Certificate",
      "GST E-Way Bill with Dimapur Checkpost clearance",
    ],
    officialPortal: "ilp.nagaland.gov.in",
    status: "active",
  },
  {
    id: "permit-mizoram-ilp",
    permitType: "ILP",
    title: "Mizoram Commercial Inward Entry Permit (Vairengte Gate)",
    state: "Mizoram",
    appliesTo: "Freight trucks carrying essential goods and farm produce",
    validityDays: 15,
    feeINR: 120,
    documentsNeeded: [
      "Driver KYC & Aadhaar Card",
      "Local Sponsor / Consignee Registration in Mizoram",
      "Vehicle Insurance & Hill Fitness Form 38",
    ],
    officialPortal: "mizoramilp.nic.in",
    status: "active",
  },
  {
    id: "permit-manipur-ilp",
    permitType: "ILP",
    title: "Manipur Commercial Transport ILP & Security Clearance",
    state: "Manipur",
    appliesTo: "Trucks entering via Mao Gate / Jiribam Gate",
    validityDays: 15,
    feeINR: 250,
    documentsNeeded: [
      "Driver Heavy Motor Vehicle License",
      "State Security Counter-Sign at Mao / Jiribam",
      "E-Way Bill & Cargo manifest",
    ],
    officialPortal: "manipurilponline.mn.gov.in",
    status: "active",
  },
  {
    id: "permit-hill-fitness",
    permitType: "HILL_FITNESS",
    title: "Form 38: Hilly Terrain Commercial Vehicle Fitness Certificate",
    state: "All 8 NER States (Inter-State Mandate)",
    appliesTo: "Mandatory for all trucks over 7.5 GVW operating in hilly corridors",
    validityDays: 365,
    feeINR: 600,
    documentsNeeded: [
      "Dual-circuit Mountain Air-Brake Test Report",
      "Tire Tread Depth (>4mm mountain spec) Certificate",
      "Speed Governor Calibration Certificate (40 km/h hill lock)",
      "High-beam fog lamp and reverse warning siren test",
    ],
    officialPortal: "parivahan.gov.in",
    status: "active",
  },
  {
    id: "permit-green-corridor",
    permitType: "GREEN_CORRIDOR",
    title: "NER Perishable Produce Green Corridor Fast-Track Clearance",
    state: "Inter-State (NER Vision 2030 / APEDA)",
    appliesTo: "Exempts organic farm produce from long border gate holding queues",
    validityDays: 60,
    feeINR: 0, // Free government initiative
    documentsNeeded: [
      "FPO / Cooperative Organic Certificate",
      "Perishable Cargo Waybill (shelf life < 7 days)",
      "Digital RFID Fast-Tag Clearance",
    ],
    officialPortal: "apeda.gov.in / NERAMAC Gateway",
    status: "active",
  },
];

export const DEMO_DRIVER_TRIP: DriverTrip = {
  id: "trip-ner-8492",
  origin: "Guwahati Wholesale Agricultural Mandi (Assam)",
  destination: "Silchar Transit Logistics Terminal (Cachar)",
  originCoords: [26.14, 91.78],
  destCoords: [24.83, 92.79],
  distanceKm: 310,
  estimatedHours: 8.5,
  cargo: "Essential Pharmaceutical & Horticultural Farm Seeds (14 Tons)",
  truckNo: "AS-01-GC-4921 (10-Wheeler Ashok Leyland)",
  driverName: "Bipul Sharma",
  activeHazardsOnRoute: [NER_ROAD_HAZARDS[0]], // Sonapur Landslide
  suggestedBypass: {
    name: "SH-12 via Jowai - Khanduli - Umrangso - Haflong Mountain Bypass",
    extraKm: 42,
    delayMinutes: 180,
    description: "Avoids Sonapur tunnel debris blockage. Passes through high ridge with 2 operational petrol pumps and 24/7 recovery garage at Haflong.",
  },
};

// 32 Major Origin & Destination Hubs: Pan-India Gateways connecting to North East + All 8 NER States
export const NER_ROUTE_NODES: RouteSearchNode[] = [
  // Major Pan-India Gateways connecting to North East (via the Siliguri "Chicken's Neck" Corridor)
  { id: "node-siliguri", name: "Siliguri (Chicken's Neck Gateway)", state: "West Bengal", district: "Darjeeling", coords: [26.72, 88.42], type: "industrial_hub" },
  { id: "node-kolkata", name: "Kolkata (Port & Eastern Freight Gateway)", state: "West Bengal", district: "Kolkata", coords: [22.57, 88.36], type: "city" },
  { id: "node-delhi", name: "Delhi NCR (Northern Logistics Trunk)", state: "Delhi", district: "New Delhi", coords: [28.61, 77.21], type: "city" },
  { id: "node-patna", name: "Patna (Bihar / Ganga Basin Central)", state: "Bihar", district: "Patna", coords: [25.60, 85.13], type: "city" },
  { id: "node-mumbai", name: "Mumbai (Western Commercial Gateway)", state: "Maharashtra", district: "Mumbai", coords: [19.07, 72.87], type: "city" },
  { id: "node-bengaluru", name: "Bengaluru (Southern Logistics Hub)", state: "Karnataka", district: "Bengaluru Urban", coords: [12.97, 77.59], type: "city" },
  { id: "node-lucknow", name: "Lucknow (UP Central Expressway)", state: "Uttar Pradesh", district: "Lucknow", coords: [26.84, 80.94], type: "city" },

  // North East Central & Frontier State Capitals and Major Mandis
  { id: "node-guwahati", name: "Guwahati (NER Distribution Gateway)", state: "Assam", district: "Kamrup Metro", coords: [26.14, 91.78], type: "city" },
  { id: "node-shillong", name: "Shillong (East Khasi Hills)", state: "Meghalaya", district: "East Khasi Hills", coords: [25.57, 91.89], type: "city" },
  { id: "node-silchar", name: "Silchar (Barak Valley Terminal)", state: "Assam", district: "Cachar", coords: [24.83, 92.79], type: "industrial_hub" },
  { id: "node-imphal", name: "Imphal (Kangla Logistics Terminal)", state: "Manipur", district: "Imphal West", coords: [24.81, 93.93], type: "city" },
  { id: "node-dimapur", name: "Dimapur (Rail-Head Freight Yard)", state: "Nagaland", district: "Dimapur", coords: [25.90, 93.72], type: "industrial_hub" },
  { id: "node-kohima", name: "Kohima (Capital Outpost)", state: "Nagaland", district: "Kohima", coords: [25.67, 94.11], type: "city" },
  { id: "node-aizawl", name: "Aizawl (Bawngkawn Transit Yard)", state: "Mizoram", district: "Aizawl", coords: [23.73, 92.71], type: "city" },
  { id: "node-agartala", name: "Agartala (Integrated Check Post)", state: "Tripura", district: "West Tripura", coords: [23.83, 91.28], type: "city" },
  { id: "node-itanagar", name: "Itanagar (Papum Pare Hub)", state: "Arunachal Pradesh", district: "Papum Pare", coords: [27.10, 93.61], type: "city" },
  { id: "node-gangtok", name: "Gangtok (Tadong Freight Terminal)", state: "Sikkim", district: "East Sikkim", coords: [27.33, 88.61], type: "city" },
  { id: "node-dibrugarh", name: "Dibrugarh (Upper Assam Tea Terminal)", state: "Assam", district: "Dibrugarh", coords: [27.47, 94.91], type: "industrial_hub" },
  { id: "node-jorhat", name: "Jorhat (Agro-Marketing Yard)", state: "Assam", district: "Jorhat", coords: [26.75, 94.22], type: "mandi" },
  { id: "node-tawang", name: "Tawang (High-Altitude Border Depot)", state: "Arunachal Pradesh", district: "Tawang", coords: [27.58, 91.86], type: "border_gate" },
  { id: "node-haflong", name: "Haflong (Dima Hasao Junction)", state: "Assam", district: "Dima Hasao", coords: [25.18, 93.02], type: "city" },
  { id: "node-jowai", name: "Jowai (Jaintia Coal & Spice Mandi)", state: "Meghalaya", district: "West Jaintia Hills", coords: [25.44, 92.20], type: "mandi" },
  { id: "node-nongpoh", name: "Nongpoh (Ri-Bhoi Transit Hub)", state: "Meghalaya", district: "Ri-Bhoi", coords: [25.90, 91.88], type: "city" },
  { id: "node-tezpur", name: "Tezpur (Sonitpur River Gateway)", state: "Assam", district: "Sonitpur", coords: [26.63, 92.80], type: "city" },
  { id: "node-pasighat", name: "Pasighat (Siang Valley Terminal)", state: "Arunachal Pradesh", district: "East Siang", coords: [28.06, 95.32], type: "industrial_hub" },
  { id: "node-chumukedima", name: "Chumukedima Checkpost (Nagaland Entry)", state: "Nagaland", district: "Chumukedima", coords: [25.80, 93.85], type: "checkpost" },
  { id: "node-mao-gate", name: "Mao Gate (Manipur-Nagaland Border)", state: "Manipur", district: "Senapati", coords: [25.42, 94.15], type: "border_gate" },
  { id: "node-vairengte", name: "Vairengte Gate (Mizoram ILP Checkpost)", state: "Mizoram", district: "Kolasib", coords: [24.23, 92.75], type: "border_gate" },
  { id: "node-banderdewa", name: "Banderdewa Gate (Arunachal ILP Checkpost)", state: "Arunachal Pradesh", district: "Papum Pare", coords: [27.13, 93.82], type: "checkpost" },
  { id: "node-rangpo", name: "Rangpo Checkpost (Sikkim Entry)", state: "Sikkim", district: "Pakyong", coords: [27.17, 88.52], type: "border_gate" },
  { id: "node-dharmanagar", name: "Dharmanagar (North Tripura Transit)", state: "Tripura", district: "North Tripura", coords: [24.37, 92.17], type: "industrial_hub" },
  { id: "node-nagaon", name: "Nagaon (Central Assam Agro Crossroad)", state: "Assam", district: "Nagaon", coords: [26.35, 92.68], type: "mandi" },
];

export interface PopularCorridorPreset {
  title: string;
  category: "pan_india" | "ner_lifeline";
  originId: string;
  destinationId: string;
  highwayLabel: string;
  hazardWarning?: string;
}

export const POPULAR_CORRIDOR_PRESETS: PopularCorridorPreset[] = [
  // 1. Pan-India Corridors to North East Gateway (Guwahati)
  {
    title: "Kolkata ➔ Guwahati",
    category: "pan_india",
    originId: "node-kolkata",
    destinationId: "node-guwahati",
    highwayLabel: "NH-12 / NH-27 Bengal-Assam Lifeline (990 km)",
    hazardWarning: "Siliguri Chicken's Neck Congestion & Srirampur Checkpost",
  },
  {
    title: "Delhi NCR ➔ Guwahati",
    category: "pan_india",
    originId: "node-delhi",
    destinationId: "node-guwahati",
    highwayLabel: "NH-27 East-West National Expressway (1,880 km)",
    hazardWarning: "Heavy Freight Corridor via Gorakhpur - Siliguri Gateway",
  },
  {
    title: "Siliguri ➔ Guwahati",
    category: "pan_india",
    originId: "node-siliguri",
    destinationId: "node-guwahati",
    highwayLabel: "NH-27 Chicken's Neck to NER Gateway (475 km)",
    hazardWarning: "Srirampur Assam-Bengal Border Verification Toll Gate",
  },
  {
    title: "Patna ➔ Guwahati",
    category: "pan_india",
    originId: "node-patna",
    destinationId: "node-guwahati",
    highwayLabel: "NH-27 Ganga Basin to Assam Trunk (860 km)",
    hazardWarning: "Purnia - Dalkhola - Siliguri Arterial Junction",
  },
  {
    title: "Delhi NCR ➔ Imphal",
    category: "pan_india",
    originId: "node-delhi",
    destinationId: "node-imphal",
    highwayLabel: "NH-27 / NH-29 Trans-India Frontier Lifeline (2,360 km)",
    hazardWarning: "Requires Nagaland ILP & Mao Gate Hill Endorsement",
  },
  {
    title: "Mumbai ➔ Guwahati",
    category: "pan_india",
    originId: "node-mumbai",
    destinationId: "node-guwahati",
    highwayLabel: "NH-48 / NH-27 Trans-India Industrial Route (2,520 km)",
    hazardWarning: "Long-haul Multi-Axle Carrier Transit Permits Required",
  },

  // 2. Intra-North East Mountain Lifelines
  {
    title: "Guwahati ➔ Silchar",
    category: "ner_lifeline",
    originId: "node-guwahati",
    destinationId: "node-silchar",
    highwayLabel: "NH-6 Meghalaya Hill Lifeline (310 km)",
    hazardWarning: "Active Landslide at Sonapur Tunnel (SH-12 Bypass Available)",
  },
  {
    title: "Guwahati ➔ Imphal",
    category: "ner_lifeline",
    originId: "node-guwahati",
    destinationId: "node-imphal",
    highwayLabel: "NH-27 / NH-29 Ridge Corridor (480 km)",
    hazardWarning: "Boulder Fall Risk at Paglapahar (Niuland Bypass Available)",
  },
  {
    title: "Shillong ➔ Agartala",
    category: "ner_lifeline",
    originId: "node-shillong",
    destinationId: "node-agartala",
    highwayLabel: "NH-6 / NH-8 Agro Corridor (445 km)",
    hazardWarning: "Barak Valley Embankment Water Logging (Hailakandi Bypass)",
  },
  {
    title: "Guwahati ➔ Tawang",
    category: "ner_lifeline",
    originId: "node-guwahati",
    destinationId: "node-tawang",
    highwayLabel: "NH-15 / NH-13 Trans-Arunachal (460 km)",
    hazardWarning: "Sela Pass High Altitude Frost & Fog Advisory",
  },
  {
    title: "Silchar ➔ Aizawl",
    category: "ner_lifeline",
    originId: "node-silchar",
    destinationId: "node-aizawl",
    highwayLabel: "NH-306 / NH-6 Mizoram Lifeline (175 km)",
    hazardWarning: "Vairengte ILP Verification Clearance Gate",
  },
  {
    title: "Guwahati ➔ Gangtok",
    category: "ner_lifeline",
    originId: "node-guwahati",
    destinationId: "node-gangtok",
    highwayLabel: "NH-27 / NH-10 Teesta Canyon (540 km)",
    hazardWarning: "Teesta River Scouring at 29th Mile (Lava Bypass)",
  },
];

// Helper to calculate realistic mountain route path, distance, time, and hazard alerts
export function calculateNerRoute(
  origin: RouteSearchNode,
  dest: RouteSearchNode,
  bypassActive: boolean = false
): CalculatedRouteResult {
  // Check known standard corridors
  const key = `${origin.id}->${dest.id}`;
  const reverseKey = `${dest.id}->${origin.id}`;

  let waypoints: [number, number][] = [];
  let highwayNames: string[] = [];
  let totalDistanceKm = 0;
  let estimatedHours = 0;
  let hazardsOnRoute: RoadHazard[] = [];
  let bypassRoadName: string | undefined;
  let bypassCoords: [number, number][] | undefined;
  let bypassDistanceKm = 0;
  let bypassDelayMinutes = 0;
  let terrainType = "Hilly & Mountainous Terrain with Sharp Hairpin Bends";
  let elevationGainMeters = 1200;
  let tollsAndCheckpostsCount = 3;

  // 1. Siliguri <-> Guwahati ("Chicken's Neck" Gateway Lifeline to NER)
  if (
    (origin.id === "node-siliguri" && dest.id === "node-guwahati") ||
    (origin.id === "node-guwahati" && dest.id === "node-siliguri")
  ) {
    highwayNames = ["NH-27 (Chicken's Neck Siliguri Corridor - Alipurduar - Srirampur - Bongaigaon - Guwahati)"];
    hazardsOnRoute = [];
    elevationGainMeters = 240;
    tollsAndCheckpostsCount = 6;
    waypoints = [
      [26.72, 88.42], // Siliguri (Gateway to NER)
      [26.54, 88.71], // Jalpaiguri
      [26.51, 89.37], // Alipurduar
      [26.49, 89.87], // Srirampur Inter-State Gate (Assam-Bengal border)
      [26.50, 90.50], // Bongaigaon
      [26.44, 91.43], // Nalbari
      [26.14, 91.78], // Guwahati
    ];
    totalDistanceKm = 475;
    estimatedHours = 9.5;
    terrainType = "Chicken's Neck Plains Corridor to Brahmaputra Valley";
  }
  // 2. Kolkata <-> Guwahati (NH-12 / NH-27 Bengal-Assam Lifeline)
  else if (
    (origin.id === "node-kolkata" && dest.id === "node-guwahati") ||
    (origin.id === "node-guwahati" && dest.id === "node-kolkata")
  ) {
    highwayNames = ["NH-12 (Kolkata - Malda Arterial)", "NH-27 (Siliguri - Srirampur - Guwahati Lifeline)"];
    hazardsOnRoute = [];
    elevationGainMeters = 380;
    tollsAndCheckpostsCount = 10;
    waypoints = [
      [22.57, 88.36], // Kolkata
      [23.41, 88.50], // Krishnanagar
      [24.18, 88.27], // Baharampur
      [25.01, 88.14], // Malda
      [25.78, 88.16], // Dalkhola
      [26.72, 88.42], // Siliguri ("Chicken's Neck")
      [26.54, 88.71], // Jalpaiguri
      [26.49, 89.87], // Srirampur Inter-State Border Gate
      [26.50, 90.50], // Bongaigaon
      [26.14, 91.78], // Guwahati
    ];
    totalDistanceKm = 990;
    estimatedHours = 22.0;
    terrainType = "Gangetic Delta, North Bengal Chicken's Neck, Assam Valley";
  }
  // 3. Delhi NCR <-> Guwahati (NH-27 East-West National Expressway)
  else if (
    (origin.id === "node-delhi" && dest.id === "node-guwahati") ||
    (origin.id === "node-guwahati" && dest.id === "node-delhi")
  ) {
    highwayNames = ["NH-27 East-West National Freight Trunk (Delhi - Gorakhpur - Siliguri - Guwahati)"];
    hazardsOnRoute = [];
    elevationGainMeters = 420;
    tollsAndCheckpostsCount = 18;
    waypoints = [
      [28.61, 77.21], // Delhi NCR
      [27.18, 78.01], // Agra
      [26.84, 80.94], // Lucknow
      [26.76, 83.37], // Gorakhpur
      [26.12, 85.39], // Muzaffarpur
      [25.77, 87.47], // Purnia
      [26.72, 88.42], // Siliguri (Chicken's Neck Gateway)
      [26.49, 89.87], // Srirampur Gate (Assam Entry)
      [26.50, 90.50], // Bongaigaon
      [26.14, 91.78], // Guwahati
    ];
    totalDistanceKm = 1880;
    estimatedHours = 38.0;
    terrainType = "Northern Plains Expressway, Siliguri Bottleneck, Brahmaputra Valley";
  }
  // 4. Patna <-> Guwahati (NH-27 Ganga Basin to Assam Trunk)
  else if (
    (origin.id === "node-patna" && dest.id === "node-guwahati") ||
    (origin.id === "node-guwahati" && dest.id === "node-patna")
  ) {
    highwayNames = ["NH-27 East-West Arterial (Patna - Purnia - Siliguri - Guwahati)"];
    hazardsOnRoute = [];
    elevationGainMeters = 260;
    tollsAndCheckpostsCount = 8;
    waypoints = [
      [25.60, 85.13], // Patna
      [25.41, 86.13], // Begusarai
      [25.77, 87.47], // Purnia
      [26.72, 88.42], // Siliguri
      [26.49, 89.87], // Srirampur Border Gate
      [26.50, 90.50], // Bongaigaon
      [26.14, 91.78], // Guwahati
    ];
    totalDistanceKm = 860;
    estimatedHours = 18.0;
    terrainType = "Ganga Basin Plains to North East Gateway";
  }
  // 5. Delhi NCR <-> Imphal (Trans-India Frontier Lifeline)
  else if (
    (origin.id === "node-delhi" && dest.id === "node-imphal") ||
    (origin.id === "node-imphal" && dest.id === "node-delhi")
  ) {
    highwayNames = ["NH-27 East-West Expressway", "NH-29 Nagaland-Manipur Hill Lifeline"];
    hazardsOnRoute = [NER_ROAD_HAZARDS[1]]; // Paglapahar
    bypassRoadName = "Niuland - Zubza Hill Bypass Road";
    bypassCoords = NER_ROAD_HAZARDS[1].bypassCoords;
    bypassDistanceKm = 26;
    bypassDelayMinutes = 120;
    elevationGainMeters = 1950;
    tollsAndCheckpostsCount = 22;
    waypoints = [
      [28.61, 77.21], // Delhi NCR
      [26.84, 80.94], // Lucknow
      [26.76, 83.37], // Gorakhpur
      [25.77, 87.47], // Purnia
      [26.72, 88.42], // Siliguri
      [26.49, 89.87], // Srirampur Gate
      [26.14, 91.78], // Guwahati
      [26.15, 92.86], // Nagaon
      [25.90, 93.72], // Dimapur
      [25.80, 93.85], // Chumukedima
      [25.72, 94.02], // Paglapahar
      [25.67, 94.11], // Kohima
      [25.42, 94.15], // Mao Gate
      [24.81, 93.93], // Imphal
    ];
    totalDistanceKm = 2360;
    estimatedHours = 50.5;
    terrainType = "Trans-India Plains transitioning to Steep Nagaland-Manipur Mountain Gorges";
  }
  // 6. Mumbai <-> Guwahati (NH-48 / NH-27 Trans-India Industrial Route)
  else if (
    (origin.id === "node-mumbai" && dest.id === "node-guwahati") ||
    (origin.id === "node-guwahati" && dest.id === "node-mumbai")
  ) {
    highwayNames = ["NH-48 / NH-53 / NH-27 (Mumbai - Nagpur - Siliguri - Guwahati)"];
    hazardsOnRoute = [];
    elevationGainMeters = 680;
    tollsAndCheckpostsCount = 24;
    waypoints = [
      [19.07, 72.87], // Mumbai
      [19.99, 73.78], // Nashik
      [21.14, 79.08], // Nagpur
      [21.25, 81.62], // Raipur
      [23.34, 85.30], // Ranchi
      [26.72, 88.42], // Siliguri
      [26.49, 89.87], // Srirampur Gate
      [26.14, 91.78], // Guwahati
    ];
    totalDistanceKm = 2520;
    estimatedHours = 48.0;
    terrainType = "Deccan Plateau, Central Freight Corridors, North Bengal & Assam Valley";
  }
  // 7. Guwahati <-> Silchar (NH-6 Meghalaya Mountain Lifeline)
  else if (
    (origin.id === "node-guwahati" && dest.id === "node-silchar") ||
    (origin.id === "node-silchar" && dest.id === "node-guwahati") ||
    (origin.id === "node-shillong" && dest.id === "node-silchar")
  ) {
    highwayNames = ["NH-6 (Guwahati - Shillong - Jowai - Silchar)"];
    hazardsOnRoute = [NER_ROAD_HAZARDS[0]]; // Sonapur landslide
    bypassRoadName = "SH-12 via Khanduli - Umrangso - Haflong Mountain Bypass";
    bypassCoords = NER_ROAD_HAZARDS[0].bypassCoords;
    bypassDistanceKm = 42;
    bypassDelayMinutes = 180;
    elevationGainMeters = 1550;
    tollsAndCheckpostsCount = 4;

    if (bypassActive) {
      waypoints = [
        [26.14, 91.78], // Guwahati
        [25.90, 91.88], // Nongpoh
        [25.57, 91.89], // Shillong
        [25.44, 92.20], // Jowai
        [25.62, 92.42], // Nartiang (Bypass)
        [25.75, 92.65], // Khanduli (Bypass)
        [25.52, 92.78], // Umrangso (Bypass)
        [25.18, 93.02], // Haflong (Bypass)
        [24.83, 92.79], // Silchar
      ];
      totalDistanceKm = 352;
      estimatedHours = 11.5;
    } else {
      waypoints = [
        [26.14, 91.78], // Guwahati
        [25.90, 91.88], // Nongpoh
        [25.57, 91.89], // Shillong
        [25.44, 92.20], // Jowai
        [25.12, 92.37], // Sonapur Tunnel (Landslide hazard)
        [24.83, 92.79], // Silchar
      ];
      totalDistanceKm = 310;
      estimatedHours = 8.5;
    }
  } 
  // 2. Guwahati <-> Imphal (NH-27 / NH-29)
  else if (
    (origin.id === "node-guwahati" && dest.id === "node-imphal") ||
    (origin.id === "node-imphal" && dest.id === "node-guwahati") ||
    (origin.id === "node-dimapur" && dest.id === "node-imphal")
  ) {
    highwayNames = ["NH-27 (Nagaon Corridor)", "NH-29 (Dimapur - Kohima - Imphal)"];
    hazardsOnRoute = [NER_ROAD_HAZARDS[1]]; // Paglapahar
    bypassRoadName = "Niuland - Ghotovi - Zubza Hill Bypass Road";
    bypassCoords = NER_ROAD_HAZARDS[1].bypassCoords;
    bypassDistanceKm = 26;
    bypassDelayMinutes = 120;
    elevationGainMeters = 1680;
    tollsAndCheckpostsCount = 5;

    if (bypassActive) {
      waypoints = [
        [26.14, 91.78], // Guwahati
        [26.15, 92.86], // Nagaon
        [25.90, 93.72], // Dimapur
        [25.88, 93.92], // Niuland (Bypass)
        [25.76, 94.03], // Medziphema Bypass
        [25.69, 94.08], // Zubza (Bypass)
        [25.67, 94.11], // Kohima
        [25.42, 94.15], // Mao Checkpost
        [24.81, 93.93], // Imphal
      ];
      totalDistanceKm = 506;
      estimatedHours = 14.2;
    } else {
      waypoints = [
        [26.14, 91.78], // Guwahati
        [26.15, 92.86], // Nagaon
        [25.90, 93.72], // Dimapur
        [25.80, 93.85], // Chumukedima
        [25.72, 94.02], // Paglapahar (Landslide hazard)
        [25.67, 94.11], // Kohima
        [25.42, 94.15], // Mao Checkpost
        [24.81, 93.93], // Imphal
      ];
      totalDistanceKm = 480;
      estimatedHours = 12.5;
    }
  }
  // 3. Shillong / Guwahati <-> Agartala (NH-6 / NH-8)
  else if (
    (origin.id === "node-shillong" && dest.id === "node-agartala") ||
    (origin.id === "node-guwahati" && dest.id === "node-agartala") ||
    (origin.id === "node-silchar" && dest.id === "node-agartala")
  ) {
    highwayNames = ["NH-6 Meghalaya", "NH-8 Tripura Transit Corridor"];
    hazardsOnRoute = [NER_ROAD_HAZARDS[0], NER_ROAD_HAZARDS[2]]; // Sonapur + Barak
    bypassRoadName = "Hailakandi - Panchgram Elevated Flood Embankment";
    bypassCoords = NER_ROAD_HAZARDS[2].bypassCoords;
    bypassDistanceKm = 34;
    bypassDelayMinutes = 75;
    elevationGainMeters = 1100;
    tollsAndCheckpostsCount = 4;

    waypoints = [
      origin.coords,
      [25.57, 91.89], // Shillong
      [25.44, 92.20], // Jowai
      [24.83, 92.79], // Silchar
      [24.37, 92.17], // Dharmanagar
      [23.95, 91.68], // Teliamura
      [23.83, 91.28], // Agartala
    ];
    totalDistanceKm = 445;
    estimatedHours = 12.0;
  }
  // 4. Guwahati <-> Gangtok (NH-27 / NH-10)
  else if (
    (origin.id === "node-guwahati" && dest.id === "node-gangtok") ||
    (origin.id === "node-gangtok" && dest.id === "node-guwahati")
  ) {
    highwayNames = ["NH-27 West Corridor", "NH-10 Sevoke - Teesta Canyon"];
    hazardsOnRoute = [NER_ROAD_HAZARDS[3]]; // Sevoke Landslide
    bypassRoadName = "Mungpoo - Labha - Algarah - Reshi Alternate Hill Pass";
    bypassCoords = NER_ROAD_HAZARDS[3].bypassCoords;
    bypassDistanceKm = 85;
    bypassDelayMinutes = 210;
    elevationGainMeters = 2100;
    tollsAndCheckpostsCount = 4;

    waypoints = [
      [26.14, 91.78], // Guwahati
      [26.50, 90.50], // Bongaigaon
      [26.88, 88.47], // Sevoke
      [27.05, 88.46], // Teesta (Landslide hazard)
      [27.17, 88.52], // Rangpo
      [27.33, 88.61], // Gangtok
    ];
    totalDistanceKm = 540;
    estimatedHours = 13.5;
  }
  // 5. Silchar <-> Aizawl (NH-306)
  else if (
    (origin.id === "node-silchar" && dest.id === "node-aizawl") ||
    (origin.id === "node-aizawl" && dest.id === "node-silchar")
  ) {
    highwayNames = ["NH-306 / NH-6 Mizoram Lifeline"];
    hazardsOnRoute = [];
    elevationGainMeters = 1350;
    tollsAndCheckpostsCount = 3;

    waypoints = [
      [24.83, 92.79], // Silchar
      [24.23, 92.75], // Vairengte Checkpost
      [24.05, 92.72], // Kolasib
      [23.73, 92.71], // Aizawl
    ];
    totalDistanceKm = 175;
    estimatedHours = 5.5;
  }
  // Generic Highway Router connecting any pair of 25 NER hubs along actual NH corridors
  else {
    // Determine the regional corridor path
    const intermediatePoints: [number, number][] = [];
    const hws: string[] = [];

    const panIndiaNodeIds = ["node-delhi", "node-kolkata", "node-siliguri", "node-patna", "node-mumbai", "node-bengaluru", "node-lucknow"];
    const isOriginPanIndia = panIndiaNodeIds.includes(origin.id);
    const isDestPanIndia = panIndiaNodeIds.includes(dest.id);

    // If crossing from mainland India to North East, route through the Siliguri Corridor into Guwahati
    if (isOriginPanIndia || isDestPanIndia) {
      hws.push("NH-27 East-West National Arterial", "Siliguri Chicken's Neck Corridor");
      if (origin.id !== "node-siliguri" && dest.id !== "node-siliguri") {
        intermediatePoints.push([26.72, 88.42]); // Siliguri Gateway
      }
      intermediatePoints.push([26.49, 89.87]); // Srirampur Interstate Checkpost (Assam Entry)
      if (origin.id !== "node-guwahati" && dest.id !== "node-guwahati") {
        intermediatePoints.push([26.14, 91.78]); // Guwahati Central Distribution Hub
      }
    }

    // Check if crossing between North Bank (Arunachal/Tezpur) and South Bank/Central
    const isArunachalNorth = dest.state === "Arunachal Pradesh" || origin.state === "Arunachal Pradesh";
    const isSikkimWest = dest.state === "Sikkim" || origin.state === "Sikkim";
    const isNagalandManipur = dest.state === "Nagaland" || dest.state === "Manipur" || origin.state === "Nagaland" || origin.state === "Manipur";
    const isSouthBarakMizoramTripura = ["Tripura", "Mizoram"].includes(dest.state) || (dest.id === "node-silchar" || dest.id === "node-haflong");

    // Add sensible highway gateway hubs
    if (isSikkimWest && !origin.name.includes("Gangtok") && !dest.name.includes("Gangtok")) {
      intermediatePoints.push([26.50, 90.50], [26.88, 88.47], [27.17, 88.52]);
      hws.push("NH-27 West Corridor", "NH-10 Teesta Canyon");
    } else if (isArunachalNorth && (origin.id === "node-tawang" || dest.id === "node-tawang")) {
      intermediatePoints.push([26.63, 92.80], [27.01, 92.64], [27.26, 92.42], [27.50, 92.10]);
      hws.push("NH-15 Brahmaputra North Trunk", "NH-13 Bhalukpong-Tawang Alpine Highway");
    } else if (isNagalandManipur) {
      intermediatePoints.push([26.35, 92.68], [25.90, 93.72], [25.67, 94.11]);
      hws.push("NH-27 Nagaon Arterial", "NH-29 Dimapur-Kohima Lifeline");
    } else if (isSouthBarakMizoramTripura) {
      intermediatePoints.push([25.57, 91.89], [25.44, 92.20], [24.83, 92.79]);
      hws.push("NH-6 Khasi-Jaintia Hills Lifeline");
    } else {
      // Brahmaputra Valley trunk
      intermediatePoints.push([26.35, 92.68], [26.75, 94.22]);
      hws.push("NH-27 / NH-37 Assam Valley Trunk");
    }

    // Filter intermediate points to ensure monotonic progression between origin and destination
    waypoints = [origin.coords, ...intermediatePoints, dest.coords];

    // Compute realistic distance along the waypoints
    let distSum = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const p1 = waypoints[i];
      const p2 = waypoints[i + 1];
      const dLat = (p2[0] - p1[0]) * 111;
      const dLng = (p2[1] - p1[1]) * 102;
      distSum += Math.sqrt(dLat * dLat + dLng * dLng) * 1.32; // terrain curvature factor
    }

    totalDistanceKm = Math.round(distSum);
    estimatedHours = Number((totalDistanceKm / 38).toFixed(1));
    highwayNames = hws.length > 0 ? hws : [`Inter-State NER Highway (${origin.state} to ${dest.state})`];

    // Check if any hazard is along this path
    hazardsOnRoute = NER_ROAD_HAZARDS.filter((h) => {
      return waypoints.some((wp) => {
        const d = Math.hypot((h.lat - wp[0]) * 111, (h.lng - wp[1]) * 102);
        return d < 48;
      });
    });

    if (hazardsOnRoute.length > 0) {
      const mainH = hazardsOnRoute[0];
      bypassRoadName = mainH.bypassRoadName;
      bypassCoords = mainH.bypassCoords;
      bypassDistanceKm = mainH.bypassDistanceKm;
      bypassDelayMinutes = mainH.estimatedDelayMinutes;
    }
  }

  // Ensure directional alignment: start at origin, end at destination
  if (waypoints.length >= 2) {
    const startDist = Math.hypot(origin.coords[0] - waypoints[0][0], origin.coords[1] - waypoints[0][1]);
    const endDist = Math.hypot(origin.coords[0] - waypoints[waypoints.length - 1][0], origin.coords[1] - waypoints[waypoints.length - 1][1]);
    if (endDist < startDist) {
      waypoints = [...waypoints].reverse();
    }
  }

  // Count nearby POIs along route (hospitals, fuel pumps)
  const fuelStopsCount = NER_POIS.filter((p) => p.type === "petrol_pump").length;
  const emergencyHospitalsCount = NER_POIS.filter((p) => p.type === "hospital").length;

  return {
    origin,
    destination: dest,
    totalDistanceKm,
    estimatedHours,
    highwayNames,
    waypoints,
    hazardsOnRoute,
    bypassActive,
    bypassRoadName,
    bypassCoords,
    bypassDistanceKm,
    bypassDelayMinutes,
    elevationGainMeters,
    terrainType,
    tollsAndCheckpostsCount,
    fuelStopsCount,
    emergencyHospitalsCount,
  };
}
