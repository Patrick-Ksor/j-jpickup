# J&J Pickup — Website Guide

A clean, fast, SEO-optimized static website for **J&J Pickup**, a junk removal and trash pickup business based in Charlotte, NC.

---

## Folder Structure

```
j&jpickup/
├── index.html          ← Homepage (hero, services, pricing, areas, form, map)
├── services.html       ← Expanded service detail page
├── contact.html        ← Dedicated quote form + sidebar info
├── css/
│   └── styles.css      ← All styles — light/dark mode, responsive
├── js/
│   └── script.js       ← Dark mode, hamburger, form validation, animations
├── images/             ← Add your photos here (see notes below)
└── README.md           ← This file
```

---

## Before You Launch — Checklist

1. **Replace placeholder phone number** `(704) 555-0100` → your real number in:
   - `index.html`, `services.html`, `contact.html` (search `555-0100`)
2. **Replace placeholder email** `info@jjpickup.com` → your real email (same files)
3. **Add hero image** — drop a photo named `hero.jpg` into the `images/` folder.
   - Recommended size: 1920×1080 px, compressed to under 400 KB
   - Good free sources: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
   - Search for: "junk removal truck", "garbage truck", "clean garage"
4. **OpenGraph image** — add `og-image.jpg` to `images/` (1200×630 px). Used when shared on social media.
5. **Update canonical URLs** — replace `https://www.jjpickup.com` with your real domain in all `<head>` sections.
6. **Update Google Maps links** — replace `YOUR_GOOGLE_CID_HERE` with your real Google Business Profile CID (available in your Google Business dashboard).
7. **Replace the JSON-LD `streetAddress`** in `index.html` with your real business address.

---

## Hosting on Netlify (Recommended — Free)

### Option A: Drag & Drop (Fastest — No account setup needed)

