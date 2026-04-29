# 🎓 CampusIQ — College Discovery Platform

> India's honest college discovery platform. No sponsored rankings. Just clear data.

🌐 **Live Demo:** (https://campusiq-frontend.vercel.app/predictor)  
🔧 **Backend API:** [campusiq-api.onrender.com](https://campusiq-api.onrender.com/health)

---

## 🎯 Features Built

### 1. 🔍 College Listing + Search + Filter
- Search colleges by name or city in real time
- Filter by State, College Type, Course
- Sort by NIRF Rank, Rating, Placement %, Fees
- Infinite scroll with Load More pagination
- Skeleton loading states for smooth UX

### 2. 🏫 College Detail Page
- Hero banner with college image and quick stats
- 4 tabs: Overview, Courses, Placements, Reviews
- Placement bar chart visualization
- Top recruiters, facilities, NAAC/NIRF info
- Direct link to Compare and Predictor

### 3. ⚖️ Compare Colleges (High Priority)
- Select 2–3 colleges side by side
- Comparison table: Fees, Placement %, Rating, Packages, NIRF Rank
- Best value highlighted in green automatically
- Search within selector panel
- Deep links to full college profiles

### 4. 🧠 Rank Predictor
- Supports 7 exams: JEE Advanced, JEE Main, BITSAT, VITEEE, MET, WBJEE, SRMJEEE
- Shows Eligible colleges (rank within cutoff)
- Shows Reach colleges (rank slightly above cutoff)
- Rank range hints per exam
- Click any result to go to full college profile

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Data | JSON dataset (12 colleges, DB-ready schema) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 🗂️ Project Structure
campusiq/
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── colleges/             # Listing + Search + Filter
│   │   ├── college/[id]/         # College Detail Page
│   │   ├── compare/              # Compare 2-3 Colleges
│   │   └── predictor/            # Rank Predictor
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── CollegeCard.tsx
│   └── lib/api.ts                # All API calls
└── backend/
└── src/
├── index.ts              # Express API (all routes)
└── data/colleges.json    # Dataset (12 colleges)

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/colleges` | List with search, filter, sort, pagination |
| GET | `/api/colleges/:id` | Single college detail |
| POST | `/api/compare` | Compare 2–3 colleges |
| GET | `/api/predict` | Predict colleges by exam + rank |
| GET | `/api/filters/options` | Filter dropdown options |

---

## 🚀 Run Locally

### Backend
```bash
cd backend
npm install
npm run dev      # runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
# .env.local already set to http://localhost:5000
npm run dev      # runs on http://localhost:3000
```

---

## 📈 Scaling to PostgreSQL

The backend is designed to swap JSON for PostgreSQL with no frontend changes:

```sql
CREATE TABLE colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  type VARCHAR(50),
  fees INTEGER,
  rating NUMERIC(2,1),
  placement_percent INTEGER,
  nirf_rank INTEGER,
  avg_package INTEGER,
  exam_accepted TEXT[]
);
```

Just replace the JSON import in `src/index.ts` with `pg` queries and add `DATABASE_URL` on Render.

---

## 👤 Built By

**Charan** — Full stack build for CampusIQ internship assignment  
Track B: College Discovery Platform

🎬 Demo Video Script
Length: 3–5 minutes. Record your screen using:

Windows: Press Win + G → Xbox Game Bar → Record
Or use loom.com (free, easiest option — records screen + your face)


🎙️ What to say and show — scene by scene

[0:00 – 0:20] Introduction

Show the homepage

Say:

"Hi, I'm Charan. This is CampusIQ — a college discovery platform I built for the Track B internship assignment. I'll walk you through the four features I built end to end — frontend, backend, and deployment."


[0:20 – 1:00] Feature 1 — College Listing + Search + Filter

Go to /colleges

Say:

"This is the college listing page. It fetches data from my Express backend deployed on Render. I can search by college name or city in real time —"

Type "Mumbai" in the search box

"— and filter by state, college type, and course. I can also sort by NIRF rank, rating, placement percentage, or fees. The cards show rating, fees per year, and placement rate at a glance. Load more pagination works here too."

Click Load More

[1:00 – 1:45] Feature 2 — College Detail Page

Click on IIT Bombay card

Say:

"Each college has a full detail page with four tabs. Overview shows key info, NAAC grade, NIRF rank, facilities. Courses tab shows every programme offered."

Click Courses tab

"Placements tab shows placement rate, average and highest package, and top recruiters with a visual bar chart."

Click Placements tab

"And Reviews tab shows student reviews with star ratings."

Click Reviews tab

[1:45 – 2:30] Feature 3 — Compare Colleges

Go to /compare

Say:

"This is the Compare feature — which was marked high priority. I select two or three colleges from the panel on the left —"

Select IIT Bombay, NIT Trichy, BITS Pilani

"— and click Compare. The table shows fees, placement percentage, average package, NIRF rank, rating, and more side by side. The best value in each row is automatically highlighted in green. This is a decision tool, not just a UI feature."

Point to the green highlighted cells

[2:30 – 3:15] Feature 4 — Rank Predictor

Go to /predictor

Say:

"The rank predictor supports seven entrance exams. I'll select JEE Main and enter a rank of 5000 —"

Select JEE Main, type 5000, click Predict

"— and it shows me eligible colleges where my rank falls within the cutoff range, and reach colleges where I'm slightly above the cutoff but could target with improvement. Each result links directly to the full college profile."

Click one college result

[3:15 – 3:45] Backend + Deployment

Open a new tab, go to your Render health URL

Say:

"The backend is a Node.js Express API built in TypeScript, deployed on Render. This health endpoint confirms it's live with all 12 colleges loaded. The frontend is deployed on Vercel and connects to this backend via an environment variable. All data is stored in the backend — nothing is hardcoded in the UI."


[3:45 – 4:00] Closing
Say:

"All four features are fully functional end to end. The architecture is designed to scale — swapping the JSON dataset for PostgreSQL requires only changes in the backend with no frontend impact. Thank yo
