import React from 'react';
import { tasks, teamMembers } from '../data/sampleData';
import { getInitials, getStatusColor } from '../utils/helpers';

const TeamView: React.FC = () => {
  const getTasksForMember = (memberId: string) => {
    return tasks.filter((t) => t.assigneeId === memberId);
  };

  const getWorkloadPercent = (memberId: string): number => {
    const memberTasks = getTasksForMember(memberId);
    const totalPoints = memberTasks.reduce((acc, t) => acc + t.storyPoints, 0);
    // Assume max capacity is ~20 story points per sprint
    return Math.min(Math.round((totalPoints / 20) * 100), 100);
  };

  const getWorkloadColor = (percent: number): string => {
    if (percent >= 80) return 'var(--danger)';
    if (percent >= 60) return 'var(--warning)';
    return 'var(--success)';
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>👥 Team Overview</h2>
          <div className="page-header-subtitle">
            {teamMembers.length} team members — Track workload and assignments
          </div>
        </div>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => {
          const memberTasks = getTasksForMember(member.id);
          const workload = getWorkloadPercent(member.id);
          const workloadColor = getWorkloadColor(workload);
          const totalPoints = memberTasks.reduce(
            (acc, t) => acc + t.storyPoints,
            0
          );

          return (
            <div key={member.id} className="team-card">
              <div className="team-card-header">
                <div
                  className="team-avatar"
                  style={{ background: member.color }}
                >
                  {getInitials(member.name)}
                </div>
                <div className="team-card-info">
                  <h3>{member.name}</h3>
                  <div className="team-card-role">{member.role}</div>
                  <div className="team-card-email">{member.email}</div>
                </div>
              </div>

              <div className="team-workload">
                <div className="team-workload-header">
                  <span className="team-workload-label">
                    Workload ({memberTasks.length} tasks · {totalPoints} SP)
                  </span>
                  <span
                    className="team-workload-value"
                    style={{ color: workloadColor }}
                  >
                    {workload}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${workload}%`,
                      background: `linear-gradient(90deg, ${workloadColor}, ${workloadColor}cc)`,
                      boxShadow: `0 0 10px ${workloadColor}40`,
                    }}
                  />
                </div>
              </div>

              <div className="team-tasks-title">
                Assigned Tasks
              </div>
              {memberTasks.map((task) => {
                const statusColor = getStatusColor(task.status);
                return (
                  <div key={task.id} className="team-task-item">
                    <span className="team-task-title">{task.title}</span>
                    <span
                      className="team-task-status"
                      style={{
                        background: `${statusColor}18`,
                        color: statusColor,
                        border: `1px solid ${statusColor}30`,
                      }}
                    >
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamView;
