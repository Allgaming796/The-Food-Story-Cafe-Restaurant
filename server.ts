import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // Initialize Gemini if key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API Client initialized successfully.");
  } else {
    console.warn("GEMINI_API_KEY is not defined. AI Assistant features will operate in sandbox/mock reply mode.");
  }

  // API Endpoint: Gemini Chat proxy
  app.post("/api/gemini/generate", async (req, res) => {
    const { messages, userPreferences } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. 'messages' must be an array." });
    }

    const systemInstruction = `You are the AI Chef Curator & Grand Banquet Designer for 'The Food Story' Café, Restaurant & Banquet Hall located in Shahjahanpur, Uttar Pradesh.
Our establishment features:
- "The Grand Memoir" Banquet Hall: Perfect for birthdays, engagements, anniversaries, family get-togethers, and high-teas. Decor packages like 'Royal Gold', 'Pastel Floral', 'Elegant White', and 'Neon Party'. We host up to 300 guests.
- Visual/Sensory Dining: Fusion food presentation, rich Indian legacy, sizzlers, hand-pulled breads, mocktails, continental pastas, signature pizzas, and tandoori sizzle platters.
- Warm, artistic, nostalgic storytellers atmosphere.

Your tone should be hosting, warm, polite, and sensory. Keep answers elegant, concise, and structured with clean markdown. ALWAYS recommend specific items from our Shahjahanpur menu, highlight local ingredients if relevant, help plan their banquet party counts, specify how we can custom-bake cakes or decorate rooms, and suggest custom catering combinations.
If the customer has preferences, they are: ${JSON.stringify(userPreferences || {})}.`;

    try {
      if (ai) {
        // Map custom messages to GoogleGenAI SDK format: { role: 'user' | 'model', parts: [{ text: ... }] }
        const contents = messages.map((m: any) => ({
          role: m.role === "assistant" ? "model" : m.role,
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.8,
          },
        });

        return res.json({ text: response.text });
      } else {
        // Fallback sandboxed response if no internet key is configured
        const latestMessage = messages[messages.length - 1]?.content || "";
        let fallbackText = "Greetings from The Food Story! I am currently running in offline preview mode. Here is a custom chef suggestion based on your query:\n\nFor a truly memorable celebration at the Grand Memoir Banquet Hall, we recommend our **Saffron Royal Gold Theme** decoration and our **Platinum Multi-Course Catering Package** which includes Live Tandoori Counters, Dal-Makhani Butter Handi, and Sizzling Warm Brownies. How else can I assist in bringing your food story to life today?";
        
        if (latestMessage.toLowerCase().includes("paneer") || latestMessage.toLowerCase().includes("veg")) {
          fallbackText = "Our signature **Paneer Butter Masala Handi** paired with fresh wood-fired **Butter Garlic Naan** is the crown jewel of our Shahjahanpur menu! It pairs beautifully with our chilled **Virgin Mint Cucumber Cooler** and freshly styled appetizers. Would you like to add this to your custom event catering plan?";
        } else if (latestMessage.toLowerCase().includes("price") || latestMessage.toLowerCase().includes("cost") || latestMessage.toLowerCase().includes("budget")) {
          fallbackText = "We cater to all celebrations with curated scales! Our standard private packages begin at ₹399/person for high teas and ₹699/person for full plate banquet buffets in **The Grand Memoir Hall**. Tell me the guest size and I will write a customized proposal plan!";
        }

        return res.json({ text: fallbackText });
      }
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      return res.status(500).json({ error: error.message || "Failed to process AI culinary advisory." });
    }
  });

  // API Endpoint: Live Waiting Time dynamic calculator
  app.get("/api/waiting-time", (req, res) => {
    const partySize = parseInt(req.query.partySize as string) || 2;
    
    // Calculate base wait time using the current Indian Standard Time (IST) hour 
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    // Offset for India Time (UTC + 5:30)
    const istNow = new Date(utc + (3600000 * 5.5));
    const currentHour = istNow.getHours();
    const currentDay = istNow.getDay(); // 0 = Sunday, 6 = Saturday

    let baseMinutes = 5;
    let tablesAhead = 0;

    // Define hourly traffic curves
    if (currentHour >= 11 && currentHour < 15) {
      // Lunch Peak hour
      baseMinutes = 18;
      tablesAhead = 2;
    } else if (currentHour >= 15 && currentHour < 19) {
      // Late afternoon idle
      baseMinutes = 5;
      tablesAhead = 0;
    } else if (currentHour >= 19 && currentHour < 22) {
      // Dinner Peak Rush
      baseMinutes = 32;
      tablesAhead = 5;
    } else if (currentHour >= 22 && currentHour < 24) {
      // Late night dining breeze
      baseMinutes = 12;
      tablesAhead = 1;
    } else {
      // Closed or early morning hours (before 11 AM)
      baseMinutes = 0;
      tablesAhead = 0;
    }

    // Weekend multiplier (Friday, Saturday, Sunday increases footfall)
    const isWeekend = currentDay === 0 || currentDay === 5 || currentDay === 6;
    if (isWeekend && baseMinutes > 0) {
      baseMinutes += 8;
      tablesAhead += 2;
    }

    // Party size scaling multiplier
    let groupNotes = "";
    if (partySize >= 9) {
      baseMinutes += 25;
      tablesAhead += 3;
      groupNotes = "Large group dining. Custom table joining required.";
    } else if (partySize >= 5) {
      baseMinutes += 12;
      tablesAhead += 1;
      groupNotes = "Family-sized booths are in popular demand.";
    } else if (partySize >= 3) {
      baseMinutes += 4;
      groupNotes = "Moderate seating requirements.";
    } else {
      groupNotes = "Instant table matches for couples & duos.";
    }

    // Add minute based micro fluctuation to simulate active sensors
    const fluctuation = Math.floor(Math.sin(now.getUTCMinutes() / 3) * 4);
    const finalWaitTime = baseMinutes > 0 ? Math.max(2, baseMinutes + fluctuation) : 0;

    let status: "ready" | "moderate" | "busy" = "ready";
    let message = "Tables are instantly available right now.";

    if (finalWaitTime === 0) {
      status = "ready";
      message = "Restaurant is currently closed. Doors open at 11:00 AM!";
    } else if (finalWaitTime <= 8) {
      status = "ready";
      message = "Vibrant & seating available. Zero walk-in blockages.";
    } else if (finalWaitTime <= 24) {
      status = "moderate";
      message = "Sprightly dinner service. Quick table handovers under way.";
    } else {
      status = "busy";
      message = "Sizzling peak dining rush. Tables are filling up quick!";
    }

    res.json({
      waitTime: finalWaitTime,
      tablesAhead: Math.max(0, tablesAhead),
      status,
      message,
      partySize,
      isWeekend,
      groupNotes,
      lastUpdated: new Date().toISOString()
    });
  });

  // Dynamic route to serve Google Site Verification HTML files from root or dist folders
  app.get("/google*.html", (req, res) => {
    const filename = path.basename(req.path);
    const distFilePath = path.join(process.cwd(), "dist", filename);
    const rootFilePath = path.join(process.cwd(), filename);

    if (fs.existsSync(distFilePath)) {
      return res.sendFile(distFilePath);
    } else if (fs.existsSync(rootFilePath)) {
      return res.sendFile(rootFilePath);
    }
    res.status(404).send("Google site verification file not found in build directory or root.");
  });

  // Serve static assets from public folder in development to ensure images load correctly
  if (process.env.NODE_ENV !== "production") {
    app.use(express.static(path.join(process.cwd(), "public")));
  }

  // Serve static assets or use Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Food Story server successfully operational on http://0.0.0.0:${PORT}`);
  });
}

startServer();