1. Go to [netlify.com](https://www.netlify.com) and sign up for a free account.
2. In the Netlify dashboard, scroll down to the **"Want to deploy a new site without connecting to Git?"** section.
3. Drag and drop your entire **`j&jpickup`** project folder into the drop zone.
4. Netlify instantly deploys your site and gives you a URL like `https://amazing-name-123.netlify.app`.
5. To use your own domain name (e.g. `jjpickup.com`), go to **Site Configuration → Domain Management → Add a domain**.

### Option B: Git Deploy (Recommended for ongoing updates)

1. Push your project folder to a GitHub repository.
   ```bash
   git init
   git add .
   git commit -m "Initial J&J Pickup site"
   git remote add origin https://github.com/YOUR_USERNAME/jjpickup.git
   git push -u origin main
   ```
2. In Netlify: **Add new site → Import an existing project → GitHub**.
3. Select your repository. Leave build settings blank (it's a static site — no build command needed).
4. Click **Deploy site**. Every time you push to GitHub, Netlify automatically re-deploys.

---

## Hosting on Vercel (Alternative — Also Free)

### Option A: Vercel CLI

1. Install Node.js from [nodejs.org](https://nodejs.org) if you haven't already.
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Navigate to your project folder and deploy:
   ```bash
   cd "j&jpickup"
   vercel
   ```
4. Follow the prompts. Vercel will give you a live URL immediately.

### Option B: GitHub + Vercel Dashboard

1. Push your project to GitHub (same steps as Netlify Option B above).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **New Project**, and import your repo.
3. Leave all settings as default (Framework Preset: **Other**). Click **Deploy**.
4. Connect your custom domain under **Project Settings → Domains**.

---

## Custom Domain Setup (Both Netlify & Vercel)

1. Purchase a domain from [Namecheap](https://namecheap.com), [Google Domains](https://domains.google), or [GoDaddy](https://godaddy.com).
2. In your hosting dashboard, add your domain (e.g. `jjpickup.com`).
3. The dashboard will show you **nameserver** or **DNS record** values to add at your domain registrar.
4. DNS changes take 10 minutes to 48 hours to propagate.
5. Both Netlify and Vercel provide **free HTTPS/SSL** — it activates automatically.

---

## Creating a Google Business Profile (Appear on Google Maps)

A Google Business Profile is **essential for local SEO** — it's what makes your business appear in the "map pack" results when someone searches "junk removal Charlotte NC".

### Step-by-Step

1. **Go to** [business.google.com](https://business.google.com) and sign in with a Google account.

2. **Click** "Add your business to Google" → enter your business name: **J&J Pickup**.

3. **Select your business category**: Search for and select **"Junk Removal Service"** or **"Garbage Collection Service"**.

4. **Choose your service area**:
   - Select **"I deliver goods and services to my customers"** (you go to them, not the other way around).
   - Add your service cities: Charlotte, Concord, Huntersville, Gastonia, Matthews, and any others.

5. **Add contact details**:
   - Phone number
   - Website URL (your Netlify/Vercel URL or custom domain)

6. **Verify your business**:
   - Google will send a **postcard with a PIN** to your business address (5–14 days).
   - Or you may be offered **phone/email/video verification** (faster).

7. **Complete your profile** — the more complete, the better your ranking:
   - Add business hours
   - Upload photos (truck, team, before/after jobs)
   - Write a business description (use your SEO keywords: "junk removal Charlotte NC", "trash pickup Charlotte")
   - Add all 5 services

8. **Get your Google CID** (for the website footer link):
   - After verification, go to your Business Profile.
   - Click **"Share"** → **"Copy link"**. The URL contains your CID (`?cid=XXXXXXXXXXXX`).
   - Paste that CID into the `YOUR_GOOGLE_CID_HERE` placeholder in all three HTML files.

9. **Request reviews** from your first customers. Even 5–10 genuine five-star reviews dramatically improve your local ranking.

---

## SEO Features Implemented

| Feature                                                                               | Status |
| ------------------------------------------------------------------------------------- | ------ |
| Semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) | ✅     |
| Optimized `<title>` tags (unique per page)                                            | ✅     |
| Meta descriptions (unique per page)                                                   | ✅     |
| Open Graph tags (og:title, og:description, og:image, og:url)                          | ✅     |
| LocalBusiness JSON-LD structured data                                                 | ✅     |
| Canonical URL tags                                                                    | ✅     |
| Target keywords in headings (H1, H2, H3)                                              | ✅     |
| Mobile-first responsive design                                                        | ✅     |
| Fast loading (no JS frameworks, system fonts, deferred scripts)                       | ✅     |
| `alt` text on all images (add when you replace placeholders)                          | ✅     |
| Internal links between all three pages                                                | ✅     |
| Accessible ARIA labels and roles                                                      | ✅     |
| Google Maps embed for local signals                                                   | ✅     |

---

## Testing Your Site

### Lighthouse (Built into Chrome)

1. Open your site in Chrome.
2. Right-click → **Inspect** → **Lighthouse** tab.
3. Run an audit. Target scores:
   - Performance: 90+
   - Accessibility: 100
   - Best Practices: 100
   - SEO: 100

### Google Rich Results Test (Structured Data)

1. Go to [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
2. Paste your site URL and run the test.
3. You should see the **LocalBusiness** entity detected with no errors.

### Mobile Test

1. Open Chrome DevTools → toggle device toolbar (Ctrl+Shift+M).
2. Test at 375px (iPhone), 768px (tablet), 1280px (desktop).

### Dark Mode

1. Click the moon icon in the top-right of the navbar.
2. Refresh the page — your preference should persist (stored in `localStorage`).

---

## Image Naming Convention (SEO)

Use descriptive, keyword-rich file names in the `images/` folder:

| File                                | Purpose                           |
| ----------------------------------- | --------------------------------- |
| `hero.jpg`                          | Hero background image             |
| `junk-removal-charlotte-nc.jpg`     | General junk removal photo        |
| `furniture-removal-charlotte.jpg`   | Furniture removal service         |
| `yard-waste-removal-charlotte.jpg`  | Yard waste service                |
| `construction-debris-charlotte.jpg` | Construction cleanup              |
| `og-image.jpg`                      | Social share thumbnail (1200×630) |

Always add descriptive `alt` attributes when you add `<img>` tags:

```html
<img
  src="images/junk-removal-charlotte-nc.jpg"
  alt="J&J Pickup truck hauling junk removal in Charlotte NC"
  width="800"
  height="533"
  loading="lazy"
/>
```

---

## Questions?

For help with this codebase, refer to the inline comments in each file — every section is labeled.
