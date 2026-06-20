import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Check, HelpCircle, X, ChevronRight, Utensils } from "lucide-react";

export function DineInStatus() {
  const [isInRestaurant, setIsInRestaurant] = useState<boolean | null>(null);
  const [tableNumber, setTableNumber] = useState("");
  const [hallNumber, setHallNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedInRestaurant = localStorage.getItem("tfs_dine_in");
    const savedTable = localStorage.getItem("tfs_table_num");
    const savedHall = localStorage.getItem("tfs_hall_num");
    const savedSubmitted = localStorage.getItem("tfs_dine_in_submitted");

    if (savedInRestaurant === "true") {
      setIsInRestaurant(true);
      if (savedTable) setTableNumber(savedTable);
      if (savedHall) setHallNumber(savedHall);
      if (savedSubmitted === "true") {
        setIsSubmitted(true);
      }
    } else if (savedInRestaurant === "false") {
      setIsInRestaurant(false);
    }
  }, []);

  const handleYes = () => {
    setIsInRestaurant(true);
    localStorage.setItem("tfs_dine_in", "true");
  };

  const handleNo = () => {
    setIsInRestaurant(false);
    setIsSubmitted(false);
    setTableNumber("");
    setHallNumber("");
    localStorage.setItem("tfs_dine_in", "false");
    localStorage.removeItem("tfs_table_num");
    localStorage.removeItem("tfs_hall_num");
    localStorage.removeItem("tfs_dine_in_submitted");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tableNumber.trim() && hallNumber) {
      setIsSubmitted(true);
      localStorage.setItem("tfs_table_num", tableNumber);
      localStorage.setItem("tfs_hall_num", hallNumber);
      localStorage.setItem("tfs_dine_in_submitted", "true");
    }
  };

  const handleReset = () => {
    setIsInRestaurant(null);
    setIsSubmitted(false);
    setTableNumber("");
    setHallNumber("");
    localStorage.removeItem("tfs_dine_in");
    localStorage.removeItem("tfs_table_num");
    localStorage.removeItem("tfs_hall_num");
    localStorage.removeItem("tfs_dine_in_submitted");
  };

  // If user says No, do nothing (do not render anything)
  if (isInRestaurant === false) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-2" id="dine-in-checker-section">
      <AnimatePresence mode="wait">
        {isInRestaurant === null && (
          <motion.div
            key="question-prompt"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-brand text-white border border-emerald-mid rounded-2xl p-5 shadow-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-mid border border-emerald-light/30 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-gold-brand animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="font-serif text-sm font-bold tracking-tight text-white">
                  Are you currently at our restaurant in Shahjahanpur?
                </h4>
                <p className="text-xs text-slate-200 mt-0.5 font-light">
                  Let us know if you are seated to access special table highlights.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 self-stretch md:self-auto justify-center">
              <button
                onClick={handleNo}
                className="flex-1 md:flex-initial px-4 py-2 border border-white/25 text-white hover:bg-emerald-light/30 rounded-xl text-xs font-semibold cursor-pointer transition select-none"
              >
                No, browsing online
              </button>
              <button
                onClick={handleYes}
                className="flex-1 md:flex-initial px-4 py-2 bg-gold-brand hover:bg-gold-light text-emerald-brand rounded-xl text-xs font-bold cursor-pointer transition select-none flex items-center justify-center gap-1.5"
              >
                <Check className="w-4.5 h-4.5" />
                <span>Yes, I am here</span>
              </button>
            </div>
          </motion.div>
        )}

        {isInRestaurant === true && !isSubmitted && (
          <motion.div
            key="details-form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-ivory-dark rounded-2xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-left">
                <span className="text-[10px] font-mono text-emerald-brand font-bold uppercase tracking-wider bg-emerald-brand/5 border border-emerald-brand/15 px-2.5 py-1 rounded-full">
                  Dine-in Experience
                </span>
                <h4 className="font-serif text-base font-bold text-emerald-brand mt-2">
                  Welcome to The Food Story!
                </h4>
                <p className="text-xs text-charcoal-mid mt-0.5">
                  Please enter your exact location details below.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="text-charcoal-mid/60 hover:text-charcoal-dark p-1 rounded-full hover:bg-ivory-brand transition cursor-pointer"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-5 text-left">
                <label className="text-[10px] font-mono text-charcoal-mid font-bold uppercase tracking-wider block mb-1.5">
                  Table Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-charcoal-mid font-mono font-medium">No.</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12 or 15A"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark focus:ring-emerald-brand focus:border-emerald-brand rounded-xl pl-11 pr-4 py-2 text-xs focus:ring-1 focus:outline-none transition font-mono font-bold"
                  />
                </div>
              </div>

              <div className="sm:col-span-5 text-left">
                <label className="text-[10px] font-mono text-charcoal-mid font-bold uppercase tracking-wider block mb-1.5">
                  Select Hall Number
                </label>
                <select
                  required
                  value={hallNumber}
                  onChange={(e) => setHallNumber(e.target.value)}
                  className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark focus:ring-emerald-brand focus:border-emerald-brand rounded-xl px-4 py-2 text-xs focus:ring-1 focus:outline-none transition"
                >
                  <option value="" disabled>-- Select Hall --</option>
                  <option value="Hall 1">Banquet Hall 1 (The Grand Memoir)</option>
                  <option value="Hall 2">Banquet Hall 2 (The Royal Canopy)</option>
                  <option value="Hall 3">Banquet Hall 3 (The Celestial Lounge)</option>
                  <option value="Main Dining Room">Main Dining Room</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-brand hover:bg-emerald-mid text-white rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1 hover:shadow-md active:scale-95"
                >
                  <span>Submit</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {isInRestaurant === true && isSubmitted && (
          <motion.div
            key="seated-indicator"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-emerald-mid/10 border border-emerald-brand/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-brand text-gold-brand flex items-center justify-center shrink-0 shadow-sm">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-brand font-bold tracking-wider uppercase bg-emerald-mid/15 px-2 py-0.5 rounded border border-emerald-mid/10">
                  Currently Seated
                </span>
                <p className="font-serif text-sm font-bold text-emerald-brand mt-1 font-sans">
                  Table {tableNumber} • {hallNumber}
                </p>
                <p className="text-[10.5px] text-charcoal-mid font-light">
                  Enjoy your vegetarian meals! Feel free to explore our digital menu below.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                onClick={handleReset}
                className="text-[11px] font-mono text-charcoal-mid hover:text-red-600 bg-white border border-ivory-dark py-1.5 px-3 rounded-lg hover:shadow-sm cursor-pointer transition hover:bg-red-50"
              >
                Change Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
