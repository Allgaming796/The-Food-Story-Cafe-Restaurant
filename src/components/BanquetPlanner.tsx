import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, PartyPopper, Cake, Camera, Music, Calendar, DollarSign, CheckCircle2, TicketPlus, Sparkles, Send, Share2 } from "lucide-react";
import { BanquetTheme, CateringPackage, BanquetEstimate } from "../types";
import { ReservationForm } from "./ReservationForm";
import { RAW_MENU } from "./MenuSection";

const CUSTOM_CATEGORIES = [
  { id: "breakfast", label: "🥐 Breakfast & Short Eats", prefixes: ["bf", "se"] },
  { id: "tandoor", label: "🔥 Oven Hot Starters", prefixes: ["app"] },
  { id: "pizza", label: "🍕 Handcrafted Pizzas", prefixes: ["pz"] },
  { id: "gravies", label: "🍲 Main Course Curries", prefixes: ["mn"] },
  { id: "breads", label: "🥖 Breads & Sides", prefixes: ["sd"] },
  { id: "drinks", label: "🍹 Shakes & Mocktails", prefixes: ["dr"] },
  { id: "sweets", label: "🍰 Desserts & Waffles", prefixes: ["ds"] },
];

const DECOR_THEMES: BanquetTheme[] = [
  {
    id: "theme-gold",
    name: "Classic Gold & Marigold",
    description: "Simple saffron and yellow marigold drapes, neat seating arrangements, and warm lights that give a traditional look.",
    pricePerGuest: 100,
    image: "✨",
    color: "#D4AF37",
    highlights: ["Marigold Flowers", "Classic Drapery", "Comfortable Seating Setup"],
  },
  {
    id: "theme-pastel",
    name: "Sweet Pastel Flowers",
    description: "Stage decorated with peach and pink roses, simple soft curtains, and standard warm lighting to make the space look bright and cozy.",
    pricePerGuest: 150,
    image: "🌸",
    color: "#E29B7A",
    highlights: ["Peach and Pink Roses", "Soft Curtains", "Bright Warm Spotlights"],
  },
  {
    id: "theme-ivory",
    name: "Simple White Elegance",
    description: "Clean white drapes, simple white flowers, and cozy table candles for a neat and peaceful look.",
    pricePerGuest: 120,
    image: "🤍",
    color: "#EAE6DF",
    highlights: ["White Flowers", "Neat White Background", "Cozy Table Candles"],
  },
  {
    id: "theme-neon",
    name: "Bright Neon Lights",
    description: "A lively party setup with cool colorful neon lights, a standard shining backdrop, and general upbeat party lights.",
    pricePerGuest: 140,
    image: "⚡",
    color: "#4DEEEA",
    highlights: ["Colorful Neon Signs", "Fun Bright Lighting", "Modern Party Backdrop"],
  },
  {
    id: "theme-balloons",
    name: "Joyful Balloon Celebration",
    description: "Colorful balloon arches, vibrant helium pillars, and customized balloon backdrops perfect for cheerful birthday parties, kitty parties, and family gatherings.",
    pricePerGuest: 80,
    image: "🎈",
    color: "#F43F5E",
    highlights: ["Vibrant Balloon Arches", "Custom Balloon Pillars", "Fun Colorful Backdrops"],
  }
];

