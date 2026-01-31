require('dotenv').config();
const express = require('express');
const i18n = require('i18n');
const path = require('path');

const authRoutes = require('./routes/auth'); 

const app = express();


i18n.configure({
  locales: ['en', 'hi', 'pa'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  queryParameter: 'lang',
  cookie: 'lang'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(i18n.init);






app.use('/auth', authRoutes);   


app.get('/login', (req, res) => {
  res.render('login', { error: null, success: null });
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});


app.get('/', (req, res) => {
  res.render('index', { result: null, error: null });
});


app.post('/recommend', (req, res) => {
  try {
    let { n, p, k, ph, landArea } = req.body;

    if (!n || !p || !k || !ph || !landArea) {
      return res.render('index', { 
        result: null, 
        error: "All fields are required" 
      });
    }

    n = Number(n);
    p = Number(p);
    k = Number(k);
    ph = Number(ph);
    landArea = Number(landArea);

    let cropData;

    if (ph > 7.5) {
      cropData = {
        crop: "Mustard (Sarson)",
        yield: 12 * landArea,
        price: 5450,
        risk: "Medium",
        riskPercent: 55,
        cost: 4500 * landArea
      };
    } 
    else if (ph < 6.5) {
      cropData = {
        crop: "Rice (Paddy)",
        yield: 38 * landArea,
        price: 2200,
        risk: "Medium",
        riskPercent: 50,
        cost: 6000 * landArea
      };
    } 
    else {
      cropData = {
        crop: "Wheat (Kanak)",
        yield: 45 * landArea,
        price: 2275,
        risk: "Low",
        riskPercent: 20,
        cost: 5000 * landArea
      };
    }

    const revenue = cropData.yield * cropData.price;
    const profit = revenue - cropData.cost;

    res.render('index', {
      error: null,
      result: {
        crop: cropData.crop,
        yield: cropData.yield,
        price: cropData.price,
        risk: cropData.risk,
        riskPercent: cropData.riskPercent,
        profit: profit.toLocaleString('en-IN')
      }
    });

  } catch (err) {
    console.error(err);
    res.render('index', { 
      result: null, 
      error: "Internal server error" 
    });
  }
});

app.listen(3000, () => {
  console.log("🌾 Fasal Sathi running at http://localhost:3000")
});
