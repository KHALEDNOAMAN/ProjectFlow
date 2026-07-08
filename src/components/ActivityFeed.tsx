import React from 'react';
import { activities, teamMembers } from '../data/sampleData';
import { getRelativeTime, getActionIcon, getActionColor } from '../utils/helpers';
import { Activity } from '../types';

interface ActivityFeedProps {
  maxItems?: number;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ maxItems }) => {
  const displayActivities = maxItems
    ? activities.slice(0, maxItems)
    : activities;

  const getUserName = (userId: string): string => {
    const member = teamMembers.find((m) => m.id === userId);
    return member?.name || 'Unknown';
  };

  return (
    <div className="activity-feed">
      {displayActivities.map((activity, index) => (
        <div
          key={activity.id}
          className="activity-item"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div
            className="activity-icon"
            style={{
              background: `${getActionColor(activity.action)}18`,
              border: `1px solid ${getActionColor(activity.action)}30`,
            }}
          >
            {getActionIcon(activity.action)}
          </div>
          <div className="activity-body">
            <div className="activity-text">
              <strong>{getUserName(activity.userId)}</strong>{' '}
              {activity.description}{' '}
              <span className="activity-target">{activity.targetTitle}</span>
            </div>
            <div className="activity-time">
              {getRelativeTime(activity.timestamp)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
