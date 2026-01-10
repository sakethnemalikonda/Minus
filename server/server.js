import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseTypeformResponse } from './utils.js';
import { generateMinusReport } from './gemini.js';

// --- CONFIGURATION ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');

// Load .env file
const dotenvResult = dotenv.config({ path: envPath });

// Read API Key
let apiKey = process.env.API_KEY;

if (apiKey) {
    // Sanitize (remove quotes/spaces if they exist)
    apiKey = apiKey.replace(/["';\s]/g, '').trim();
    process.env.API_KEY = apiKey; 
    console.log(`[DEBUG] API Key loaded successfully.`);
} else {
    console.warn(`[WARNING] API_KEY is missing in .env. Requests will fail unless mocked.`);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

// Debug middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// --- ROUTES ---

// 1. Health Check
app.get('/', (req, res) => {
  res.send(`Minus Protocol Backend. System Status: Online | API: ${apiKey ? 'Active' : 'Missing'}`);
});

// 2. Analysis Endpoint
app.post('/api/analyze', async (req, res) => {
  console.log('>> Processing Analysis Request...');
  
  if (!process.env.API_KEY) {
      console.error("FATAL: API_KEY is missing in process.env");
      return res.status(500).json({ 
          error: "Server Configuration Error", 
          details: "API Key is missing. Please configure the server." 
      });
  }

  try {
    const userData = req.body;
    if (!userData) {
      return res.status(400).json({ error: 'No data provided in body' });
    }

    // Call the function from gemini.js
    const optimizationReport = await generateMinusReport(userData);

    res.status(200).json({ 
      status: 'success', 
      report: optimizationReport 
    });

  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({ 
        error: 'Analysis Failed', 
        details: error.message || "Unknown error during processing." 
    });
  }
});

// 3. Webhook Endpoint
app.post('/webhook/typeform', async (req, res) => {
  try {
    if (req.body.event_type === 'ping') return res.status(200).send('Pong!');
    
    const userData = parseTypeformResponse(req.body);
    // Note: Webhooks might need a way to send the report back to the user (e.g. email)
    // For now, we just log/generate it.
    await generateMinusReport(userData);
    
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).send('Error');
  }
});

// --- STARTUP ---
app.listen(PORT, () => {
  console.log(`
  ==========================================
  MINUS BACKEND STARTED
  ------------------------------------------
  URL: http://localhost:${PORT}
  API KEY: ${apiKey ? '✅ LOADED' : '❌ MISSING'}
  ==========================================
  `);
});