const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: "pkg-silver",
    name: "Silver Local Delights",
    pricePerPlate: 699,
    description: "A solid local menu featuring pure vegetarian tandoori favorites, hand-crafted paneer curries, and essential local desserts.",
    includes: ["2 Appetizers", "1 Main (Paneer specialty)", "Dal Makhani with Naans", "Chilled Cucumber Mint Cooler", "Cardamom Gulab Jamun"],
    features: ["Standard Buffet setup", "Attentive replenishment", "Eco-friendly premium dinnerware"],
  },
  {
    id: "pkg-gold",
    name: "Gold Signature Feast",
    pricePerPlate: 999,
    description: "The ideal catering blend featuring our artisanal pizzas, woodfired starters, signature mocktails, and rich slow oven dishes.",
    includes: ["3 Starters (Paneer Tikka & Lotus stem)", "2 Main Course Curries", "Dal Handi simmered", "Pizza Slices on-demand", "2 Desserts (Shahi Tukda + Sizzling Brownie)"],
    features: ["Dedicated Stewards", "Gourmet plating", "Live tandoori counter showcase"],
  },
  {
    id: "pkg-platinum",
    name: "Platinum Shahi Banquet",
    pricePerPlate: 1299,
    description: "An ultra prestige legacy dining experience featuring live fire counters, exclusive mocktails, chocolate fountains, and edible gold leaf garnishes.",
    includes: ["Live Fire Tandoori Platter Counters", "Broccoli & Lotus stems starters", "3 Premium Mains", "Mango-Rabri Shakes and Cold Brew Spritzes", "Live Brownie station & Shahi Tukda", "Custom themed celebration cake"],
    features: ["Silver-tray service", "Live Chef carving counters", "Table Butler allocation"],
  }
];

const EVENT_TYPES = [
  "Engagement or Roka Ceremony",
  "Milestone Anniversary",
  "Lavish Birthday Bash",
  "Sophisticated High-Tea Gatherings",
  "Corporate Galas & Launch Events"
];

interface BanquetPlannerProps {}

