const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));


const schemeSchema = new mongoose.Schema({
    name: String,
    description: String,
    lang: String
});
const Scheme = mongoose.model('Scheme', schemeSchema);


app.get('/api/schemes/:lang', async (req, res) => {
    const schemes = await Scheme.find({ lang: req.params.lang });
    res.json(schemes);
});

const schemes = [
    { name: "CM Punjab Farmer Welfare 2026", desc: "Monthly financial aid & subsidies on seeds.", lang: "en" },
    { name: "Green Tractor Scheme Phase-III", desc: "₹5 lakh subsidy on 50-65 HP tractors.", lang: "en" },
    { name: "ਸੀਐਮ ਪੰਜਾਬ ਕਿਸਾਨ ਪੈਕੇਜ", desc: "ਬੀਜਾਂ ਅਤੇ ਖਾਦਾਂ 'ਤੇ ਸਬਸਿਡੀ।", lang: "pa" }
];

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

app.post('/api/ai-chat', async (req, res) => {
    const { message, lang } = req.body;
    
    if (!process.env.GEMINI_KEY) {
        return res.status(500).json({ response: "Error: GEMINI_KEY is missing in .env" });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `You are Fasal Sathi, an expert in Indian agriculture. Only answer requests related to agriculture and derivatives. Do not indulge in personal talks if user prompts. If user asks about the website, tell them its related to agriculture and helping farmers according to your own words. Do not use any text styles. Answer in plain text with proper spacing. Answer the following question briefly in ${lang}: ${message}`;
        
        const result = await model.generateContent(prompt);
        const responseText = result.response.text(); 
        
        res.json({ response: responseText });
    } catch (err) {
        console.error("Gemini Error:", err);
        res.status(500).json({ response: "I'm having trouble connecting. Try again!" });
    }
});

app.get('/api/schemes/:lang', (req, res) => {
    const filtered = schemes.filter(s => s.lang === req.params.lang);
    res.json(filtered);
});

app.get('/api/mandi', async (req, res) => {
    const { district } = req.query;
    const API_KEY = process.env.DATA_GOV_API_KEY;
    const resourceId = '35985678-0d79-46b4-9ed6-6f13308a1d24';
    const url = `https://api.data.gov.in/resource/${resourceId}?api-key=${API_KEY}&format=json&filters[state]=Punjab&filters[district]=${district}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch mandi rates' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server at http://localhost:${PORT}`));
