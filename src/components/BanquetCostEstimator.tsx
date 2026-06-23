import React, { useMemo } from "react";
import { motion } from "motion/react";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  Info, 
  HelpCircle,
  Gem,
  Award,
  Crown,
  ChevronDown
} from "lucide-react";

interface BanquetCostEstimatorProps {
  guestCount: number;
  selectedPkgId: string;
  selectedThemePrice: number;
  addonsTotal: number;
  finalEstimatedTotal: number;
  onSelectPackage?: (pkgId: string) => void;
}

export function BanquetCostEstimator({
  guestCount,
  selectedPkgId,
  selectedThemePrice,
  addonsTotal,
  finalEstimatedTotal,
  onSelectPackage
}: BanquetCostEstimatorProps) {
  // Define our three standard package base prices per plate
  const packagePricing: Record<
    "pkg-gold" | "pkg-platinum" | "pkg-signature",
    { name: string; price: number; icon: any; color: string }
  > = useMemo(() => ({
    "pkg-gold": { name: "Gold Signature Feast", price: 999, icon: Award, color: "#D4AF37" },
    "pkg-platinum": { name: "Platinum Shahi Banquet", price: 1299, icon: Gem, color: "#9CA3AF" },
    "pkg-signature": { name: "Signature Luxury Feast", price: 1599, icon: Crown, color: "#E8A020" }
  }), []);

  // Compute tier-by-tier dynamic range estimates
  // Range is calculated as:
  // - Minimum estimate (Conservative): guestCount * (Package Plate Price + basic balloon decor ₹80/guest) - no addons
  // - Maximum estimate (Premium Deluxe): guestCount * (Package Plate Price + pastel floral decor ₹150/guest) + full addons package (~₹22,500)
  const tierEstimates = useMemo(() => {
    return Object.entries(packagePricing).map(([id, info]) => {
      const minCost = guestCount * (info.price + 80);
      const maxCost = guestCount * (info.price + 150) + 22500;
      
      return {
        id,
        name: info.name,
        pricePerPlate: info.price,
        icon: info.icon,
        color: info.color,
        minRange: minCost,
        maxRange: maxCost,
        avgRange: Math.round((minCost + maxCost) / 2)
      };
    });
  }, [guestCount, packagePricing]);

  // Find range for currently selected tier (or fallback to gold if custom builder is selected)
  const activeTierRange = useMemo(() => {
    const isCustom = selectedPkgId === "pkg-custom";
    const packageKey = isCustom ? "pkg-gold" : selectedPkgId;
    const info = packagePricing[packageKey as keyof typeof packagePricing];
    
    if (!info) {
      // safe fallback if another id comes up
      return {
        name: "Custom Pure-Veg Plate",
        minRange: guestCount * (150 + 80),
        maxRange: guestCount * (600 + 150) + 22500
      };
    }

    // If they have customized, use their actual selected plate price
    const platePrice = isCustom ? (finalEstimatedTotal - (guestCount * selectedThemePrice) - addonsTotal) / guestCount : info.price;
    const basePlatePrice = Math.max(150, isNaN(platePrice) ? info.price : Math.round(platePrice));

    const minCost = guestCount * (basePlatePrice + 80);
    const maxCost = guestCount * (basePlatePrice + 150) + 21500;

    return {
      name: isCustom ? "Custom Tailored Plate" : info.name,
      minRange: minCost,
      maxRange: maxCost
    };
  }, [selectedPkgId, guestCount, selectedThemePrice, addonsTotal, finalEstimatedTotal, packagePricing]);

  // Position indicator math on current spectrum
  const percentageOnSpectrum = useMemo(() => {
    const min = activeTierRange.minRange;
    const max = activeTierRange.maxRange;
    const total = finalEstimatedTotal;
    
    if (max === min) return 50;
    const percent = ((total - min) / (max - min)) * 100;
    return Math.max(2, Math.min(98, Math.round(percent)));
  }, [activeTierRange, finalEstimatedTotal]);

  return (
    <div className="bg-slate-white rounded-3xl border border-ivory-dark overflow-hidden shadow-sm p-5 sm:p-7 space-y-6 text-left">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-ivory-dark/60 pb-4">
        <div className="space-y-1">
          <span className="flex items-center gap-1.5 text-gold-brand text-xs font-bold tracking-widest uppercase font-mono">
            <Calculator className="w-4 h-4 text-gold-brand animate-pulse shrink-0" />
            <span>Interactive Cost Analytics</span>
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-emerald-brand">
            Simplified Wedding & Event Cost Estimator
          </h3>
          <p className="text-charcoal-mid text-xs font-light">
            Explore live price ranges tailored for Lucknowi banqueting scales automatically.
          </p>
        </div>
      </div>

      {/* Visual Indicator of current selection on the cost spectrum */}
      <div className="bg-gradient-to-br from-ivory-brand to-white border border-ivory-dark p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono text-emerald-light uppercase tracking-widest font-extrabold block">
              Budget Scale Range ({activeTierRange.name})
            </span>
            <p className="text-xs text-charcoal-mid font-light">
              Spectrum representing essential basic layouts to full-service luxury setups for <strong className="text-emerald-brand">{guestCount} Guests</strong>.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono text-emerald-brand bg-emerald-brand/10 px-2.5 py-1 rounded-md font-bold block">
              Average Market Rate: ₹{Math.round((activeTierRange.minRange + activeTierRange.maxRange) / 2 * 1.15).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* The slider bar */}
        <div className="space-y-1.5 pt-2">
          <div className="relative h-4 bg-gray-200/60 rounded-full border border-ivory-dark/50 p-0.5 overflow-visible">
            {/* Split marker regions */}
            <div className="absolute inset-0 flex text-[8px] font-mono font-bold uppercase select-none opacity-40">
              <div className="w-1/3 border-r border-[#693E2B]/10 flex items-center justify-center text-emerald-brand">Cozy Basic</div>
              <div className="w-1/3 border-r border-[#693E2B]/10 flex items-center justify-center text-emerald-brand">Balanced Value</div>
              <div className="w-1/3 flex items-center justify-center text-emerald-brand">Prestige Elite</div>
            </div>

            {/* Gradient background bar */}
            <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-light/35 via-gold-brand/25 to-terra-brand/35 absolute inset-0 pointer-events-none" />

            {/* Dynamic Indicator Pin */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 -ml-3 z-20 flex flex-col items-center"
              style={{ left: `${percentageOnSpectrum}%` }}
              layout
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            >
              {/* Outer halo */}
              <div className="w-6 h-6 rounded-full bg-gold-brand flex items-center justify-center shadow-lg border border-white cursor-pointer relative group">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-brand animate-pulse" />
                
                {/* Floating Price Tooltip */}
                <span className="absolute bottom-full mb-2 bg-charcoal-dark text-white font-mono text-[9px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap opacity-100 group-hover:scale-105 transition-transform">
                  Current Draft: ₹{finalEstimatedTotal.toLocaleString("en-IN")}
                </span>
                
                {/* Micro caret */}
                <span className="absolute bottom-full mb-1 w-2 h-2 rotate-45 bg-charcoal-dark" />
              </div>
            </motion.div>
          </div>

          {/* Dynamic Boundary Labels */}
          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-charcoal-mid pt-1">
            <div className="space-y-0.5">
              <span className="text-gray-400 block font-normal uppercase text-[8px]">Basic Minimum</span>
              <span className="text-emerald-brand">₹{activeTierRange.minRange.toLocaleString("en-IN")}</span>
            </div>
            
            <div className="space-y-0.5 text-center px-4 py-1 bg-white border border-ivory-dark rounded-lg">
              <span className="text-gray-400 block font-normal uppercase text-[8px]">Your Configured Bill</span>
              <span className="text-emerald-brand font-black text-xs">₹{finalEstimatedTotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="space-y-0.5 text-right">
              <span className="text-gray-400 block font-normal uppercase text-[8px]">All-Inclusive Luxe</span>
              <span className="text-[#C85C3A]">₹{activeTierRange.maxRange.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Package Comparisons side by side based on current guest scale */}
      <div className="space-y-3">
        <h4 className="font-serif text-sm font-bold text-emerald-brand flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-brand shrink-0" />
          <span>Compare Lucknowi Package Scales Dynamic Ranges ({guestCount} Seats)</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tierEstimates.map((tier) => {
            const isSelected = selectedPkgId === tier.id;
            const IconComp = tier.icon;
            
            return (
              <div 
                key={tier.id}
                onClick={() => onSelectPackage && onSelectPackage(tier.id)}
                className={`relative cursor-pointer border rounded-2xl p-4 flex flex-col justify-between space-y-4 transition-all duration-300 ${
                  isSelected
                    ? "border-gold-brand bg-gold-brand/5 shadow-md scale-[1.01]"
                    : "border-ivory-dark bg-white/50 hover:bg-ivory-brand hover:border-ivory-dark"
                }`}
              >
                {/* Card Title & Icon */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="p-1.5 rounded-lg bg-emerald-brand/5 text-[10px] text-emerald-brand flex items-center gap-1">
                      <IconComp className="w-3.5 h-3.5" style={{ color: tier.color }} />
                      <span className="font-mono font-bold uppercase tracking-wider">
                        {tier.id === "pkg-gold" ? "Core" : tier.id === "pkg-platinum" ? "Elite" : "Premium"}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-gray-500 bg-white border border-ivory-dark px-1.5 py-0.5 rounded">
                      ₹{tier.pricePerPlate}/plate
                    </span>
                  </div>
                  
                  <h5 className="font-serif text-xs font-bold text-emerald-brand leading-snug">
                    {tier.name}
                  </h5>
                </div>

                {/* Range bar preview */}
                <div className="space-y-1 border-t border-dashed border-ivory-dark/60 pt-3">
                  <div className="flex justify-between text-[10px] text-charcoal-mid font-mono">
                    <span>Base Mini:</span>
                    <span className="font-bold">₹{Math.round(tier.minRange / 1000)}K</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-charcoal-mid font-mono">
                    <span>Full Deluxe:</span>
                    <span className="font-bold text-[#C85C3A]">₹{Math.round(tier.maxRange / 1000)}K</span>
                  </div>

                  {/* Tiny range bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1 text-left relative">
                    <div 
                      className="absolute h-full bg-gold-brand rounded-full"
                      style={{ 
                        left: "15%", 
                        right: "15%" 
                      }}
                    />
                  </div>
                </div>

                {/* Estimated Rate Tag */}
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-400">Est. Average:</span>
                  <span className="font-bold text-emerald-brand">₹{tier.avgRange.toLocaleString("en-IN")}</span>
                </div>

                {/* Check badge */}
                {isSelected && (
                  <div className="absolute right-3 top-2 w-4 h-4 rounded-full bg-gold-brand flex items-center justify-center text-emerald-brand text-[9px] font-bold shadow-sm">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust factors help guide */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-3.5 bg-white border border-ivory-dark/60 rounded-xl text-[10px] text-charcoal-mid">
        <span className="flex items-center gap-1.5 leading-relaxed font-sans font-medium text-emerald-brand">
          <ShieldCheck className="w-4 h-4 text-emerald-brand shrink-0" />
          <span>Guaranteed Price Locking with ₹5,000 Advance token. No Hidden Surcharges.</span>
        </span>
        <div className="flex items-center gap-1 text-gray-400 shrink-0 select-none">
          <Info className="w-3 h-3 text-gold-brand" />
          <span>GST 18% & waiters tips mapped automatically.</span>
        </div>
      </div>
    </div>
  );
}
