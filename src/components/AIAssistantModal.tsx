import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ShieldAlert, 
  Navigation, 
  FileCheck, 
  Wheat, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  MapPin,
  Fuel,
  PhoneCall,
  ChevronRight,
  Info
} from "lucide-react";
import { generateClientSearchAdvisory } from "../utils/autonomousAiAdvisor";

export interface RouteContextData {
  origin?: string;
  destination?: string;
  distanceKm?: number;
  estimatedHours?: number;
  highwayCode?: string;
  hazards?: string[];
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  routeContext?: RouteContextData | null;
}

interface Message {
  role: "assistant" | "user";
  text: string;
  time: string;
  data?: any;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ 
  isOpen, 
  onClose,
  routeContext 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I am your AI Logistics & Corridor Search Advisor for North East India and Pan-India Arterial Routes. Ask me about real-time road conditions, mountain landslide bypasses, state Inner Line Permits (ILP), fuel stops, and freight rates.",
      time: "Just now",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [engineStatus, setEngineStatus] = useState<string>("Autonomous NER Mountain Logistics AI");

  // Fetch status once on mount
  useEffect(() => {
    fetch("/api/ai/status")
      .then((res) => res.json())
      .then((data) => {
        if (data.fallbackEngine) {
          setEngineStatus(data.geminiConfigured ? "Gemini 3.8 Flash (Live)" : data.fallbackEngine);
        }
      })
      .catch(() => {});
  }, []);

  if (!isOpen) return null;

