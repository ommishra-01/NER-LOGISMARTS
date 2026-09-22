import React, { useState } from "react";
import { UserSession, HazardAlertNotification } from "../types";
import { 
  ShieldAlert, 
  Truck, 
  Building2, 
  PhoneCall, 
  LogIn, 
  LogOut, 
  Radio, 
  ChevronDown,
  Sparkles,
  Layers,
  KeyRound,
  User,
  Wheat,
  Camera,
  Bell,
  Navigation
} from "lucide-react";

interface NavbarProps {
  user: UserSession | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenAIAssistant: () => void;
  onOpenLiveCamera: () => void;
  latestAlert?: HazardAlertNotification | null;
  activeTab: "map" | "driver" | "logistics" | "permits" | "economics" | "login";
  setActiveTab: (tab: "map" | "driver" | "logistics" | "permits" | "economics" | "login") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenLogin,
  onLogout,
  onOpenAIAssistant,
  onOpenLiveCamera,
  latestAlert,
  activeTab,
  setActiveTab,
}) => {
  const [showSosDropdown, setShowSosDropdown] = useState(false);
  const [showAlertDetails, setShowAlertDetails] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Live Region Alert Ticker */}
      <div className="bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 text-xs px-4 py-1.5 flex items-center justify-between font-medium text-amber-50">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shrink-0 animate-pulse">
            <Radio className="w-3 h-3 text-red-300" /> NER Live Alert
          </span>
          <span className="truncate">
            {latestAlert ? (
              <span className="font-bold text-white">
                ⚠️ [CAM ALERT] {latestAlert.locationName}: {latestAlert.title} &bull; Alternate Route: {latestAlert.alternateBypassName}
              </span>
            ) : (
              "NH-6 Sonapur Tunnel: Landslide debris clearing (BRO) | NH-29 Paglapahar: Traffic diverted via Niuland bypass | Barak Valley: Flash flood watch (SDRF on site)"
            )}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 shrink-0 text-[11px]">
          <button
            onClick={onOpenLiveCamera}
            className="flex items-center gap-1.5 bg-black/40 hover:bg-black/60 px-2.5 py-0.5 rounded-full text-amber-200 hover:text-white transition cursor-pointer font-bold border border-amber-500/30"
          >
            <Camera className="w-3.5 h-3.5 text-red-300 animate-pulse" />
            <span>Live Cam Report</span>
          </button>
          <span className="text-amber-100/80">Weather: Monsoon Gorges Active</span>
          <button 
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1 hover:underline cursor-pointer font-semibold"
          >
            <Sparkles className="w-3 h-3 text-amber-200" /> AI Route Advisor
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand & Region Emblem */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab(user ? "map" : "login")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                NER-LogiSmart
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-semibold bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                North East India
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              AI Smart Logistics &amp; Accessibility Intelligence Platform
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs (Mode Aware) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-sm">
          <button
            onClick={() => setActiveTab("map")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "map"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Layers className="w-4 h-4" />
            North East Map
          </button>

          {user?.mode === "driver" ? (
            <button
              onClick={() => setActiveTab("driver")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "driver"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Truck className="w-4 h-4" />
              Driver Route (4-5 Essentials)
            </button>
          ) : user?.mode === "farmer" ? (
            <button
              onClick={() => setActiveTab("economics")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "economics"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Wheat className="w-4 h-4" />
              Farmer MSME Mandi
            </button>
          ) : (
            <>
              <button
                onClick={() => setActiveTab("logistics")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "logistics"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Freight &amp; Bypasses
              </button>
              <button
                onClick={() => setActiveTab("economics")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "economics"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                MSME &amp; Farmers
              </button>
              <button
                onClick={() => setActiveTab("permits")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "permits"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                Permits &amp; ILP
              </button>
            </>
          )}

          {/* Prominent Login Tab */}
          <button
            onClick={() => setActiveTab("login")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "login"
                ? "bg-slate-700 text-white shadow-sm border border-slate-600"
                : "text-slate-400 hover:text-white hover:bg-slate-700/40"
            }`}
          >
            <KeyRound className="w-4 h-4 text-emerald-400" />
            <span>Login / Switch ID</span>
          </button>
        </nav>

        {/* Right Actions: SOS helpline, AI Button, Login/Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emergency SOS Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSosDropdown(!showSosDropdown)}
              className="flex items-center gap-1.5 bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/80 text-xs px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer"
              title="Emergency Hotlines"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">SOS Help</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showSosDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-xs z-50">
                <div className="font-semibold text-slate-200 mb-2 pb-1 border-b border-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  NER 24x7 Emergency Helplines
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-1.5 bg-slate-800/60 rounded">
                    <div>
                      <p className="font-medium text-slate-200">National Emergency</p>
                      <p className="text-[10px] text-slate-400">Police / Ambulance</p>
                    </div>
                    <a href="tel:112" className="text-emerald-400 font-bold hover:underline">112</a>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-slate-800/60 rounded">
                    <div>
                      <p className="font-medium text-slate-200">Disaster Management</p>
                      <p className="text-[10px] text-slate-400">SDMA Flood &amp; Landslide</p>
                    </div>
                    <a href="tel:1070" className="text-emerald-400 font-bold hover:underline">1070</a>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-slate-800/60 rounded">
                    <div>
                      <p className="font-medium text-slate-200">Border Roads (BRO)</p>
                      <p className="text-[10px] text-slate-400">Mountain Road Rescue</p>
                    </div>
                    <a href="tel:18001802345" className="text-emerald-400 font-bold hover:underline">1800-180-2345</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Incident Camera Button */}
          <button
            onClick={onOpenLiveCamera}
            className="flex items-center gap-1.5 bg-red-600/90 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-md shadow-red-600/20 border border-red-500 transition cursor-pointer"
            title="Snap real-time hazard photo & auto-broadcast alternate routes"
          >
            <Camera className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="hidden sm:inline">Live Cam</span>
          </button>

          {/* AI Intelligence Button */}
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold shadow-sm transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span className="hidden sm:inline">AI Advisor</span>
          </button>

          {/* User Mode & Auth */}
          {user ? (
            <div className="flex items-center gap-2 bg-slate-800/90 px-2.5 py-1.5 rounded-xl border border-slate-700 shadow-sm">
              <div 
                onClick={() => setActiveTab("login")}
                className="flex flex-col text-right cursor-pointer group"
                title="Click to view login details or switch role"
              >
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xs font-semibold text-white leading-tight group-hover:text-emerald-400 transition">
                    {user.name}
                  </span>
                  {user.id && (
                    <span className="text-[9px] bg-slate-900 border border-slate-700 px-1 py-0.2 rounded text-slate-300 font-mono">
                      {user.id}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium leading-none ${
                  user.mode === "driver" ? "text-amber-400" : user.mode === "farmer" ? "text-purple-400" : "text-emerald-400"
                }`}>
                  {user.mode === "driver" ? "Driver Portal" : user.mode === "farmer" ? "Farmer FPO" : "Logistics Manager"}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Switch account or sign out to login page"
                className="p-1 text-slate-400 hover:text-red-400 transition cursor-pointer ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab("login")}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-3.5 py-1.5 rounded-xl font-bold border border-emerald-500 shadow-md transition cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In First</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Subnav */}
      <div className="lg:hidden flex items-center justify-around bg-slate-950 border-t border-slate-800 text-xs py-2 px-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("map")}
          className={`px-2 py-1 rounded font-medium ${
            activeTab === "map" ? "text-emerald-400 font-bold" : "text-slate-400"
          }`}
        >
          NE Map
        </button>
        {user?.mode === "driver" ? (
          <button
            onClick={() => setActiveTab("driver")}
            className={`px-2 py-1 rounded font-medium ${
              activeTab === "driver" ? "text-amber-400 font-bold" : "text-slate-400"
            }`}
          >
            Driver
          </button>
        ) : (
          <>
            <button
              onClick={() => setActiveTab("logistics")}
              className={`px-2 py-1 rounded font-medium ${
                activeTab === "logistics" ? "text-emerald-400 font-bold" : "text-slate-400"
              }`}
            >
              Logistics
            </button>
            <button
              onClick={() => setActiveTab("economics")}
              className={`px-2 py-1 rounded font-medium ${
                activeTab === "economics" ? "text-emerald-400 font-bold" : "text-slate-400"
              }`}
            >
              MSME
            </button>
          </>
        )}
        <button
          onClick={() => setActiveTab("login")}
          className={`px-2 py-1 rounded font-medium flex items-center gap-1 ${
            activeTab === "login" ? "text-emerald-400 font-bold" : "text-slate-400"
          }`}
        >
          <KeyRound className="w-3 h-3" />
          <span>Login ID</span>
        </button>
      </div>
    </header>
  );
};
