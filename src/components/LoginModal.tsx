import React, { useState } from "react";
import { UserMode, UserSession } from "../types";
import { 
  Truck, 
  Building2, 
  Wheat,
  Phone, 
  Lock, 
  Mail,
  User,
  Eye, 
  EyeOff, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  AlertCircle,
  FileCheck
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
  initialMode?: UserMode;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = "driver",
}) => {
  const [selectedMode, setSelectedMode] = useState<UserMode>(initialMode);
  const [userId, setUserId] = useState("NER-DRV-8492");
  const [email, setEmail] = useState("bipul.sharma@mountainfreight.ner.gov.in");
  const [phone, setPhone] = useState("9854012345");
  const [password, setPassword] = useState("Driver@NER2026");
  const [vehicleNo, setVehicleNo] = useState("AS-01-GC-4921");
  const [companyName, setCompanyName] = useState("Brahmaputra Mountain Freight Carriers");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userId.trim()) {
      setError("Please enter your Driver / Transporter ID");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid official Email ID");
      return;
    }

    // Clean phone number
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile phone number");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters for security");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const session: UserSession = {
        id: userId.trim(),
        email: email.trim(),
        phone: cleanPhone,
        name: selectedMode === "driver" ? "Bipul Sharma (Driver)" : selectedMode === "transport" ? "NER Logistics Directorate" : "Lakadong Organic Farmers Union",
        mode: selectedMode,
        vehicleNo: selectedMode === "driver" ? vehicleNo : undefined,
        companyName: companyName,
        roleTitle: selectedMode === "driver" ? "Certified Mountain Freight Pilot" : "Fleet Logistics Manager",
      };
      onLoginSuccess(session);
      onClose();
    }, 500);
  };

  const setDemoDriver = () => {
    setSelectedMode("driver");
    setUserId("NER-DRV-8492");
    setEmail("bipul.sharma@mountainfreight.ner.gov.in");
    setPhone("9854012345");
    setPassword("Driver@NER2026");
    setVehicleNo("AS-01-GC-4921");
    setCompanyName("Brahmaputra Mountain Freight");
    setError(null);
  };

  const setDemoTransport = () => {
    setSelectedMode("transport");
    setUserId("NER-LOG-1048");
    setEmail("control.director@nerlogismart.gov.in");
    setPhone("9435098765");
    setPassword("Manager@NER2026");
    setVehicleNo("");
    setCompanyName("North East Inter-State Logistics Directorate");
    setError(null);
  };

  const setDemoFarmer = () => {
    setSelectedMode("farmer");
    setUserId("NER-FPO-3301");
    setEmail("secretary@lakadongturmeric.org");
    setPhone("9863024512");
    setPassword("Farmer@NER2026");
    setVehicleNo("ML-11-AG-3041");
    setCompanyName("Jaintia Hills Spices Cooperative");
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-5 border-b border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                NER-LogiSmart Portal Authentication
              </h2>
              <p className="text-xs text-slate-400">
                Log In with ID, Email, Phone Number &amp; Password
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Your Access Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMode("driver")}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  selectedMode === "driver"
                    ? "bg-amber-500/15 border-amber-500 text-white ring-1 ring-amber-500"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Truck className="w-4 h-4 text-amber-400" />
                  {selectedMode === "driver" && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="font-bold text-xs">Driver</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode("transport")}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  selectedMode === "transport"
                    ? "bg-emerald-500/15 border-emerald-500 text-white ring-1 ring-emerald-500"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  {selectedMode === "transport" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="font-bold text-xs">Logistics</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode("farmer")}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  selectedMode === "farmer"
                    ? "bg-purple-500/15 border-purple-500 text-white ring-1 ring-purple-500"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Wheat className="w-4 h-4 text-purple-400" />
                  {selectedMode === "farmer" && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />}
                </div>
                <div className="font-bold text-xs">Farmer FPO</div>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-950/70 border border-red-800 text-red-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            {/* User ID & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Driver / Transporter ID <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="e.g. NER-DRV-8492"
                    className="w-full pl-8 pr-2.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Official Email ID <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@nerlogismart.gov.in"
                    className="w-full pl-8 pr-2.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Phone & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Mobile Phone Number <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9854012345"
                    className="w-full pl-8 pr-2.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Security Password <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-8 pr-8 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Role detail: Vehicle or Company */}
            {selectedMode === "driver" ? (
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Commercial Vehicle Reg No.
                </label>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  placeholder="e.g. AS-01-GC-4921"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs uppercase font-mono"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Company / Authority / FPO Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Brahmaputra Mountain Freight Carriers"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Remember session</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Govt. Verified</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white cursor-pointer mt-1"
            >
              {isLoading ? (
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Log in to NER-LogiSmart Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="pt-3 border-t border-slate-800 text-xs">
            <div className="text-slate-400 mb-1.5 font-medium text-[11px]">Quick 1-Click Demo Logins:</div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={setDemoDriver}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <div className="truncate">
                  <div className="font-semibold text-[10px] text-amber-300">Driver</div>
                  <div className="text-[9px] text-slate-400 truncate">Bipul Sharma</div>
                </div>
              </button>

              <button
                type="button"
                onClick={setDemoTransport}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <div className="font-semibold text-[10px] text-emerald-300">Logistics</div>
                  <div className="text-[9px] text-slate-400 truncate">NER Director</div>
                </div>
              </button>

              <button
                type="button"
                onClick={setDemoFarmer}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <Wheat className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <div className="truncate">
                  <div className="font-semibold text-[10px] text-purple-300">Farmer FPO</div>
                  <div className="text-[9px] text-slate-400 truncate">Lakadong Spices</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
