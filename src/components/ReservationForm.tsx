import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Share2, Send, Calendar, Clock, Users, User, Phone, AlertTriangle } from "lucide-react";

interface ReservationFormProps {
  guestCount: number;
  setGuestCount: (count: number) => void;
  eventDate: string;
  setEventDate: (date: string) => void;
  selectedEventType: string;
  selectedThemeName: string;
  selectedPkgName: string;
  finalEstimatedTotal: number;
  addonsDetail: string;
  accompanimentDiscount: number;
  selectedPkgIncludes?: string[];
}

export function ReservationForm({
  guestCount,
  setGuestCount,
  eventDate,
  setEventDate,
  selectedEventType,
  selectedThemeName,
  selectedPkgName,
  finalEstimatedTotal,
  addonsDetail,
  accompanimentDiscount,
  selectedPkgIncludes = [],
}: ReservationFormProps) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [eventTime, setEventTime] = useState("18:00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);

  // Field validation and error states
  const [errors, setErrors] = useState<{
    clientName?: string;
    clientPhone?: string;
    eventDate?: string;
    eventTime?: string;
    guestCount?: string;
  }>({});

  const [touched, setTouched] = useState<{
    clientName?: boolean;
    clientPhone?: boolean;
    eventDate?: boolean;
    eventTime?: boolean;
    guestCount?: boolean;
  }>({});

  // Regular validation engine
  useEffect(() => {
    const newErrors: typeof errors = {};

    // 1. Client Name Validation
    if (!clientName.trim()) {
      newErrors.clientName = "Name is required";
    } else if (clientName.trim().length < 3) {
      newErrors.clientName = "Name must be at least 3 characters long";
    }

    // 2. Client Phone Validation
    const cleanedPhone = clientPhone.replace(/\D/g, "");
    if (!clientPhone) {
      newErrors.clientPhone = "Phone number is required";
    } else if (cleanedPhone.length !== 10) {
      newErrors.clientPhone = "Phone must be exactly 10 digits (e.g. 9876543210)";
    }

    // 3. Event Date Validation
    if (!eventDate) {
      newErrors.eventDate = "Preferred date is required";
    } else {
      const selected = new Date(eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.eventDate = "Date cannot be in the past";
      }
    }

    // 4. Event Time Validation
    if (!eventTime) {
      newErrors.eventTime = "Preferred slot time is required";
    } else {
      const [hoursStr, minutesStr] = eventTime.split(":");
      const hours = parseInt(hoursStr, 10);
      // Banquet Hall rental available between 10:00 AM and 11:30 PM (23:30)
      if (hours < 10 || (hours === 23 && parseInt(minutesStr, 10) > 30) || hours > 23) {
        newErrors.eventTime = "Rentals are only valid between 10:00 AM and 11:30 PM";
      }
    }

    // 5. Guest Count Validation
    if (guestCount < 20) {
      newErrors.guestCount = "Banquet requires a minimum of 20 guests";
    } else if (guestCount > 1000) {
      newErrors.guestCount = "Banquet maximum capacity is 1,000 guests";
    }

    setErrors(newErrors);
  }, [clientName, clientPhone, eventDate, eventTime, guestCount]);

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleWhatsAppExport = () => {
    const discountText = accompanimentDiscount > 0 ? `\n• *Combo Package Discount Applied:* -₹${accompanimentDiscount}` : "";
    const includesText = selectedPkgIncludes && selectedPkgIncludes.length > 0 
      ? `\n  *Selected Dishes List:*\n  ${selectedPkgIncludes.map((x, i) => `  ${i + 1}. ${x}`).join("\n  ")}`
      : "";
    const whatsappMessage = 
`*CONFIRMED BANQUET HALL RESERVATION PROPOSAL*
----------------------------------------
• *Client Name:* ${clientName}
• *Phone:* +91 ${clientPhone}
• *Preferred Date:* ${eventDate}
• *Preferred Time:* ${eventTime}
• *Event Format:* ${selectedEventType}
• *Expected Guest Count:* ${guestCount} Guests
• *Atmosphere Theme:* ${selectedThemeName}
• *Culinary Package:* ${selectedPkgName}${includesText}
• *Live Add-ons chosen:* ${addonsDetail}${discountText}
----------------------------------------
*Estimated Total Cost:* ₹${finalEstimatedTotal}
_Verified and aligned through online reservation form._`;

    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/917752817300?text=${encoded}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all fields to trigger feedback
    setTouched({
      clientName: true,
      clientPhone: true,
      eventDate: true,
      eventTime: true,
      guestCount: true,
    });

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    
    // Call WhatsApp export immediately inside user interaction handler to prevent popup blocker issues
    handleWhatsAppExport();

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessResponse(
        `Your reservation proposal has been successfully validated & locked! We have redirected you to WhatsApp (+91 77528 17300) to confirm your select food menu and custom banquet setup. Please tap "Send" in WhatsApp to initiate chat with our coordinator.`
      );
    }, 800);
  };

  const clearForm = () => {
    setSuccessResponse(null);
    setClientName("");
    setClientPhone("");
    setEventDate("");
    setEventTime("18:00");
    setTouched({});
  };

  return (
    <div className="bg-white rounded-2xl border border-ivory-dark p-6 shadow-sm space-y-4 text-left font-sans">
      <div className="flex justify-between items-center border-b border-ivory-dark pb-2">
        <h4 className="font-serif text-base font-bold text-emerald-brand">
          Lock Event Date & Reserve Slot
        </h4>
        <span className="text-[10px] font-mono bg-emerald-brand/5 border border-emerald-mid/20 text-emerald-brand px-2 py-0.5 rounded-full font-bold">
          Step 4 of 4
        </span>
      </div>

      <AnimatePresence mode="wait">
        {successResponse ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 py-2"
          >
            <div className="bg-emerald-brand/5 rounded-xl p-4 border border-emerald-mid text-emerald-brand text-xs space-y-2 leading-relaxed">
              <div className="flex items-center gap-2 text-emerald-brand font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-brand shrink-0" />
                <span>Verification & Success</span>
              </div>
              <p className="font-medium text-charcoal-dark">{successResponse}</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleWhatsAppExport}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white py-3 rounded-xl text-xs font-bold font-mono uppercase tracking-wide cursor-pointer transition shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Verified Plan on WhatsApp</span>
              </button>
              <button
                onClick={clearForm}
                className="w-full text-center py-2 text-xs font-bold text-emerald-brand hover:underline cursor-pointer uppercase font-mono tracking-wide"
              >
                Plan a New Reservation ×
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Input Name */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                  Full Name
                </label>
                {touched.clientName && errors.clientName && (
                  <span className="text-[9px] font-mono text-red-500 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    {errors.clientName}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-charcoal-mid pointer-events-none">
                  <User className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="Enter full name for booking"
                  value={clientName}
                  onBlur={() => handleBlur("clientName")}
                  onChange={(e) => setClientName(e.target.value)}
                  className={`w-full bg-ivory-brand text-charcoal-dark border ${
                    touched.clientName && errors.clientName ? "border-red-400 focus:ring-red-400" : "border-ivory-dark focus:ring-gold-brand"
                  } rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:outline-none transition`}
                />
              </div>
            </div>

            {/* Input Phone */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                  Phone Number
                </label>
                {touched.clientPhone && errors.clientPhone && (
                  <span className="text-[9px] font-mono text-red-500 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    {errors.clientPhone}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-charcoal-mid pointer-events-none">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={clientPhone}
                  onBlur={() => handleBlur("clientPhone")}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className={`w-full bg-ivory-brand text-charcoal-dark border ${
                    touched.clientPhone && errors.clientPhone ? "border-red-400 focus:ring-red-400" : "border-ivory-dark focus:ring-gold-brand"
                  } rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:outline-none transition`}
                />
              </div>
            </div>

            {/* Input Date & Time Slots */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                    Select Date
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-charcoal-mid pointer-events-none">
                    <Calendar className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="date"
                    value={eventDate}
                    onBlur={() => handleBlur("eventDate")}
                    onChange={(e) => setEventDate(e.target.value)}
                    className={`w-full bg-ivory-brand text-charcoal-dark border ${
                      touched.eventDate && errors.eventDate ? "border-red-400 focus:ring-red-400" : "border-ivory-dark focus:ring-gold-brand"
                    } rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:outline-none transition text-charcoal-mid`}
                  />
                </div>
                {touched.eventDate && errors.eventDate && (
                  <p className="text-[9px] font-mono text-red-500 font-bold leading-none mt-1">
                    {errors.eventDate}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                    Select Time
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-charcoal-mid pointer-events-none">
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="time"
                    value={eventTime}
                    onBlur={() => handleBlur("eventTime")}
                    onChange={(e) => setEventTime(e.target.value)}
                    className={`w-full bg-ivory-brand text-charcoal-dark border ${
                      touched.eventTime && errors.eventTime ? "border-red-400 focus:ring-red-400" : "border-ivory-dark focus:ring-gold-brand"
                    } rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:outline-none transition text-charcoal-mid`}
                  />
                </div>
                {touched.eventTime && errors.eventTime && (
                  <p className="text-[9px] font-mono text-red-500 font-bold leading-none mt-1">
                    {errors.eventTime}
                  </p>
                )}
              </div>
            </div>

            {/* Input Extra Live Guests count coordination validation */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-semibold text-charcoal-mid uppercase tracking-widest block font-mono">
                  Confirm Guests Count
                </label>
                {touched.guestCount && errors.guestCount && (
                  <span className="text-[9px] font-mono text-red-500 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    {errors.guestCount}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-charcoal-mid pointer-events-none">
                  <Users className="w-3.5 h-3.5" />
                </span>
                <input
                  type="number"
                  min="20"
                  max="1000"
                  placeholder="100 Guests"
                  value={guestCount}
                  onBlur={() => handleBlur("guestCount")}
                  onChange={(e) => setGuestCount(Math.max(20, parseInt(e.target.value, 10) || 20))}
                  className="w-full bg-ivory-brand text-charcoal-dark border border-ivory-dark rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-gold-brand focus:outline-none transition font-semibold"
                />
              </div>
            </div>

            {/* validation summary warnings */}
            {Object.keys(errors).length > 0 && Object.keys(touched).some(key => touched[key as keyof typeof touched]) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 space-y-1">
                <p className="text-[10px] font-bold text-red-700 uppercase font-mono flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Please resolve the following errors:
                </p>
                <ul className="list-disc list-inside text-[9.5px] text-red-600 font-mono space-y-0.5 ml-1">
                  {Object.entries(errors).map(([field, msg]) => {
                    if (touched[field as keyof typeof touched]) {
                      return <li key={field}>{msg}</li>;
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-2 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-md cursor-pointer ${
                Object.keys(errors).length > 0 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-emerald-brand hover:bg-emerald-mid text-white hover:shadow-emerald-brand/10"
              }`}
            >
              <Send className="w-3.5 h-3.5 text-gold-brand animate-pulse" />
              <span>{isSubmitting ? "Verifying details..." : "Verify & Register Slot"}</span>
            </button>
            
            <p className="text-[9px] text-charcoal-mid text-center font-mono leading-relaxed mt-1">
              Guaranteed pure vegetarian banquet dining. Validated slots hold high availability priority.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
