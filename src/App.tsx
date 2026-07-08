import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import SprintPlanning from './components/SprintPlanning';
import TeamView from './components/TeamView';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board" element={<KanbanBoard />} />
          <Route path="/sprints" element={<SprintPlanning />} />
          <Route path="/team" element={<TeamView />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
