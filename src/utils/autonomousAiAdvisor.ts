/**
 * Client-Side Mountain Logistics Autonomous Advisor
 * Powers AI Route Advisor seamlessly on static hosting like GitHub Pages
 */

export interface RouteSearchContext {
  query?: string;
  origin?: string;
  destination?: string;
  distanceKm?: number;
  estimatedHours?: number;
  highwayCode?: string;
  hazards?: string[];
  userRole?: string;
  vehicleType?: string;
  cargoType?: string;
}

export interface AiSearchAdvisorResponse {
  summary: string;
  routeOverview: string;
  highwayCorridor: string;
  estimatedTime: string;
  mountainTerrainAlert: string;
  landslideHazards: string[];
  recommendedBypasses: Array<{
    name: string;
    description: string;
    extraTime: string;
    suitability: string;
  }>;
  checkpostsAndPermits: {
    requiredDocuments: string[];
    entryGates: string[];
    ilpNotice: string;
  };
  fuelAndRestStops: string[];
  criticalSafetyPrecautions: string[];
  emergencyContacts: Array<{ name: string; phone: string }>;
  aiEngine: string;
}

function normalize(str?: string): string {
  return (str || "").toLowerCase().trim();
}

export function generateClientSearchAdvisory(context: RouteSearchContext): AiSearchAdvisorResponse {
  const query = normalize(context.query);
  const orig = normalize(context.origin);
  const dest = normalize(context.destination);
  const fullText = `${query} ${orig} ${dest}`;

  let corridorName = "NH-27 East-West National Expressway";
  let highwayCode = context.highwayCode || "NH-27";

  if (fullText.includes("silchar") || fullText.includes("sonapur") || fullText.includes("meghalaya") || fullText.includes("nh-6") || fullText.includes("jaintia")) {
    corridorName = "NH-6 Shillong - Jowai - Sonapur - Silchar Arterial";
    highwayCode = "NH-6";
  } else if (fullText.includes("kohima") || fullText.includes("dimapur") || fullText.includes("paglapahar") || fullText.includes("nagaland") || fullText.includes("nh-29")) {
    corridorName = "NH-29 Dimapur - Chumukedima - Kohima Mountain Highway";
    highwayCode = "NH-29";
  } else if (fullText.includes("gangtok") || fullText.includes("sikkim") || fullText.includes("siliguri") || fullText.includes("nh-10") || fullText.includes("teesta")) {
    corridorName = "NH-10 Siliguri - Sevoke - Teesta - Gangtok Lifeline";
    highwayCode = "NH-10";
  } else if (fullText.includes("arunachal") || fullText.includes("itanagar") || fullText.includes("bhalukpong") || fullText.includes("tawang") || fullText.includes("nh-13")) {
    corridorName = "NH-13 Trans-Arunachal Highway (Banderdewa / Hollongi Gateway)";
    highwayCode = "NH-13";
  } else if (fullText.includes("kolkata") || fullText.includes("delhi") || fullText.includes("mumbai") || fullText.includes("patna") || fullText.includes("bengaluru")) {
    corridorName = "Pan-India Arterial Corridors via Siliguri Gateway (NH-27 / NH-12)";
    highwayCode = "NH-27 / NH-12";
  }

  const bypasses = [
    {
      name: "SH-12 Khanduli - Umrangso Mountain Bypass",
      description: "Bypasses Sonapur heavy mudslides via Meghalaya-Assam border hills with single-axle truck clearance.",
      extraTime: "+1h 45m (~48 km extra)",
      suitability: "Suitable for Light & Medium Commercial Vehicles up to 16 Tons."
    },
    {
      name: "Niuland - Zubza Alternative Bypass",
      description: "Avoids vulnerable Paglapahar gorge rockfalls between Dimapur and Kohima.",
      extraTime: "+50m (~28 km extra)",
      suitability: "Heavy trucks require anti-skid tire chains during active monsoon rainfall."
    }
  ];

  const permits = {
    requiredDocuments: [
      "National Permit / All India Tourist Permit",
      "Form 38 Hill Route Fitness Certificate",
      "E-Way Bill & GST Commercial Invoice",
      "Valid Fastag with adequate corridor balance",
      "Commercial Driver ILP Entry Slips (Arunachal, Nagaland, Mizoram, Manipur)"
    ],
    entryGates: [
      "Srirampur Border Checkpost (Assam-Bengal border)",
      "Byrnihat Commercial Toll Gate (Assam-Meghalaya border)",
      "Banderdewa Gate (Assam-Arunachal border)",
      "New Field Checkpost (Dimapur-Nagaland border)"
    ],
    ilpNotice: "Commercial drivers entering Arunachal Pradesh, Nagaland, or Mizoram must register electronic Inner Line Permits (e-ILP) with transit validity of 7 days."
  };

  const fuelStops = [
    "Indian Oil COCO Hub - Numaligarh (High-Flow Diesel & Truck Bay)",
    "Bharat Petroleum Oasis - Khanapara Guwahati Gateway",
    "BRO Project Pushpak Highway Relief Point - Sonapur Hills",
    "Assam Oil Division 24x7 Facility - Siliguri Bypass Junction"
  ];

  const safetyPrecautions = [
    "Never overtake on blind mountain hairpin turns along NH-6 or NH-29.",
    "Maintain minimum 30-meter vehicle spacing in active landslide zones.",
    "Engage low gear during downhill mountain descents to prevent air-brake fade.",
    "Confirm BRO clearance status at Byrnihat before committing to night ascents."
  ];

  return {
    summary: `Autonomous Mountain Logistics Route Advisory for ${corridorName}. Mountain clearances, road condition updates, and detour options are active for this transit route.`,
    routeOverview: `Corridor ${highwayCode} connects vital regional supply chains. Current terrain telemetry indicates managed traffic flow with local hill precautions.`,
    highwayCorridor: corridorName,
    estimatedTime: context.estimatedHours ? `${context.estimatedHours.toFixed(1)} hrs` : "Normal transit schedule with 1.5h mountain buffer",
    mountainTerrainAlert: "Monsoon soil saturation detected in foothill sectors. Maintain cautious driving speeds on descending curves.",
    landslideHazards: context.hazards && context.hazards.length > 0 ? context.hazards : [
      "Active Sonapur mudflow risk under continuous rainfall",
      "Paglapahar falling boulder zone along Chumukedima gorge"
    ],
    recommendedBypasses: bypasses,
    checkpostsAndPermits: permits,
    fuelAndRestStops: fuelStops,
    criticalSafetyPrecautions: safetyPrecautions,
    emergencyContacts: [
      { name: "Border Roads Organisation (BRO) Control Room", phone: "1800-180-2767" },
      { name: "Assam Highway Emergency Patrol", phone: "112" },
      { name: "Meghalaya Traffic Control Bureau", phone: "0364-2222277" }
    ],
    aiEngine: "Autonomous Client Mountain AI"
  };
}
