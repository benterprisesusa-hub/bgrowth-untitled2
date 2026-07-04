import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialize the GoogleGenAI client to avoid crashing on start if the key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ Warning: GEMINI_API_KEY environment variable is not set. BGrowth AI will fall back to local interactive simulation mode.");
      throw new Error("GEMINI_API_KEY is not configured on the server.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3001;

  app.use(express.json());

  // BGrowth Babysitter™ Gemini AI assistant Proxy Endpoint
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Missing prompt parameter" });
      }

      const client = getGeminiClient();
      
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the advanced child-care expert and pedagogical assistant of BGrowth Babysitter™. Give highly professional, safe, empathetic, and actionable answers. Match the user's prompt language (Portuguese, English, Spanish or French) precisely."
        }
      });

      const text = response.text;
      return res.json({ response: text });
    } catch (error: any) {
      console.error("Gemini API error:", error?.message || error);
      return res.status(500).json({ 
        error: "Failed to generate content from Gemini",
        details: error?.message || String(error)
      });
    }
  });

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "BGrowth Club Full-Stack Suite" });
  });

  // Serve Vite application in development or build outputs in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 BGrowth Server running on http://0.0.0.0:${PORT} [NODE_ENV=${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
