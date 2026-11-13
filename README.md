# Vikas Singh — Developer Portfolio & CMS
### Designed for B.Tech Computer Science & Engineering (2026 Batch)

> **🚀 Live Website:** [https://portfolio-git-main-vikas-singhs-projects-b53a535f.vercel.app](https://portfolio-git-main-vikas-singhs-projects-b53a535f.vercel.app)
> 
> [![Live Demo](https://img.shields.io/badge/Live_Portfolio-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-git-main-vikas-singhs-projects-b53a535f.vercel.app)
> [![GitHub](https://img.shields.io/badge/GitHub-VikasSingh2011-181717?style=for-the-badge&logo=github)](https://github.com/VikasSingh2011/Portfolio)
> [![LinkedIn](https://img.shields.io/badge/LinkedIn-Vikas_Singh-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/vikas-singh-b52068265/)

A modern, production-grade, responsive developer portfolio with an integrated **Admin Content Management Studio (CMS)**. Built with React.js, Tailwind CSS, Lucide Icons, and Vite.

---

## 🌟 Highlights & Features

### 1. Personal Branding & Hero
- **Recruiter-focused Hero**: Name, professional title, location with map pin, profile avatar, 2026 Batch badge.
- **Action Buttons**: 
  - **Download / View Resume** (opens formatted printable resume modal with direct PDF download)
  - **View Projects** (smooth scroll to showcase)
  - **Contact Me** (smooth scroll to inquiry form)
- **Professional Profiles**: GitHub, LinkedIn, LeetCode, GeeksforGeeks, HackerRank, Twitter/X, and Email.
- **Metric Cards**: Years of coding experience, projects built, and DSA problems solved.

### 2. Comprehensive Portfolio Sections
- **About Me**: Academic journey (B.Tech CSE 2026), CGPA, career goals, technical interests, and engineering mindset.
- **Experience & Internships**: Timeline cards with roles, companies, dates, locations, technologies, and quantified achievements.
- **Projects Showcase**: Interactive cards with category filtering (*All, Full-Stack, AI / ML, Featured*), live demo and GitHub buttons, plus an **Architecture Modal** for deep technical breakdowns:
  1. **MERN Bookstore**: Full-stack e-commerce catalog with JWT auth, Stripe checkout, and admin inventory.
  2. **Brain Tumor Detection (AI/ML)**: Medical MRI deep learning classifier (ResNet50 / VGG16) with 96.4% test accuracy.
  3. **AI Chatbot**: Intelligent assistant with streaming responses and markdown code formatting.
  4. **MERN TODO App (Workflow Board)**: Real-time collaborative task manager with status kanban columns.
- **Categorized Technical Skills**: Frontend, Backend & APIs, Databases & Cloud, AI/ML & Data Science, Core CS, and Developer Tools with interactive proficiency bars (0–100%) and search filter.
- **Competitive Coding Profiles**: Highlighting LeetCode (350+ solved), GitHub (contributions & repos), GeeksforGeeks, HackerRank (5-Star), and LinkedIn.
- **Freelance Services**: Full-Stack Web Dev, React SPAs, Landing Pages, Bug Fixing & Optimization with turnaround times and direct inquiry modal.
- **Creative Studio (Conditional)**: Video editing, Reels, thumbnails. (Safely hidden by default until enabled or projects added via CMS).
- **Resume & Certifications**: Education timeline and verified credentials (Meta, DeepLearning.AI, Udemy, Postman).
- **Contact Form**: Validated submission with instant celebratory confetti and messages stored locally in the Admin Inbox.

### 3. Integrated Admin Dashboard (CMS)
- Accessible by clicking the **`CMS`** lock icon in the navbar or footer.
- **Default Passcode**: `admin123` (editable in settings).
- **Capabilities**:
  - Edit personal information, titles, bio, and profile avatar URL.
  - Add, edit, delete, and reorder projects.
  - Manage skills and proficiency levels.
  - Manage experience, degrees, and certificates.
  - Toggle Creative Studio and Freelance Services.
  - **Section Visibility Controls**: Enable or disable any section (*About, Experience, Projects, Skills, Profiles, Services, Creative, Resume, Contact*) in 1 click.
  - **Inquiries Inbox**: Read messages submitted via the contact form and service modals.
  - **Backup & Cloud Sync**: Export JSON, Import JSON, Reset to Defaults, and optional Supabase cloud connection without exposing keys.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Running Locally
```bash
# 1. Open the project folder
cd "D:\My Portfolio"

# 2. Run the Vite development server
npm run dev
```

Visit **`http://localhost:3000`** in your web browser.

### Building for Production
```bash
npm run build
```
Creates an optimized, minified bundle in the `dist/` directory.

---

## 🔐 Admin Dashboard Access
1. In your browser at `http://localhost:3000`, click the **`CMS`** button in the top-right navigation bar.
2. Enter the passcode:
   ```
   admin123
   ```
3. Click **"Unlock Admin Dashboard"**.
4. Make your edits and click **"Save All Changes"**. Changes update live in your browser and persist in `localStorage`.

---

## ☁️ Optional Supabase Cloud Storage Setup
If you want to sync your portfolio edits to a cloud database instead of solely browser local storage:
1. Create a free project at [Supabase](https://supabase.com).
2. Create a table named `portfolio_data` with columns `id` (text or int) and `content` (jsonb).
3. Open the **Admin Dashboard > Backup & Cloud Sync** tab.
4. Paste your **Supabase URL** and **Public Anon Key**.

---

## 🌐 Live Deployment
- **Live URL**: [https://portfolio-git-main-vikas-singhs-projects-b53a535f.vercel.app](https://portfolio-git-main-vikas-singhs-projects-b53a535f.vercel.app)
- **Hosting Platform**: Vercel (Continuous Deployment linked to GitHub branch `main`)
- **Repository**: [https://github.com/VikasSingh2011/Portfolio](https://github.com/VikasSingh2011/Portfolio)

Every new commit pushed to the `main` branch automatically triggers an optimized production build on Vercel.
