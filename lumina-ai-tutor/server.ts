import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization of GoogleGenAI
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoints
app.post("/api/tutor/chat", async (req, res) => {
  try {
    const ai = getGenAI();
    const { prompt, subject, difficulty, focusArea, history } = req.body;

    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }],
    }));

    const systemInstruction = `You are Lumina, an encouraging, highly knowledgeable educational AI tutor specializing in ${subject || "General Studies"}.
Current student difficulty level: ${difficulty || "Intermediate"}.
Current learning focus area: ${focusArea || "Deep Dive"}.

Core Directives:
- Explain concepts clearly with structured Markdown, bold key terms, numbered steps, and helpful real-world analogies.
- Maintain an encouraging, empathetic, academically rigorous tone.
- If the student asks for math or coding, provide clear formatting (code blocks or mathematical notations).
- Keep responses engaging, concise when appropriate, and structured.
- End longer explanations with a quick checking question or suggestion to try a practice exercise.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: prompt }] },
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/tutor/chat:", error);
    res.status(500).json({ error: error?.message || "Failed to generate response" });
  }
});

app.post("/api/tutor/visual-aid", async (req, res) => {
  try {
    const ai = getGenAI();
    const { concept, subject } = req.body;

    const promptText = `An educational, highly clear vector diagram/infographic illustrating "${concept}" in the context of ${subject || "Science"}. Modern clean aesthetic, soft rounded shapes, clear labels, balanced contrast, white or subtle light background, professional academic style.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-image",
      contents: {
        parts: [{ text: promptText }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    let imageUrl = null;
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      return res.status(400).json({ error: "Could not generate visual aid image" });
    }

    res.json({ imageUrl });
  } catch (error: any) {
    console.error("Error in /api/tutor/visual-aid:", error);
    res.status(500).json({ error: error?.message || "Failed to generate visual aid" });
  }
});

app.post("/api/tutor/speak", async (req, res) => {
  try {
    const ai = getGenAI();
    const { text, voice } = req.body;
    const cleanText = (text || "").replace(/[#*`_]/g, "").substring(0, 500);

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Explain clearly: ${cleanText}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice || "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(400).json({ error: "No audio generated" });
    }

    res.json({ audio: base64Audio });
  } catch (error: any) {
    console.error("Error in /api/tutor/speak:", error);
    res.status(500).json({ error: error?.message || "Failed to generate speech" });
  }
});

app.post("/api/tutor/quiz", async (req, res) => {
  try {
    const ai = getGenAI();
    const { subject, difficulty, topic } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Generate an interactive multiple choice practice question on the topic "${topic || subject}" suitable for a ${difficulty || "Intermediate"} student. Return a single JSON object.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "The quiz question" },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of 4 options",
            },
            correctIndex: { type: Type.INTEGER, description: "0-based index of the correct answer" },
            explanation: { type: Type.STRING, description: "Explanatory solution text" },
          },
          required: ["question", "options", "correctIndex", "explanation"],
        },
      },
    });

    const quizData = JSON.parse(response.text || "{}");
    res.json(quizData);
  } catch (error: any) {
    console.error("Error in /api/tutor/quiz:", error);
    res.status(500).json({ error: error?.message || "Failed to generate quiz" });
  }
});

// Vite server setup
async function startServer() {
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
    console.log(`Lumina AI Tutor running on http://localhost:${PORT}`);
  });
}

startServer();