export function BanquetPlanner({}: BanquetPlannerProps) {
  const [guestCount, setGuestCount] = useState<number>(100);
  const [selectedEventType, setSelectedEventType] = useState<string>(EVENT_TYPES[0]);
  const [selectedThemeId, setSelectedThemeId] = useState<string>("theme-gold");
  const [selectedPkgId, setSelectedPkgId] = useState<string>("pkg-gold");
  
  // Custom Food Product State selectors
  const [customSelectedItems, setCustomSelectedItems] = useState<string[]>(["app3", "app5", "pz4", "mn1", "mn3", "sd2", "dr8", "ds6"]);
  const [activeCustomCat, setActiveCustomCat] = useState<string>("breakfast");

  const customPricePerPlate = useMemo(() => {
    let price = 0;
    RAW_MENU.forEach((item) => {
      if (customSelectedItems.includes(item.id)) {
        price += item.price;
      }
    });
    // Set a base price / minimum if empty, otherwise sum with 15% catering volume bundle discount
    return Math.max(150, Math.round(price * 0.85));
  }, [customSelectedItems]);

  const [needsCake, setNeedsCake] = useState<boolean>(false);
  const [needsSound, setNeedsSound] = useState<boolean>(false);
  const [needsPhotos, setNeedsPhotos] = useState<boolean>(false);

  // Form state shared
  const [eventDate, setEventDate] = useState("");

  const selectedTheme = useMemo(() => {
    return DECOR_THEMES.find((t) => t.id === selectedThemeId)!;
  }, [selectedThemeId]);

  const selectedPkg = useMemo(() => {
    if (selectedPkgId === "pkg-custom") {
      return {
        id: "pkg-custom",
        name: "Custom Pure-Veg Plate Builder",
        pricePerPlate: customPricePerPlate,
        description: "Your personalized collection of sweet, savory, and spicy items handpicked precisely from our kitchen card.",
        includes: customSelectedItems.map(id => RAW_MENU.find(m => m.id === id)?.name || "").filter(Boolean),
        features: ["Fully customized menu card", "Dynamic live budgeting", "Custom recipe guidance"],
      };
    }
    return CATERING_PACKAGES.find((p) => p.id === selectedPkgId)!;
  }, [selectedPkgId, customPricePerPlate, customSelectedItems]);

  const filteredCustomItems = useMemo(() => {
    const currentCatObj = CUSTOM_CATEGORIES.find(c => c.id === activeCustomCat);
    if (!currentCatObj) return [];
    return RAW_MENU.filter(item => 
      currentCatObj.prefixes.some(prefix => item.id.startsWith(prefix))
    );
  }, [activeCustomCat]);

  const mathDecorTotal = guestCount * selectedTheme.pricePerGuest;
  const mathCateringTotal = guestCount * selectedPkg.pricePerPlate;
  
  const mathAddonsTotal = useMemo(() => {
    let total = 0;
    if (needsCake) total += 2500;
    if (needsSound) total += 8000;
    if (needsPhotos) total += 12000;
    return total;
  }, [needsCake, needsSound, needsPhotos]);

  const mathGrandTotal = mathDecorTotal + mathCateringTotal + mathAddonsTotal;

  // NEW FEATURE: Accompaniment package discount indicator
  const accompanimentDiscount = useMemo(() => {
    let selectedCount = 0;
    if (needsCake) selectedCount++;
    if (needsSound) selectedCount++;
    if (needsPhotos) selectedCount++;
    
    if (selectedCount === 2) return 1000; // Rs. 1000 combo savings
    if (selectedCount === 3) return 2500; // Rs. 2500 full tier combo savings
    return 0;
  }, [needsCake, needsSound, needsPhotos]);

  const finalEstimatedTotal = mathGrandTotal - accompanimentDiscount;

  const addonsDetail = useMemo(() => {
    const addonNames = [];
    if (needsCake) addonNames.push("Gourmet Designer Cake (₹2500)");
    if (needsSound) addonNames.push("DJ Console & Sound (₹8000)");
    if (needsPhotos) addonNames.push("Professional Photo Pkg (₹12000)");
    return addonNames.length > 0 ? addonNames.join(", ") : "None";
  }, [needsCake, needsSound, needsPhotos]);



  return (
    <section className="py-16 bg-ivory-brand border-t border-ivory-dark px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="flex justify-center items-center gap-1.5 text-gold-brand text-xs font-semibold tracking-widest uppercase font-mono">
            <PartyPopper className="w-4 h-4 text-gold-brand animate-bounce shrink-0" />
            <span>Ivory Hall</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-emerald-brand font-bold">
            Interactive Banquet Celebration Planner
          </h2>
          <p className="text-charcoal-mid text-sm sm:text-base font-light font-sans max-w-xl mx-auto leading-relaxed">
            Customize luxury decor backdrops, select signature pure-vegetarian feasts, coordinate live additions, and estimate celebration costs in real-time.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Customizer Slider, Event formats & Theme cards */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Occasion Format and Guest Slider */}
            <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-6 space-y-6 text-left">
              <div className="flex items-center gap-3 border-b border-ivory-dark pb-3">
                <Users className="w-5 h-5 text-emerald-brand shrink-0" />
                <h3 className="font-serif text-lg font-bold text-emerald-brand">
                  1. Select Occasion Format & Scale
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Format selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                    Type of Occasion
                  </label>
                  <select
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold-brand cursor-pointer"
                  >
                    {EVENT_TYPES.map((ev, idx) => (
                      <option key={idx} value={ev} className="bg-white text-charcoal-dark font-medium">
                        {ev}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Slider for Guest scales */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                      Estimated Guests
                    </label>
                    <span className="font-mono text-sm font-bold text-emerald-brand bg-emerald-brand/10 px-2.5 py-0.5 rounded-full">
                      {guestCount} Guests
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    step="10"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-ivory-dark rounded-lg appearance-none cursor-pointer accent-emerald-brand"
                  />
                  <div className="flex justify-between text-[10px] text-charcoal-mid font-mono">
                    <span>Min: 20</span>
                    <span>Max: 300 (Combined Halls)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Decorative Themes */}
            <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-6 space-y-6 text-left">
              <div className="flex items-center gap-3 border-b border-ivory-dark pb-3">
                <Sparkles className="w-5 h-5 text-emerald-brand shrink-0" />
                <h3 className="font-serif text-lg font-bold text-emerald-brand">
                  2. Choose Decor Atmosphere Backdrop
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DECOR_THEMES.map((theme) => {
                  const isSelected = theme.id === selectedThemeId;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => setSelectedThemeId(theme.id)}
                      className={`relative cursor-pointer border rounded-2xl p-5 transition-all text-left flex flex-col justify-between space-y-4 ${
                        isSelected
                          ? "border-gold-brand bg-emerald-brand/5 shadow-md"
                          : "border-ivory-dark bg-white hover:bg-ivory-brand"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{theme.image}</span>
                          <span className="font-mono text-xs font-bold text-emerald-brand bg-ivory-brand px-2 py-0.5 rounded-full border border-ivory-dark">
                            ₹{theme.pricePerGuest}/guest
                          </span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-emerald-brand">
                          {theme.name}
                        </h4>
                        <p className="text-charcoal-mid text-xs leading-relaxed font-light">
                          {theme.description}
                        </p>
                      </div>

                      {/* theme highlights bullet */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {theme.highlights.map((hl, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono bg-emerald-brand/10 text-emerald-brand px-2 py-0.5 rounded font-semibold"
                          >
                            ✓ {hl}
                          </span>
                        ))}
                      </div>

                      {/* Select check badge */}
                      {isSelected && (
                        <div className="absolute right-3 top-3 w-5 h-5 rounded-full bg-gold-brand flex items-center justify-center text-emerald-brand text-xs font-bold shadow-md">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Catering Feasts Package */}
            <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-6 space-y-6 text-left font-sans">
              <div className="flex items-center gap-3 border-b border-ivory-dark pb-3">
                <PartyPopper className="w-5 h-5 text-emerald-brand shrink-0" />
                <h3 className="font-serif text-lg font-bold text-emerald-brand">
                  3. Select Culinary Feast & Pure Veg Catering
                </h3>
              </div>

              <div className="space-y-4">
                {CATERING_PACKAGES.map((pkg) => {
                  const isSelected = pkg.id === selectedPkgId;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`relative cursor-pointer border rounded-2xl p-5 transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-left ${
                        isSelected
                          ? "border-gold-brand bg-emerald-brand/5 shadow-md"
                          : "border-ivory-dark bg-white hover:bg-ivory-brand"
                      }`}
                    >
                      <div className="md:col-span-8 space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-serif text-base font-bold text-emerald-brand">
                            {pkg.name}
                          </h4>
                          <span className="text-[10px] font-mono bg-gold-brand text-emerald-brand font-bold px-2.5 py-0.5 rounded-full border border-gold-brand/40">
                            ₹{pkg.pricePerPlate}/plate
                          </span>
                        </div>
                        <p className="text-charcoal-mid text-xs font-light pr-4">{pkg.description}</p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {pkg.features.map((feat, i) => (
                            <span key={i} className="text-[9px] font-mono text-emerald-brand bg-white px-2 py-0.5 rounded border border-ivory-dark">
                              ★ {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-ivory-dark pt-3 md:pt-0 md:pl-5 space-y-1">
                        <p className="text-[10px] font-bold text-emerald-brand uppercase tracking-widest font-mono">
                          includes full menu:
                        </p>
                        <ul className="text-[11px] text-charcoal-mid font-sans space-y-1">
                          {pkg.includes.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="truncate">
                              • {item}
                            </li>
                          ))}
                          {pkg.includes.length > 3 && (
                            <li className="text-gold-brand font-bold font-mono text-[10px]">
                              + {pkg.includes.length - 3} more items
                            </li>
                          )}
                        </ul>
                      </div>

                      {isSelected && (
                        <div className="absolute right-4 top-4 w-5 h-5 rounded-full bg-gold-brand flex items-center justify-center text-emerald-brand text-xs font-bold shadow-md">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* --- CUSTOMIZABLE PRODUCT BUILDER --- */}
                <div
                  onClick={() => setSelectedPkgId("pkg-custom")}
                  className={`relative cursor-pointer border rounded-2xl p-5 transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-left ${
                    selectedPkgId === "pkg-custom"
                      ? "border-gold-brand bg-emerald-brand/5 shadow-md"
                      : "border-ivory-dark bg-white hover:bg-ivory-brand"
                  }`}
                >
                  <div className="md:col-span-8 space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-serif text-base font-bold text-gold-brand flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-gold-brand animate-pulse" />
                        Custom Pure-Veg Plate Builder (Selective)
                      </h4>
                      <span className="text-[10px] font-mono bg-emerald-brand text-white font-bold px-2.5 py-0.5 rounded-full border border-emerald-brand/40 animate-pulse">
                        ₹{customPricePerPlate}/plate
                      </span>
                    </div>
                    <p className="text-charcoal-mid text-xs font-light pr-4">
                      Create your own combination item-by-item from breakfast, rich starters, sourdough pizzas, mains, special elixirs, and dessert waffles. Includes a 15% catering volume discount!
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[9px] font-mono text-emerald-brand bg-white px-2 py-0.5 rounded border border-ivory-dark">
                        ★ Fully Self-Tailored
                      </span>
                      <span className="text-[9px] font-mono text-emerald-brand bg-white px-2 py-0.5 rounded border border-ivory-dark">
                        ★ Transparent Pricing
                      </span>
                      <span className="text-[9px] font-mono text-emerald-brand bg-white px-2 py-0.5 rounded border border-ivory-dark">
                        ★ Chosen: {customSelectedItems.length} items
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-ivory-dark pt-3 md:pt-0 md:pl-5 space-y-1">
                    <p className="text-[10px] font-bold text-emerald-brand uppercase tracking-widest font-mono">
                      Current customized menu:
                    </p>
                    <ul className="text-[11px] text-charcoal-mid font-sans space-y-1">
                      {customSelectedItems.length === 0 ? (
                        <li className="italic text-charcoal-light">• Choose items below</li>
                      ) : (
                        customSelectedItems.slice(0, 3).map((id) => {
                          const name = RAW_MENU.find((m) => m.id === id)?.name || id;
                          return (
                            <li key={id} className="truncate">
                              • {name}
                            </li>
                          );
                        })
                      )}
                      {customSelectedItems.length > 3 && (
                        <li className="text-gold-brand font-bold font-mono text-[10px]">
                          + {customSelectedItems.length - 3} more selections
                        </li>
                      )}
                    </ul>
                  </div>

                  {selectedPkgId === "pkg-custom" && (
                    <div className="absolute right-4 top-4 w-5 h-5 rounded-full bg-gold-brand flex items-center justify-center text-emerald-brand text-xs font-bold shadow-md">
                      ✓
                    </div>
                  )}
                </div>

                {/* Expandable Custom Products Choice panel with Animation */}
                <AnimatePresence>
                  {selectedPkgId === "pkg-custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden border border-gold-brand/45 bg-ivory-brand/35 rounded-2xl p-5 space-y-5 mt-4 text-left"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-ivory-dark pb-3">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-emerald-brand">
                            Custom Plate Culinary Choice
                          </h4>
                          <p className="text-[11px] text-charcoal-mid">
                            Select each dish from our digital menu cards. Your price scales fairly based on choices!
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-charcoal-mid">Bundled plate price:</span>
                          <span className="font-mono text-sm font-bold text-emerald-brand bg-white px-2.5 py-1.5 border border-ivory-dark rounded-xl shadow-xs">
                            ₹{customPricePerPlate} <span className="text-[9px] text-charcoal-mid font-mono font-normal">/plate (15% off applied)</span>
                          </span>
                        </div>
                      </div>

                      {/* Horizontal tab categories */}
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                        {CUSTOM_CATEGORIES.map((cat) => {
                          const isActive = activeCustomCat === cat.id;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setActiveCustomCat(cat.id)}
                              className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition cursor-pointer ${
                                isActive
                                  ? "bg-emerald-brand text-white shadow-xs"
                                  : "bg-white text-charcoal-mid border border-ivory-dark hover:border-emerald-mid"
                              }`}
                            >
                              {cat.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Items selector check grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                        {filteredCustomItems.map((item) => {
                          const isChecked = customSelectedItems.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                if (isChecked) {
                                  setCustomSelectedItems((prev) => prev.filter((id) => id !== item.id));
                                } else {
                                  setCustomSelectedItems((prev) => [...prev, item.id]);
                                }
                              }}
                              className={`flex items-start text-left justify-between gap-3 p-3 rounded-xl border transition cursor-pointer w-full ${
                                isChecked
                                  ? "border-emerald-brand/40 bg-emerald-brand/5"
                                  : "border-ivory-dark bg-white hover:bg-ivory-brand"
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                    isChecked ? "bg-emerald-brand border-emerald-brand text-white text-[10px]" : "border-charcoal-light bg-white"
                                  }`}>
                                    {isChecked && "✓"}
                                  </div>
                                  <span className="text-xs font-bold text-charcoal-dark leading-tight">{item.name}</span>
                                </div>
                                <p className="text-[10px] text-charcoal-mid font-light leading-relaxed truncate max-w-[210px] sm:max-w-xs block">
                                  {item.description}
                                </p>
                              </div>
                              <span className="font-mono text-[11px] font-bold text-emerald-brand bg-ivory-brand px-2 py-0.5 rounded border border-ivory-dark shrink-0">
                                ₹{item.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Preset high sellers */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center text-[10px] bg-white p-3 rounded-xl border border-ivory-brand font-mono">
                        <span className="text-charcoal-mid">Selected: {customSelectedItems.length} dishes</span>
                        <div className="flex flex-wrap gap-2.5">
                          <button
                            type="button"
                            onClick={() => setCustomSelectedItems(["bf1", "bf6", "dr1", "dr6"])}
                            className="text-emerald-brand font-bold hover:underline"
                          >
                            🥞 Quick Breakfast Preset
                          </button>
                          <span className="text-ivory-dark">|</span>
                          <button
                            type="button"
                            onClick={() => setCustomSelectedItems(["app3", "app5", "pz3", "mn1", "mn3", "sd2", "dr8", "ds6"])}
                            className="text-gold-brand font-bold hover:underline"
                          >
                            🔥 Regal Midnight Feast Preset
                          </button>
                          <span className="text-ivory-dark">|</span>
                          <button
                            type="button"
                            onClick={() => setCustomSelectedItems([])}
                            className="text-red-500 font-bold hover:underline"
                          >
                            ✖ Clear All
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Step 4: Live Event Addons */}
            <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-6 space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-ivory-dark pb-3">
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-emerald-brand shrink-0" />
                  <h3 className="font-serif text-lg font-bold text-emerald-brand">
                    4. Elevate with Live Accompaniments
                  </h3>
                </div>
                {accompanimentDiscount > 0 && (
                  <span className="font-mono text-[10px] bg-emerald-brand text-gold-brand border border-emerald-mid px-2.5 py-1 rounded-full font-bold animate-pulse">
                    Saved ₹{accompanimentDiscount} Multi-add combo!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Custom Cake addon */}
                <div
                  onClick={() => setNeedsCake(!needsCake)}
                  className={`cursor-pointer border rounded-2xl p-4 transition text-center select-none ${
                    needsCake 
                      ? "border-emerald-mid bg-emerald-brand/5 text-emerald-brand font-bold" 
                      : "border-ivory-dark bg-white hover:bg-ivory-brand text-charcoal-mid"
                  }`}
                >
                  <Cake className="w-6 h-6 mx-auto mb-2 text-emerald-brand" />
                  <p className="text-xs font-semibold">Gourmet Designer Cake</p>
                  <p className="text-[10px] text-charcoal-mid font-mono mt-1">+ ₹2,500 flat</p>
                </div>

                {/* Sound addon */}
                <div
                  onClick={() => setNeedsSound(!needsSound)}
                  className={`cursor-pointer border rounded-2xl p-4 transition text-center select-none ${
                    needsSound 
                      ? "border-emerald-mid bg-emerald-brand/5 text-emerald-brand font-bold" 
                      : "border-ivory-dark bg-white hover:bg-ivory-brand text-charcoal-mid"
                  }`}
                >
                  <Music className="w-6 h-6 mx-auto mb-2 text-emerald-brand" />
                  <p className="text-xs font-semibold">Professional Sound & DJ</p>
                  <p className="text-[10px] text-charcoal-mid font-mono mt-1">+ ₹8,000 flat</p>
                </div>

                {/* Photos addon */}
                <div
                  onClick={() => setNeedsPhotos(!needsPhotos)}
                  className={`cursor-pointer border rounded-2xl p-4 transition text-center select-none ${
                    needsPhotos 
                      ? "border-emerald-mid bg-emerald-brand/5 text-emerald-brand font-bold" 
                      : "border-ivory-dark bg-white hover:bg-ivory-brand text-charcoal-mid"
                  }`}
                >
                  <Camera className="w-6 h-6 mx-auto mb-2 text-emerald-brand" />
                  <p className="text-xs font-semibold">Candid Photo Capturing</p>
                  <p className="text-[10px] text-charcoal-mid font-mono mt-1">+ ₹12,000 flat</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right computed estimate quotation card */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            
            {/* Live math cost calculator card */}
            <div className="bg-emerald-brand rounded-2xl border border-emerald-mid p-6 text-white shadow-xl space-y-6 text-left">
              <div className="border-b border-emerald-mid pb-3 flex justify-between items-center">
                <h3 className="font-serif text-lg font-bold text-white">
                  Plan Summary
                </h3>
                <span className="text-[10px] bg-gold-brand text-emerald-brand px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-widest leading-none">
                  Live Estimate
                </span>
              </div>

              <div className="space-y-4 text-xs font-sans">
                {/* Guest counter */}
                <div className="flex justify-between items-center text-gray-200">
                  <span>Guest Headcount:</span>
                  <span className="font-mono text-white font-bold">{guestCount} Guests</span>
                </div>

                {/* Decor theme estimation row */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-100">Decor backdrop theme</p>
                    <p className="text-[10px] text-gray-300 max-w-[180px] truncate">{selectedTheme.name}</p>
                  </div>
                  <span className="font-mono text-gold-light font-semibold">
                    ₹{mathDecorTotal}
                  </span>
                </div>

                {/* Catering package row */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-100">Gourmet Catering combo</p>
                    <p className="text-[10px] text-gray-300 max-w-[180px] truncate">{selectedPkg.name}</p>
                  </div>
                  <span className="font-mono text-gold-light font-semibold">
                    ₹{mathCateringTotal}
                  </span>
                </div>

                {/* Addons summary counts and total */}
                {mathAddonsTotal > 0 && (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-100">Live Accompaniments</p>
                      <p className="text-[10px] text-gray-300 font-mono">
                        {[needsCake && "Cake", needsSound && "DJ", needsPhotos && "Photo"].filter(Boolean).join(" + ")}
                      </p>
                    </div>
                    <span className="font-mono text-gold-light font-semibold">
                      + ₹{mathAddonsTotal}
                    </span>
                  </div>
                )}

                {/* Accompaniment Discount */}
                {accompanimentDiscount > 0 && (
                  <div className="flex justify-between items-center bg-emerald-mid p-2 rounded-lg border border-emerald-light/20">
                    <span className="text-[10.5px] text-gold-brand font-bold uppercase tracking-wide">Multi-Event Discount:</span>
                    <span className="font-mono text-gold-light font-bold">
                      -₹{accompanimentDiscount}
                    </span>
                  </div>
                )}

                <div className="border-t border-emerald-mid pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-100">Estimated Total:</span>
                  <div className="text-right">
                    <p className="font-mono text-2xl font-bold text-gold-brand animate-pulse">
                      ₹{finalEstimatedTotal}
                    </p>
                    <p className="text-[9px] text-gray-300 font-mono">Tax & Service replenishment included</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification-secured Reservation Form with live warning layers */}
            <ReservationForm
              guestCount={guestCount}
              setGuestCount={setGuestCount}
              eventDate={eventDate}
              setEventDate={setEventDate}
              selectedEventType={selectedEventType}
              selectedThemeName={selectedTheme.name}
              selectedPkgName={selectedPkg.name}
              finalEstimatedTotal={finalEstimatedTotal}
              addonsDetail={addonsDetail}
              accompanimentDiscount={accompanimentDiscount}
              selectedPkgIncludes={selectedPkg.includes}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
