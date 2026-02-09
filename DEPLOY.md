# Deploying aria-web

Your app is a Vite + React SPA. Build output goes to `dist/`.

---

## Deploy with Vercel (easiest)

1. **Push your code to GitHub** (if you haven’t already).
   - If **github.com/ariacnx/aria-web** shows 404, the repo doesn’t exist yet. Create it:
     - Go to [github.com/new](https://github.com/new).
     - Repository name: **aria-web** (or any name you like).
     - Leave it empty (no README, no .gitignore); your local repo already has everything.
     - Create repository, then run locally: `git remote set-url origin https://github.com/YOUR_USERNAME/aria-web.git` (replace YOUR_USERNAME), then `git push -u origin main`.
2. Go to **[vercel.com](https://vercel.com)** and sign in with **GitHub**.
3. Click **“Add New…” → “Project”**.
4. **Import** your `aria-web` repo (or the repo that contains this project).
5. Vercel will detect the build settings from `vercel.json`. You should see:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** leave blank (or `.`)
6. Click **“Deploy”**. Wait 1–2 minutes.
7. Your site is live at **`https://aria-web-xxxx.vercel.app`** (or a similar URL).
8. **(Optional)** Add a custom domain: **Project → Settings → Domains** → add your domain and follow the DNS instructions.

**SPA routing:** The repo includes `vercel.json` with rewrites so routes like `/omnihealth`, `/contact`, `/eat-recipe-app` work when someone opens them directly or refreshes.

---

## 1. Build locally

```bash
npm run build
```

Static files are in `dist/`. You can preview with:

```bash
npm run preview
```

---

## 2. Deploy globally (free, easy)

Connect your GitHub repo to one of these — they auto-build on push.

| Platform | Steps | Free tier |
|----------|--------|-----------|
| **Vercel** | [vercel.com](https://vercel.com) → Import Git repo → Build: `npm run build`, Output: `dist` | Yes |
| **Netlify** | [netlify.com](https://netlify.com) → Add site from Git → Build: `npm run build`, Publish: `dist` | Yes |
| **Cloudflare Pages** | [pages.cloudflare.com](https://pages.cloudflare.com) → Connect Git → Build: `npm run build`, Output: `dist` | Yes |

- **Root (/)**: In project settings, set **Root directory** to the repo root. Build command: `npm run build`. Publish directory: `dist`.
- **SPA routing**: Add a redirect so all routes serve `index.html` (Vercel/Netlify/Cloudflare all support this; often auto-detected for `dist`).

You’ll get a URL like `your-project.vercel.app` or `your-project.pages.dev`. Use a **custom domain** in the dashboard if you have one.

---

## 3. Making the site reachable from China

Many Western hosts (e.g. `*.vercel.app`, `*.netlify.app`, `github.io`) can be slow or blocked in mainland China. To improve access from China:

### Option A: Custom domain + global CDN (simplest to try)

1. Deploy to Vercel/Netlify/Cloudflare as above.
2. Add your own domain (e.g. `yourportfolio.com`) in the host’s dashboard.
3. Some users in China can reach custom domains better than default `*.vercel.app`-style URLs. Results vary and are not guaranteed.

### Option B: China hosting (best reliability in China)

To serve reliably from mainland China you typically need:

1. **Host in China**  
   Use a Chinese provider, e.g.:
   - **Alibaba Cloud** (aliyun.com) – OSS static site + CDN  
   - **Tencent Cloud** (cloud.tencent.com)  
   - **Vercel** has a [China network option](https://vercel.com/docs/edge-network/regions#china) (paid).

2. **ICP filing (ICP 备案)**  
   If your server/CDN is in mainland China, the Chinese government requires an ICP filing for the domain. This takes time and needs a Chinese entity (company or individual with Chinese ID). Without it, providers often won’t allow public hosting in China.

3. **Dual setup**  
   - Global users: keep using Vercel/Netlify/Cloudflare.  
   - China users: use a China domain (e.g. `cn.yourportfolio.com`) that points to China OSS + CDN (after ICP), or use a China-capable CDN/edge.

### Option C: No China hosting

If you don’t do China hosting or ICP:

- The same global URL (e.g. custom domain on Vercel) may work for some users in China (e.g. with VPN or in less restricted networks).
- You can put a short note on the site: “If you’re in mainland China and the site doesn’t load, try a VPN or check back later.”

---

## Quick start (global only)

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. **Import** your `aria-web` repo.
4. Leave build as `npm run build`, output as `dist`.
5. Deploy. Your site will be live at `aria-web-xxx.vercel.app`.
6. (Optional) Add a custom domain in Vercel → Project → Settings → Domains.

For China-specific access, use Option B (China host + ICP) or Option C (rely on global URL and optional note).
