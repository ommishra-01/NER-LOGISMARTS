/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { UserSession, RoadHazard, MSMEFarmerCluster, HazardAlertNotification } from "./types";
import { NER_ROAD_HAZARDS, NER_FARMER_MSME_CLUSTERS } from "./data/nerData";
import { Navbar } from "./components/Navbar";
import { InteractiveMap } from "./components/InteractiveMap";
import { DriverDashboard } from "./components/DriverDashboard";
import { TransportLogisticsDashboard } from "./components/TransportLogisticsDashboard";
import { LoginPage } from "./components/LoginPage";
import { LoginModal } from "./components/LoginModal";
import { AIAssistantModal } from "./components/AIAssistantModal";
import { LiveIncidentCameraModal } from "./components/LiveIncidentCameraModal";
import { BroadcastAlertBanner } from "./components/BroadcastAlertBanner";
import { 
  Truck, 
  Building2, 
  Wheat,
  ShieldAlert, 
  Sparkles, 
  Layers, 
  FileCheck, 
  MapPin, 
  ArrowRight,
  Info,
  KeyRound,
  CheckCircle2,
  Lock
} from "lucide-react";

export default function App() {
  // State for user session: starts as null to display LoginPage prominently firstly
  const [user, setUser] = useState<UserSession | null>(null);

  // Active tab state (initial is "login" so user sees login page prominently first)
  const [activeTab, setActiveTab] = useState<"login" | "map" | "driver" | "logistics" | "permits" | "economics">("login");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiRouteContext, setAiRouteContext] = useState<any>(null);
  const [isLiveCameraModalOpen, setIsLiveCameraModalOpen] = useState(false);

  const handleOpenAIAssistant = (routeContext?: any) => {
    setAiRouteContext(routeContext || null);
    setIsAIOpen(true);
  };

  // Hazards state: defaults to static NER hazards, dynamically merged with crowdsourced reports
  const [hazards, setHazards] = useState<RoadHazard[]>(NER_ROAD_HAZARDS);
  const [activeAlert, setActiveAlert] = useState<HazardAlertNotification | null>(null);

  const [selectedHazard, setSelectedHazard] = useState<RoadHazard | null>(NER_ROAD_HAZARDS[0]);
  const [selectedCluster, setSelectedCluster] = useState<MSMEFarmerCluster | null>(NER_FARMER_MSME_CLUSTERS[0]);

  // Fetch initial hazards from backend (with silent fallback to static NER dataset for GitHub Pages)
  useEffect(() => {
    fetch("/api/hazards")
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data && data.hazards && Array.isArray(data.hazards) && data.hazards.length > 0) {
          setHazards(data.hazards);
        }
      })
      .catch(() => {
        // Quietly maintain static NER dataset on GitHub Pages / offline hosting
      });
  }, []);

  const handleHazardReported = (newHazard: RoadHazard) => {
    // Send to backend API asynchronously to persist if backend exists
    fetch("/api/hazards/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHazard),
    }).catch(() => {
      // Local state is already updated; silently continue on static hosting
    });

    setHazards((prev) => [newHazard, ...prev.filter((h) => h.id !== newHazard.id)]);

    const notif: HazardAlertNotification = {
      id: `alert-${Date.now()}`,
      hazardId: newHazard.id,
      title: `ROAD ALERT: ${newHazard.hazardType.toUpperCase()} ON ${newHazard.roadName}`,
      roadName: newHazard.roadName,
      locationName: newHazard.locationName,
      state: newHazard.state,
      hazardType: newHazard.hazardType,
      severity: newHazard.severity || "critical",
      reportedAt: newHazard.reportedAt,
      photoUrl: newHazard.photoUrl,
      reportedBy: newHazard.reportedBy || "Field Driver GPS",
      lat: newHazard.lat,
      lng: newHazard.lng,
      alternateBypassName: newHazard.bypassRoadName,
      bypassDistanceKm: newHazard.bypassDistanceKm,
      estimatedDelayMinutes: newHazard.estimatedDelayMinutes,
      bypassCoords: newHazard.bypassCoords,
      advisory: newHazard.advisory,
    };

    setActiveAlert(notif);
  };

  const handleViewAlertOnMap = (hazardId: string) => {
    const found = hazards.find((h) => h.id === hazardId);
    if (found) {
      setSelectedHazard(found);
    }
    setActiveTab("map");
  };

  const handleEngageDriverBypass = (hazardId: string) => {
    const found = hazards.find((h) => h.id === hazardId);
    if (found) {
      setSelectedHazard(found);
    }
    setActiveTab("driver");
  };

  const handleLoginSuccess = (session: UserSession) => {
    setUser(session);
    if (session.mode === "driver") {
      setActiveTab("driver");
    } else if (session.mode === "farmer") {
      setActiveTab("economics");
    } else {
      setActiveTab("map");
    }
  };

  const handleContinueAsGuest = () => {
    // Default preview driver session
    setUser({
      id: "NER-DRV-8492",
      email: "bipul.sharma@mountainfreight.ner.gov.in",
      phone: "9854012345",
      name: "Bipul Sharma (Driver Guest)",
      mode: "driver",
      vehicleNo: "AS-01-GC-4921",
      companyName: "Brahmaputra Mountain Freight Carriers",
      roleTitle: "Commercial Heavy Vehicle Pilot",
    });
    setActiveTab("map");
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab("login");
  };

  const handleSelectHazardForMap = (hazard: RoadHazard) => {
    setSelectedHazard(hazard);
    setActiveTab("map");
  };

  const handleSelectClusterForMap = (cluster: MSMEFarmerCluster) => {
    setSelectedCluster(cluster);
    setActiveTab("map");
  };

  const switchMode = (mode: "driver" | "transport" | "farmer") => {
    if (mode === "driver") {
      setUser({
        id: "NER-DRV-8492",
        email: "bipul.sharma@mountainfreight.ner.gov.in",
        phone: "9854012345",
        name: "Bipul Sharma",
        mode: "driver",
        vehicleNo: "AS-01-GC-4921",
        companyName: "Brahmaputra Mountain Freight Carriers",
        roleTitle: "Mountain Route Pilot",
      });
      setActiveTab("driver");
    } else if (mode === "transport") {
      setUser({
        id: "NER-LOG-1048",
        email: "control.director@nerlogismart.gov.in",
        phone: "9435098765",
        name: "NER Regional Freight Control",
        mode: "transport",
        companyName: "North East Logistics Directorate",
        roleTitle: "Logistics Controller",
      });
      setActiveTab("logistics");
    } else {
      setUser({
        id: "NER-FPO-3301",
        email: "secretary@lakadongturmeric.org",
        phone: "9863024512",
        name: "Lakadong Organic Farmers Union",
        mode: "farmer",
        companyName: "Jaintia Hills Spices Cooperative",
        roleTitle: "FPO Aggregator",
      });
      setActiveTab("economics");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        user={user}
        onOpenLogin={() => setActiveTab("login")}
        onLogout={handleLogout}
        onOpenAIAssistant={() => handleOpenAIAssistant()}
        onOpenLiveCamera={() => setIsLiveCameraModalOpen(true)}
        latestAlert={activeAlert}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Broadcast Alert Banner when camera incident is reported */}
      {activeAlert && (
        <BroadcastAlertBanner
          alert={activeAlert}
          onDismiss={() => setActiveAlert(null)}
          onViewOnMap={handleViewAlertOnMap}
          onEngageDriverBypass={handleEngageDriverBypass}
        />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* If Active Tab is Login (or user not logged in and on login tab), Show Prominent Login Page */}
        {activeTab === "login" && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onContinueAsGuest={handleContinueAsGuest}
          />
        )}

        {/* When not in login tab, show Mode Switcher Banner if authenticated */}
        {activeTab !== "login" && user && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                user.mode === "driver" 
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400" 
                  : user.mode === "farmer"
                  ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                  : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              }`}>
                {user.mode === "driver" ? <Truck className="w-5 h-5" /> : user.mode === "farmer" ? <Wheat className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-white">
                    Logged in as: {user.name}
                  </span>
                  {user.id && (
                    <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono px-2 py-0.5 rounded border border-slate-700">
                      ID: {user.id}
                    </span>
                  )}
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {user.phone ? `+91 ${user.phone}` : "Verified User"}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {user.mode === "driver"
                    ? "Driver Mode: Streamlined essentials — live route search, petrol pumps, 24/7 hospitals, mechanic garages, and landslide bypasses."
                    : user.mode === "farmer"
                    ? "Farmer FPO Mode: MSME produce freight rates, farm-gate vs mandi economics, and direct cold-chain transport corridors."
                    : "Logistics Manager: Full 8-state accessibility map, road clearance, ILP checkposts, and real-time hazard solver."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end flex-wrap">
              <span className="text-xs text-slate-400 hidden md:inline">Switch Role:</span>
              <button
                onClick={() => switchMode("driver")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                  user.mode === "driver"
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Driver</span>
              </button>

              <button
                onClick={() => switchMode("transport")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                  user.mode === "transport"
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Logistics</span>
              </button>

              <button
                onClick={() => switchMode("farmer")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                  user.mode === "farmer"
                    ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                <Wheat className="w-3.5 h-3.5" />
                <span>Farmer FPO</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab View Content: Map */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <div className="h-[720px]">
              <InteractiveMap
                userMode={user?.mode || "driver"}
                selectedHazard={selectedHazard}
                onSelectHazard={setSelectedHazard}
                selectedCluster={selectedCluster}
                onSelectCluster={setSelectedCluster}
                onOpenAIAssistant={handleOpenAIAssistant}
                showDriverRoute={user?.mode === "driver"}
                hazards={hazards}
                onOpenLiveCamera={() => setIsLiveCameraModalOpen(true)}
              />
            </div>

            {/* Quick Context Tip under Map */}
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Search Engine &amp; Live Cam Bypass:</strong> Check routes between any of the 25 NER cities or Pan-India nodes. Click <strong>Live Cam Report</strong> to photograph road blockages with computer vision AI verification.
                </span>
              </div>
              <button
                onClick={() => handleOpenAIAssistant()}
                className="text-emerald-400 hover:underline font-semibold shrink-0 text-xs flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Route Advisory
              </button>
            </div>
          </div>
        )}

        {/* Tab View Content: Driver Dashboard */}
        {activeTab === "driver" && (
          <DriverDashboard
            onSelectHazardForMap={handleSelectHazardForMap}
            onOpenAIAssistant={handleOpenAIAssistant}
            onOpenLiveCamera={() => setIsLiveCameraModalOpen(true)}
            hazards={hazards}
          />
        )}

        {/* Tab View Content: Logistics Freight & Bypasses */}
        {activeTab === "logistics" && (
          <TransportLogisticsDashboard
            onSelectClusterForMap={handleSelectClusterForMap}
            onSelectHazardForMap={handleSelectHazardForMap}
            onOpenAIAssistant={handleOpenAIAssistant}
            hazards={hazards}
            onOpenLiveCamera={() => setIsLiveCameraModalOpen(true)}
          />
        )}

        {/* Tab View Content: MSME & Farmers Economics */}
        {activeTab === "economics" && (
          <TransportLogisticsDashboard
            onSelectClusterForMap={handleSelectClusterForMap}
            onSelectHazardForMap={handleSelectHazardForMap}
            onOpenAIAssistant={handleOpenAIAssistant}
            hazards={hazards}
            onOpenLiveCamera={() => setIsLiveCameraModalOpen(true)}
          />
        )}

        {/* Tab View Content: Permits & ILP */}
        {activeTab === "permits" && (
          <TransportLogisticsDashboard
            onSelectClusterForMap={handleSelectClusterForMap}
            onSelectHazardForMap={handleSelectHazardForMap}
            onOpenAIAssistant={handleOpenAIAssistant}
            hazards={hazards}
            onOpenLiveCamera={() => setIsLiveCameraModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">NER-LogiSmart</span>
            <span>• North Eastern Council (NEC) &amp; Ministry of DoNER Logistics Framework</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] flex-wrap">
            <span>Assam • Meghalaya • Arunachal • Nagaland • Manipur • Mizoram • Tripura • Sikkim</span>
            <button 
              onClick={() => setActiveTab("login")}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Authentication Portal
            </button>
            <button 
              onClick={() => handleOpenAIAssistant()}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              AI Logistics Advisor
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={user?.mode || "driver"}
      />

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        routeContext={aiRouteContext}
      />

      {/* Live Incident Camera Modal */}
      <LiveIncidentCameraModal
        isOpen={isLiveCameraModalOpen}
        onClose={() => setIsLiveCameraModalOpen(false)}
        onReportSubmitted={handleHazardReported}
        reporterName={user?.name || "NER Driver"}
      />
    </div>
  );
}
