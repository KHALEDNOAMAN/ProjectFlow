import React from 'react';
import { sprints, tasks } from '../data/sampleData';
import { teamMembers } from '../data/sampleData';
import { formatDate, getStatusColor, getInitials } from '../utils/helpers';
import BurndownChart from './BurndownChart';

const SprintPlanning: React.FC = () => {
  const activeSprint = sprints.find((s) => s.status === 'active') || sprints[1];
  const sprintTasks = tasks.filter((t) => t.sprintId === activeSprint.id);

  const totalPoints = sprintTasks.reduce((acc, t) => acc + t.storyPoints, 0);
  const completedPoints = sprintTasks
    .filter((t) => t.status === 'done')
    .reduce((acc, t) => acc + t.storyPoints, 0);
  const remainingPoints = totalPoints - completedPoints;
  const progressPercent = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  return (
    <div className="sprint-page">
      <div className="page-header">
        <div>
          <h2>🏃 Sprint Planning</h2>
          <div className="page-header-subtitle">
            Manage sprints, track progress, and plan upcoming work
          </div>
        </div>
      </div>

      {/* Active Sprint Card */}
      <div className="sprint-active-card">
        <div className="sprint-card-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>
              {activeSprint.name}
            </h3>
            <span className={`sprint-status-badge ${activeSprint.status}`}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: activeSprint.status === 'active' ? 'var(--success)' : 'var(--primary-light)',
                display: 'inline-block',
              }} />
              {activeSprint.status === 'active' ? 'Active Sprint' : 'Completed'}
            </span>
          </div>
          <div className="sprint-dates">
            📅 {formatDate(activeSprint.startDate)} — {formatDate(activeSprint.endDate)}
          </div>
        </div>

        <div className="sprint-goal">{activeSprint.goal}</div>

        <div className="sprint-progress">
          <div className="sprint-progress-header">
            <span className="sprint-progress-label">Sprint Progress</span>
            <span className="sprint-progress-value">{progressPercent}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="sprint-stats-row">
          <div className="sprint-stat">
            <div className="sprint-stat-value" style={{ color: 'var(--primary-light)' }}>
              {totalPoints}
            </div>
            <div className="sprint-stat-label">Total Points</div>
          </div>
          <div className="sprint-stat">
            <div className="sprint-stat-value" style={{ color: 'var(--success)' }}>
              {completedPoints}
            </div>
            <div className="sprint-stat-label">Completed</div>
          </div>
          <div className="sprint-stat">
            <div className="sprint-stat-value" style={{ color: 'var(--warning)' }}>
              {remainingPoints}
            </div>
            <div className="sprint-stat-label">Remaining</div>
          </div>
        </div>
      </div>

      {/* Sprint Sections */}
      <div className="sprint-sections">
        {/* Burndown Chart */}
        <BurndownChart
          data={activeSprint.burndownData}
          sprintName={activeSprint.name}
        />

        {/* Sprint Backlog */}
        <div className="sprint-backlog">
          <h3>📝 Sprint Backlog</h3>
          <table className="backlog-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Assignee</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sprintTasks.map((task) => {
                const assignee = teamMembers.find(
                  (m) => m.id === task.assigneeId
                );
                const statusColor = getStatusColor(task.status);
                return (
                  <tr key={task.id}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                          {task.title}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {task.id}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            background: assignee?.color || '#6b7280',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            color: 'white',
                          }}
                        >
                          {assignee ? getInitials(assignee.name) : '?'}
                        </div>
                        <span style={{ fontSize: '0.82rem' }}>
                          {assignee?.name.split(' ')[0]}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        background: 'var(--bg-surface)',
                        padding: '2px 8px',
                        borderRadius: 999,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--primary-light)',
                        border: '1px solid var(--border-color)',
                      }}>
                        {task.storyPoints} SP
                      </span>
                    </td>
                    <td>
                      <span
                        className="backlog-status"
                        style={{
                          background: `${statusColor}18`,
                          color: statusColor,
                          border: `1px solid ${statusColor}30`,
                        }}
                      >
                        <span style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: statusColor,
                          display: 'inline-block',
                        }} />
                        {task.status.replace('-', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SprintPlanning;
