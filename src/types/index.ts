export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assigneeId: string;
  sprintId: string;
  storyPoints: number;
  dueDate: string;
  tags: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
}

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  totalPoints: number;
  completedPoints: number;
  burndownData: BurndownDataPoint[];
}

export interface BurndownDataPoint {
  day: number;
  date: string;
  ideal: number;
  actual: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  key: string;
  lead: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  action: 'created' | 'updated' | 'moved' | 'commented' | 'completed' | 'assigned' | 'started';
  targetType: 'task' | 'sprint' | 'project';
  targetTitle: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, string>;
}
