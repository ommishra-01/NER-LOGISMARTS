import React, { useState } from "react";
import { UserMode, UserSession } from "../types";
import { 
  Truck, 
  Building2, 
  Wheat, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  CreditCard, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  MapPin,
  FileCheck
} from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: (session: UserSession) => void;
  onContinueAsGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onContinueAsGuest,
}) => {
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<UserMode>("driver");

  // Form states
  const [userId, setUserId] = useState("NER-DRV-8492");
  const [email, setEmail] = useState("bipul.sharma@mountainfreight.ner.gov.in");
  const [phone, setPhone] = useState("9854012345");
  const [password, setPassword] = useState("Driver@NER2026");
  const [fullName, setFullName] = useState("Bipul Sharma");
  const [vehicleNo, setVehicleNo] = useState("AS-01-GC-4921");
  const [licenseNo, setLicenseNo] = useState("AS-0120180049213");
  const [companyName, setCompanyName] = useState("Brahmaputra Mountain Freight Carriers");
  const [selectedState, setSelectedState] = useState("Assam");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fast 1-Click Demo Profiles
  const loadDemoProfile = (role: UserMode) => {
    setError(null);
    setSelectedRole(role);

    if (role === "driver") {
      setUserId("NER-DRV-8492");
      setEmail("bipul.sharma@mountainfreight.ner.gov.in");
      setPhone("9854012345");
      setPassword("Driver@NER2026");
      setFullName("Bipul Sharma");
      setVehicleNo("AS-01-GC-4921 (10-Wheeler Multi-Axle)");
      setLicenseNo("AS-0120180049213");
      setCompanyName("Brahmaputra Mountain Freight");
      setSelectedState("Assam");
    } else if (role === "transport") {
      setUserId("NER-LOG-1048");
      setEmail("control.director@nerlogismart.gov.in");
      setPhone("9435098765");
      setPassword("Manager@NER2026");
      setFullName("Regional Logistics Control Directorate");
      setVehicleNo("");
      setLicenseNo("");
      setCompanyName("North East Inter-State Logistics Directorate");
      setSelectedState("Meghalaya");
    } else {
      setUserId("NER-FPO-3301");
      setEmail("secretary@lakadongturmeric.org");
      setPhone("9863024512");
      setPassword("Farmer@NER2026");
      setFullName("Lakadong Organic Farmers Union");
      setVehicleNo("ML-11-AG-3041");
      setLicenseNo("FPO-REG-ML-892");
      setCompanyName("Jaintia Hills Spices Cooperative");
      setSelectedState("Meghalaya");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!userId.trim()) {
      setError("Please enter your User / Driver / Transporter ID");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid official Email ID");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile phone number");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (selectedRole === "driver" && !vehicleNo.trim()) {
      setError("Please enter Commercial Vehicle Registration Number");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const session: UserSession = {
        id: userId.trim(),
        email: email.trim(),
        phone: cleanPhone,
        name: fullName.trim() || (selectedRole === "driver" ? "Commercial Driver" : "Logistics Manager"),
        mode: selectedRole,
        vehicleNo: selectedRole === "driver" ? vehicleNo.trim() : undefined,
        licenseNo: licenseNo.trim() || undefined,
        companyName: companyName.trim() || undefined,
        roleTitle: selectedRole === "driver" ? "Certified Mountain Freight Pilot" : selectedRole === "transport" ? "Fleet Logistics Controller" : "Agro-Cluster Producer",
        state: selectedState,
        token: `ner-token-${Date.now()}`,
      };

      onLoginSuccess(session);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 text-slate-100 flex flex-col justify-between p-4 sm:p-6 selection:bg-emerald-500 selection:text-white">
      {/* Top Banner Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
            NL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white tracking-tight">
                NER-LogiSmart
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30 uppercase">
                Govt. Gateway
              </span>
            </div>
            <p className="text-xs text-slate-400">
              North Eastern Council (NEC) • Ministry of DoNER Smart Logistics Platform
            </p>
          </div>
        </div>

        <button
          onClick={onContinueAsGuest}
          className="text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>Preview as Guest</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-4xl w-full mx-auto my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Regional Context & Value Banner */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Inter-State Mountain Corridor Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
              Single-Sign-On for North East Freight &amp; Supply Chains
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real-time route planning, active landslide bypass reroutes, Inner Line Permit (ILP) verification, and 24/7 nearest emergency hospitals, pumps, and mechanics across all 8 North Eastern states.
            </p>
          </div>

          {/* 3 Quick Role Demo Buttons */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Quick 1-Click Demo Logins:</span>
              <span className="text-[10px] text-emerald-400 font-mono">Auto-fills credentials</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => loadDemoProfile("driver")}
                className={`p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                  selectedRole === "driver"
                    ? "bg-amber-500/15 border-amber-500/80 text-amber-200"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Hill Freight Driver</div>
                    <div className="text-[10px] text-slate-400">ID: NER-DRV-8492 • AS-01-GC-4921</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  Select
                </span>
              </button>

              <button
                type="button"
                onClick={() => loadDemoProfile("transport")}
                className={`p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                  selectedRole === "transport"
                    ? "bg-emerald-500/15 border-emerald-500/80 text-emerald-200"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Logistics &amp; Fleet Manager</div>
                    <div className="text-[10px] text-slate-400">ID: NER-LOG-1048 • Regional Control</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Select
                </span>
              </button>

              <button
                type="button"
                onClick={() => loadDemoProfile("farmer")}
                className={`p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                  selectedRole === "farmer"
                    ? "bg-purple-500/15 border-purple-500/80 text-purple-200"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Farmer / MSME Producer</div>
                    <div className="text-[10px] text-slate-400">ID: NER-FPO-3301 • Lakadong Spices</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                  Select
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Parivahan &amp; Sarathi Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encryption</span>
            </div>
          </div>
        </div>

        {/* Right Side: Prominent Login & Registration Form */}
        <div className="lg:col-span-7 bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative backdrop-blur-md">
          {/* Tabs: Sign In / Register */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAuthTab("login")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  authTab === "login"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In With Credentials
              </button>
              <button
                type="button"
                onClick={() => setAuthTab("register")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  authTab === "register"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Register New ID
              </button>
            </div>

            <span className="text-[11px] text-slate-400 hidden sm:inline">
              NER Portal v3.8
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-500/60 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Role Selection Pills */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Access Role &amp; Entity
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole("driver")}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                    selectedRole === "driver"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500 ring-1 ring-amber-500"
                      : "bg-slate-950/50 text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span className="truncate">Driver</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("transport")}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                    selectedRole === "transport"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500 ring-1 ring-emerald-500"
                      : "bg-slate-950/50 text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="truncate">Logistics</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("farmer")}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                    selectedRole === "farmer"
                      ? "bg-purple-500/20 text-purple-300 border-purple-500 ring-1 ring-purple-500"
                      : "bg-slate-950/50 text-slate-400 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <Wheat className="w-3.5 h-3.5" />
                  <span className="truncate">Farmer FPO</span>
                </button>
              </div>
            </div>

            {/* Row 2: User ID & Full Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Driver / Transporter ID <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="e.g. NER-DRV-8492"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Full Name / Entity Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Bipul Sharma"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Row 3: Email ID & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Official Email ID <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="driver@nerlogismart.gov.in"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Mobile Phone Number <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9854012345"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Password with Show/Hide */}
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Password <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security password"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Row 5: Dynamic Role Credentials (Vehicle No, License No, Company) */}
            {selectedRole === "driver" && (
              <div className="p-3.5 bg-amber-500/5 border border-amber-500/30 rounded-xl space-y-2.5">
                <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Commercial Mountain Vehicle Credentials</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">
                      Vehicle Registration Number
                    </label>
                    <input
                      type="text"
                      value={vehicleNo}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      placeholder="e.g. AS-01-GC-4921"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">
                      Commercial Driving License No.
                    </label>
                    <input
                      type="text"
                      value={licenseNo}
                      onChange={(e) => setLicenseNo(e.target.value)}
                      placeholder="e.g. AS-0120180049213"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedRole === "transport" && (
              <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/30 rounded-xl space-y-2.5">
                <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Fleet Logistics &amp; Transport Directorate Details</span>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">
                    Transport Company / Authority Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Brahmaputra Mountain Freight Carriers"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            )}

            {selectedRole === "farmer" && (
              <div className="p-3.5 bg-purple-500/5 border border-purple-500/30 rounded-xl space-y-2.5">
                <div className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5">
                  <Wheat className="w-3.5 h-3.5" />
                  <span>FPO / Agro-Producer Cooperative Society</span>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">
                    Cooperative / Mandi Society Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Jaintia Hills Organic Lakadong Turmeric Union"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* Remember Me & Assistance */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-950"
                />
                <span>Remember this terminal session</span>
              </label>

              <span className="text-emerald-400 hover:underline cursor-pointer">
                Forgot Password or ID?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white rounded-2xl text-xs font-bold tracking-wide shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                  <span>Authenticating Government ID &amp; Fleet Clearance...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  <span>
                    {authTab === "login" ? "Enter NER-LogiSmart Secure Portal" : "Register & Issue Digital Clearance ID"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Credentials Note */}
      <div className="max-w-6xl w-full mx-auto py-3 text-center text-[11px] text-slate-500 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© 2026 North Eastern Regional Logistics &amp; Accessibility Framework (NEC)</span>
        <div className="flex items-center gap-3">
          <span>Assam</span>
          <span>•</span>
          <span>Meghalaya</span>
          <span>•</span>
          <span>Nagaland</span>
          <span>•</span>
          <span>Manipur</span>
          <span>•</span>
          <span>Arunachal</span>
          <span>•</span>
          <span>Mizoram</span>
          <span>•</span>
          <span>Tripura</span>
          <span>•</span>
          <span>Sikkim</span>
        </div>
      </div>
    </div>
  );
};
