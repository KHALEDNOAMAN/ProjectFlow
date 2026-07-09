<div align="center">

# 📋 ProjectFlow

**Agile Project Management Tool with Kanban Boards, Sprint Planning & Team Analytics**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)](https://www.chartjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://project-flow-elnoaman.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A modern Agile project management platform inspired by Jira and Trello. Features drag-and-drop Kanban boards, sprint planning with velocity tracking, burndown charts, team workload management, and real-time activity feeds. Built to demonstrate software engineering leadership and Agile methodology understanding.

### 🔗 [Live Demo → project-flow-elnoaman.vercel.app](https://project-flow-elnoaman.vercel.app)

</div>

---

## ✨ Features

### 📋 Kanban Board
- Drag-and-drop task cards between columns (To Do → In Progress → In Review → Done)
- Color-coded priority badges (Critical, High, Medium, Low)
- Task assignee avatars with team member selection
- Due date tracking with overdue highlighting
- Story point estimation for sprint planning

### 🏃 Sprint Management
- Create and manage time-boxed sprints (1-4 weeks)
- Sprint backlog with task assignment
- Burndown chart showing ideal vs actual progress
- Sprint velocity tracking across multiple sprints
- Sprint retrospective notes

### 👥 Team Management
- Team member directory with roles and avatars
- Workload distribution visualization
- Task assignment and capacity tracking
- Activity feed showing recent team actions

### 📊 Analytics Dashboard
- Project progress overview with completion percentages
- Tasks by status breakdown (pie chart)
- Sprint velocity trend (bar chart)
- Team workload heatmap
- Overdue tasks alert panel

---

## 🏗️ Architecture

```
ProjectFlow/
├── src/
│   ├── components/
│   │   ├── KanbanBoard.tsx      # Drag-and-drop board
│   │   ├── KanbanColumn.tsx     # Board column
│   │   ├── TaskCard.tsx         # Draggable task card
│   │   ├── TaskModal.tsx        # Task detail/edit modal
│   │   ├── SprintPlanning.tsx   # Sprint management view
│   │   ├── BurndownChart.tsx    # Sprint burndown visualization
│   │   ├── Dashboard.tsx        # Analytics overview
│   │   ├── TeamView.tsx         # Team management
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   └── ActivityFeed.tsx     # Recent actions feed
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── data/
│   │   └── sampleData.ts       # Realistic sample data
│   ├── hooks/
│   │   └── useLocalStorage.ts   # Persistent state hook
│   ├── utils/
│   │   └── helpers.ts           # Date, color, formatting utils
│   └── App.tsx                  # Root with routing
├── package.json
└── README.md
```

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI component library |
| TypeScript 5 | Type safety and better DX |
| Vite 5 | Fast build tool |
| React Router 6 | Client-side routing |
| Chart.js 4 | Burndown & analytics charts |
| Vercel | Cloud deployment |

## 🚀 Getting Started

```bash
git clone https://github.com/KHALEDNOAMAN/ProjectFlow.git
cd ProjectFlow
npm install
npm run dev
```

## 📖 Agile Concepts Implemented

| Concept | Implementation |
|---------|---------------|
| **Kanban** | Visual board with WIP limits and flow optimization |
| **Sprints** | Time-boxed iterations with backlog grooming |
| **Burndown** | Daily progress tracking against sprint goals |
| **Velocity** | Story points completed per sprint trending |
| **Retrospectives** | What went well / What to improve / Action items |
| **User Stories** | Task descriptions following "As a... I want... So that..." |

## 📝 License
MIT License - see [LICENSE](LICENSE) file.

---
<div align="center">

Built by [Khaled Noaman](https://github.com/KHALEDNOAMAN) — Aspiring Engineering Manager 🚀

*"The best managers are those who understand the work their teams do."*

</div>
