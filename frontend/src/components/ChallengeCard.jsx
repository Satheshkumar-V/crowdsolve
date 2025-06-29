import React from 'react';

const ChallengeCard = ({ challenge, onClick }) => {
  const getCategoryIcon = (category) => ({
    'Education': '📚',
    'Campus': '🏫',
    'Mental Health': '🧠',
    'Coding': '💻',
    'Events': '🎉'
  }[category] || '📋');

  const getUrgencyColor = (urgency) => ({
    'High': '#ff6b6b',
    'Medium': '#feca57',
    'Low': '#48dbfb'
  }[urgency] || '#48dbfb');

  return (
    <div className="card challenge-card" onClick={onClick} style={{ borderLeft: `4px solid ${getUrgencyColor(challenge.urgency)}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2c3e50', margin: 0, flex: 1 }}>
          {getCategoryIcon(challenge.category)} {challenge.title}
        </h3>
        <span className="status-badge" style={{
          background: `${getUrgencyColor(challenge.urgency)}20`,
          color: getUrgencyColor(challenge.urgency),
          border: `1px solid ${getUrgencyColor(challenge.urgency)}40`
        }}>
          {challenge.urgency}
        </span>
      </div>
      <p style={{ color: '#666', lineHeight: '1.5', marginBottom: '1rem' }}>{challenge.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {challenge.tags.map((tag, index) => <span key={index} className="tag">#{tag}</span>)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #eee', fontSize: '0.9rem', color: '#888' }}>
        <span>📅 {new Date(challenge.createdAt || Date.now()).toLocaleDateString()}</span>
        <span>👁️ Click to view</span>
      </div>
    </div>
  );
};

export default ChallengeCard;
