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
    question: "What is the capacity of the banquet halls, and how far in advance should we book?",
    answer: "We have three air-conditioned banquet halls with a combined capacity of up to 300 guests (around 100 to 150 guests per hall). For weekend parties or wedding dates, we suggest booking your date at least 2 to 3 months early so you do not miss out."
  },
  {
    id: "f2",
    category: "dietary",
    question: "Is your menu 100% pure vegetarian? Do you make food without onion and garlic (Sattvic)?",
    answer: "Yes! The Food Story is a 100% pure vegetarian restaurant. We do not use meat, fish, or eggs in our kitchen. We also make Jain and Sattvic food (without onion and garlic) if you request it."
  },
  {
    id: "f3",
    category: "hours",
    question: "What are your daily operating hours?",
    answer: "Our restaurant is open from 11:00 AM to 10:30 PM every day. For private bookings and banquet events, timelines can be extended with special permission from our team."
  },
  {
    id: "f4",
    category: "banquet",
    question: "Can we customize the decoration themes, or do we have to use the main ones?",
    answer: "Yes, you can fully customize the decoration themes! Our main themes (Royal Gold, Pastel Floral, Elegant Ivory, and Neon Party) are ready-made options, but you can change colors, flowers, or neon lights with our team to match your exact concept."
  },
  {
    id: "f5",
    category: "general",
    question: "Do we need to pay an advance fee to book the hall?",
    answer: "Making an estimate or draft booking is completely free. Once you confirm the date and menu, we ask for a 25% deposit to reserve the banquet hall. You can pay the rest on or before the day of your event."
  },
  {
    id: "f6",
    category: "dietary",
    question: "Can we add child-friendly food or live counters to our booking?",
    answer: "Yes, our food packages are very flexible. You can add special sweets, live stalls (like hot Jalebi or Rabri), and kids' favorite items like mini pizzas and sliders. Just let our team know what you want!"
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
