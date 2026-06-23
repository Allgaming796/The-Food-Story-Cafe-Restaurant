import React, { useMemo } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  CheckCircle2, 
  Tv, 
  Music, 
  Mic, 
  Coffee, 
  UtensilsCrossed, 
  UserCheck, 
  Clock, 
  ChevronRight, 
  Lock, 
  Activity, 
  Layers 
} from "lucide-react";

interface BanquetHallVisualizerProps {
  guestCount: number;
}

interface LayoutScaleInfo {
  name: string;
  subName: string;
  maxCapacityText: string;
  layoutDescription: string;
  activeSections: string[];
  tablesCount: number;
  buffetLanes: number;
  recommendedStaff: {
    servers: number;
    stewards: number;
    mixologists: number;
  };
  densityRating: string;
  densityDesc: string;
  prepTime: string;
}

export function BanquetHallVisualizer({ guestCount }: BanquetHallVisualizerProps) {
  // Determine scale config based on guest count
  const layoutInfo = useMemo<LayoutScaleInfo>(() => {
    if (guestCount <= 60) {
      return {
        name: "The Ivory Lounge & Bistro Annex",
        subName: "Bespoke Micro-Banquet Setup",
        maxCapacityText: "Cozy Gatherings Up to 60 Guests",
        layoutDescription: "Our warm artisanal bistro corner and leather-backed family booths are styled as an intimate dining saloon. Perfect for high-teas, small roka ceremonies, and signature cozy birthday socials.",
        activeSections: ["Bistro Café Corner", "Family Dining Booths", "Single-Lane Buffet"],
        tablesCount: 6,
        buffetLanes: 1,
        recommendedStaff: { servers: 3, stewards: 1, mixologists: 1 },
        densityRating: "Luxurious Airiness",
        densityDesc: "Plenty of room for custom photobooths, live acoustic artists, and social mingling.",
        prepTime: "2.0 Hours Setup",
      };
    } else if (guestCount <= 130) {
      return {
        name: "The Emerald Salon with Café Combo",
        subName: "Half-Hall Signature Gathering",
        maxCapacityText: "Mid-Scale Festive Celebrations Up to 130 Guests",
        layoutDescription: "Unites the custom vertical-slat cafe counters with half of the main banquet ballroom. This provides premium formal roundtable seating coupled with comfortable sofa-rail perimeter booths.",
        activeSections: ["Bistro Café Corner", "Premium Booth Array", "Main Stage Area", "Double-Lane Buffet"],
        tablesCount: 12,
        buffetLanes: 2,
        recommendedStaff: { servers: 6, stewards: 2, mixologists: 1 },
        densityRating: "Optimal Flow Style",
        densityDesc: "Great sightlines to the main stage, comfortable movement patterns around buffet counters.",
        prepTime: "3.5 Hours Setup",
      };
    } else if (guestCount <= 220) {
      return {
        name: "Sovereign Ballroom & Grand Salon",
        subName: "Full-Scale Deluxe Layout",
        maxCapacityText: "Large Banqueting Layout Up to 220 Guests",
        layoutDescription: "The sovereign ballroom setup spans the entire central hall length. Designed in elegant column structures with premium track spotlights active, and dual buffet wings placed at the back for continuous flow.",
        activeSections: ["Main Stage Area", "Grand Saloon Roundtables", "Double-Lane Buffet", "Artisanal Dessert Bar"],
        tablesCount: 22,
        buffetLanes: 2,
        recommendedStaff: { servers: 11, stewards: 3, mixologists: 2 },
        densityRating: "Festive & Interactive",
        densityDesc: "A bustling celebratory mood with centralized dance aisles, large banquet tables, and optimal service.",
        prepTime: "4.5 Hours Setup",
      };
    } else {
      return {
        name: "Grand Ivory Hall (All Areas Integrated)",
        subName: "Royal Combined Maximum Capacity",
        maxCapacityText: "Ultimate Grandeur Up to 300 Guests",
        layoutDescription: "Combines the Sovereign Ballroom, the entire Emerald Salon, the plush Cafe Booths, and the Artisan Lounge into one massive open-concept festive floor. Perfect for wedding receptions and majestic corporate galas.",
        activeSections: ["Main Stage Area", "Grand Saloon Roundtables", "Family Dining Booths", "Bistro Café Corner", "Triple-Lane Premium Buffet", "Artisanal Dessert Bar", "Dedicated Welcome Foyer"],
        tablesCount: 30,
        buffetLanes: 3,
        recommendedStaff: { servers: 16, stewards: 4, mixologists: 3 },
        densityRating: "Majestic Grand Block",
        densityDesc: "Full-capacity high-vibrancy atmosphere. Integrated sound system, red carpet aisles, and 3 distinct buffet pathways prevent queues.",
        prepTime: "6.0 Hours Setup",
      };
    }
  }, [guestCount]);

  // List of all prospective client amenities & thresholds
  const prospectiveAmenities = [
    { id: "am-cafe", label: "Artisanal Espresso & Chai Bar", minGuests: 20, icon: Coffee, desc: "Freshly brewed specialty coffees and Lucknowi Zafrani teas on request" },
    { id: "am-mic", label: "PA System & Wireless Mics", minGuests: 50, icon: Mic, desc: "Professional audio setup equipped with premium vocal cordless transmitters" },
    { id: "am-buffet2", label: "Double-Lane Buffet Service", minGuests: 80, icon: UtensilsCrossed, desc: "Split lanes to ensure seamless meal collection without bottlenecks" },
    { id: "am-stage", label: "Central Stage Lighting Rig", minGuests: 110, icon: Sparkles, desc: "Customized color wash spotlights and retro warm backdrops to highlight hosts" },
    { id: "am-dessert", label: "Live Flambé & Dessert Fountain", minGuests: 160, icon: Coffee, desc: "Gourmet warm chocolate fountain and freshly baked dry ice waffle station" },
    { id: "am-music", label: "Stage Acoustic Audio Monitor Integration", minGuests: 210, icon: Music, desc: "Integrated amplifiers and power sockets for live ghazal or fusion bands" },
    { id: "am-tv", label: "Dual High-Definition Projectors", minGuests: 250, icon: Tv, desc: "Large cinematic wall-mounted screens to project guest videos, photorolls and slides" }
  ];

  // Capacity Percentage
  const capacityPercent = Math.min(100, Math.round((guestCount / 300) * 100));

  // Floor plan tables positions - representing maximum 30 tables
  // Placed in a grid style to fit beautifully on screen
  const maxTablesCount = 30;
  const tablesArray = Array.from({ length: maxTablesCount }, (_, i) => i + 1);

  return (
    <div className="bg-slate-white rounded-3xl border border-ivory-dark overflow-hidden shadow-sm p-5 sm:p-7 space-y-6 text-left">
      {/* Header and Live Capacity Tracker */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-ivory-dark/60 pb-4">
          <div className="space-y-1">
            <span className="flex items-center gap-1.5 text-gold-brand text-xs font-bold tracking-widest uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-gold-brand animate-ping" />
              <span>Interactive Space Planner</span>
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-emerald-brand">
              Live Hall Configuration Map
            </h3>
            <p className="text-charcoal-mid text-xs font-light">
              Watch our layout blueprint update dynamically as you scale your headcount.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-emerald-brand/5 border border-ivory-dark px-3.5 py-2 rounded-xl shrink-0">
            <div className="space-y-0.5 text-right">
              <span className="text-[10px] font-mono font-bold text-emerald-light uppercase tracking-wider block">
                Selected Scale
              </span>
              <span className="font-mono text-sm font-black text-emerald-brand">
                {guestCount} Seats Included
              </span>
            </div>
            <div className="h-7 w-px bg-ivory-dark" />
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold text-emerald-light uppercase tracking-wider block">
                Total Hall Limit
              </span>
              <span className="font-mono text-sm font-bold text-charcoal-mid">
                300 Max
              </span>
            </div>
          </div>
        </div>

        {/* Capacity Percentage Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono font-bold text-charcoal-mid">
            <span>Room Capacity Utilization:</span>
            <span className={capacityPercent > 85 ? "text-terra-brand" : "text-gold-brand"}>
              {capacityPercent}% ({layoutInfo.densityRating})
            </span>
          </div>
          <div className="w-full h-3 bg-ivory-brand border border-ivory-dark rounded-full overflow-hidden p-0.5">
            <motion.div 
              className={`h-full rounded-full transition-all duration-500 ${
                capacityPercent < 30 
                  ? "bg-emerald-light" 
                  : capacityPercent < 60 
                  ? "bg-emerald-mid" 
                  : capacityPercent < 85 
                  ? "bg-gold-brand" 
                  : "bg-terra-brand"
              }`}
              style={{ width: `${capacityPercent}%` }}
              layout
            />
          </div>
          <div className="grid grid-cols-4 text-[9px] text-charcoal-mid font-mono font-semibold pt-0.5 border-t border-dashed border-ivory-dark/40">
            <span className="text-left">20 - Cozy Lounge</span>
            <span className="text-center">60 - Half Hall</span>
            <span className="text-center">130 - Full Ballroom</span>
            <span className="text-right">220 - Grand Combined</span>
          </div>
        </div>
      </div>

      {/* Main Floor Blueprint Display */}
      <div className="border border-ivory-dark bg-emerald-brand rounded-2xl p-5 sm:p-6 text-white space-y-5 relative shadow-inner overflow-hidden">
        {/* Background Subtle Luxury Patterns */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FAF4E8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold-brand font-bold block">
              Architectural Concept Layout
            </span>
            <h4 className="font-serif text-base sm:text-lg font-bold text-slate-white">
              {layoutInfo.name}
            </h4>
            <p className="text-[11px] text-ivory-dark font-light font-sans tracking-wide">
              {layoutInfo.subName} • {layoutInfo.prepTime}
            </p>
          </div>
          <div className="bg-emerald-mid/60 backdrop-blur-xs border border-gold-brand/20 px-2.5 py-1 rounded-lg text-[10px] font-mono text-gold-brand font-semibold">
            {layoutInfo.tablesCount} Tables Active
          </div>
        </div>

        {/* The Graphic Floor Blueprint Map */}
        <div className="bg-emerald-brand/85 rounded-xl border border-emerald-mid/50 p-4 relative z-10 space-y-6">
          {/* THE STAGE BLOCK (Active state dependent) */}
          <div className="flex justify-center">
            <div className={`w-1/2 sm:w-1/3 py-2 px-4 rounded-b-xl border-t-0 border text-center transition-all duration-500 bg-emerald-mid/40 backdrop-blur-xs ${
              guestCount >= 61
                ? "border-gold-brand text-gold-brand shadow-[0_4px_16px_rgba(232,160,32,0.15)]"
                : "border-emerald-light/25 text-emerald-light/40 border-dashed"
            }`}>
              <div className="font-serif text-[11px] font-bold tracking-widest uppercase">
                {guestCount >= 61 ? "🔥 Main Presentation Stage" : "🔒 Stage Area Static"}
              </div>
              <div className="text-[8px] font-mono tracking-wider">
                {guestCount >= 61 ? "Spotlight wash active" : "Buffet standby option"}
              </div>
            </div>
          </div>

          {/* TABLE MATRIX COMPONENT (DYNAMIC SCALE REPRESENTATION) */}
          <div className="space-y-2">
            <div className="text-[10px] text-center font-mono text-emerald-light uppercase tracking-widest block font-bold border-b border-emerald-mid/30 pb-2">
              Ballroom Floor Round-Table Sets (10 Pax each)
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2">
              {tablesArray.map((num) => {
                const isActive = num <= layoutInfo.tablesCount;
                return (
                  <div 
                    key={num} 
                    className="flex flex-col items-center space-y-1 group relative cursor-pointer"
                  >
                    {/* Ring representing chairs around table */}
                    <div className="relative">
                      {/* Standard chairs dots around table */}
                      <div className="absolute inset-x-0 -top-1.5 flex justify-center">
                        <span className={`w-1.5 h-1.5 rounded-full block transition-colors duration-300 ${isActive ? "bg-gold-light" : "bg-emerald-mid/30"}`} />
                      </div>
                      <div className="absolute inset-y-0 -left-1.5 flex items-center">
                        <span className={`w-1.5 h-1.5 rounded-full block transition-colors duration-300 ${isActive ? "bg-gold-light" : "bg-emerald-mid/30"}`} />
                      </div>
                      <div className="absolute inset-y-0 -right-1.5 flex items-center">
                        <span className={`w-1.5 h-1.5 rounded-full block transition-colors duration-300 ${isActive ? "bg-gold-light" : "bg-emerald-mid/30"}`} />
                      </div>
                      <div className="absolute inset-x-0 -bottom-1.5 flex justify-center">
                        <span className={`w-1.5 h-1.5 rounded-full block transition-colors duration-300 ${isActive ? "bg-gold-light" : "bg-emerald-mid/30"}`} />
                      </div>

                      {/* The Table Outer Box */}
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border font-mono text-[9px] font-bold transition-all duration-500 relative ${
                        isActive
                          ? "border-gold-brand bg-emerald-mid text-white shadow-[0_0_8px_rgba(232,160,32,0.25)] scale-100"
                          : "border-emerald-light/20 bg-emerald-brand/35 text-emerald-light/30 border-dashed scale-95"
                      }`}>
                        T-{num}
                        
                        {/* Dynamic glow corner */}
                        {isActive && (
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-gold-brand" />
                        )}
                      </div>
                    </div>
                    
                    {/* Seat scale label */}
                    <span className={`text-[8px] font-mono block ${isActive ? "text-gold-light font-bold" : "text-emerald-light/30"}`}>
                      {isActive ? "10 Seats" : "Standby"}
                    </span>

                    {/* Popover/Tooltip description */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="bg-charcoal-dark border border-gold-brand/40 text-slate-white text-[9px] font-sans font-normal p-2 rounded-lg shadow-xl w-32 text-center leading-normal">
                        <p className="font-bold text-gold-brand">Table Set {num}</p>
                        <p className="text-[8px] text-gray-300">
                          {isActive 
                            ? "Active formal banquet layout. Pre-set tableware."
                            : "Storage/Folded state. Extra spacing buffer."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LOWER PERIMETER LANES (Catering, Lounge Seats & Foyer) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-emerald-mid/30 pt-4">
            {/* Buffet Lanes Block */}
            <div className={`p-2.5 rounded-xl border text-center transition-all duration-500 bg-emerald-mid/30 ${
              layoutInfo.buffetLanes >= 1
                ? "border-gold-brand/60 text-white"
                : "border-emerald-light/25 text-emerald-light/30 border-dashed"
            }`}>
              <div className="font-serif text-[10px] font-bold uppercase tracking-wider text-gold-brand flex items-center justify-center gap-1.5">
                <UtensilsCrossed className="w-3 h-3 text-gold-brand" />
                <span>Buffet Food Counters</span>
              </div>
              <div className="text-[10px] font-mono mt-0.5 font-light text-slate-white">
                {layoutInfo.buffetLanes} Primary Service {layoutInfo.buffetLanes > 1 ? "Lanes" : "Lane"} Active
              </div>
            </div>

            {/* Artisanal Cafe & Booths Access */}
            <div className={`p-2.5 rounded-xl border text-center transition-all duration-500 bg-emerald-mid/30 ${
              layoutInfo.activeSections.includes("Bistro Café Corner")
                ? "border-gold-brand/60 text-white"
                : "border-emerald-light/25 text-emerald-light/30 border-dashed"
            }`}>
              <div className="font-serif text-[10px] font-bold uppercase tracking-wider text-gold-brand flex items-center justify-center gap-1.5">
                <Coffee className="w-3 h-3 text-gold-brand" />
                <span>Café Bar Lounge</span>
              </div>
              <div className="text-[10px] font-mono mt-0.5 font-light text-slate-white">
                {layoutInfo.activeSections.includes("Bistro Café Corner") ? "Enabled for Desserts & Shakes" : "Inactive Corner Spacer"}
              </div>
            </div>

            {/* Foyer Desk & Entrance Welcome */}
            <div className={`p-2.5 rounded-xl border text-center transition-all duration-500 bg-emerald-mid/30 ${
              guestCount >= 130
                ? "border-gold-brand/60 text-white"
                : "border-emerald-light/25 text-emerald-light/30 border-dashed"
            }`}>
              <div className="font-serif text-[10px] font-bold uppercase tracking-wider text-gold-brand flex items-center justify-center gap-1.5">
                <UserCheck className="w-3 h-3 text-gold-brand" />
                <span>Welcome Entry Foyer</span>
              </div>
              <div className="text-[10px] font-mono mt-0.5 font-light text-slate-white">
                {guestCount >= 130 ? "Host Registry & Red Carpet Set" : "Standard Host Entrance"}
              </div>
            </div>
          </div>
        </div>

        {/* Helpful Legend Guide */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-[9px] font-mono text-ivory-dark pt-1 border-t border-emerald-mid/20 select-none">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full border border-gold-brand bg-emerald-mid inline-block" />
            <span>Active Dining Table</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-light inline-block" />
            <span>Reserved Chairs Filled</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full border border-emerald-light/20 bg-emerald-brand/35 border-dashed inline-block" />
            <span>Buffer / storage mode</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gold-brand inline-block" />
            <span>Buffet/Bar Active Counter</span>
          </div>
        </div>
      </div>

      {/* Recommended Services Dashboard & Scale Locked Perks */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
        {/* Recommended Logistics Details */}
        <div className="md:col-span-5 bg-ivory-brand/70 rounded-2xl border border-ivory-dark/60 p-4 shrink-0 space-y-4">
          <h4 className="font-serif text-sm font-bold text-emerald-brand border-b border-ivory-dark/40 pb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-brand shrink-0" />
            <span>Recommended Logistics</span>
          </h4>

          <div className="space-y-3">
            {/* Servers Count */}
            <div className="flex justify-between items-center bg-white/60 p-2 rounded-lg border border-ivory-dark/30">
              <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-mid font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand inline-block" />
                Stewards/Waiters
              </span>
              <span className="font-mono text-xs font-extrabold text-emerald-brand bg-emerald-brand/10 px-2.5 py-0.5 rounded-full">
                {layoutInfo.recommendedStaff.servers} Crew
              </span>
            </div>

            {/* Stewards Count */}
            <div className="flex justify-between items-center bg-white/60 p-2 rounded-lg border border-ivory-dark/30">
              <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-mid font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand inline-block" />
                Buffet supervisors
              </span>
              <span className="font-mono text-xs font-extrabold text-emerald-brand bg-emerald-brand/10 px-2.5 py-0.5 rounded-full">
                {layoutInfo.recommendedStaff.stewards} Stewards
              </span>
            </div>

            {/* Mixologists Count */}
            <div className="flex justify-between items-center bg-white/60 p-2 rounded-lg border border-ivory-dark/30">
              <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-mid font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand inline-block" />
                Drink Mixologists
              </span>
              <span className="font-mono text-xs font-extrabold text-emerald-brand bg-emerald-brand/10 px-2.5 py-0.5 rounded-full">
                {layoutInfo.recommendedStaff.mixologists} Bar Chefs
              </span>
            </div>

            {/* Room Spacing Index */}
            <div className="bg-white/60 p-2.5 rounded-lg border border-ivory-dark/30 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-mid font-mono flex items-center gap-1">
                  Space Density
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-brand uppercase tracking-wider">
                  {layoutInfo.densityRating}
                </span>
              </div>
              <p className="text-[10px] text-charcoal-mid font-light leading-relaxed">
                {layoutInfo.densityDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Locked Perks Milestone Ladder */}
        <div className="md:col-span-7 space-y-3">
          <h4 className="font-serif text-sm font-bold text-emerald-brand flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-brand shrink-0 animate-pulse" />
              <span>Scale-Dependent Amenities</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-light">Select headcount to unlock</span>
          </h4>

          {/* List of Perks */}
          <div className="space-y-2 max-h-[195px] overflow-y-auto pr-1">
            {prospectiveAmenities.map((perk) => {
              const isUnlocked = guestCount >= perk.minGuests;
              const IconComp = perk.icon;
              return (
                <div 
                  key={perk.id}
                  className={`flex items-start gap-3 p-2.5 rounded-xl border text-left transition duration-300 ${
                    isUnlocked
                      ? "border-gold-brand/50 bg-gold-brand/5 shadow-2xs"
                      : "border-ivory-dark/40 bg-white/40 opacity-55"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 flex items-center justify-center ${
                    isUnlocked ? "bg-gold-brand/15 text-gold-brand" : "bg-gray-100 text-gray-400"
                  }`}>
                    {isUnlocked ? (
                      <IconComp className="w-4 h-4 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h5 className={`text-xs font-bold leading-tight ${isUnlocked ? "text-emerald-brand font-black" : "text-gray-400 font-medium"}`}>
                        {perk.label}
                      </h5>
                      {isUnlocked ? (
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-mono text-emerald-brand bg-white border border-gold-brand/20 rounded-full px-1.5 py-0.2">
                          <CheckCircle2 className="w-2 h-2 text-gold-brand fill-gold-brand/10 shrink-0" /> Unified
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">
                          Requires {perk.minGuests} guests
                        </span>
                      )}
                    </div>
                    <p className={`text-[10px] leading-relaxed font-light ${isUnlocked ? "text-charcoal-mid" : "text-gray-400"}`}>
                      {perk.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
