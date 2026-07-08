import React from 'react';
import { NavLink } from 'react-router-dom';
import { teamMembers } from '../data/sampleData';
import { getInitials } from '../utils/helpers';

const navItems = [
  { to: '/', icon: '📊', label: 'Dashboard' },
  { to: '/board', icon: '📋', label: 'Board' },
  { to: '/sprints', icon: '🏃', label: 'Sprints' },
  { to: '/team', icon: '👥', label: 'Team' },
];

const Sidebar: React.FC = () => {
  const currentUser = teamMembers[0];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">⚡</div>
        <h1>ProjectFlow</h1>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div
          className="sidebar-user-avatar"
          style={{ background: currentUser.color }}
        >
          {getInitials(currentUser.name)}
        </div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{currentUser.name}</div>
          <div className="sidebar-user-role">{currentUser.role}</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
