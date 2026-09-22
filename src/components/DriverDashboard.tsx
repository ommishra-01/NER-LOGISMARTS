import React, { useState } from "react";
import { 
  DEMO_DRIVER_TRIP, 
  NER_POIS, 
  NER_ROAD_HAZARDS 
} from "../data/nerData";
import { RoadHazard, POI } from "../types";
import { 
  Truck, 
  Hospital, 
  Fuel, 
  AlertTriangle, 
  Wrench, 
  PhoneCall, 
  Navigation, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  Camera,
  Radio,
  Compass
} from "lucide-react";

interface DriverDashboardProps {
  onSelectHazardForMap: (hazard: RoadHazard) => void;
  onOpenAIAssistant: () => void;
  onOpenLiveCamera?: () => void;
  hazards?: RoadHazard[];
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({
  onSelectHazardForMap,
  onOpenAIAssistant,
  onOpenLiveCamera,
  hazards,
}) => {
  const trip = DEMO_DRIVER_TRIP;
  const allHazards = hazards && hazards.length > 0 ? hazards : NER_ROAD_HAZARDS;
  const cameraReports = allHazards.filter((h) => h.isLiveCameraReport);

  // Active bypass hazard (defaults to Sonapur landslide or first hazard)
  const [activeBypassHazard, setActiveBypassHazard] = useState<RoadHazard>(allHazards[0]);
  const [bypassActive, setBypassActive] = useState(false);

  const handleToggleBypass = (hazardToBypass?: RoadHazard) => {
    if (hazardToBypass) {
      setActiveBypassHazard(hazardToBypass);
      setBypassActive(true);
    } else {
      setBypassActive(!bypassActive);
    }
  };

  // Compute nearby hospitals
  const hospitals = NER_POIS.filter((p) => p.type === "hospital").map((h, i) => ({
    ...h,
    distanceKm: [28, 74, 122, 185, 210, 240, 290, 320][i % 8],
  })).sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);

