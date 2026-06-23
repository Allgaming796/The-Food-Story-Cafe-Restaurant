import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, Bot, User, RefreshCw, AlertCircle } from "lucide-react";

interface AIAssistantProps {
  initialPrompt?: string | null;
  onClearPrompt?: () => void;
}

const CHIPS = [
  "Plan a Roka event itinerary with Royal Gold decor theme",
  "Secret behind the 18-hour cooked Dal Makhani Handi",
  "Suggest mild cottage-cheese starters and mocktail pairings",
  "Catering plan for 80 guests with a continental fusion focus"
];

export function AIAssistant({ initialPrompt, onClearPrompt }: AIAssistantProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: `Namaste 🙏 I am your **AI Food Planner & Event Assistant** for The Food Story. 
      
Whether you want delicious food recommendations from our Shahjahanpur menu, wish to plan a food timetable for **Ivory Banquet Hall**, or want to know about our traditional cooking processes — I am here to help you.
      
Try selecting one of the custom helper questions below, or tell me about your party or craving!`,
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Hook into incoming prompts from the Menu or Banquet planner clicks
  useEffect(() => {
    if (initialPrompt) {
      submitMessage(initialPrompt);
      if (onClearPrompt) onClearPrompt();
    }
  }, [initialPrompt]);

  const submitMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    setErrorText(null);
    const userMsg = { role: "user" as const, content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      });

      if (!response.ok) {
        throw new Error("Advisory channel is currently congested. Please retry in a moment.");
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (err: any) {
      console.error(err);
      const isNetworkError = err.message?.toLowerCase().includes("fetch") || err.message?.toLowerCase().includes("network") || err.name === "TypeError";
      setErrorText(isNetworkError 
        ? "The virtual helper is momentarily connecting or undergoing standard updates. Please try again in a few seconds!" 
        : (err.message || "Something went wrong. Let me reset."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendForm = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(inputVal);
  };

  // Safe inline markdown renderer for rich bold elements and bullet dots
  const renderMessageContent = (text: string) => {
    if (typeof text !== "string") {
      return null;
    }
    const lines = text.split("\n");
    let inList = false;
    const elements: React.ReactNode[] = [];

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      const isBullet = trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ");
      
      let cleanContent = trimmed;
      if (isBullet) {
        cleanContent = trimmed.substring(2);
      }

      // Process **bold text**
      const parts = cleanContent.split("**");
      const parsedPart = parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <strong key={index} className="font-bold text-emerald-brand">
              {part}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        if (!inList) {
          inList = true;
        }
        elements.push(
          <li key={`li-${i}`} className="ml-5 list-disc text-xs sm:text-sm text-charcoal-dark leading-relaxed font-sans my-1 text-left">
            {parsedPart}
          </li>
        );
      } else {
        if (inList) {
          inList = false;
        }
        if (trimmed === "") {
          elements.push(<div key={`space-${i}`} className="h-2.5" />);
        } else {
          elements.push(
            <p key={`p-${i}`} className="text-xs sm:text-sm text-charcoal-dark leading-relaxed font-sans my-1 text-left font-light">
              {parsedPart}
            </p>
          );
        }
      }
    });

    return <div className="space-y-1">{elements}</div>;
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Reset complete! Tell me about another celebration date, food pairing preference, or regional appetite, and I will write a customized guide.",
      },
    ]);
    setErrorText(null);
  };

  return (
    <section className="py-16 bg-ivory-brand text-charcoal-dark border-t border-ivory-dark px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center items-center gap-1.5 text-gold-brand text-xs sm:text-sm font-semibold tracking-widest uppercase font-mono">
            <Sparkles className="w-4 h-4 animate-pulse text-gold-brand shrink-0" />
            <span>AI Food Planner & Event Assistant</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-emerald-brand font-bold">
            Ask the AI Assistant
          </h2>
          <p className="text-charcoal-mid text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
            Powered by Gemini, our customized helper plans party food menus, schedules event steps, and explains our simple cooking methods.
          </p>
        </div>

        {/* Chat Console Structure */}
        <div className="bg-white rounded-2xl border border-ivory-dark shadow-xl flex flex-col h-[520px] overflow-hidden">
          
          {/* Top Panel Bar */}
          <div className="bg-emerald-brand border-b border-emerald-mid px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bot className="w-5 h-5 text-gold-brand shrink-0" />
              <div className="text-left">
                <p className="text-sm font-bold text-white leading-none font-sans">AI Food & Event Assistant</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-gray-200 font-mono leading-none">Catering & Event Planning Support</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleResetChat}
              className="text-gray-200 hover:text-white transition flex items-center gap-1 text-[10px] cursor-pointer font-mono"
            >
              <RefreshCw className="w-3.5 h-3.5 text-gold-brand shrink-0" />
              <span>Reset Discussion</span>
            </button>
          </div>

          {/* Messages Scrolling Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-ivory-brand/30">
            <AnimatePresence initial={false}>
              {messages.map((m, idx) => {
                const isAI = m.role === "assistant";
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-3 ${isAI ? "" : "flex-row-reverse"}`}
                  >
                    {/* Avatar Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 select-none ${
                        isAI ? "bg-gradient-to-br from-gold-brand to-gold-light text-emerald-brand font-bold" : "bg-emerald-brand text-gold-brand border border-emerald-mid font-semibold"
                      }`}
                    >
                      {isAI ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                    </div>

                    {/* Text Balloon */}
                    <div
                      className={`rounded-2xl px-4 py-3.5 max-w-[85%] text-left space-y-1.5 shadow-sm ${
                        isAI
                          ? "bg-white border border-ivory-dark text-charcoal-dark"
                          : "bg-emerald-brand border border-emerald-mid text-white"
                      }`}
                    >
                      {renderMessageContent(m.content)}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Loading Indicator Bubble */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-brand/10 flex items-center justify-center text-emerald-brand shrink-0 animate-pulse border border-emerald-mid">
                  <Bot className="w-4.5 h-4.5 text-emerald-brand" />
                </div>
                <div className="bg-white border border-ivory-dark rounded-2xl px-4 py-3 text-xs text-charcoal-dark flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-brand animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-brand animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-brand animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="font-mono text-[11px] text-charcoal-mid">Curating menu guidelines & timeline...</span>
                </div>
              </div>
            )}

            {/* Error notifications */}
            {errorText && (
              <div className="bg-red-50 border border-red-200 text-[#C85C3A] text-xs p-3.5 rounded-xl flex items-center gap-2 max-w-md mx-auto">
                <AlertCircle className="w-4 h-4 text-[#C85C3A] shrink-0" />
                <p>{errorText}</p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick Trigger Chip selections */}
          <div className="bg-white px-4 py-3.5 border-t border-ivory-dark flex items-center gap-2 overflow-x-auto select-none">
            <span className="text-[10px] uppercase font-semibold tracking-wider font-mono text-emerald-brand whitespace-nowrap shrink-0">
              Suggestions:
            </span>
            <div className="flex items-center gap-2.5 pr-2">
              {CHIPS.map((chip, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => submitMessage(chip)}
                  className="bg-ivory-brand hover:bg-white text-emerald-brand hover:text-emerald-mid border border-ivory-dark rounded-full px-3 py-1.5 text-xs whitespace-nowrap transition cursor-pointer select-none active:scale-95 disabled:opacity-50 font-sans font-bold"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* User Text Form */}
          <form
            onSubmit={handleSendForm}
            className="bg-white px-4 py-3.5 border-t border-ivory-dark flex items-center gap-3"
          >
            <input
              type="text"
              required
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask for custom plating, event schedules, allergy advice..."
              disabled={isLoading}
              className="flex-1 bg-ivory-brand border border-ivory-dark focus:outline-none focus:ring-1 focus:ring-gold-brand rounded-xl px-4 py-2.5 text-xs text-charcoal-dark placeholder-charcoal-mid"
            />
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="bg-emerald-brand hover:bg-emerald-mid text-gold-brand p-2.5 rounded-xl transition cursor-pointer disabled:opacity-40 shrink-0 shadow-md"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
