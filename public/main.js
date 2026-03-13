const translations = {
    en: {
        head: "Fasal Sathi",
        navDash: "Dashboard",
        navMarket: "Market",
        navSchemes: "Schemes",
        langLabel: "Language",
        console: "Farmer's Console",
        locLabel: "Location:",
        weatherHead: "Weather Intelligence",
        profitHead: "Profitability Engine",
        yieldL: "Yield (kg)",
        priceL: "Market Price (₹)",
        costL: "Input Cost (₹)",
        calcBtn: "Analyze Profit",
        aiHead: "Fasal Sathi AI",
        aiWelcome: "Hello, I am Fasal Sathi. How can I help you?",
        aiPlaceholder: "Ask about soil, pests...",
        mandiHead: "Live Mandi Rates",
        liveCond: "Live Conditions",
        agriAdvice: "Smart Agri-Advice",
        soilTemp: "Soil Temp (10cm):",
        sowingSuit: "Sowing Suitability:",
        high: "High",
        fetching: "Fetching..."
    },
    hi: {
        head: "फ़सल साथी",
        navDash: "डैशबोर्ड",
        navMarket: "बाज़ार",
        navSchemes: "योजनाएं",
        langLabel: "भाषा",
        console: "किसान कंसोल",
        locLabel: "स्थान:",
        weatherHead: "मौसम की जानकारी",
        profitHead: "मुनाफ़ा इंजन",
        yieldL: "पैदावार (kg)",
        priceL: "बाज़ार भाव (₹)",
        costL: "लागत (₹)",
        calcBtn: "मुनाफ़ा जांचें",
        aiHead: "फ़सल साथी AI",
        aiWelcome: "नमस्ते, मैं फ़सल साथी हूँ। मैं आपकी क्या मदद कर सकता हूँ?",
        aiPlaceholder: "मिट्टी, कीटों के बारे में पूछें...",
        mandiHead: "मंडी भाव लाइव",
        liveCond: "लाइव स्थिति",
        agriAdvice: "स्मार्ट कृषि सलाह",
        soilTemp: "मिट्टी का तापमान (10cm):",
        sowingSuit: "बुवाई की उपयुक्तता:",
        high: "उच्च",
        fetching: "प्राप्त कर रहा है..."
    },
    pa: {
        head: "ਫਸਲ ਸਾਥੀ",
        navDash: "ਡੈਸ਼ਬੋਰਡ",
        navMarket: "ਬਾਜ਼ਾਰ",
        navSchemes: "ਯੋਜਨਾਵਾਂ",
        langLabel: "ਭਾਸ਼ਾ",
        console: "ਕਿਸਾਨ ਕੰਸੋਲ",
        locLabel: "ਸਥਾਨ:",
        weatherHead: "ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ",
        profitHead: "ਮੁਨਾਫਾ ਇੰਜਣ",
        yieldL: "ਝਾੜ (kg)",
        priceL: "ਬਾਜ਼ਾਰ ਭਾਅ (₹)",
        costL: "ਲਾਗਤ (₹)",
        calcBtn: "ਮੁਨਾਫਾ ਚੈੱਕ ਕਰੋ",
        aiHead: "ਫਸਲ ਸਾਥੀ AI",
        aiWelcome: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਫਸਲ ਸਾਥੀ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
        aiPlaceholder: "ਮਿੱਟੀ, ਕੀੜਿਆਂ ਬਾਰੇ ਪੁੱਛੋ...",
        mandiHead: "ਮੰਡੀ ਭਾਅ ਲਾਈਵ",
        liveCond: "ਲਾਈਵ ਸਥਿਤੀ",
        agriAdvice: "ਸਮਾਰਟ ਖੇਤੀ ਸਲਾਹ",
        soilTemp: "ਮਿੱਟੀ ਦਾ ਤਾਪਮਾਨ (10cm):",
        sowingSuit: "ਬਿਜਾਈ ਦੀ ਅਨੁਕੂਲਤਾ:",
        high: "ਉੱਚਾ",
        fetching: "ਪ੍ਰਾਪਤ ਕਰ ਰਿਹਾ ਹੈ..."
    }
};

