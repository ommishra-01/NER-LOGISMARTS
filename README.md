# 🚛 NER-LogiSmart: North East Logistics & Accessibility Platform

> **AI-Powered Smart Mountain Logistics, Live Incident Camera & Emergency Bypass System for North East India & Pan-India Corridors**

---

## 📖 English Guide: GitHub Upload & GitHub Pages Deployment

### ❓ What Caused the Issues & How They Were Resolved

1. **Why Did a Blank White Screen Occur?**
   - **Root Cause 1**: Vite's default build asset path was `/` (absolute). When hosted on GitHub Pages (e.g., `https://<username>.github.io/<repo-name>/`), the browser requested `/assets/...` from the root domain instead of the project subfolder. This caused `404 Not Found` for CSS and JavaScript files, rendering a **completely blank white screen**.
   - **Resolution**: Updated `vite.config.ts` to `base: './'` (relative paths). Assets now resolve accurately across GitHub Pages, Vercel, Netlify, or local environments without 404 errors.
   - **Root Cause 2**: Leaflet map remount exception (`Map container is already initialized`).
   - **Resolution**: Added a safeguard in `InteractiveMap.tsx` to clear residual map references before re-mounting, and wrapped the entire React application with an `ErrorBoundary` to gracefully handle unexpected runtime errors.

2. **Why Did Upload Errors Occur on GitHub (the 26 Files Issue)?**
   - When attempting to upload the project folder directly through the GitHub web UI, dragging files often includes the `node_modules` directory, triggering GitHub's **"fewer than 100 files at a time"** limit.
   - Heavy dependencies in `node_modules` must not be uploaded manually. The repository's `.gitignore` file now cleanly excludes `node_modules`, `dist`, and environment caches, leaving a clean, lean set of source files ready for Git.

---

### 🚀 3 Easy Methods to Upload to GitHub

#### ✅ Method 1: 1-Click Export directly from AI Studio (Recommended)
1. In the **top-right corner of AI Studio**, click the **three dots menu (`⋮`)** or the **Settings** icon.
2. Select **"Export to GitHub"** (or **"Push to GitHub"**).
3. Authorize your GitHub account (`ommishrakings`) if prompted.
4. Enter a repository name (such as `ner-logismart`) and click **Confirm / Export**.
5. AI Studio will automatically push the repository directly to your GitHub account.

---

#### ✅ Method 2: Command Line (Git CLI)
If you downloaded the code as a ZIP archive:
1. Extract (unzip) the file on your local machine.
2. Open a Terminal or Command Prompt in that extracted directory.
3. Run the following commands:

```bash
# 1. Initialize local Git repository
git init

# 2. Stage all project files (node_modules is automatically ignored)
git add .

# 3. Create your initial commit
git commit -m "feat: NER-LogiSmart production ready codebase"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub remote repository (create one at github.com/new first)
git remote add origin https://github.com/ommishrakings/ner-logismart.git

# 6. Push to GitHub
git push -u origin main
```
*(Replace `ommishrakings/ner-logismart` with your actual repository URL)*

---

#### ✅ Method 3: GitHub Desktop (Graphical User Interface)
1. Open **GitHub Desktop**.
2. Select `File` ➔ `Add Local Repository` and browse to your project folder.
3. Click the **"Publish repository"** button in the top right.

---

### 🌐 Deploying to GitHub Pages (Live Working Web Link)

An automated deployment pipeline is included in `.github/workflows/deploy.yml`:

1. Push your code to GitHub following any of the methods above.
2. In your GitHub repository, open **Settings** ➔ **Pages** (in the left sidebar).
3. Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.
4. GitHub will trigger the workflow automatically. Within 1–2 minutes, your live website will be accessible at:
   ```
   https://ommishrakings.github.io/ner-logismart/
   ```
5. Because relative asset paths (`base: './'`) and client-side failover logic are configured, the web application will load immediately with **zero white-screen errors**.

---

## 💻 Running Locally

To run the application on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (runs on Port 3000)
npm run dev

# 3. Test production compilation
npm run build
```

Open your browser and navigate to: `http://localhost:3000`

---

## 🌟 Key Application Capabilities

- 🗺️ **Comprehensive North East & Pan-India Routing**: Real-time Leaflet map covering all 8 North Eastern states (Assam, Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Sikkim) plus Pan-India arterial routes from Kolkata, Delhi, Mumbai, Bengaluru, and Patna.
- 🚧 **Dynamic Mountain Bypass Routing**: Automated bypass routing for Sonapur, Paglapahar, and Dzukou hazards with elevation profiles, delay estimates, and road conditions.
- 📸 **Live Incident Camera**: Geolocation snapping, highway tagging, and vision verification for road hazard submissions.
- 🤖 **AI Route Advisor**: Mountain driving advisories, Inner Line Permit (ILP) guidance, fuel stops, and BRO road clearance updates.
- 🌾 **MSME & Agro Mandi Logistics**: Real-time trade pricing and cold-chain freight guidance for regional produce.
- 🛡️ **Zero White-Screen Architecture**: Guarded by a dedicated React `ErrorBoundary` and universal relative asset resolution (`base: './'`).

---

## 📄 License
Apache-2.0
