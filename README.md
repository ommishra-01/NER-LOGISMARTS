# 🚛 NER-LogiSmart: North East Logistics & Accessibility Platform

> **AI-Powered Smart Mountain Logistics, Live Incident Camera & Emergency Bypass System for North East India & Pan-India Corridors**

---

## 🇮🇳 हिंदी में निर्देश: GitHub पर अपलोड करने और "White Screen" ठीक करने की पूरी जानकारी

### ❓ आपकी समस्याएँ क्या थीं और उन्हें कैसे ठीक किया गया?

1. **White Screen (सफेद स्क्रीन) क्यों आ रही थी?**
   - **कारण 1**: Vite का डिफ़ॉल्ट एसेट पाथ `base: '/'` था। जब आप GitHub Pages या किसी सब-फ़ोल्डर पर होस्ट करते हैं, तो ब्राउज़र `/assets/...` ढूँढता है जो 404 Not Found देता है। इससे स्क्रीन एकदम **खाली सफेद (White Screen)** हो जाती थी।
   - **समाधान**: हमने `vite.config.ts` में `base: './'` (रिलेटिव पाथ) सेट कर दिया है। अब यह हर जगह (GitHub Pages, Vercel, Localhost) बिना किसी 404 एरर के लोड होगा।
   - **कारण 2**: Leaflet Map का री-माउंट एरर (`Map container is already initialized`).
   - **समाधान**: हमने `InteractiveMap.tsx` में सेफ-गार्ड कोड जोड़ दिया है और पूरे ऐप को `ErrorBoundary` से सुरक्षित कर दिया है ताकि कभी भी ऐप क्रैश न हो।

2. **GitHub पर अपलोड करते समय 26 फाइलों और एरर का कारण:**
   - जब आप GitHub की वेबसाइट पर जाकर डायरेक्ट फ़ोल्डर ड्रैग & ड्रॉप करते हैं, तो अगर उसमें `node_modules` शामिल हो जाता है, तो GitHub **"fewer than 100 files at a time"** एरर देता है।
   - `node_modules` फ़ोल्डर को कभी भी GitHub पर अपलोड **नहीं** करना होता है (यह `.gitignore` में पहले से शामिल है)।
   - आपको केवल सोर्स कोड (Source Code) पुश करना होता है।

---

### 🚀 GitHub पर अपलोड करने के 3 आसान तरीके (Three Simple Methods)

#### ✅ तरीका 1: Google AI Studio से सीधे 1-क्लिक एक्सपोर्ट (सबसे आसान)
1. स्क्रीन के ऊपर दायें कोने (Top-Right Corner) में **तीन बिंदु (`⋮`)** या **Settings** पर क्लिक करें।
2. **"Export to GitHub"** (या **"Push to GitHub"**) चुनें।
3. अपने GitHub अकाउंट (`ommishrakings`) को अनुमति (Authorize) दें।
4. नया रिपॉजिटरी नाम डालें (जैसे `ner-logismart`) और **Confirm** दबाएं।
5. आपका पूरा कोड अपने आप साफ़-सुथरे तरीके से GitHub पर चला जाएगा!

---

#### ✅ तरीका 2: Git कमांड्स द्वारा (Terminal / Command Prompt से)

यदि आपने कोड ZIP के रूप में डाउनलोड किया है:
1. ZIP फ़ाइल को अपने कंप्यूटर पर एक्सट्रेक्ट (Unzip) करें।
2. उस फ़ोल्डर में जाकर Terminal या CMD खोलें और ये 5 कमांड्स चलाएँ:

```bash
# 1. गिट इनिशियलाइज़ करें
git init

# 2. सभी फाइलों को स्टेज करें (node_modules अपने आप इग्नोर हो जाएगा)
git add .

# 3. कमिट करें
git commit -m "feat: NER-LogiSmart production ready codebase"

# 4. मेन ब्रांच सेट करें
git branch -M main

# 5. अपने गिटहब रिपॉजिटरी का लिंक जोड़ें (GitHub पर नया repo बनाकर URL यहाँ डालें)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. गिटहब पर पुश करें
git push -u origin main
```

---

#### ✅ तरीका 3: GitHub Desktop ऐप से (No Terminal Required)
1. **GitHub Desktop** सॉफ्टवेयर खोलें।
2. `File` > `Add Local Repository` पर क्लिक करें।
3. एक्सट्रेक्ट किए गए फ़ोल्डर को चुनें।
4. `Publish repository` बटन दबाएं।

---

### 🌐 GitHub Pages पर लाइव कैसे चलाएं (Free Hosting)?

हमने इस प्रोजेक्ट में `.github/workflows/deploy.yml` जोड़ दिया है:
1. कोड GitHub पर पुश करने के बाद, अपने GitHub Repo में जाएं।
2. **Settings** > **Pages** पर क्लिक करें।
3. **Build and deployment** > **Source** में **GitHub Actions** चुनें।
4. 1-2 मिनट में आपकी वेबसाइट लाइव हो जाएगी और कोई भी White Screen नहीं आएगी!

---

## 💻 अपने कंप्यूटर (Localhost) पर कैसे चलाएं?

```bash
# 1. सभी डिपेंडेंसी इंस्टॉल करें
npm install

# 2. डेवलपमेंट सर्वर शुरू करें (Port 3000)
npm run dev

# 3. प्रोडक्शन बिल्ड चेक करने के लिए
npm run build
```

ब्राउज़र में खोलें: `http://localhost:3000`

---

## ✨ Features Included

- 🗺️ **Full Interactive North East & Pan-India Routing Map**: Real-time Leaflet map covering all 8 North East states (Assam, Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Sikkim) plus Pan-India corridors from Kolkata, Delhi, Mumbai, Bengaluru, and Patna.
- 🚧 **Dynamic Mountain Bypass Routing**: Automated recalculation around Sonapur, Paglapahar, and Dzukou landslides with elevation, time delay, and slope risk ratings.
- 📸 **Live Incident Camera & Vision AI**: Take photos of road blockages with automatic GPS geolocation and AI validation.
- 🤖 **AI Route Advisor**: Terrain risk analysis, Inner Line Permit (ILP) checks, fuel stops, and BRO road clearance updates.
- 🌾 **MSME & Agro-Logistics Hubs**: Mandi pricing and cold-chain freight economics for Lakadong Turmeric, Naga King Chilli, Queen Pineapple, etc.
- 🛡️ **Zero White-Screen Architecture**: Protected by React ErrorBoundary and universal relative asset resolution (`base: './'`).

---

## 📄 License
Apache-2.0