const cities = {
    mohali: { lat: 30.7046, lon: 76.7179, district: "Mohali" },
    amritsar: { lat: 31.6340, lon: 74.8723, district: "Amritsar" },
    ludhiana: { lat: 30.9010, lon: 75.8573, district: "Ludhiana" },
    jalandhar: { lat: 31.3260, lon: 75.5762, district: "Jalandhar" },
    bathinda: { lat: 30.2110, lon: 74.9455, district: "Bathinda" },
    ferozepur: { lat: 30.9150, lon: 74.6050, district: "Ferozpur" }, 
    abohar: { lat: 30.1204, lon: 74.1993, district: "Fazilka" }, 
    patiala: { lat: 30.3398, lon: 76.3869, district: "Patiala" },
    sangrur: { lat: 30.2290, lon: 75.8412, district: "Sangrur" },
    nawanshahr: { lat: 31.1256, lon: 76.1208, district: "Nawanshahr" }
};

let currentLat = 30.7046;
let currentLon = 76.7179;
let currentDistrict = "Mohali";
let currentLang = 'en';

async function updateCity(cityKey) {
    const cityData = cities[cityKey];
    currentLat = cityData.lat;
    currentLon = cityData.lon;
    currentDistrict = cityData.district;

    fetchWeather(); 
    fetchMarketRates(); 
}

async function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLang', lang);

    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    const inputs = document.querySelectorAll('[data-placeholder-key]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-placeholder-key');
        if (translations[lang] && translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });

    fetchWeather();
}

function calculateProfit() {
    const btn = document.querySelector('.calc-actions .btn-primary');
    const resultEl = document.getElementById('result');
    const inputs = ['yield', 'price', 'cost'];

    if (btn.classList.contains('clear-mode')) {
        inputs.forEach(id => document.getElementById(id).value = "");
       
        resultEl.innerText = "₹0";
        resultEl.classList.remove('calculated');
     
        btn.innerText = translations[currentLang].calcBtn;
        btn.classList.remove('clear-mode');
        return;
    }

    const yieldVal = parseFloat(document.getElementById('yield').value) || 0;
    const priceVal = parseFloat(document.getElementById('price').value) || 0;
    const costVal = parseFloat(document.getElementById('cost').value) || 0;
    
    const profit = (yieldVal * priceVal) - costVal;
    
    resultEl.innerText = `₹${profit}`;
    resultEl.classList.add('calculated');

    btn.innerText = currentLang === 'pa' ? "ਸਾਫ਼ ਕਰੋ" : (currentLang === 'hi' ? "साफ़ करें" : "Clear");
    btn.classList.add('clear-mode');
}

