/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Utensils, 
  CalendarDays, 
  MessageSquare, 
  PhoneCall, 
  Clock, 
  MapPin, 
  Volume2, 
  Heart,
  Share2,
  Copy,
  Check,
  Instagram,
  ArrowUp,
  X
} from "lucide-react";

// Substructure component imports
import { HeroSection } from "./components/HeroSection";
import { MenuSection } from "./components/MenuSection";
import { TableBooking } from "./components/TableBooking";
import { BanquetPlanner } from "./components/BanquetPlanner";
import { ReviewsSection } from "./components/ReviewsSection";
import { FAQSection } from "./components/FAQSection";
import { DineInStatus } from "./components/DineInStatus";
import { LiveWaitingTime } from "./components/LiveWaitingTime";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { LocationMap } from "./components/LocationMap";

type ActiveTab = "menu" | "booking" | "banquet" | "reviews";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("menu");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button if window scrolls more than 500px down (past the hero)
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyAddress = () => {
    const addressText = "The Food Story, Diwan Jograj, Near Pratap Enclave Colony, Bisrat Road, Hanumat Dham Rd, Shahjahanpur, Uttar Pradesh - 242001";
    navigator.clipboard.writeText(addressText).then(() => {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    });
  };

  const handleHeroNavigation = (section: "menu" | "booking" | "banquet" | "reviews") => {
    setActiveTab(section);
    const element = document.getElementById("active-module-anchor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-brand text-charcoal-dark selection:bg-gold-brand selection:text-emerald-brand font-sans">
      
      {/* Luxury Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-emerald-brand/95 backdrop-blur-md border-b border-emerald-mid px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
          
          {/* Logo Brand Brandmark */}
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-brand to-gold-light flex items-center justify-center text-emerald-brand font-serif font-bold text-lg shadow-md shadow-gold-brand/15">
              TFS
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-normal text-white leading-tight flex items-center gap-1.5">
                <span>The Food Story</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold-brand animate-pulse" />
              </h1>
              <p className="text-[10px] font-mono text-gold-light tracking-wider uppercase">
                pure vegetarian • Shahjahanpur
              </p>
            </div>
          </div>

          {/* Location details & Contact Action (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-white/80 font-sans">
              <Clock className="w-4 h-4 text-gold-brand shrink-0" />
              <div>
                <p className="font-semibold text-white">Mon–Fri: 11 AM - 10:30 PM</p>
                <p className="font-light text-[10px] text-gray-300">Sat–Sun: 10 AM - 11 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80 font-sans">
              <PhoneCall className="w-4 h-4 text-gold-brand shrink-0" />
              <div>
                <p className="font-semibold text-white">+91 77528 17300</p>
                <p className="font-light text-[10px] text-gray-300">Café & Banquet Inquiry</p>
              </div>
            </div>
          </div>

          {/* Contact us direct button & social */}
          <div className="flex items-center gap-3">
            <a 
              href="https://www.instagram.com/the_food_story_26?igsh=M2RxMG5hdjBvbXNx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 border border-gold-brand/35 bg-emerald-mid hover:bg-emerald-light text-gold-brand hover:text-white rounded-xl transition shadow-sm cursor-pointer"
              title="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="tel:+917752817300"
              className="flex items-center gap-1.5 px-4 py-2 border border-gold-brand/35 bg-gold-brand hover:bg-gold-light text-emerald-brand rounded-xl text-xs font-bold cursor-pointer transition shadow-sm uppercase tracking-wide"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call to Book</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Narrative Hero Intro Panel */}
      <main className="flex-1">
        <HeroSection onNavigate={handleHeroNavigation} />

        {/* Live waiting time indicator */}
        <LiveWaitingTime onReserveClick={() => handleHeroNavigation("booking")} />

        {/* Ask if the user is currently at the restaurant */}
        <DineInStatus />

        {/* Anchor point to slide-scrolling modules */}
        <div id="active-module-anchor" className="h-4" />

        {/* Master Selector Tab Row */}
        <div className="bg-emerald-brand border-y border-emerald-mid sticky top-20 z-40 shadow-md">
          <div className="max-w-4xl mx-auto px-4 flex justify-between items-center overflow-x-auto py-1 justify-center sm:justify-between">
            <div className="flex items-center gap-1 sm:gap-4 scrollbar-none w-full justify-center">
              {/* Menu Module tab */}
              <button
                onClick={() => setActiveTab("menu")}
                className={`relative px-4 py-4.5 text-xs sm:text-sm font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-2 transition select-none ${
                  activeTab === "menu" ? "text-gold-brand font-bold" : "text-gray-300 hover:text-white"
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>The Culinary Menu</span>
                {activeTab === "menu" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-brand"
                  />
                )}
              </button>

              {/* Table Booking Module tab */}
              <button
                onClick={() => setActiveTab("booking")}
                className={`relative px-4 py-4.5 text-xs sm:text-sm font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-2 transition select-none ${
                  activeTab === "booking" ? "text-gold-brand font-bold" : "text-gray-300 hover:text-white"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Reserve Table</span>
                {activeTab === "booking" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-brand"
                  />
                )}
              </button>

              {/* Banquet Hall Module tab */}
              <button
                onClick={() => setActiveTab("banquet")}
                className={`relative px-4 py-4.5 text-xs sm:text-sm font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-2 transition select-none ${
                  activeTab === "banquet" ? "text-gold-brand font-bold" : "text-gray-300 hover:text-white"
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Ivory Hall</span>
                {activeTab === "banquet" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-brand"
                  />
                )}
              </button>

              {/* Chronicles / Public feedback tab */}
              <button
                onClick={() => setActiveTab("reviews")}
                className={`relative px-4 py-4.5 text-xs sm:text-sm font-semibold tracking-wider uppercase cursor-pointer flex items-center gap-2 transition select-none ${
                  activeTab === "reviews" ? "text-gold-brand font-bold" : "text-gray-300 hover:text-white"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reviews & FAQs</span>
                {activeTab === "reviews" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-brand"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Inner Panel Container with Motion transitions */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {activeTab === "menu" && (
                <MenuSection />
              )}
              {activeTab === "booking" && (
                <TableBooking />
              )}
              {activeTab === "banquet" && (
                <BanquetPlanner />
              )}
              {activeTab === "reviews" && (
                <>
                  <ReviewsSection />
                  <FAQSection />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Why Choose Us feature lists trust section */}
        <WhyChooseUs />

        {/* Google Maps Location pointer section */}
        <LocationMap />
      </main>

      {/* Elegant Footer panel */}
      <footer className="bg-emerald-brand text-slate-white border-t border-emerald-mid select-none font-sans">
        
        {/* Core details */}
        <motion.div 
          className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          
          {/* Brand section */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-gold-brand to-gold-light flex items-center justify-center text-emerald-brand font-serif font-bold">
                TFS
              </div>
              <p className="font-serif text-lg font-semibold tracking-normal text-white">
                The Food Story
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-mid border border-emerald-light/40 px-3 py-1 rounded-full text-xs text-gold-light font-mono">
              <span>🌿</span>
              <span>100% Pure Vegetarian Restaurant</span>
            </div>
            <p className="text-gray-300 text-xs font-light leading-relaxed max-w-sm">
              An elegant saga of pure vegetarian hand-stretched recipes, slow charcoal-cooked copper handis, and memorable banquet celebrations at Bisrat Road, Shahjahanpur.
            </p>
            <div className="pt-1.5 flex items-center">
              <a 
                href="https://www.instagram.com/the_food_story_26?igsh=M2RxMG5hdjBvbXNx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-mid border border-emerald-light/30 rounded-xl text-xs text-gold-light hover:text-white transition-all font-mono"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow @the_food_story_26</span>
              </a>
            </div>
          </div>

          {/* Quick Directory links */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <p className="text-xs uppercase font-semibold text-gold-brand tracking-widest font-mono">
              Address & Coordinates
            </p>
            <div className="space-y-2.5 text-xs text-gray-300 font-light leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-brand shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <p className="leading-relaxed">
                    Diwan Jograj, Near Pratap Enclave Colony,<br />
                    Bisrat Road, Hanumat Dham Rd,<br />
                    Shahjahanpur, Uttar Pradesh – 242001
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-mid/95 border border-emerald-light/40 text-[10px] font-mono text-gray-200 hover:text-white rounded-md transition hover:bg-emerald-light/20 active:scale-95 cursor-pointer max-w-max"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3 h-3 text-gold-brand" />
                        <span className="text-gold-brand text-[9px] uppercase tracking-wider font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-gold-brand" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-brand shrink-0" />
                <span>Operating Hours: 11:00 AM – 10:30 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-gold-brand shrink-0" />
                <span>Call/WhatsApp: +91 77528 17300</span>
              </div>
            </div>
          </div>

          {/* Quote Chapter segment */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs uppercase font-semibold text-gold-brand tracking-widest font-mono">
              Our Hospitality Philosophy
            </p>
            <blockquote className="text-xs text-gray-300 font-serif font-light italic leading-relaxed">
              "We cook with absolute precision, honoring regional spice legacies, wood oven drakes, and pristine ambient theme decors. Every celebration is treated like family."
            </blockquote>
            <p className="text-[10px] font-mono text-gold-light uppercase tracking-wide">
              — The Management & Culinary Team
            </p>
          </div>

        </motion.div>

        {/* copyright and credit rail */}
        <div className="bg-emerald-mid/50 py-6 border-t border-emerald-mid/30 text-center text-[10px] text-gray-400 font-mono flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-4">
          <p>© 2026 The Food Story Café & Ivory Banquet. All Rights Reserved.</p>
          <div className="flex items-center gap-3 justify-center flex-wrap">
            <span className="flex items-center gap-1.5 text-gray-300">
              <Heart className="w-3.5 h-3.5 text-gold-brand fill-gold-brand animate-pulse" />
              <span>Pure Vegetarian Excellence</span>
            </span>
            <span>•</span>
            <button 
              onClick={() => setShowPrivacyPolicy(true)}
              className="hover:text-gold-light text-gray-300 hover:underline transition duration-200 cursor-pointer text-[10px] font-mono font-semibold"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <span className="text-gray-300">Locally Harvested Ingredients</span>
          </div>
        </div>
      </footer>

      {/* PRIVACY POLICY MODAL */}
      <AnimatePresence>
        {showPrivacyPolicy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacyPolicy(false)}
              className="absolute inset-0 bg-charcoal-dark/70 backdrop-blur-md"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl border border-ivory-dark overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh] text-left"
            >
              {/* Header */}
              <div className="p-6 border-b border-ivory-dark/60 bg-gradient-to-r from-emerald-brand to-emerald-mid text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-brand flex items-center justify-center text-emerald-brand font-serif font-bold text-sm">
                    TFS
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold">Privacy Policy</h3>
                    <p className="text-[10px] text-gold-light/90 font-mono tracking-wider uppercase">The Food Story Café & Banquet</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="p-1.5 rounded-full hover:bg-emerald-light/40 transition-colors text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 overflow-y-auto text-sm text-charcoal-dark leading-relaxed space-y-6">
                <div>
                  <h4 className="font-serif text-base font-bold text-emerald-brand mb-2">1. Introduction</h4>
                  <p className="text-gray-600 font-light">
                    Welcome to <strong>The Food Story Café & Ivory Banquet</strong>. We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safe-guard your information when you browse our menu, reserve a table, or request a banquet hall planning quote.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-emerald-brand mb-2">2. Information We Collect</h4>
                  <p className="text-gray-600 font-light mb-2">
                    When you utilize our reservation system or plan your banquets online with us, we request standard booking details:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 font-light space-y-1">
                    <li>Contact details such as name, email address, and phone number.</li>
                    <li>Booking selections comprising date, time, guest count, and dining choices.</li>
                    <li>Ivory Banquet gathering choices, estimated headcount, and message preferences.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-emerald-brand mb-2">3. How We Use Your Information</h4>
                  <p className="text-gray-600 font-light mb-2">
                    Your information is utilized solely to enhance your hospitality saga:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 font-light space-y-1">
                    <li>Confirm and coordinate your table or banquet reservations.</li>
                    <li>Deliver dining updates, timing shifts, or request follow-ups.</li>
                    <li>Maintain internal logs to provide pure vegetarian excellence.</li>
                  </ul>
                  <p className="text-gray-600 font-light mt-2">
                    We do not sell, distribute, rent, or lease your personal credentials with any third-party marketing brokers.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-emerald-brand mb-2">4. Digital Cookies & Web Tech</h4>
                  <p className="text-gray-600 font-light">
                    We save basic interaction states locally (such as your vegetarian filters or custom banquet planner parameters) to provide a localized, continuous, and responsive site design. No trackers are utilized.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-emerald-brand mb-2">5. Updates & Queries</h4>
                  <p className="text-gray-600 font-light">
                    Our team updates this policy in tandem with regulatory requirements. For any clarifications or to modify your booking specifications, please feel free to reach out to us directly at <strong>+91 77528 17300</strong>, or stop by in person at Hanumat Dham Road, Shahjahanpur.
                  </p>
                </div>
              </div>

              {/* Policy Footer */}
              <div className="p-4 bg-ivory-light border-t border-ivory-dark/60 flex justify-between items-center text-[11px] font-mono text-gray-500">
                <span>Effective Date: June 2026</span>
                <button
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="px-4 py-1.5 bg-emerald-brand hover:bg-emerald-mid text-gold-brand hover:text-white rounded-lg transition-colors font-sans text-xs font-bold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/917752817300?text=Hello!%20I%20would%20like%20to%20make%20a%20booking%20at%20The%20Food%20Story%20Café%20%26%20Restaurant." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5c] text-white p-3.5 rounded-full shadow-xl shadow-green-600/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
        title="Chat on WhatsApp"
        id="whatsapp-floating-button"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6.5 h-6.5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out font-mono text-[11px] font-semibold tracking-wider uppercase pl-0 group-hover:pl-2 whitespace-nowrap text-white">
          Book on WhatsApp
        </span>
      </a>

      {/* LUXURIOUS "BACK TO TOP" BUTTON WITH MOTION */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            id="back-to-top-button"
            className="fixed bottom-24 right-6 z-50 bg-emerald-brand hover:bg-emerald-mid text-gold-brand border border-gold-brand/40 shadow-2xl rounded-full p-3.5 transition-colors cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center group"
            title="Scroll to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5.5 h-5.5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
