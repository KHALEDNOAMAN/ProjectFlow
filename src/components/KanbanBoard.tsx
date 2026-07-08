import React, { useState } from 'react';
import { Task } from '../types';
import { columns as defaultColumns, tasks as defaultTasks, project } from '../data/sampleData';
import KanbanColumn from './KanbanColumn';
import TaskModal from './TaskModal';
import { generateId } from '../utils/helpers';

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: Task['status']
  ) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (!taskId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
          : task
      )
    );
    setDraggedTaskId(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setSelectedTask(updatedTask);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: `PF-${100 + tasks.length + 1}`,
      title: 'New Task',
      description: 'Describe this task...',
      status: 'todo',
      priority: 'medium',
      assigneeId: 'user-1',
      sprintId: 'sprint-2',
      storyPoints: 3,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tags: [],
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
    setSelectedTask(newTask);
  };

  const totalTasks = tasks.filter((t) => t.sprintId === 'sprint-2').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>📋 {project.name}</h2>
          <div className="page-header-subtitle">
            Sprint 2 — {totalTasks} tasks across {defaultColumns.length} columns
          </div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={handleAddTask}>
            ✨ Add Task
          </button>
        </div>
      </div>

      <div className="kanban-board">
        {defaultColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((t) => t.status === column.status)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onTaskClick={handleTaskClick}
          />
        ))}
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
