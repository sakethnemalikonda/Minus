import OpenAI from "openai";
import { MINUS_RULEBOOK, GENERATE_USER_PROMPT } from "./prompts.js";

export const generateMinusReport = async (userData) => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY not found in environment variables.");
  }

  console.log(`[OpenAI] Generating report for user: ${userData.name || 'Anonymous'}`);

  const openai = new OpenAI({ apiKey: process.env.API_KEY });
  
  // Construct the prompt using the user data
  const userPrompt = GENERATE_USER_PROMPT(JSON.stringify(userData, null, 2));

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: MINUS_RULEBOOK },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.1, // Low temperature for consistent, strict adherence to financial rules
      max_tokens: 4000,
    });

    const reportText = response.choices[0]?.message?.content;

    if (!reportText) {
        throw new Error("Received empty response from OpenAI.");
    }

    return reportText;

  } catch (error) {
    console.error("OpenAI API Error details:", error);
    throw new Error(`AI Generation Failed: ${error.message}`);
  }
};