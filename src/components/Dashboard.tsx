import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { tasks, teamMembers, sprints } from '../data/sampleData';
import { isOverdue } from '../utils/helpers';
import ActivityFeed from './ActivityFeed';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard: React.FC = () => {
  // Metrics
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const overdueTasks = tasks.filter((t) => isOverdue(t.dueDate, t.status)).length;

  // Tasks by Status (Pie)
  const statusCounts = {
    'To Do': tasks.filter((t) => t.status === 'todo').length,
    'In Progress': tasks.filter((t) => t.status === 'in-progress').length,
    'In Review': tasks.filter((t) => t.status === 'in-review').length,
    'Done': tasks.filter((t) => t.status === 'done').length,
  };

  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(107, 114, 128, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(107, 114, 128, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 12 },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: { family: 'Inter', weight: '600' as const },
        bodyFont: { family: 'Inter' },
      },
    },
  };

  // Sprint Velocity (Bar)
  const barData = {
    labels: sprints.map((s) => s.name.split('—')[0].trim()),
    datasets: [
      {
        label: 'Planned Points',
        data: sprints.map((s) => s.totalPoints),
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false as const,
      },
      {
        label: 'Completed Points',
        data: sprints.map((s) => s.completedPoints),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false as const,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 12 },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: { family: 'Inter', weight: '600' as const },
        bodyFont: { family: 'Inter' },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(148, 163, 184, 0.08)' },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(148, 163, 184, 0.08)' },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } },
      },
    },
  };

  // Team workload
  const teamWorkload = teamMembers.map((member) => {
    const memberTasks = tasks.filter((t) => t.assigneeId === member.id);
    const totalPoints = memberTasks.reduce((acc, t) => acc + t.storyPoints, 0);
    const percent = Math.min(Math.round((totalPoints / 20) * 100), 100);
    return { member, taskCount: memberTasks.length, totalPoints, percent };
  });

  const metrics = [
    {
      icon: '📋',
      value: totalTasks,
      label: 'Total Tasks',
      color: 'var(--primary)',
      bgColor: 'rgba(99, 102, 241, 0.15)',
      borderTopColor: 'var(--primary)',
    },
    {
      icon: '🔄',
      value: inProgressTasks,
      label: 'In Progress',
      color: 'var(--accent)',
      bgColor: 'rgba(6, 182, 212, 0.15)',
      borderTopColor: 'var(--accent)',
    },
    {
      icon: '✅',
      value: completedTasks,
      label: 'Completed',
      color: 'var(--success)',
      bgColor: 'rgba(16, 185, 129, 0.15)',
      borderTopColor: 'var(--success)',
    },
    {
      icon: '⚠️',
      value: overdueTasks,
      label: 'Overdue',
      color: 'var(--danger)',
      bgColor: 'rgba(239, 68, 68, 0.15)',
      borderTopColor: 'var(--danger)',
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>📊 Dashboard</h2>
          <div className="page-header-subtitle">
            Overview of project health, team workload, and recent activity
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="dashboard-grid">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="metric-card"
            style={{ '--card-color': metric.borderTopColor } as React.CSSProperties}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${metric.borderTopColor}, transparent)`,
              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
            }} />
            <div
              className="metric-card-icon"
              style={{ background: metric.bgColor }}
            >
              {metric.icon}
            </div>
            <div className="metric-card-value">{metric.value}</div>
            <div className="metric-card-label">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="dashboard-charts">
        <div className="chart-container" style={{ animationDelay: '0.1s' }}>
          <h3>📊 Tasks by Status</h3>
          <div className="chart-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="chart-container" style={{ animationDelay: '0.2s' }}>
          <h3>🚀 Sprint Velocity</h3>
          <div className="chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-bottom">
        {/* Recent Activity */}
        <div className="chart-container" style={{ animationDelay: '0.3s' }}>
          <h3>🕐 Recent Activity</h3>
          <ActivityFeed maxItems={6} />
        </div>

        {/* Team Workload */}
        <div className="chart-container" style={{ animationDelay: '0.4s' }}>
          <h3>👥 Team Workload</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {teamWorkload.map(({ member, taskCount, totalPoints, percent }) => {
              const color =
                percent >= 80
                  ? 'var(--danger)'
                  : percent >= 60
                  ? 'var(--warning)'
                  : 'var(--success)';
              return (
                <div key={member.id}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: member.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: 'white',
                        }}
                      >
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {taskCount} tasks · {totalPoints} SP
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color }}>
                      {percent}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${percent}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                        boxShadow: `0 0 10px ${color}40`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
