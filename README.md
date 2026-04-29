# 🎓 CampusIQ — College Discovery Platform

> India's honest college discovery platform. No sponsored rankings. Just clear data.

🌐 **Live Demo:** (https://campusiq-frontend.vercel.app/) 
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