async function fetchWeather() {
    const weatherDiv = document.getElementById('weather-data');
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${currentLat}&longitude=${currentLon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`);
        if (!response.ok) throw new Error("API Down");
        
        const data = await response.json();
        const temp = data.current.temperature_2m;
        const code = data.current.weather_code;
        
        const t = translations[currentLang];
        let alertMsg = getWeatherDesc(code, currentLang);
        let bgColor = (code >= 51) ? "#d00000" : "#2d6a4f";

        document.getElementById('weather-box').style.background = bgColor;
        
        weatherDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
                <div>
                    <div style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8;">${t.liveCond}</div>
                    <div style="font-size: 3.5rem; font-weight: 800; margin: 10px 0;">${temp}°C</div>
                    <p style="font-size: 1.2rem; font-weight: 600;">${alertMsg}</p>
                    <div style="margin-top: 20px; font-size: 0.9rem; display: flex; gap: 15px;">
                        <span>💧 ${data.current.relative_humidity_2m}%</span>
                        <span>💨 ${data.current.wind_speed_10m} km/h</span>
                    </div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.15); padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2);">
                    <h4 style="margin-bottom: 12px; font-size: 1rem;">${t.agriAdvice}</h4>
                    <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.85rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>${t.soilTemp}</span>
                            <strong>18.2°C</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>${t.sowingSuit}</span>
                            <strong style="color: #95d5b2;">${t.high}</strong>
                        </div>
                        <hr style="opacity: 0.2;">
                        <p style="font-style: italic; opacity: 0.9;">"${getDynamicAdvice(currentLang)}"</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        weatherDiv.innerHTML = "⚠️ Service unavailable.";
    }
}

function getWeatherDesc(code, lang) {
    const desc = {
        en: { 0: "Clear Skies", 51: "Rain Predicted", default: "Stable Conditions" },
        hi: { 0: "साफ आसमान", 51: "बारिश की भविष्यवाणी", default: "स्थिर स्थिति" },
        pa: { 0: "ਸਾਫ਼ ਅਸਮਾਨ", 51: "ਮੀਂਹ ਦੀ ਭਵਿੱਖਬਾਣੀ", default: "ਸਥਿਰ ਹਾਲਾਤ" }
    };
    return (desc[lang][code]) ? desc[lang][code] : desc[lang].default;
}

function getDynamicAdvice(lang) {
    const advice = {
        en: "Clear skies today are perfect for applying fertilizer to your Wheat crop.",
        hi: "साफ आसमान आज आपकी गेहूं की फसल में उर्वरक डालने के लिए उपयुक्त है।",
        pa: "ਸਾਫ਼ ਅਸਮਾਨ ਅੱਜ ਤੁਹਾਡੀ ਕਣਕ ਦੀ ਫ਼ਸਲ ਵਿੱਚ ਖਾਦ ਪਾਉਣ ਲਈ ਸਹੀ ਹੈ।"
    };
    return advice[lang];
}

async function fetchMarketRates() {
    const priceList = document.getElementById('price-list');
    
    // 1. Instant UI: Check for cached data first
    const cacheKey = `mandi_cache_${currentDistrict}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
        // If we have data from earlier today, show it immediately
        renderMandiList(JSON.parse(cachedData));
    } else {
        // Otherwise, show smooth "Skeleton" pulses to indicate loading
        priceList.innerHTML = `
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
        `;
    }

    const API_KEY = '579b464db66ec23bdd000001a2eba761150940544525453d6726f41a';
    const resourceId = '35985678-0d79-46b4-9ed6-6f13308a1d24';
    const url = `https://api.data.gov.in/resource/${resourceId}?api-key=${API_KEY}&format=json&filters[state]=Punjab&filters[district]=${currentDistrict}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const records = data.records;

        if (records && records.length > 0) {
            // 2. Save fresh data to cache
            localStorage.setItem(cacheKey, JSON.stringify(records));
            
            // 3. Update the UI with the freshest records
            renderMandiList(records);
        } else if (!cachedData) {
            priceList.innerHTML = '<li>No data for this district today</li>';
        }
    } catch (e) {
        console.error("Mandi Fetch Error:", e);
        // If network fails but we have cache, the user already sees the old data
        if (!cachedData) {
            priceList.innerHTML = `<li>Error loading live rates. Check connection.</li>`;
        }
    }
}

// Helper function to handle the actual drawing of the list
function renderMandiList(records) {
    const priceList = document.getElementById('price-list');
    priceList.innerHTML = '';

    const uniqueCrops = new Map();
    records.forEach(r => { 
        if (!uniqueCrops.has(r.Commodity)) uniqueCrops.set(r.Commodity, r); 
    });

    uniqueCrops.forEach(record => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="crop-info">
                <span class="crop-name">${record.Commodity}</span>
                <span class="market-name">${record.Market}</span>
            </div>
            <div class="price-info">₹${record.Modal_Price}/q</div>
        `;
        priceList.appendChild(li);
    });
}
async function sendToAI() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();
    const chatDisplay = document.getElementById('ai-chat');
    
    if (!message) return;

    chatDisplay.innerHTML += `<p style="color: var(--primary);"><b>You:</b> ${message}</p>`;
    inputField.value = ""; 

    try {
        const res = await fetch('/api/ai-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: message, 
                lang: currentLang,
                location: currentDistrict, 

            }) 
        });
        
        const data = await res.json();
        chatDisplay.innerHTML += `<p><b>AI:</b> ${data.response}</p>`;
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    } catch (error) {
        chatDisplay.innerHTML += `<p style="color: red;"><b>System:</b> Connection failed. Ensure your server is running.</p>`;
    }
}

window.onload = () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    currentLang = savedLang;
    document.getElementById('lang-select').value = savedLang;
    changeLanguage(savedLang); 

    fetchMarketRates();
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendToAI();
            }
        });
    }
};
