import { GoogleGenAI } from "@google/genai";
import { MINUS_RULEBOOK, GENERATE_USER_PROMPT } from "./prompts.js";

export const generateMinusReport = async (userData) => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY not found in environment variables.");
  }

  console.log(`[Gemini] Generating report for user: ${userData.name || 'Anonymous'}`);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Construct the prompt using the user data
  const userPrompt = GENERATE_USER_PROMPT(JSON.stringify(userData, null, 2));

  try {
    // Using 'gemini-3-flash-preview' for robust text tasks as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: userPrompt,
      config: {
        systemInstruction: MINUS_RULEBOOK,
        temperature: 0.1, // Low temperature for consistent, strict adherence to financial rules
        maxOutputTokens: 4000, // Allow enough length for the detailed report
      }
    });

    if (!response.text) {
        throw new Error("Received empty response from Gemini.");
    }

    return response.text;

  } catch (error) {
    console.error("Gemini API Error details:", error);
    throw new Error(`AI Generation Failed: ${error.message}`);
  }
};