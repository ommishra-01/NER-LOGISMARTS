import React, { useEffect } from "react";
import { HazardAlertNotification } from "../types";
import { 
  AlertTriangle, 
  Navigation, 
  MapPin, 
  Clock, 
  X, 
  Radio, 
  ArrowRight, 
  Camera, 
  CheckCircle2,
  Volume2
} from "lucide-react";

interface BroadcastAlertBannerProps {
  alert: HazardAlertNotification | null;
  onDismiss: () => void;
  onViewOnMap: (hazardId: string) => void;
  onEngageDriverBypass: (hazardId: string) => void;
}

export const BroadcastAlertBanner: React.FC<BroadcastAlertBannerProps> = ({
  alert,
  onDismiss,
  onViewOnMap,
  onEngageDriverBypass,
}) => {
  // Play subtle warning chime when a new alert is received
  useEffect(() => {
    if (!alert) return;

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, audioCtx.currentTime + 0.3); // D6

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }, [alert?.id]);

  if (!alert) return null;

  return (
    <div className="fixed top-20 inset-x-3 sm:inset-x-6 z-50 max-w-4xl mx-auto animate-bounce-short">
      <div className="bg-slate-900 border-2 border-red-500/90 rounded-2xl shadow-2xl p-4 text-white overflow-hidden relative backdrop-blur-md">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-amber-600 to-red-600 opacity-20 blur-lg pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Left: Thumbnail & Hazard Info */}
          <div className="flex items-start gap-3.5">
            {/* Photo Thumbnail */}
            {alert.photoUrl ? (
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-black shadow-md group">
                <img
                  src={alert.photoUrl}
                  alt={alert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute bottom-0 inset-x-0 bg-red-600 text-[8px] font-extrabold uppercase text-center py-0.5 tracking-wider">
                  Verified Cam
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                <Camera className="w-8 h-8" />
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                  <Radio className="w-3 h-3 text-white animate-ping" />
                  Live Camera Hazard Alert
                </span>
                <span className="text-[11px] font-semibold text-amber-300">
                  {alert.roadName} • {alert.state}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                  {alert.reportedAt}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                {alert.locationName}: {alert.hazardType.replace(/_/g, " ").toUpperCase()}
              </h4>

              {/* Alternate Route Highlight */}
              <div className="p-2 bg-emerald-950/70 border border-emerald-600/60 rounded-xl text-xs flex items-center gap-2 flex-wrap">
                <span className="font-bold text-emerald-400 flex items-center gap-1 shrink-0">
                  <Navigation className="w-3.5 h-3.5" />
                  Alternate Route Ready:
                </span>
                <span className="font-semibold text-emerald-200">
                  {alert.alternateBypassName} (+{alert.bypassDistanceKm} km, +{alert.estimatedDelayMinutes} min)
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
            <button
              onClick={() => onViewOnMap(alert.hazardId)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-1.5 shadow cursor-pointer"
            >
              <span>View Map Route</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>

            <button
              onClick={() => onEngageDriverBypass(alert.hazardId)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Engage Driver Bypass</span>
            </button>

            <button
              onClick={onDismiss}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer ml-1"
              title="Dismiss alert notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
