import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

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
- "The Grand Memoir" Banquet Hall: Perfect for birthdays, engagements, shadi, anniversaries, and high-teas. Decor packages like 'Royal Gold', 'Pastel Floral', 'Elegant White', and 'Neon Party'. We host up to 300 guests.
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
