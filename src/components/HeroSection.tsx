import React from "react";
import { motion } from "motion/react";
import { Utensils, CalendarDays, Sparkles, MapPin, ShieldCheck, Heart, Instagram } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (section: "menu" | "booking" | "banquet" | "reviews") => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-emerald-brand text-slate-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-emerald-mid">
      
      {/* Decorative leaf SVGs from template */}
      <div className="absolute top-0 left-0 w-72 h-80 opacity-10 pointer-events-none transform -rotate-12 translate-x-[-20%] translate-y-[-10%] select-none">
        <svg viewBox="0 0 400 500" fill="currentColor">
          <path d="M200 480 C100 380, 20 280, 40 160 C60 60, 180 20, 260 80 C340 140, 360 260, 300 360 C260 420, 220 460, 200 480Z" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-80 h-96 opacity-10 pointer-events-none transform rotate-150 translate-x-[20%] translate-y-[20%] select-none">
        <svg viewBox="0 0 400 500" fill="currentColor">
          <path d="M200 480 C100 380, 20 280, 40 160 C60 60, 180 20, 260 80 C340 140, 360 260, 300 360 C260 420, 220 460, 200 480Z" />
        </svg>
      </div>

      {/* Decorative radial glows */}
      <div className="absolute left-[15%] top-[50%] -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-mid opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute right-[10%] top-[20%] w-72 h-72 rounded-full bg-gold-brand opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left story-dense narrative */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-mid border border-emerald-light/40 text-gold-light text-xs font-semibold tracking-widest uppercase font-mono"
          >
            <Sparkles className="w-4 h-4 text-gold-brand animate-pulse" />
            <span>Pure Vegetarian • Shahjahanpur, UP</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white"
          >
            Where Every Meal <br />
            <span className="font-serif italic font-normal text-gold-light">
              Tells a Beautiful Story
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 text-base sm:text-lg max-w-xl font-light leading-relaxed font-sans"
          >
            Two elegant halls. 150 comfortable seats. A luxury fine-dining space crafted for celebrations, family connections, and pure vegetarian flavours that linger long after the last bite.
          </motion.p>

          {/* Quick Features list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-2 pt-2 text-xs font-semibold tracking-wider font-mono uppercase"
          >
            <span className="bg-emerald-mid border border-emerald-light/30 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
              🌿 100% Pure Veg
            </span>
            <span className="bg-emerald-mid border border-emerald-light/30 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
              ❄️ Fully Air Conditioned
            </span>
            <span className="bg-emerald-mid border border-emerald-light/30 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
              🏛️ 2 Banquet Halls
            </span>
            <span className="bg-emerald-mid border border-emerald-light/30 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
              👥 150 Seating Capacity
            </span>
          </motion.div>

          {/* Core Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={() => onNavigate("menu")}
              className="flex items-center justify-center gap-2 bg-gold-brand hover:bg-gold-light text-emerald-brand font-bold px-8 py-4 rounded-xl transition duration-300 select-none cursor-pointer group shadow-lg shadow-gold-brand/20 text-sm uppercase tracking-wider"
            >
              <Utensils className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Explore Interactive Menu</span>
            </button>
            <button
              onClick={() => onNavigate("banquet")}
              className="flex items-center justify-center gap-2 bg-emerald-mid hover:bg-emerald-light text-white border border-emerald-light font-bold px-8 py-4 rounded-xl transition duration-300 select-none cursor-pointer group text-sm uppercase tracking-wider"
            >
              <CalendarDays className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Plan Banquet Event</span>
            </button>
            <a
              href="https://www.instagram.com/the_food_story_26?igsh=M2RxMG5hdjBvbXNx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-amber-700/20 hover:bg-amber-700/40 text-gold-brand border border-gold-brand/35 font-bold px-8 py-4 rounded-xl transition duration-300 select-none cursor-pointer group text-sm uppercase tracking-wider"
            >
              <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Instagram</span>
            </a>
          </motion.div>
        </div>

        {/* Right side interactive card layout matching template style */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-sm sm:max-w-md h-[340px] sm:h-[400px] flex items-center justify-center"
          >
            {/* Elegant glassmorphism background frame */}
            <div className={`absolute inset-0 bg-emerald-mid/95 rounded-2xl border border-emerald-light/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative`}>
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-gold-brand/10 rounded-full blur-2xl" />
              
              <div className="flex justify-between items-start z-10">
                <span className="font-mono text-xs text-gold-brand tracking-widest uppercase font-semibold">
                  ESTD. 2024
                </span>
                <span className="bg-emerald-brand text-xs text-gold-brand font-semibold border border-gold-brand/30 px-3 py-1 rounded-full flex items-center gap-1">
                  ★ 4.9 Premium Venue
                </span>
              </div>

              <div className="z-10 space-y-4">
                <div className="h-0.5 bg-gold-brand/50 w-24" />
                <h3 className="font-serif text-2xl sm:text-3xl text-white italic leading-snug">
                  "The finest chapter of hand-stretched recipe craft or custom wedding catering in UP."
                </h3>
                <p className="text-xs text-gold-light font-mono tracking-wider uppercase font-semibold">
                  — Patron Chronicle, Shahjahanpur
                </p>
              </div>

              {/* Scrolling mini teaser highlights */}
              <div className="z-10 bg-emerald-brand/80 p-3.5 rounded-xl border border-emerald-light/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-brand/15 flex items-center justify-center text-lg select-none text-gold-brand shrink-0">
                  🏛️
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-xs font-bold text-white truncate">Special Occasion Decors</p>
                  <p className="text-[10px] text-gray-300 truncate">Book "Grand Memoir" Banquet Hall</p>
                </div>
                <button 
                  onClick={() => onNavigate("banquet")} 
                  className="text-xs text-gold-brand font-bold hover:underline shrink-0 cursor-pointer"
                >
                  Plan Now
                </button>
              </div>
            </div>

            {/* Glowing background halo */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-brand/30 to-emerald-light/30 rounded-3xl blur-md -z-10" />
          </motion.div>
        </div>
      </div>

      {/* STATS STRIP matching the actual template */}
      <div className="max-w-7xl mx-auto mt-16 pt-12 border-t border-emerald-mid relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-brand">150+</p>
            <p className="text-[11px] text-gray-300 font-mono tracking-wider uppercase">Seated Guests</p>
          </div>
          <div className="space-y-1 border-l border-emerald-mid">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-brand">2</p>
            <p className="text-[11px] text-gray-300 font-mono tracking-wider uppercase">Banquet Halls</p>
          </div>
          <div className="space-y-1 border-l border-emerald-mid">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-brand">2500</p>
            <p className="text-[11px] text-gray-300 font-mono tracking-wider uppercase">Sq. Ft. Space</p>
          </div>
          <div className="space-y-1 border-l border-emerald-mid">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-brand">100%</p>
            <p className="text-[11px] text-gray-300 font-mono tracking-wider uppercase">Pure Vegetarian</p>
          </div>
        </div>
      </div>

    </section>
  );
}
