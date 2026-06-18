import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Sparkles, Clock, Utensils, CalendarDays, Search, HelpCircle as HelpIcon } from "lucide-react";

interface FAQItem {
  id: string;
  category: "banquet" | "dietary" | "hours" | "general";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "f1",
    category: "banquet",
    question: "What is the capacity of the Grand Memoir Banquet Hall, and how far in advance should we book?",
    answer: "We feature two fully air-conditioned banquet halls with a combined capacity of up to 300 guests (or 150 seated guests comfortably per hall). For weekend family celebrations or prime Roka/wedding dates, we highly recommend locking in your date at least 2 to 3 months in advance to ensure chronological priority."
  },
  {
    id: "f2",
    category: "dietary",
    question: "Is your menu 100% pure vegetarian? Do you accommodate Sattvic (no onion/garlic) specifications?",
    answer: "Absolutely! The Food Story is a strictly 100% pure vegetarian culinary establishment. Our kitchens respect religious and regional food legacies. We provide specialized Sattvic options directly on request, and our culinary hosts take meticulous care to manage allergens and custom dietary exclusions."
  },
  {
    id: "f3",
    category: "hours",
    question: "What are the daily operating hours for dine-in and private celebrations?",
    answer: "Our main restaurant operations run from 11:00 AM to 10:30 PM on weekdays (Mon–Fri), and 10:00 AM to 11:00 PM on weekends (Sat–Sun). For pre-registered banquet bookings and wedding after-parties, event timelines can be extended with special management approvals up to midnight."
  },
  {
    id: "f4",
    category: "banquet",
    question: "Can we customize our decoration themes, or are we limited to the predefined setups?",
    answer: "While our four catalog themes—Royal Gold, Pastel Floral, Elegant Ivory, and Neon Party—map pre-engineered luxury settings at excellent packaged value, they are fully customizable. You can consult with our AI Curator or sit down with our graphic events team to adjust colors, floral pairings, and custom neon light signboards."
  },
  {
    id: "f5",
    category: "general",
    question: "Is there an upfront advance fee required to secure a booking on the calendar?",
    answer: "Drafting an estimate on our web planner is entirely free. After verifying your celebration date and food courses, a 25% token deposit is requested to formally block the hall. The remainder can be settled in flexible installments up to the day of your grand family milestone."
  },
  {
    id: "f6",
    category: "dietary",
    question: "Can we get custom sweets or special kids' food counter options included in our catering package?",
    answer: "Yes, our gold and platinum feast configurations are designed to be highly modular. From custom-themed multi-tier designer truffle cakes, chocolate fountains, live clay-pot Jalebi/Rabri hubs, to slider and mini-pizza bars customized for younger children, our executive chef can assemble anything to tell your story."
  }
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "banquet" | "dietary" | "hours" | "general">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("f1"); // start with first expanded to showcase interface interactivity

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const matchSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 bg-white text-charcoal-dark border-t border-ivory-dark px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Block resembling the signature style guidelines */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center gap-1.5 text-gold-brand text-xs font-semibold tracking-widest uppercase font-mono">
            <HelpCircle className="w-4 h-4 text-gold-brand animate-pulse shrink-0" />
            <span>Curator Clarified</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-emerald-brand font-bold">
            Frequently Whispered Questions
          </h2>
          <p className="text-charcoal-mid text-sm sm:text-base font-light">
            Everything you need to orchestrate a seamless dine-in platter, allergen specification adjustment, or a grand soirée banquet calendar booking.
          </p>
        </div>

        {/* Categories Tab Selectors & Instant text-search bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {(["all", "banquet", "dietary", "hours", "general"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setExpandedId(null);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11.5px] font-semibold font-mono tracking-wider uppercase transition cursor-pointer border ${
                    activeCategory === cat
                      ? "bg-gold-brand text-emerald-brand border-gold-brand shadow-sm font-bold"
                      : "bg-ivory-brand text-emerald-brand border-ivory-dark hover:bg-white"
                  }`}
                >
                  {cat === "all" ? "All FAQS" : cat}
                </button>
              ))}
            </div>

            {/* Instant Filter Search input field */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-brand" />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-ivory-dark focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs bg-ivory-brand/45 text-charcoal-dark placeholder-charcoal-mid"
              />
            </div>
          </div>
        </div>

        {/* FAQ Accordion List with seamless animated expands */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  key={faq.id}
                  className="bg-ivory-brand/30 hover:bg-ivory-brand/50 border border-ivory-dark rounded-2xl overflow-hidden transition duration-200"
                >
                  {/* Collapsible Header row */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 transition select-none cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-ivory-dark text-emerald-brand shrink-0">
                        {faq.category === "banquet" && <CalendarDays className="w-4 h-4" />}
                        {faq.category === "dietary" && <Utensils className="w-4 h-4" />}
                        {faq.category === "hours" && <Clock className="w-4 h-4" />}
                        {faq.category === "general" && <HelpCircle className="w-4 h-4" />}
                      </div>
                      <h3 className="font-serif text-charcoal-dark text-sm sm:text-base font-bold leading-snug group-hover:text-emerald-brand transition">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full bg-white flex items-center justify-center border border-ivory-dark text-emerald-brand shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion content bubble with beautiful custom expanding motion wrapper */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1.5 border-t border-ivory-dark/60">
                          <p className="text-xs sm:text-sm text-charcoal-mid font-light leading-relaxed pl-11 text-left font-sans">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty search fallback */}
          {filteredFAQs.length === 0 && (
            <div className="py-12 bg-ivory-brand/20 border border-ivory-dark rounded-2xl text-center text-charcoal-mid space-y-1">
              <p className="text-sm font-semibold">No answers match your keyword.</p>
              <p className="text-xs font-light">Try searching for other terms like 'Veg', 'Deposit', or 'Capacity'.</p>
            </div>
          )}
        </div>

        {/* Live Support / Inquiry assistance promotion section */}
        <div className="bg-emerald-brand/5 border border-emerald-mid/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-sm font-bold text-emerald-brand flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-brand animate-pulse" />
              <span>Seeking custom event consultations or allergen clearances?</span>
            </h4>
            <p className="text-xs text-charcoal-mid leading-relaxed max-w-xl font-light">
              Submit your bespoke details to our **Chef & Event AI Advisor** above, and watch him build customized menu blueprints and timelines with expert accuracy.
            </p>
          </div>
          <a
            href="https://wa.me/917752817300?text=Hello%21%20I%20have%20an%20inquiry%20regarding%20The%20Food%20Story%20Banquet%20bookings%20and%20dietary%20provisions."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-brand hover:bg-emerald-mid text-gold-brand text-xs font-bold rounded-xl transition shadow-sm uppercase tracking-wider whitespace-nowrap"
          >
            Ask on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
