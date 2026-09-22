import React, { useState } from "react";
import { 
  NER_FARMER_MSME_CLUSTERS, 
  NER_ROAD_HAZARDS, 
  NER_TRANSIT_PERMITS, 
  NER_HIGHWAYS 
} from "../data/nerData";
import { MSMEFarmerCluster, RoadHazard, TransitPermit } from "../types";
import { 
  Building2, 
  Wheat, 
  TrendingUp, 
  AlertTriangle, 
  FileCheck, 
  MapPin, 
  Truck, 
  Sparkles, 
  Calculator, 
  CheckCircle2, 
  ShieldAlert, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Filter,
  ArrowRight,
  Camera,
  Radio
} from "lucide-react";

interface TransportLogisticsDashboardProps {
  onSelectClusterForMap: (cluster: MSMEFarmerCluster) => void;
  onSelectHazardForMap: (hazard: RoadHazard) => void;
  onOpenAIAssistant: () => void;
  hazards?: RoadHazard[];
  onOpenLiveCamera?: () => void;
}

export const TransportLogisticsDashboard: React.FC<TransportLogisticsDashboardProps> = ({
  onSelectClusterForMap,
  onSelectHazardForMap,
  onOpenAIAssistant,
  hazards,
  onOpenLiveCamera,
}) => {
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("all");
  const [selectedCluster, setSelectedCluster] = useState<MSMEFarmerCluster>(NER_FARMER_MSME_CLUSTERS[0]);
  const [activeHazard, setActiveHazard] = useState<RoadHazard>(NER_ROAD_HAZARDS[0]);

  // AI Economic Calculation state
  const [isCalculatingAiEcon, setIsCalculatingAiEcon] = useState(false);
  const [aiEconResult, setAiEconResult] = useState<any>(null);

  // AI Permit Verification state
  const [isCheckingPermits, setIsCheckingPermits] = useState(false);
  const [aiPermitResult, setAiPermitResult] = useState<any>(null);
  const [permitDestState, setPermitDestState] = useState("Arunachal Pradesh");

  // Filtered clusters
  const filteredClusters = NER_FARMER_MSME_CLUSTERS.filter((c) => {
    if (selectedStateFilter === "all") return true;
    return c.state === selectedStateFilter;
  });

  const statesList = [
    "all",
    "Meghalaya",
    "Nagaland",
    "Assam",
    "Manipur",
    "Arunachal Pradesh",
    "Tripura",
    "Sikkim",
    "Mizoram",
  ];

  // Trigger server-side AI Economic Impact analysis
  const runAiEconomicAnalysis = async (cluster: MSMEFarmerCluster) => {
    setIsCalculatingAiEcon(true);
    setAiEconResult(null);

    try {
      const response = await fetch("/api/ai/economic-impact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produceName: cluster.produceName,
          farmerLocation: `${cluster.district}, ${cluster.state}`,
          targetMarket: cluster.primaryMarket,
          roadCondition: "Mountain hairpins, seasonal landslide delay",
          transportCostPerKm: `₹${cluster.transportCostPerKmPerTon} per ton-km`,
        }),
      });

      const data = await response.json();
      setAiEconResult(data);
    } catch (err) {
      console.error("AI econ calculation error:", err);
    } finally {
      setIsCalculatingAiEcon(false);
    }
  };

  // Trigger server-side AI Permit Assistant
  const runAiPermitCheck = async () => {
    setIsCheckingPermits(true);
    setAiPermitResult(null);

    try {
      const response = await fetch("/api/ai/permit-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationState: permitDestState,
          vehicleCategory: "10-wheel Heavy Freight Multi-Axle",
          cargoCategory: "High Value Agro-Perishables & MSME Goods",
          driverLicenseState: "Assam",
        }),
      });

      const data = await response.json();
      setAiPermitResult(data);
    } catch (err) {
      console.error("AI permit check error:", err);
    } finally {
      setIsCheckingPermits(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Transportation &amp; Logistics Mode
              </span>
              <span className="text-xs text-slate-400">
                North Eastern Council (NEC) Corridor Intelligence
              </span>
            </div>
            <h1 className="text-xl font-bold text-white mt-1">
              MSME Supply Chains, Freight Economics &amp; Mountain Bypass Routing
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Connecting rural farmers to high-yield mandis, optimizing transport rates, and tracking inter-state transit permits across all 8 North East states.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAIAssistant}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>AI Logistics Advisor</span>
            </button>
          </div>
        </div>

        {/* Quick Regional Metric Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Total Active Highway Corridor</span>
            <span className="text-base font-bold text-amber-400">2,380 km</span>
            <span className="text-[10px] text-slate-400 block">NH-27, NH-6, NH-29, NH-13</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Reported Landslides &amp; Floods</span>
            <span className="text-base font-bold text-red-400">5 Monitored Hotspots</span>
            <span className="text-[10px] text-emerald-400 block">100% Bypass Routes Mapped</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Avg Mountain Freight Rate</span>
            <span className="text-base font-bold text-emerald-400">₹6.4 / ton-km</span>
            <span className="text-[10px] text-slate-400 block">+38% vs Plain Terrains</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Registered MSME &amp; FPO Hubs</span>
            <span className="text-base font-bold text-white">8 GI-Tagged Clusters</span>
            <span className="text-[10px] text-emerald-400 block">25,000+ Tons Per Year</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Farmer & MSME Supply Chain Economics */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Wheat className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Farmer &amp; MSME Freight Rate &amp; Economic Impact Platform
              </h2>
              <p className="text-xs text-slate-400">
                Where farmers live, their selling prices, transportation rates, and how logistics affects the North East economy
              </p>
            </div>
          </div>

          {/* State Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 text-[11px] flex items-center gap-1 mr-1 shrink-0">
              <Filter className="w-3 h-3" /> State:
            </span>
            {statesList.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStateFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-medium capitalize shrink-0 transition ${
                  selectedStateFilter === st
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {st === "all" ? "All NE States" : st}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column: Left list of clusters, Right detailed economic impact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Clusters List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredClusters.map((cluster) => {
              const isSelected = selectedCluster.id === cluster.id;
              return (
                <div
                  key={cluster.id}
                  onClick={() => setSelectedCluster(cluster)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? "bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500 shadow-md"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      cluster.communityType === "farmer" ? "bg-green-900/60 text-green-300 border border-green-700/60" : "bg-purple-900/60 text-purple-300 border border-purple-700/60"
                    }`}>
                      {cluster.communityType} • {cluster.state}
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      ₹{cluster.farmGatePricePerKg} / kg
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-white mt-1.5 line-clamp-1">
                    {cluster.name}
                  </h4>
                  <div className="text-[11px] text-emerald-300 font-medium">
                    {cluster.produceName}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <div>
                      Transport Rate: <strong className="text-slate-200">₹{cluster.transportCostPerKmPerTon}/ton-km</strong>
                    </div>
                    <div>
                      Freight: <strong className="text-slate-200">₹{cluster.totalFreightCostPerKg}/kg</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Economic & Logistics Breakdown */}
          <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase">
                    {selectedCluster.district}, {selectedCluster.state}
                  </span>
                  <span className="text-xs text-slate-400">
                    Annual Volume: {selectedCluster.annualVolumeTons.toLocaleString()} Tons
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedCluster.name}
                </h3>
                <p className="text-xs text-emerald-300 font-semibold">
                  GI Crop: {selectedCluster.produceName}
                </p>
              </div>

              <button
                onClick={() => onSelectClusterForMap(selectedCluster)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 shrink-0 transition"
              >
                <span>Pin on Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Economics Rate Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Farm Gate Price</span>
                <span className="text-base font-bold text-white">₹{selectedCluster.farmGatePricePerKg}</span>
                <span className="text-[10px] text-slate-400">per kg (Farmer gets)</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Wholesale Mandi Price</span>
                <span className="text-base font-bold text-amber-400">₹{selectedCluster.retailMandiPricePerKg}</span>
                <span className="text-[10px] text-slate-400">at {selectedCluster.primaryMarket.split(' ')[0]}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Freight Rate</span>
                <span className="text-base font-bold text-emerald-400">₹{selectedCluster.transportCostPerKmPerTon}</span>
                <span className="text-[10px] text-slate-400">per ton-km</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Total Freight / kg</span>
                <span className="text-base font-bold text-red-400">₹{selectedCluster.totalFreightCostPerKg}</span>
                <span className="text-[10px] text-slate-400">Over {selectedCluster.avgDistanceToHubKm} km</span>
              </div>
            </div>

            {/* Economic Impact on North East Narrative */}
            <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-200 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Economic Impact on North East Region</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {selectedCluster.economicImpactAnalysis}
              </p>
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Cooperative: <strong className="text-slate-200">{selectedCluster.cooperativeName}</strong></span>
                <span>Contact: <strong className="text-emerald-400">{selectedCluster.phone}</strong></span>
              </div>
            </div>

            {/* AI Economic & Logistics Optimizer */}
            <div className="pt-2">
              <button
                onClick={() => runAiEconomicAnalysis(selectedCluster)}
                disabled={isCalculatingAiEcon}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
              >
                {isCalculatingAiEcon ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Run Gemini AI Freight Impact &amp; Margin Optimization for {selectedCluster.produceName}</span>
                  </>
                )}
              </button>

              {aiEconResult && (
                <div className="mt-3 p-4 bg-emerald-950/40 border border-emerald-600/50 rounded-xl text-xs space-y-2 animate-in fade-in">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Gemini AI Accessibility &amp; Margin Intelligence</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {aiEconResult.summary}
                  </p>
                  <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Freight Share of Cost:</span>
                      <span className="font-bold text-amber-400">{aiEconResult.freightSharePercent}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Estimated Farmer Net Margin:</span>
                      <span className="font-bold text-emerald-400">{aiEconResult.farmerNetMargin}</span>
                    </div>
                  </div>
                  {aiEconResult.keyRecommendations && (
                    <div className="mt-2">
                      <span className="font-semibold text-slate-300 text-[11px] block mb-1">Key AI Recommendations:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-300">
                        {aiEconResult.keyRecommendations.map((rec: string, i: number) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Landslide & Flash Flood Live Bypass Control Room */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  Live Road Hazard &amp; Mountain Bypass Control Room
                </h2>
                <span className="text-[10px] bg-red-600 text-white font-extrabold uppercase px-2 py-0.5 rounded">
                  Live GPS &bull; Community Camera
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Crowdsourced driver incident photos, landslides, flash floods, and instant alternate mountain bypasses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenLiveCamera && (
              <button
                onClick={onOpenLiveCamera}
                className="text-xs bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded-xl border border-red-400/40 shadow-md shadow-red-600/30 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 animate-pulse" />
                <span>Snap Live Incident</span>
              </button>
            )}

            <span className="text-xs font-semibold text-red-300 bg-red-950 px-2.5 py-1 rounded-lg border border-red-800">
              {(hazards && hazards.length > 0 ? hazards.length : NER_ROAD_HAZARDS.length)} Active Hazards
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {(hazards && hazards.length > 0 ? hazards : NER_ROAD_HAZARDS).map((hazard) => (
            <div
              key={hazard.id}
              className={`bg-slate-950/70 border rounded-xl p-4 space-y-3 hover:border-slate-700 transition flex flex-col justify-between ${
                hazard.isLiveCameraReport ? "border-red-500/60 shadow-lg shadow-red-950/30" : "border-slate-800"
              }`}
            >
              <div>
                {/* Live Camera Photo Preview if available */}
                {hazard.photoUrl && (
                  <div className="relative w-full h-36 rounded-lg overflow-hidden border border-slate-700 bg-black mb-3 shadow">
                    <img
                      src={hazard.photoUrl}
                      alt={hazard.locationName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>Live Camera Report</span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-xs px-2 py-1 text-[10px] text-emerald-400 flex justify-between">
                      <span>By {hazard.reportedBy || "Field Driver"}</span>
                      <span className="text-slate-300 font-mono">GPS Verified</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase bg-red-600 text-white px-2 py-0.5 rounded">
                    {hazard.hazardType.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-400">{hazard.state}</span>
                </div>

                <h4 className="font-bold text-sm text-white">{hazard.locationName}</h4>
                <p className="text-xs text-amber-400 font-semibold">{hazard.roadName}</p>

                <p className="text-[11px] text-slate-300 mt-2 line-clamp-3 bg-slate-900 p-2 rounded border border-slate-800">
                  {hazard.advisory}
                </p>

                {/* Weather details */}
                <div className="mt-2 text-[10px] text-slate-400">
                  Weather: <strong className="text-slate-200">{hazard.weatherCondition.temp}, {hazard.weatherCondition.precipitation}</strong>
                </div>

                {/* Bypass strip */}
                <div className="mt-3 p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-xs text-emerald-300">
                  <span className="font-bold block text-[10px] uppercase text-emerald-400">
                    Safe Alternate Bypass Route:
                  </span>
                  <div className="font-semibold text-[11px] line-clamp-1">{hazard.bypassRoadName}</div>
                  <div className="text-[10px] text-emerald-400/80 mt-0.5">
                    +{hazard.bypassDistanceKm} km • ~{hazard.estimatedDelayMinutes} min extra
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onSelectHazardForMap(hazard)}
                  className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Show on Map</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Transit Permits, ILP & Legal Compliance */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                NER Transit Permits, ILP &amp; Vehicle Regulatory Clearinghouse
              </h2>
              <p className="text-xs text-slate-400">
                Inner Line Permits (ILP), Mountain Commercial Vehicle Fitness (Form 38), and Green Corridor Passes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={permitDestState}
              onChange={(e) => setPermitDestState(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Manipur">Manipur</option>
              <option value="Assam">Assam</option>
              <option value="Sikkim">Sikkim</option>
            </select>
            <button
              onClick={runAiPermitCheck}
              disabled={isCheckingPermits}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
            >
              {isCheckingPermits ? (
                <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-current border-t-transparent" />
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Check Compliance</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Permit Assistant Result */}
        {aiPermitResult && (
          <div className="p-4 bg-blue-950/40 border border-blue-600/50 rounded-xl text-xs space-y-2 animate-in fade-in">
            <div className="font-bold text-blue-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>AI Regulatory Paperwork Guide for {permitDestState}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1 text-[11px]">Mandatory Commercial Permits:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {aiPermitResult.requiredPermits?.map((p: string, idx: number) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-300 block mb-1 text-[11px]">Driver Paperwork Checklist:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {aiPermitResult.paperworkChecklist?.map((c: string, idx: number) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-[11px] text-blue-200 bg-slate-900/60 p-2 rounded border border-slate-800">
              <strong>Checkposts:</strong> {aiPermitResult.entryCheckposts?.join(" • ")} | <strong>Notes:</strong> {aiPermitResult.complianceNotes}
            </div>
          </div>
        )}

        {/* Permits Table */}
        <div className="space-y-3">
          {NER_TRANSIT_PERMITS.map((permit) => (
            <div
              key={permit.id}
              className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-700/60">
                    {permit.permitType}
                  </span>
                  <span className="text-xs font-semibold text-white">{permit.state}</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-800">
                    Active Clearance
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{permit.title}</h4>
                <p className="text-xs text-slate-400">{permit.appliesTo}</p>
                <div className="text-[11px] text-slate-300">
                  <strong>Required Documents:</strong> {permit.documentsNeeded.join(" • ")}
                </div>
              </div>

              <div className="text-right shrink-0 space-y-2">
                <div>
                  <div className="text-xs text-slate-400">Govt Fee / Validity</div>
                  <div className="text-sm font-bold text-amber-400">
                    {permit.feeINR === 0 ? "Free (Subsidized)" : `₹${permit.feeINR}`} • {permit.validityDays} Days
                  </div>
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">
                  {permit.officialPortal}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
