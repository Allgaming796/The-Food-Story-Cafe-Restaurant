import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface GalleryCard {
  title: string;
  category: "ambience" | "culinary" | "events";
  description: string;
  emoji: string;
}

const GALLERY_ITEMS: GalleryCard[] = [
  {
    title: "Chapter I: Dawn Awakened (Signature Breakfast)",
    category: "culinary",
    description: "Start your morning with golden Poori Aloo (₹150), slow-crisped Aloo-Gobhi-Paneer Parathas (₹80-₹100), standard local Chhole Bhature (₹150) or comforting Pav Bhaji.",
    emoji: "🥞"
  },
  {
    title: "Chapter II: Clay Oven Royalty (Tandoor & Kebab)",
    category: "culinary",
    description: "Enjoy our majestic Tandoori Platter (₹549) loaded with spiced Paneer Tikka (₹325), Veg Seekh Kabab (₹299), Mushroom Tikka, and coal-roasted pineapples.",
    emoji: "🔥"
  },
  {
    title: "Chapter III: Sourdough Alchemy (Stonefired Pizzas)",
    category: "culinary",
    description: "Hand-pushed double-fermented sourdoughs starting at ₹129. Try our loaded signature TFS Special Pizza (₹279), Farm House (₹249), or Achari Paneer specialty.",
    emoji: "🍕"
  },
  {
    title: "Chapter IV: Wok & Steam Delights (East Asian & Short Eats)",
    category: "culinary",
    description: "Savor our iconic Kurkure, Afghani & Baked Momos (₹149-₹249), wok-tossed Chilli Paneer Dry (₹319), Honey Chilli Lotus Stem (₹269), or rich Rose Pasta (₹309).",
    emoji: "🥟"
  },
  {
    title: "Chapter V: Royal Heritage Gravies (North Indian Mains)",
    category: "culinary",
    description: "Meticulously simmered Dal Makhani Handi (₹275), spiced Paneer Butter Masala (₹369), Paneer Lababdar (₹369), and our legendary rich Cheese Tomato Butter (₹369).",
    emoji: "🍲"
  },
  {
    title: "Chapter VI: Sweet Nectars & Waffles (Elixirs & Desserts)",
    category: "culinary",
    description: "Conclude with fresh Blueberry or Nutella Waffles (₹149/179), Ferrero Rocher & Banoffee shakes (₹220/120), and cold artisan Cactus or Spicy Mango Mojitos.",
    emoji: "🍹"
  }
];

export function GallerySection() {
  return (
    <section className="py-16 bg-white text-charcoal-dark border-t border-ivory-dark px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto block">
          <div className="flex justify-center items-center gap-1.5 text-gold-brand text-xs font-semibold tracking-widest uppercase font-mono">
            <Sparkles className="w-4 h-4 text-gold-brand shrink-0 animate-pulse" />
            <span>Chapters of our culinary story</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-emerald-brand font-bold">
            A Gastronomic Travelogue of Taste
          </h2>
          <p className="text-charcoal-mid text-sm sm:text-base font-light">
            Flip through the golden pages of our hand-crafted menu—from the dawn of breakfast platters, tandoori claypot wonders, and sourdough pies, to rich imperial mains and matching cold shaken elixirs.
          </p>
        </div>

        {/* Custom Bento Grid Arrangement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.12 }}
              key={idx}
              className="group relative bg-ivory-brand rounded-2xl border border-ivory-dark/65 p-6 hover:border-gold-brand/50 transition-all shadow-sm flex flex-col justify-between overflow-hidden h-64 hover:-translate-y-1 cursor-pointer select-none"
            >
              {/* Backlight on hover */}
              <div className="absolute right-0 top-0 w-24 h-24 bg-gold-brand/5 rounded-full blur-xl group-hover:bg-gold-brand/10 transition pointer-events-none" />

              {/* Category indicator Tag */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-brand bg-white border border-ivory-dark px-3 py-1 rounded-full">
                  {item.category}
                </span>
                
                {/* Visual Accent */}
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-115 transition">
                  {item.emoji}
                </div>
              </div>

              {/* Text Information segment */}
              <div className="space-y-2 text-left pt-6 mt-auto">
                <h3 className="font-serif text-lg font-bold text-emerald-brand group-hover:text-gold-brand transition">
                  {item.title}
                </h3>
                <p className="text-charcoal-mid text-xs font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom line flourish */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold-brand to-gold-light w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
