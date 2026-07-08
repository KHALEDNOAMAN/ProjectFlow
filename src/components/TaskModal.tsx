import React, { useState } from 'react';
import { Task, Comment } from '../types';
import { teamMembers } from '../data/sampleData';
import { getInitials, getRelativeTime, getPriorityColor, getStatusColor } from '../utils/helpers';
import { generateId } from '../utils/helpers';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onUpdate }) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  const [newComment, setNewComment] = useState('');

  const assignee = teamMembers.find((m) => m.id === editedTask.assigneeId);

  const handleFieldChange = (
    field: keyof Task,
    value: string | number
  ) => {
    const updated = { ...editedTask, [field]: value, updatedAt: new Date().toISOString() };
    setEditedTask(updated);
    onUpdate(updated);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: generateId(),
      userId: 'user-1', // current user
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = {
      ...editedTask,
      comments: [...editedTask.comments, comment],
      updatedAt: new Date().toISOString(),
    };
    setEditedTask(updated);
    onUpdate(updated);
    setNewComment('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{editedTask.id} — {editedTask.title}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-description">{editedTask.description}</div>

          <div className="modal-field-row">
            <div className="modal-field">
              <label>Status</label>
              <select
                value={editedTask.status}
                onChange={(e) =>
                  handleFieldChange('status', e.target.value)
                }
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="in-review">In Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="modal-field">
              <label>Priority</label>
              <select
                value={editedTask.priority}
                onChange={(e) =>
                  handleFieldChange('priority', e.target.value)
                }
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="modal-field-row">
            <div className="modal-field">
              <label>Assignee</label>
              <select
                value={editedTask.assigneeId}
                onChange={(e) =>
                  handleFieldChange('assigneeId', e.target.value)
                }
              >
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-field">
              <label>Story Points</label>
              <select
                value={editedTask.storyPoints}
                onChange={(e) =>
                  handleFieldChange('storyPoints', parseInt(e.target.value))
                }
              >
                {[1, 2, 3, 5, 8, 13].map((sp) => (
                  <option key={sp} value={sp}>
                    {sp} points
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-field">
            <label>Due Date</label>
            <input
              type="date"
              value={editedTask.dueDate}
              onChange={(e) => handleFieldChange('dueDate', e.target.value)}
            />
          </div>

          <div className="modal-field" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: getPriorityColor(editedTask.priority),
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Priority: {editedTask.priority}
              </span>
              <span style={{ margin: '0 4px', color: 'var(--text-muted)' }}>·</span>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: getStatusColor(editedTask.status),
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {editedTask.status}
              </span>
              <span style={{ margin: '0 4px', color: 'var(--text-muted)' }}>·</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {editedTask.storyPoints} SP
              </span>
            </div>
          </div>

          {/* Comments */}
          <div className="modal-comments">
            <h4>💬 Comments ({editedTask.comments.length})</h4>

            {editedTask.comments.map((comment) => {
              const commentUser = teamMembers.find(
                (m) => m.id === comment.userId
              );
              return (
                <div key={comment.id} className="comment-item">
                  <div
                    className="comment-avatar"
                    style={{
                      background: commentUser?.color || '#6b7280',
                    }}
                  >
                    {commentUser
                      ? getInitials(commentUser.name)
                      : '?'}
                  </div>
                  <div className="comment-body">
                    <div className="comment-meta">
                      <span className="comment-author">
                        {commentUser?.name || 'Unknown'}
                      </span>
                      <span className="comment-time">
                        {getRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                </div>
              );
            })}

            <div className="comment-input-row">
              <div
                className="comment-avatar"
                style={{ background: teamMembers[0].color }}
              >
                {getInitials(teamMembers[0].name)}
              </div>
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn btn-primary" onClick={handleAddComment}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
