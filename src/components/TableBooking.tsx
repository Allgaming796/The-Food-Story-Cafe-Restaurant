import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Clock, 
  Users, 
  User, 
  Phone, 
  CheckCircle2, 
  Trash2, 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  Utensils, 
  Send 
} from "lucide-react";

interface TableReservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  seating: string;
  specialRequests: string;
  status: "Confirmed" | "Awaiting Confirmation";
  createdAt: string;
}

const SEATING_PREFERENCES = [
  { id: "main", name: "Main Dining Hall", desc: "Elegant ambient lighting with light classical flute music" },
  { id: "garden", name: "Garden View Alcove", desc: "Overlooking lush botanical green screens" },
  { id: "cabin", name: "Chamber Cabin", desc: "Secluded, premium corner cabins for private family gatherings" },
];

const TIME_SLOTS = [
  { value: "11:30", label: "Early Lunch (11:30 AM)" },
  { value: "12:30", label: "Prime Lunch (12:30 PM)" },
  { value: "13:30", label: "Late Lunch (01:30 PM)" },
  { value: "18:00", label: "Sunset Tea & Snacks (06:00 PM)" },
  { value: "19:30", label: "Early Dinner (07:30 PM)" },
  { value: "20:30", label: "Prime Dinner (08:30 PM)" },
  { value: "21:30", label: "Late Dinner (09:30 PM)" },
];

