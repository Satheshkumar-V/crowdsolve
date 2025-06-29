import React from 'react';

const TaskCard = ({ task, token, onStatusChange, getStatusIcon, getStatusColor, getUrgencyStyle, getDaysUntilDue }) => {
  const daysUntilDue = getDaysUntilDue(task.dueDate);
  const urgencyStyle = getUrgencyStyle(task.dueDate);
  const statusColor = getStatusColor(task.status);

  return (
    <div className="card" style={{ borderLeft: `4px solid ${statusColor}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2c3e50', margin: 0 }}>
          {getStatusIcon(task.status)} {task.title}
        </h3>
        {token && (
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              borderRadius: '6px',
              border: `1px solid ${statusColor}40`,
              background: `${statusColor}10`,
              color: statusColor
            }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        )}
      </div>

      {task.description && (
        <p style={{ color: '#666', lineHeight: '1.5', marginBottom: '1rem', fontSize: '0.95rem' }}>{task.description}</p>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
        <span className="status-badge" style={{
          background: `${statusColor}20`,
          color: statusColor,
          border: `1px solid ${statusColor}40`,
          textTransform: 'capitalize'
        }}>
          {task.status.replace('-', ' ')}
        </span>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.9rem', ...urgencyStyle }}>
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </div>
          <div style={{ fontSize: '0.8rem', ...urgencyStyle }}>
            {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue`
              : daysUntilDue === 0 ? 'Due today!'
              : `${daysUntilDue} days left`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
