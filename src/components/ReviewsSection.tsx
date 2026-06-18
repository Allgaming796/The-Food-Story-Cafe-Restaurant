import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MessageSquare, ThumbsUp, Calendar, CheckCircle2 } from "lucide-react";
import { Review } from "../types";

const INITIAL_REVIEWS: Review[] = [
  {
    id: "r1",
    userName: "Aakash Verma",
    rating: 5,
    comment: "The Grand Memoir Banquet Hall hosted our wedding Roka ceremony flawlessly! We picked the Royal Gold theme with Saffron velvet curtains. The slow-cooked Dal Makhani Claypot and warm Brownies left everyone amazed. Sincere thanks to the catering stewards!",
    date: "June 08, 2026",
    tag: "Banquet Ceremony",
    likes: 42,
  },
  {
    id: "r2",
    userName: "Shreya Mishra",
    rating: 5,
    comment: "Dine-in is incredibly artistic and quiet! The mango lassi with condensed thick rabri layer is absolutely blissful. Spiciness levels of Shahjahanpuri Paneer Tikka are perfectly balanced for families. Definitely coming back for other courses.",
    date: "May 24, 2026",
    tag: "Dine-In Family",
    likes: 27,
  },
  {
    id: "r3",
    userName: "Aditya Gupta",
    rating: 4,
    comment: "Flawless technical support and elegant crystal centerpiece arrangements during our corporate quarterly launch. The Ivory theme kept the focus of the delegation. Smooth presentation layouts throughout the evening.",
    date: "April 19, 2026",
    tag: "Corporate High-Tea",
    likes: 15,
  }
];

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Form Fields
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [newCategory, setNewCategory] = useState("Dine-In Family");
  const [formSuccess, setFormSuccess] = useState(false);

  // Dynamic calculations
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, r) => total + r.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  }, [reviews]);

  const uniqueTags = useMemo(() => {
    return ["all", ...new Set(reviews.map((r) => r.tag))];
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (selectedFilter === "all") return reviews;
    return reviews.filter((r) => r.tag === selectedFilter);
  }, [reviews, selectedFilter]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const addedObj: Review = {
      id: "rev-" + Date.now(),
      userName: newName,
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }),
      tag: newCategory,
      likes: 0,
    };

    setReviews([addedObj, ...reviews]);
    setFormSuccess(true);
    
    // clear fields
    setNewName("");
    setNewComment("");
    setNewRating(5);

    setTimeout(() => {
      setFormSuccess(false);
    }, 4000);
  };

  const handleLikeReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, likes: r.likes + 1 };
        }
        return r;
      })
    );
  };

  return (
    <section className="py-16 bg-ivory-brand px-4 sm:px-6 lg:px-8 border-t border-ivory-dark font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto block">
          <div className="flex justify-center items-center gap-1.5 text-gold-brand text-xs font-semibold tracking-widest uppercase font-mono">
            <MessageSquare className="w-4 h-4 text-gold-brand shrink-0 animate-pulse" />
            <span>Voices of our patrons</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-emerald-brand font-bold">
            Shared Chronicles of Taste
          </h2>
          <p className="text-charcoal-mid text-sm sm:text-base font-light">
            Every celebration brings unique stories back to us. Read authentic satisfaction letters, or leave your own review below.
          </p>
        </div>

        {/* Rating dashboard header with stats */}
        <div className="bg-white rounded-2xl border border-ivory-dark p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left text-charcoal-dark shadow-sm">
          
          {/* Average Rating Block */}
          <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-ivory-dark pb-6 md:pb-0 md:pr-8">
            <p className="text-sm text-charcoal-mid uppercase tracking-widest font-bold font-mono">Average Rating</p>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-5xl font-bold text-emerald-brand tracking-tight">{averageRating}</span>
              <span className="text-charcoal-mid text-lg">/ 5.0</span>
            </div>
            {/* Draw rating stars */}
            <div className="flex justify-center md:justify-start items-center gap-1 text-gold-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 shrink-0 ${
                    i < Math.round(averageRating) ? "fill-gold-brand stroke-gold-brand text-gold-brand" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-charcoal-mid font-mono">Based on {reviews.length} community evaluations</p>
          </div>

          {/* Quick Review filter block */}
          <div className="md:col-span-8 space-y-3">
            <p className="text-xs text-charcoal-mid uppercase font-bold tracking-widest font-mono">
              Filter Patron Narratives by Occasions
            </p>
            <div className="flex flex-wrap gap-2">
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedFilter(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wider cursor-pointer border transition uppercase ${
                    selectedFilter === tag
                      ? "bg-gold-brand text-emerald-brand border-gold-brand shadow-sm font-bold"
                      : "bg-ivory-brand text-emerald-brand border-ivory-dark hover:bg-white"
                  }`}
                >
                  {tag === "all" ? "All Occasions" : tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Review list and Submission Form split split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Review letters card columns */}
          <div className="lg:col-span-8 space-y-5">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((rev) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={rev.id}
                  className="bg-white rounded-2xl border border-ivory-dark p-6 text-left space-y-4 shadow-sm"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="font-serif text-base font-bold text-emerald-brand">
                        {rev.userName}
                      </p>
                      <div className="flex items-center gap-2">
                        {/* Rating stars inside */}
                        <div className="flex items-center gap-0.5 text-gold-brand">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 shrink-0 ${
                                i < rev.rating ? "fill-gold-brand stroke-gold-brand text-gold-brand" : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-charcoal-mid font-mono">• {rev.date}</span>
                      </div>
                    </div>

                    <span className="bg-emerald-brand/10 text-emerald-brand text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-mid/10">
                      {rev.tag}
                    </span>
                  </div>

                  <p className="text-charcoal-dark text-xs sm:text-sm font-light leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {/* Likes review interaction */}
                  <div className="flex items-center justify-between pt-3 border-t border-ivory-dark">
                    <span className="text-[10px] text-emerald-brand font-mono font-bold flex items-center gap-1">
                      <span>✓</span>
                      <span>Verified dining experience</span>
                    </span>
                    <button
                      onClick={() => handleLikeReview(rev.id)}
                      className="flex items-center gap-1.5 text-xs text-charcoal-mid hover:text-emerald-brand active:scale-90 transition cursor-pointer select-none font-mono"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
                      <span>{rev.likes} Helpful</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right fully interactive Review writing card */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-ivory-dark p-6 shadow-sm text-left">
            <h3 className="font-serif text-lg font-bold text-emerald-brand border-b border-ivory-dark pb-2">
              Share Your Food Chapter
            </h3>
            
            <AnimatePresence mode="wait">
              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4 font-sans"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-brand/10 text-emerald-brand flex items-center justify-center mx-auto border border-emerald-mid">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-emerald-brand">Review Published Instantly</p>
                    <p className="text-xs text-charcoal-mid max-w-[200px] mx-auto leading-relaxed">
                      Thank you! Your food story has been added to our live chronicle roll instantly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmitReview}
                  className="space-y-4 pt-2"
                >
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                      Name of Patron
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Naman Jha"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-gold-brand focus:outline-none placeholder-charcoal-mid font-sans font-medium"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                      Your Rating (Stars)
                    </label>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starValue = i + 1;
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setNewRating(starValue)}
                            className="text-gold-brand hover:scale-115 transition cursor-pointer select-none"
                          >
                            <Star
                              className={`w-6 h-6 shrink-0 ${
                                starValue <= newRating ? "fill-gold-brand stroke-gold-brand text-gold-brand" : "text-gray-200"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tag Choice */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                      Occasion Format
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark rounded-lg px-2.5 py-2 text-xs focus:ring-1 focus:ring-gold-brand focus:outline-none font-medium cursor-pointer"
                    >
                      <option value="Dine-In Family">Dine-In Family</option>
                      <option value="Banquet Ceremony">Banquet Ceremony</option>
                      <option value="Corporate High-Tea">Corporate High-Tea</option>
                      <option value="Catering Delivery">Catering Delivery</option>
                    </select>
                  </div>

                  {/* Comments */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                      Narrative Comment
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the hospitality, taste, or banquet decoration elegance..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-gold-brand focus:outline-none resize-none font-sans placeholder-charcoal-mid"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-brand hover:bg-emerald-mid hover:shadow-md transition text-white py-3 rounded-xl text-xs font-bold select-none cursor-pointer shadow-md"
                  >
                    Publish My Story
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
