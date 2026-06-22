import React from "react";
import { motion } from "motion/react";
import { MapPin, Navigation, Clock, Phone, ExternalLink } from "lucide-react";

export function LocationMap() {
  const fullAddress = "The Food Story, Diwan Jograj, Near Pratap Enclave Colony, Bisrat Road, Hanumat Dham Rd, Shahjahanpur, Uttar Pradesh - 242001";
  
  // Clean URL encoded link for navigating to Google Maps
  const directionUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  // Embed search query map source
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="bg-ivory-brand py-16 px-4 sm:px-6 lg:px-8 border-b border-ivory-dark/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-gold-brand bg-emerald-brand/5 px-3.5 py-1.5 rounded-full border border-gold-brand/20">
                <MapPin className="w-3.5 h-3.5 animate-bounce" /> Location Pin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-brand tracking-tight">
                Visit The Food Story
              </h2>
              <p className="text-sm text-charcoal-mid font-sans font-light leading-relaxed">
                Step into a premium, pure vegetarian setting curated for delightful family dining. Find our location easily on the map below or use Google Maps for turn-by-turn navigation.
              </p>
            </div>

            {/* Address & Info Card */}
            <div className="bg-white rounded-2xl p-6 border border-ivory-dark/40 shadow-xs space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-gold-brand/10 border border-gold-brand/20 flex items-center justify-center text-emerald-brand shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gold-brand">
                    Physical Address
                  </h4>
                  <p className="text-sm font-semibold text-charcoal-dark leading-snug font-serif">
                    The Food Story
                  </p>
                  <p className="text-xs text-charcoal-mid leading-relaxed">
                    Diwan Jograj, Near Pratap Enclave Colony, Bisrat Road, Hanumat Dham Rd, Shahjahanpur, Uttar Pradesh - 242001
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-ivory-dark/30">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-brand shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] font-mono font-bold text-charcoal-mid uppercase">Timings</h5>
                    <p className="text-xs font-semibold text-charcoal-dark">11:00 AM – 10:30 PM</p>
                    <p className="text-[9px] text-charcoal-mid">Open Daily</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-brand shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] font-mono font-bold text-charcoal-mid uppercase">Contact</h5>
                    <p className="text-xs font-semibold text-charcoal-dark">+91 77528 17300</p>
                    <p className="text-[9px] text-charcoal-mid">Call for Reservation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={directionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-brand hover:bg-emerald-dark text-white rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-98"
              >
                <Navigation className="w-4 h-4 animate-pulse text-gold-brand" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Map Embed Column */}
          <div className="lg:col-span-7 relative min-h-[300px] h-full rounded-2xl overflow-hidden border border-ivory-dark/50 shadow-xs bg-white p-2">
            <div className="w-full h-full min-h-[320px] rounded-xl overflow-hidden relative">
              <iframe
                title="Google Maps Location of The Food Story"
                src={mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0 rounded-xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
