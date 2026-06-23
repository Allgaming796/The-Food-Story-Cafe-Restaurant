import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Clock, 
  Users, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  Flame, 
  Calendar,
  AlertCircle,
  HelpCircle
} from "lucide-react";

interface LiveWaitingTimeProps {
  onReserveClick: () => void;
}

export function LiveWaitingTime({ onReserveClick }: LiveWaitingTimeProps) {
  const [partySize, setPartySize] = useState<number>(2);
  const [waitTime, setWaitTime] = useState<number>(5);
  const [tablesAhead, setTablesAhead] = useState<number>(0);
  const [status, setStatus] = useState<"ready" | "moderate" | "busy">("ready");
  const [message, setMessage] = useState<string>("Tables are instantly available right now.");
  const [groupNotes, setGroupNotes] = useState<string>("");
  const [isWeekend, setIsWeekend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  const fetchWaitingTime = async (size = partySize) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/waiting-time?partySize=${size}`);
      if (!response.ok) {
        throw new Error("Failed to consult live counter.");
      }
      const data = await response.json();
      setWaitTime(data.waitTime);
      setTablesAhead(data.tablesAhead);
      setStatus(data.status);
      setMessage(data.message);
      setGroupNotes(data.groupNotes);
      setIsWeekend(data.isWeekend);
      
      // format last refreshed timestamp
      const timeStr = new Date(data.lastUpdated).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setLastRefreshed(timeStr);
    } catch (err: any) {
      console.error(err);
      setError("Unable to contact live counter. Showing typical estimates.");
      // Fallback calculation in case of connection drop
      const hour = new Date().getHours();
      const generatedWait = hour >= 19 && hour < 22 ? 30 : hour >= 11 && hour < 14.5 ? 15 : 5;
      setWaitTime(generatedWait);
      setStatus(generatedWait > 20 ? "busy" : generatedWait > 8 ? "moderate" : "ready");
      setLastRefreshed(new Date().toLocaleTimeString());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitingTime(partySize);
    
    // Auto refresh every 45 seconds to keep data live
    const interval = setInterval(() => {
      fetchWaitingTime(partySize);
    }, 45000);
    
    return () => clearInterval(interval);
  }, [partySize]);

  const handlePartySizeChange = (size: number) => {
    setPartySize(size);
  };

  return (
    <div id="live-waiting-time-container" className="max-w-4xl mx-auto px-4 py-4">
      <div className="bg-gradient-to-r from-emerald-brand to-emerald-mid border border-emerald-mid rounded-3xl p-5 sm:p-7 text-left shadow-lg text-white relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-gold-brand opacity-10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-light/35 pb-5 z-10 relative">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 bg-gold-brand/12 border border-gold-brand/30 text-gold-brand text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-brand animate-ping" />
              <span>Dine-In Status Panel</span>
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-white leading-tight">
              Walk-in Live Wait Time Indicator
            </h3>
            <p className="text-xs text-gray-300 font-light max-w-xl">
              Locally computed queue metrics from Hanumat Dham Road, Shahjahanpur. Select your party size for personalized estimates.
            </p>
          </div>

          {/* Refresh Tool Button */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="text-[10px] text-gray-300 font-mono">
              Auto-sync active • Refreshed: {lastRefreshed || "--:--"}
            </span>
            <button
              onClick={() => fetchWaitingTime()}
              disabled={isLoading}
              className="p-2 border border-emerald-light/45 hover:border-gold-brand bg-emerald-mid/50 hover:bg-emerald-light text-gold-brand hover:text-white rounded-xl transition-all cursor-pointer disabled:opacity-50"
              title="Sync now"
            >
              <RotateCcw className={`w-4 h-4 ${isLoading ? "animate-spin text-white" : ""}`} />
            </button>
          </div>
        </div>

        {/* Dynamic Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-normal z-10 relative">
          
          {/* Waiting metrics col */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-4">
            
            {/* Dynamic Status Display Box */}
            <div className="bg-emerald-brand/40 border border-emerald-light/20 p-5 rounded-2xl flex items-center gap-5">
              
              {/* Big Animated Circled Number */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-dashed border-gold-brand/30 flex flex-col items-center justify-center bg-emerald-mid">
                  <span className="font-serif text-3xl sm:text-4xl font-black text-white leading-none">
                    {waitTime}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-gold-brand font-bold uppercase mt-1">
                    Mins
                  </span>
                </div>
                
                {/* Micro Status badge over layout */}
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border border-white shadow-md ${
                  status === "ready" 
                    ? "bg-green-500 text-white" 
                    : status === "moderate" 
                      ? "bg-yellow-500 text-black" 
                      : "bg-amber-600 text-white"
                }`}>
                  {status === "ready" ? "✓" : status === "moderate" ? "⏰" : "🔥"}
                </div>
              </div>

              {/* Status explanation */}
              <div className="text-left space-y-1">
                <p className="text-[10px] font-mono font-bold tracking-wider uppercase text-gold-brand">
                  Estimated Walk-in Wait
                </p>
                <p className="font-serif text-base sm:text-xl font-bold text-white">
                  {status === "ready" && "Immediate Entry"}
                  {status === "moderate" && "Short Breezy Queue"}
                  {status === "busy" && "Peak Dinner Rush"}
                </p>
                <div className="flex items-center gap-1.5 text-xs">
                  <Users className="w-3.5 h-3.5 text-gold-brand" />
                  <span className="text-gray-200">
                    {tablesAhead === 0 ? "No groups waiting ahead" : `${tablesAhead} group${tablesAhead > 1 ? "s" : ""} waiting ahead`}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive options and action col */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Party selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gold-brand font-bold uppercase tracking-widest block">
                Total Dining People / Group Size
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 2, label: "1-2 Duos" },
                  { value: 4, label: "3-4 Group" },
                  { value: 6, label: "5-8 Family" },
                  { value: 10, label: "9+ Grand" }
                ].map((item) => {
                  const isSelected = partySize === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => handlePartySizeChange(item.value)}
                      className={`py-3 px-1 text-center rounded-xl font-mono text-xs font-bold transition duration-200 select-none cursor-pointer border ${
                        isSelected
                          ? "bg-gold-brand text-emerald-brand border-gold-brand shadow-md"
                          : "bg-emerald-brand/40 text-gray-200 border-emerald-light/20 hover:bg-emerald-mid/50 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note details */}
            <div className="bg-emerald-mid/45 border border-emerald-light/10 p-3.5 rounded-xl text-left space-y-1">
              <div className="flex items-center gap-1.5">
                {status === "busy" ? (
                  <Flame className="w-4 h-4 text-orange-400 shrink-0 animate-bounce" />
                ) : (
                  <Sparkles className="w-4 h-4 text-gold-brand shrink-0" />
                )}
                <span className="text-[11px] font-bold text-white uppercase font-mono tracking-wider">
                  Live Dispatch: {groupNotes}
                </span>
              </div>
              <p className="text-[11.5px] text-gray-200 font-light">
                {message} {isWeekend && "Weekend dinner events are busier than weekdays."}
              </p>
            </div>

            {/* Error notifications if any */}
            {error && (
              <div className="bg-red-900/40 border border-red-700/30 p-2.5 rounded-xl flex items-center gap-2 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Dynamic CTA Bypass Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-dashed border-emerald-light/30">
              <span className="text-[10.5px] text-gray-300 font-light font-sans text-center sm:text-left leading-tight">
                Want to avoid the wait? Pre-reserve an elegant table online for free!
              </span>
              <button
                onClick={onReserveClick}
                className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-4.5 py-2 hover:py-2 bg-gold-brand hover:bg-gold-light text-emerald-brand text-xs font-bold rounded-xl transition cursor-pointer uppercase tracking-wider"
              >
                <span>Pre-Book Table Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
