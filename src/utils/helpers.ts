export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatShortDate(dateStr);
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    critical: '#ef4444',
    high: '#f59e0b',
    medium: '#3b82f6',
    low: '#6b7280',
  };
  return colors[priority] || '#6b7280';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'todo': '#6b7280',
    'in-progress': '#6366f1',
    'in-review': '#f59e0b',
    'done': '#10b981',
  };
  return colors[status] || '#6b7280';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getActionIcon(action: string): string {
  const icons: Record<string, string> = {
    created: '✨',
    updated: '✏️',
    moved: '➡️',
    commented: '💬',
    completed: '✅',
    assigned: '👤',
    started: '🚀',
  };
  return icons[action] || '📋';
}

export function getActionColor(action: string): string {
  const colors: Record<string, string> = {
    created: '#8b5cf6',
    updated: '#3b82f6',
    moved: '#06b6d4',
    commented: '#f59e0b',
    completed: '#10b981',
    assigned: '#6366f1',
    started: '#ec4899',
  };
  return colors[action] || '#6b7280';
}

export function generateId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getDaysRemaining(dateStr: string): number {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = date.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function isOverdue(dateStr: string, status: string): boolean {
  if (status === 'done') return false;
  return getDaysRemaining(dateStr) < 0;
}
