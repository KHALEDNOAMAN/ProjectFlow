import React from 'react';
import { Task } from '../types';
import { getInitials, getPriorityColor, formatShortDate, isOverdue } from '../utils/helpers';
import { teamMembers } from '../data/sampleData';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onClick }) => {
  const assignee = teamMembers.find((m) => m.id === task.assigneeId);
  const priorityColor = getPriorityColor(task.priority);
  const overdue = isOverdue(task.dueDate, task.status);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add('dragging');
    onDragStart(e, task.id);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onClick(task)}
    >
      <div className="task-card-header">
        <span
          className="task-card-priority"
          style={{
            background: `${priorityColor}18`,
            color: priorityColor,
            border: `1px solid ${priorityColor}30`,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: priorityColor,
              display: 'inline-block',
            }}
          />
          {task.priority}
        </span>
        <span className="task-card-id">{task.id}</span>
      </div>

      <div className="task-card-title">{task.title}</div>
      <div className="task-card-desc">{task.description}</div>

      {task.tags.length > 0 && (
        <div className="task-card-tags">
          {task.tags.map((tag) => (
            <span key={tag} className="task-card-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="task-card-footer">
        <div className="task-card-assignee">
          {assignee && (
            <>
              <div
                className="task-card-avatar"
                style={{ background: assignee.color }}
              >
                {getInitials(assignee.name)}
              </div>
              <span className="task-card-assignee-name">
                {assignee.name.split(' ')[0]}
              </span>
            </>
          )}
        </div>
        <div className="task-card-meta">
          <span className={`task-card-due ${overdue ? 'overdue' : ''}`}>
            📅 {formatShortDate(task.dueDate)}
          </span>
          <span className="task-card-points">{task.storyPoints} SP</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