  // Compute nearby petrol pumps
  const petrolPumps = NER_POIS.filter((p) => p.type === "petrol_pump").map((p, i) => ({
    ...p,
    distanceKm: [14, 52, 98, 140, 220, 270][i % 6],
  })).sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);

  // Compute nearby garages
  const garages = NER_POIS.filter((p) => p.type === "garage").map((g, i) => ({
    ...g,
    distanceKm: [19, 65, 110, 230][i % 4],
  })).sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 2);

  // Critical hazard on current trip route
  const routeHazard = activeBypassHazard || allHazards[0];

  return (
    <div className="space-y-6">
      {/* 1. Primary Trip & Navigation Vital Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Active Driver Route
                </span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                  {trip.truckNo}
                </span>
                {bypassActive && (
                  <span className="text-[10px] bg-emerald-600 text-white font-extrabold uppercase px-2 py-0.5 rounded shadow-sm">
                    Safe Bypass Active
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {trip.driverName} • Commercial Hill Freight
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenLiveCamera && (
              <button
                onClick={onOpenLiveCamera}
                className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/30 flex items-center gap-1.5 transition cursor-pointer"
                title="Snap verified incident photo from phone or webcam"
              >
                <Camera className="w-3.5 h-3.5 text-white animate-pulse" />
                <span>Snap Road Hazard</span>
              </button>
            )}

            <button
              onClick={onOpenAIAssistant}
              className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>AI Route Assistant</span>
            </button>
          </div>
        </div>

        {/* Origin to Destination Strip */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Starting Point</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">{trip.origin}</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Navigation className="w-3.5 h-3.5 text-red-400" />
              <span>Destination Route</span>
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {bypassActive ? `${trip.origin} ➔ ${routeHazard.bypassRoadName} ➔ ${trip.destination}` : trip.destination}
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 text-right">
            <div>
              <div className="text-xs text-slate-400">Total Distance</div>
              <div className="text-base font-bold text-white">
                {bypassActive ? trip.distanceKm + (routeHazard.bypassDistanceKm || 42) : trip.distanceKm} km
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Est. Travel Time</div>
              <div className="text-base font-bold text-amber-400 flex items-center gap-1">
                <Clock className="w-4 h-4 inline" />
                {bypassActive ? `${(Number(trip.estimatedHours) + ((routeHazard.estimatedDelayMinutes || 120) / 60)).toFixed(1)} hrs` : `${trip.estimatedHours} hrs`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE CAMERA COMMUNITY HAZARD REPORTS & ALTERNATE ROUTES */}
      {cameraReports.length > 0 && (
        <div className="bg-slate-900 border-2 border-red-500/60 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-red-600/20 text-red-400 border border-red-500/40 rounded-xl">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    Live Camera Road Incidents &amp; Alternate Routes
                  </h3>
                  <span className="text-[10px] bg-red-600 text-white font-extrabold uppercase px-2 py-0.5 rounded">
                    {cameraReports.length} Active {cameraReports.length === 1 ? "Alert" : "Alerts"}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Verified field photos submitted by North East drivers with auto-calculated mountain bypasses
                </p>
              </div>
            </div>

            {onOpenLiveCamera && (
              <button
                onClick={onOpenLiveCamera}
                className="text-xs bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded-xl border border-red-400/40 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Snap New Incident</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {cameraReports.map((camReport) => {
              const isThisBypassActive = bypassActive && activeBypassHazard.id === camReport.id;

              return (
                <div
                  key={camReport.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-slate-700 transition"
                >
                  <div className="flex items-start gap-3">
                    {/* Verified Photo Thumbnail */}
                    {camReport.photoUrl && (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-black shadow-md">
                        <img
                          src={camReport.photoUrl}
                          alt={camReport.locationName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-red-600 text-[8px] font-extrabold uppercase text-center py-0.5 text-white">
                          Live Photo
                        </div>
                      </div>
                    )}

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-red-600/30 text-red-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-500/40">
                          {camReport.hazardType.replace(/_/g, " ").toUpperCase()}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {camReport.reportedAt}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate">
                        {camReport.locationName}
                      </h4>
                      <p className="text-[11px] text-slate-300 line-clamp-2">
                        {camReport.advisory}
                      </p>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Compass className="w-3 h-3 text-emerald-400" />
                        <span>By {camReport.reportedBy || "Driver GPS"} &bull; {camReport.state}</span>
                      </div>
                    </div>
                  </div>

                  {/* Alternate Bypass Box */}
                  <div className="p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5" />
                        Alternate Route Available:
                      </span>
                      <span className="text-[10px] text-emerald-300 font-semibold">
                        +{camReport.bypassDistanceKm} km (+{camReport.estimatedDelayMinutes} min)
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-200">
                      {camReport.bypassRoadName}
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => onSelectHazardForMap(camReport)}
                        className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleToggleBypass(camReport)}
                        className={`text-[11px] px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                          isThisBypassActive
                            ? "bg-slate-800 text-slate-300 border border-slate-700"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow shadow-emerald-600/30"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isThisBypassActive ? "Deactivate Bypass" : "Activate Alternate Route"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Urgent Road Blockage & Landslide AI Bypass (What happened where) */}
      <div className="bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 border border-red-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600/20 text-red-400 border border-red-500/40 rounded-xl animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                  CRITICAL ROAD HAZARD AHEAD
                </span>
                <span className="text-xs text-red-300 font-medium">Reported {routeHazard.reportedAt}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {routeHazard.hazardType.toUpperCase()}: {routeHazard.locationName}
              </h3>
            </div>
          </div>

          <button
            onClick={() => onSelectHazardForMap(routeHazard)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition flex items-center gap-1 cursor-pointer"
          >
            <span>View on Map</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 mb-4 leading-relaxed">
          {routeHazard.advisory}
        </p>

        {/* Bypass Action Box */}
        <div className="p-4 bg-emerald-950/50 border border-emerald-700/60 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                Recommended Mountain Bypass:
              </span>
              {bypassActive && (
                <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">
                  ACTIVATED
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-emerald-200 mt-0.5">
              {routeHazard.bypassRoadName}
            </p>
            <p className="text-xs text-emerald-400/80 mt-0.5">
              Avoids {routeHazard.locationName} &bull; Adds +{routeHazard.bypassDistanceKm} km (+{routeHazard.estimatedDelayMinutes} min) via all-weather ridge
            </p>
          </div>

          <button
            onClick={() => handleToggleBypass()}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
              bypassActive
                ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{bypassActive ? "Reset to Standard Corridor" : "Activate AI Bypass Reroute"}</span>
          </button>
        </div>
      </div>

      {/* 3. The 4 Essential Driver Modules: Nearest Hospitals, Petrol Pumps, Garages, Helpline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nearest Hospitals */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-red-500/10 text-red-400 rounded-lg">
                <Hospital className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Nearest 24/7 Hospitals</h3>
                <p className="text-[11px] text-slate-400">Emergency Trauma &amp; Medical Centers</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/60">
              Live Distances
            </span>
          </div>

          <div className="space-y-2.5">
            {hospitals.map((hosp) => (
              <div
                key={hosp.id}
                className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition flex items-center justify-between gap-2"
              >
                <div className="space-y-0.5 max-w-[70%]">
                  <div className="font-semibold text-xs text-slate-100 truncate">{hosp.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{hosp.address}</div>
                  <div className="text-[10px] text-emerald-400">
                    {hosp.details?.beds} Beds • {hosp.details?.icu ? "ICU Active" : "General Trauma"}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-amber-400">{hosp.distanceKm} km</div>
                  <a
                    href={`tel:${hosp.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-red-600 hover:bg-red-500 px-2.5 py-1 rounded-lg mt-1 transition"
                  >
                    <PhoneCall className="w-3 h-3" /> Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearest Petrol & Diesel Pumps */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                <Fuel className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Nearest Petrol &amp; Diesel Pumps</h3>
                <p className="text-[11px] text-slate-400">High-altitude hill fuel &amp; AdBlue DEF</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
              Fuel Safe Range
            </span>
          </div>

          <div className="space-y-2.5">
            {petrolPumps.map((pump) => (
              <div
                key={pump.id}
                className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition flex items-center justify-between gap-2"
              >
                <div className="space-y-0.5 max-w-[70%]">
                  <div className="font-semibold text-xs text-slate-100 truncate">{pump.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{pump.address}</div>
                  <div className="text-[10px] text-amber-300">
                    Diesel: ₹{pump.details?.dieselPrice}/L • {pump.details?.fuelTypes?.join(", ")}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-emerald-400">{pump.distanceKm} km</div>
                  <a
                    href={`tel:${pump.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-2.5 py-1 rounded-lg mt-1 transition"
                  >
                    <PhoneCall className="w-3 h-3" /> Contact
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 24/7 Garages & Heavy Crane Recovery */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">24/7 Heavy Garages &amp; Mechanics</h3>
                <p className="text-[11px] text-slate-400">Mountain Air Brakes, Suspension &amp; 50T Cranes</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              Recovery Ready
            </span>
          </div>

          <div className="space-y-2.5">
            {garages.map((gar) => (
              <div
                key={gar.id}
                className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition flex items-center justify-between gap-2"
              >
                <div className="space-y-0.5 max-w-[70%]">
                  <div className="font-semibold text-xs text-slate-100 truncate">{gar.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{gar.address}</div>
                  <div className="text-[10px] text-slate-300">
                    {gar.details?.mechanicSpecialty?.slice(0, 2).join(" • ")}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-amber-400">{gar.distanceKm} km</div>
                  <a
                    href={`tel:${gar.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-slate-700 hover:bg-slate-600 px-2.5 py-1 rounded-lg mt-1 transition"
                  >
                    <PhoneCall className="w-3 h-3" /> Mechanic
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency SOS Helplines & Border Posts */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Emergency Road &amp; Police SOS</h3>
                <p className="text-[11px] text-slate-400">Border checkposts &amp; disaster helplines</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/60">
              Toll-Free 24x7
            </span>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-slate-200">BRO Mountain Road Patrol</div>
                <div className="text-[11px] text-slate-400">Direct heavy excavator rescue team</div>
              </div>
              <a
                href="tel:18001802345"
                className="text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition"
              >
                1800-180-2345
              </a>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-slate-200">State Disaster SDMA (Flood/Landslide)</div>
                <div className="text-[11px] text-slate-400">SDRF boat &amp; evacuation assistance</div>
              </div>
              <a
                href="tel:1070"
                className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition"
              >
                1070
              </a>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-slate-200">National Emergency Services</div>
                <div className="text-[11px] text-slate-400">Police, Fire, Ambulance</div>
              </div>
              <a
                href="tel:112"
                className="text-xs font-bold bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg transition"
              >
                112
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
