import React from "react";
import { motion } from "motion/react";
import { Leaf, Sparkles, Users, Heart, PartyPopper } from "lucide-react";

interface FeatureCardProps {
  key?: React.Key;
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
}

function FeatureCard({ icon, title, description, detail }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl p-6 border border-ivory-dark/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold-brand/5 rounded-full blur-xl pointer-events-none" />
      
      <div className="space-y-4">
        {/* Icon wrapper */}
        <div className="w-12 h-12 rounded-xl bg-gold-brand/10 border border-gold-brand/20 flex items-center justify-center text-emerald-brand shadow-sm">
          {icon}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-emerald-brand tracking-tight flex items-center gap-1.5">
            {title}
          </h3>
          <p className="text-sm font-semibold text-charcoal-dark font-sans leading-snug">
            {description}
          </p>
          <p className="text-xs font-light text-charcoal-mid font-sans leading-relaxed">
            {detail}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-dashed border-ivory-dark/30 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-brand" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-brand">
          Certified Quality
        </span>
      </div>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Fresh Vegetarian Food",
      description: "100% pure and healthy veg items cooked with fresh daily ingredients.",
      detail: "We buy fresh vegetables from the local market every single morning. We do not use frozen foods or artificial colors. Every dish is fully vegetarian, clean, and delicious so you can eat happily with no worries."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Hygienic Kitchen",
      description: "Super clean cooking space where cleanliness is our top rule.",
      detail: "Our kitchen is washed and sanitized multiple times a day. Our cooks wear clean gloves, hair caps, and aprons at all times. We keep all ingredients in sealed, clean jars to make sure your food is 100% safe and healthy."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Family Friendly",
      description: "A warm and happy atmosphere perfect for kids, parents, and elder relatives.",
      detail: "We created our restaurant with family in mind. The lighting is bright, the music is soft and pleasant, and our staff is soft-spoken and very helpful. It is the best place in town to share a lovely meal with your loved ones."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Comfortable Seating",
      description: "Big comfortable space with over 150+ soft and premium seats.",
      detail: "No need to stand in long lines or wait forever. We have luxurious, soft-cushioned chairs and spacious wooden tables. There is plenty of space between tables so you can enjoy your private talks and comfortable dining."
    },
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: "Spacious Event Halls",
      description: "Three gorgeous banquet halls for birthdays and corporate gatherings.",
      detail: "Planning a party? Our 3 premium banquet space zones support large gatherings perfectly. From bright birthday decor backdrops to complete stage light set-ups, we manage food and celebrations beautifully."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-ivory-brand py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-ivory-dark/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-brand bg-emerald-brand/5 px-3.5 py-1.5 rounded-full border border-gold-brand/20">
            Why Dine With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-brand tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-sm sm:text-base text-charcoal-mid font-sans font-light leading-relaxed">
            We are dedicated to giving you the cleanest, most comfortable, and delicious pure vegetarian experience in Shahjahanpur. Here is what makes us special:
          </p>
        </div>

        {/* Features Bento/Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feat, index) => (
            <FeatureCard
              key={index}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              detail={feat.detail}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