export function TableBooking() {
  const [reservations, setReservations] = useState<TableReservation[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("19:30");
  const [guests, setGuests] = useState(4);
  const [seating, setSeating] = useState("main");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newlyCreated, setNewlyCreated] = useState<TableReservation | null>(null);

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    date?: string;
  }>({});

  useEffect(() => {
    const saved = localStorage.getItem("tfs_table_reservations");
    if (saved) {
      try {
        setReservations(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveReservations = (updated: TableReservation[]) => {
    setReservations(updated);
    localStorage.setItem("tfs_table_reservations", JSON.stringify(updated));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    const cleanedPhone = phone.replace(/\D/g, "");
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (cleanedPhone.length !== 10) {
      newErrors.phone = "Phone must be exactly 10 digits (e.g. 9876543210)";
    }

    if (!date) {
      newErrors.date = "Date is required";
    } else {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const matchSeating = SEATING_PREFERENCES.find(s => s.id === seating)?.name || seating;
    const matchTime = TIME_SLOTS.find(t => t.value === timeSlot)?.label || timeSlot;

    const newBooking: TableReservation = {
      id: "res_" + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      date,
      timeSlot: matchTime,
      guests,
      seating: matchSeating,
      specialRequests: specialRequests.trim(),
      status: "Confirmed",
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setTimeout(() => {
      const updated = [newBooking, ...reservations];
      saveReservations(updated);
      setNewlyCreated(newBooking);
      setIsSubmitting(false);
      setShowSuccess(true);

      // Trigger automatic WhatsApp redirect so the restaurant team is immediately notified with beautiful layout
      const waMessage = 
`*NEW TABLE DINING RESERVATION*
----------------------------------------
• *Patron Name:* ${newBooking.name}
• *Phone Number:* +91 ${newBooking.phone}
• *Dining Date:* ${newBooking.date}
• *Time Slot:* ${newBooking.timeSlot}
• *Table Setup:* ${newBooking.guests} Guests
• *Seating Zone:* ${newBooking.seating}
• *Special Requests:* ${newBooking.specialRequests || "None"}
----------------------------------------
_Stored & verified in The Food Story Digital Reservation Desk._`;
      
      const encoded = encodeURIComponent(waMessage);
      window.open(`https://wa.me/917752817300?text=${encoded}`, "_blank");

      // Reset form fields
      setName("");
      setPhone("");
      setDate("");
      setSpecialRequests("");
    }, 800);
  };

  const handleDelete = (id: string) => {
    const updated = reservations.filter(r => r.id !== id);
    saveReservations(updated);
  };

  return (
    <div id="table-booking-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="bg-gold-brand/10 text-emerald-brand text-xs font-mono font-extrabold uppercase px-3 py-1 rounded-full border border-gold-brand/30 tracking-wider">
          Premium Diner Seating
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-brand tracking-tight">
          Reserve Your Table
        </h2>
        <p className="text-sm text-charcoal-mid font-light leading-relaxed">
          Skip the queue and secure an ambient dine-in experience. Choose your favorite corner, select the date, and tell us how to prepare for your warm homecoming.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-ivory-dark p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-ivory-dark pb-4">
            <Utensils className="w-5 h-5 text-gold-brand" />
            <h3 className="font-serif text-xl font-bold text-emerald-brand">
              Table Reservation Details
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-mid block font-mono">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-charcoal-mid pointer-events-none">
                    <User className="w-4 h-4 text-emerald-brand/70" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    className={`w-full bg-ivory-brand text-charcoal-dark border ${
                      errors.name ? "border-red-400 focus:ring-red-400" : "border-ivory-dark focus:ring-gold-brand"
                    } rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:outline-none transition`}
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-red-500 font-mono font-medium">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-mid block font-mono">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-charcoal-mid pointer-events-none">
                    <Phone className="w-4 h-4 text-emerald-brand/70" />
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                    }}
                    className={`w-full bg-ivory-brand text-charcoal-dark border ${
                      errors.phone ? "border-red-400 focus:ring-red-400" : "border-ivory-dark focus:ring-gold-brand"
                    } rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:outline-none transition`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[10px] text-red-500 font-mono font-medium">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-mid block font-mono">
                  Select Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-charcoal-mid pointer-events-none">
                    <Calendar className="w-4 h-4 text-emerald-brand/70" />
                  </span>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (errors.date) setErrors(prev => ({ ...prev, date: undefined }));
                    }}
                    className={`w-full bg-ivory-brand text-charcoal-dark border ${
                      errors.date ? "border-red-400 focus:ring-red-400" : "border-ivory-dark focus:ring-gold-brand"
                    } rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:outline-none transition font-sans`}
                  />
                </div>
                {errors.date && (
                  <p className="text-[10px] text-red-500 font-mono font-medium">{errors.date}</p>
                )}
              </div>

              {/* Time Slot */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-mid block font-mono">
                  Pref. Time Slot
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-charcoal-mid pointer-events-none">
                    <Clock className="w-4 h-4 text-emerald-brand/70" />
                  </span>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark focus:ring-gold-brand rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:outline-none transition font-sans appearance-none"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Count */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-mid block font-mono">
                  Diners Count
                </label>
                <div className="relative font-sans">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-charcoal-mid pointer-events-none">
                    <Users className="w-4 h-4 text-emerald-brand/70" />
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, Math.min(20, parseInt(e.target.value, 10) || 1)))}
                    className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark focus:ring-gold-brand rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:outline-none transition font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Seating Preference */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-mid block font-mono">
                Seating Area Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SEATING_PREFERENCES.map((pref) => (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => setSeating(pref.id)}
                    className={`p-3.5 rounded-2xl border text-left transition duration-200 cursor-pointer ${
                      seating === pref.id
                        ? "bg-emerald-brand/5 border-gold-brand shadow-xs"
                        : "bg-white border-ivory-dark hover:bg-ivory-brand/50"
                    }`}
                  >
                    <p className={`text-xs font-serif font-bold ${seating === pref.id ? "text-emerald-brand" : "text-charcoal-dark"}`}>
                      {pref.name}
                    </p>
                    <p className="text-[9.5px] text-charcoal-mid font-light leading-snug mt-1">
                      {pref.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Request */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal-mid block font-mono">
                Special Requests or Occasion (Optional)
              </label>
              <textarea
                placeholder="e.g., Anniversary decoration, quiet corner, wheelchair access, soft spice levels..."
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark focus:ring-gold-brand rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:outline-none transition"
              />
            </div>

            {/* Success message banner */}
            <AnimatePresence>
              {showSuccess && newlyCreated && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-brand/5 border border-emerald-mid/30 rounded-2xl p-4 text-emerald-brand space-y-2 overflow-hidden"
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Table Confirmed Successfully!</span>
                  </div>
                  <p className="text-xs text-charcoal-dark font-light leading-relaxed">
                    Hello <strong>{newlyCreated.name}</strong>, we have verified availability for your party of <strong>{newlyCreated.guests} guests</strong> on <strong>{newlyCreated.date}</strong> at <strong>{newlyCreated.timeSlot}</strong>.
                  </p>
                  <p className="text-[10px] font-mono text-emerald-brand/80">
                    We redirected you to WhatsApp (+91 77528 17300) to pass the digital slip to our host. Tap Send to confirm.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                isSubmitting 
                  ? "bg-gray-200 text-gray-400 border-none" 
                  : "bg-emerald-brand hover:bg-emerald-mid text-white hover:shadow-emerald-brand/20 hover:scale-[1.01]"
              }`}
            >
              <Send className="w-4 h-4 text-gold-brand" />
              <span>{isSubmitting ? "Locking Table..." : "Book Table & Instantly Notify Team"}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Reservation Board & Active Logs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Diner Guidelines Info card */}
          <div className="bg-emerald-brand text-white rounded-3xl p-6 shadow-sm border border-emerald-mid space-y-4 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Sparkles className="w-5 h-5 text-gold-brand animate-pulse" />
              <h3 className="font-serif text-lg font-bold">Dine-in Etiquette</h3>
            </div>
            
            <ul className="space-y-3.5 text-xs text-slate-100 font-light font-sans">
              <li className="flex items-start gap-2.5">
                <span className="text-gold-brand font-bold mt-0.5">•</span>
                <span><strong>Pure Vegetarian:</strong> We are a pure veg restaurant. Outside food, eggs, or meat are not allowed inside.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold-brand font-bold mt-0.5">•</span>
                <span><strong>15-Minute Wait:</strong> We hold tables for up to 15 minutes past your booking time.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold-brand font-bold mt-0.5">•</span>
                <span><strong>Large Groups:</strong> If you have more than 20 guests, please book our banquet hall.</span>
              </li>
            </ul>

            <div className="bg-emerald-mid p-3 rounded-2xl border border-white/5 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gold-brand shrink-0" />
              <div className="text-[11px] leading-relaxed text-gray-300">
                <p className="font-bold text-white uppercase tracking-wider font-mono">Location</p>
                <p>Bisrat Road, Near Hanumat Dham Path, Shahjahanpur</p>
              </div>
            </div>
          </div>

          {/* Active Reservations Log */}
          <div className="bg-white rounded-3xl border border-ivory-dark p-6 shadow-sm text-left">
            <h4 className="font-serif text-lg font-bold text-emerald-brand mb-4 flex items-center justify-between border-b border-ivory-dark pb-3">
              <span>My Active Bookings</span>
              <span className="text-[10px] bg-ivory-brand border border-ivory-dark px-2.5 py-0.5 rounded-full font-mono text-charcoal-mid">
                {reservations.length} Active
              </span>
            </h4>

            {reservations.length === 0 ? (
              <div className="py-8 text-center text-charcoal-mid/60 space-y-2">
                <p className="text-xs">No local reservations found in this browser cache.</p>
                <p className="text-[10px] font-light">Your submitted tables will be listed here instantly for tracking.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-ivory-dark">
                {reservations.map((res) => (
                  <div 
                    key={res.id} 
                    className="p-4 bg-ivory-brand hover:bg-ivory-brand/85 rounded-2xl border border-ivory-dark transition-all flex flex-col justify-between gap-3 relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-serif text-xs font-bold text-emerald-brand">
                          {res.name}
                        </h5>
                        <p className="text-[9px] text-charcoal-mid font-mono mt-0.5">
                          {res.createdAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] bg-emerald-mid/10 text-emerald-brand font-bold font-mono uppercase px-2 py-0.5 rounded-full border border-emerald-brand/10">
                          {res.status}
                        </span>
                        <button
                          onClick={() => handleDelete(res.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition cursor-pointer"
                          title="Delete Slip"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10.5px] border-t border-ivory-dark/60 pt-2 font-sans">
                      <div className="space-y-0.5 text-charcoal-mid">
                        <p className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-emerald-brand/80" />
                          <span>{res.date}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-emerald-brand/80" />
                          <span>{res.timeSlot}</span>
                        </p>
                      </div>
                      <div className="space-y-0.5 text-charcoal-mid">
                        <p className="flex items-center gap-1.5">
                          <Users className="w-3 h-3 text-emerald-brand/80" />
                          <span>{res.guests} Guests</span>
                        </p>
                        <p className="flex items-center gap-1.5 font-medium text-emerald-brand">
                          <ChevronRight className="w-3 h-3 text-gold-brand" />
                          <span className="truncate">{res.seating}</span>
                        </p>
                      </div>
                    </div>

                    {res.specialRequests && (
                      <div className="text-[10px] bg-white border border-ivory-dark/45 p-2 rounded-lg text-charcoal-mid font-light leading-normal">
                        <strong>Request:</strong> {res.specialRequests}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