  // Context-aware prompt suggestions
  const dynamicPrompts = routeContext && routeContext.origin && routeContext.destination
    ? [
        `Analyze corridor risks for ${routeContext.origin} ➔ ${routeContext.destination}`,
        `Check ILP & border gates on ${routeContext.origin} ➔ ${routeContext.destination}`,
        `What are the emergency bypasses if ${routeContext.destination} is blocked?`,
        `Fuel stops & mountain driving precautions for this route`,
      ]
    : [
        "How do I bypass the Sonapur landslide on NH-6 towards Silchar?",
        "Route & border checkposts from Kolkata to Guwahati",
        "What permits are required for a truck entering Arunachal Pradesh?",
        "Which route avoids Dimapur-Kohima Paglapahar rockfalls?",
      ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      // Send user's actual text query + active route context to search-advisor
      const payload = {
        query: textToSend,
        origin: routeContext?.origin || "Guwahati",
        destination: routeContext?.destination || "Silchar / Regional Hub",
        distanceKm: routeContext?.distanceKm,
        estimatedHours: routeContext?.estimatedHours,
        highwayCode: routeContext?.highwayCode,
        hazards: routeContext?.hazards,
        userRole: "Commercial Freight Operator / Driver",
        vehicleType: "10-wheel Heavy Freight Carrier",
      };

      let data: any = null;
      try {
        const res = await fetch("/api/ai/search-advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          data = await res.json();
        }
      } catch (e) {
        console.info("Using autonomous client advisor for GitHub Pages / static hosting");
      }

      // If backend was unreachable or returned error, use client-side mountain intelligence
      if (!data) {
        data = generateClientSearchAdvisory(payload);
      }

      if (data.aiEngine) {
        setEngineStatus(data.aiEngine);
      }

      // Format clean, scannable response text
      let responseText = "";
      if (data.summary) {
        responseText = data.summary;
      } else if (data.recommendedBypass) {
        responseText = `🚗 **Recommended Bypass**: ${data.recommendedBypass}\n\n⏱️ **Estimated Delay**: ${data.estimatedDelay}\n\n⚠️ **Safety Advisory**: ${data.safetyAdvisory}`;
      } else {
        responseText = data.text || "Corridor analysis complete. Review recommended bypasses and regulations below.";
      }

      const aiMsg: Message = {
        role: "assistant",
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        data,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI assistant error:", error);
      const fallbackAdvisory = generateClientSearchAdvisory({
        query: textToSend,
        origin: routeContext?.origin,
        destination: routeContext?.destination,
      });
      const fallbackMsg: Message = {
        role: "assistant",
        text: fallbackAdvisory.summary,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        data: fallbackAdvisory,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[680px] max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/80 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">
                  AI Route &amp; Corridor Search Advisor
                </h3>
                <span className="text-[10px] bg-emerald-900/60 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-700/60">
                  {engineStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Landslide Bypasses • BRO Clearance • Inter-State ILP • Freight Rates
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

        {/* Active Route Context Banner (If opened for a specific searched route) */}
        {routeContext && routeContext.origin && routeContext.destination && (
          <div className="bg-emerald-950/40 border-b border-emerald-800/50 px-4 py-2 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-bold text-white">Active Corridor:</span>
              <span>{routeContext.origin} ➔ {routeContext.destination}</span>
              {routeContext.distanceKm && (
                <span className="text-slate-300">• {routeContext.distanceKm} km (~{routeContext.estimatedHours}h)</span>
              )}
            </div>
            {routeContext.highwayCode && (
              <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                {routeContext.highwayCode}
              </span>
            )}
          </div>
        )}

        {/* Quick Prompts Bar */}
        <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 shrink-0 font-medium text-[11px] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Suggestions:
          </span>
          {dynamicPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/60 whitespace-nowrap text-[11px] transition cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "bg-emerald-600 text-white shadow-sm"
                }`}
              >
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed ${
                  msg.role === "user"
                    ? "bg-amber-500/10 border border-amber-500/40 text-slate-100"
                    : "bg-slate-800/90 border border-slate-700/80 text-slate-200 shadow-sm space-y-3"
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Structured Corridor Intelligence Cards if data exists */}
                {msg.data && (
                  <div className="space-y-2.5 pt-2 border-t border-slate-700/80 text-[11px]">
                    {/* Bypasses */}
                    {msg.data.recommendedBypasses && msg.data.recommendedBypasses.length > 0 && (
                      <div className="bg-slate-900/90 p-2.5 rounded-xl border border-teal-800/60 space-y-1.5">
                        <div className="font-bold text-teal-300 flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Recommended Mountain Bypasses:</span>
                        </div>
                        {msg.data.recommendedBypasses.map((bp: any, idx: number) => (
                          <div key={idx} className="pl-3 border-l-2 border-teal-500/60 py-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white">{bp.name}</span>
                              <span className="text-amber-400 font-bold text-[10px]">{bp.extraTime}</span>
                            </div>
                            <p className="text-slate-300 text-[10px]">{bp.description}</p>
                            <span className="text-[10px] text-teal-400 block mt-0.5">Suitability: {bp.suitability}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Checkposts & Permits */}
                    {msg.data.checkpostsAndPermits && (
                      <div className="bg-slate-900/90 p-2.5 rounded-xl border border-blue-800/60 space-y-1">
                        <div className="font-bold text-sky-300 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Interstate Checkposts &amp; Permits:</span>
                        </div>
                        <p className="text-amber-200 text-[10px] font-medium">
                          {msg.data.checkpostsAndPermits.ilpNotice}
                        </p>
                        <div className="text-slate-300 text-[10px] pl-3 border-l-2 border-sky-500/60 space-y-0.5 mt-1">
                          <div>
                            <span className="text-slate-400">Entry Gates: </span>
                            <span className="text-white font-medium">{msg.data.checkpostsAndPermits.entryGates?.join(" • ")}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Required Docs: </span>
                            <span className="text-white">{msg.data.checkpostsAndPermits.requiredDocuments?.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Safety Precautions & Fuel Stops */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                      {msg.data.criticalSafetyPrecautions && (
                        <div className="bg-slate-900/70 p-2 rounded-xl border border-slate-700/60">
                          <span className="font-bold text-amber-300 block mb-1">Mountain Driving Rules:</span>
                          <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                            {msg.data.criticalSafetyPrecautions.slice(0, 3).map((p: string, pIdx: number) => (
                              <li key={pIdx}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {msg.data.emergencyContacts && (
                        <div className="bg-slate-900/70 p-2 rounded-xl border border-slate-700/60">
                          <span className="font-bold text-red-300 block mb-1">Emergency Lines:</span>
                          <div className="space-y-0.5 text-slate-300">
                            {msg.data.emergencyContacts.map((c: any, cIdx: number) => (
                              <div key={cIdx} className="flex justify-between">
                                <span className="truncate pr-1">{c.name}:</span>
                                <span className="font-mono font-bold text-white shrink-0">{c.phone}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-slate-400 mt-2 text-right">{msg.time}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-2 animate-pulse">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Analyzing mountain terrain, BRO road clearance, and highway regulations...</span>
            </div>
          )}
        </div>

        {/* Footer Input */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Ask about route status, road closures, permits, fuel stops or bypasses..."
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputQuery.trim()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

