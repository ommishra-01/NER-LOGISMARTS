import React from "react";
import { 
  X, 
  Route, 
  MapPin, 
  Clock, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  AlertTriangle,
  Globe,
  Truck
} from "lucide-react";
import { PopularCorridorPreset, POPULAR_CORRIDOR_PRESETS } from "../data/nerData";

interface AllIndiaRoutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute: (preset: PopularCorridorPreset) => void;
}

export const AllIndiaRoutesModal: React.FC<AllIndiaRoutesModalProps> = ({
  isOpen,
  onClose,
  onSelectRoute,
}) => {
  if (!isOpen) return null;

  const panIndiaPresets = POPULAR_CORRIDOR_PRESETS.filter(
    (p) => p.category === "pan_india"
  );
  const nerLifelines = POPULAR_CORRIDOR_PRESETS.filter(
    (p) => p.category === "ner_lifeline"
  );

  return (
    <div className="fixed inset-0 z-[1200] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all">
        {/* Header */}
        <div className="bg-slate-950 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  National Corridors: India to North East Route Network
                </h3>
                <span className="text-[10px] bg-blue-600/30 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-500/40">
                  NH-27 ARTERIAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                1-Click route mapping via the Siliguri "Chicken's Neck" Gateway to Guwahati &amp; the 8 Sister States
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Siliguri Gateway Strategic Context Bar */}
        <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-emerald-400">Siliguri "Chicken's Neck" Corridor:</span>
            <span className="text-slate-400 hidden sm:inline">
              Every national highway from Delhi, Kolkata, Mumbai, or Patna funnels through Siliguri (WB) &amp; Srirampur Border Gate into Guwahati.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Key Node: [26.72°N, 88.42°E]
          </span>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-5 text-xs">
          {/* Section 1: Pan-India to North East Corridors */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <span>🇮🇳</span>
                <span>Mainland India ➔ North East National Lifelines (via Siliguri)</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-medium">
                {panIndiaPresets.length} Major Highways
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {panIndiaPresets.map((preset) => (
                <div
                  key={preset.title}
                  className="bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 p-3 rounded-xl transition flex flex-col justify-between gap-2.5 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm group-hover:text-blue-400 transition">
                        {preset.title}
                      </span>
                      <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800 font-mono">
                        National Trunk
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-medium">
                      {preset.highwayLabel}
                    </p>

                    {preset.hazardWarning && (
                      <div className="flex items-start gap-1.5 text-[10px] text-amber-400/90 bg-amber-950/30 p-1.5 rounded-lg border border-amber-800/40">
                        <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                        <span>{preset.hazardWarning}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      Via Srirampur Gate &rarr; Guwahati Hub
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectRoute(preset);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition active:scale-95 cursor-pointer"
                    >
                      <Route className="w-3.5 h-3.5" />
                      <span>Plot Route on Map</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Intra-North East Mountain Corridors */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>⛰️</span>
                <span>North East Mountain Corridors &amp; Agro Mandi Lifelines</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-medium">
                {nerLifelines.length} Arterial Routes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {nerLifelines.map((preset) => (
                <div
                  key={preset.title}
                  className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 p-3 rounded-xl transition flex flex-col justify-between gap-2.5 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm group-hover:text-emerald-400 transition">
                        {preset.title}
                      </span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800 font-mono">
                        NER Lifeline
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 font-medium">
                      {preset.highwayLabel}
                    </p>

                    {preset.hazardWarning && (
                      <div className="flex items-start gap-1.5 text-[10px] text-amber-400/90 bg-amber-950/30 p-1.5 rounded-lg border border-amber-800/40">
                        <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                        <span>{preset.hazardWarning}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      With AI Landslide Bypass Detection
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectRoute(preset);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition active:scale-95 cursor-pointer"
                    >
                      <Route className="w-3.5 h-3.5" />
                      <span>Plot Route on Map</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Tip: You can also select any custom town or gateway from the top search bar.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
