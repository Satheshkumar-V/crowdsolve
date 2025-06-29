// Enhanced ChallengeBoard.jsx using useSmartChallengeForm hook
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';
import { useSmartChallengeForm } from '../hooks/useSmartChallengeForm';

function ChallengeBoard() {
  const [challenges, setChallenges] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    content: '',
    tags: '',
    urgency: 'Low',
    category: 'Education'
  });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {
    suggestedTags,
    similarChallenges,
    taskSuggestions,
    fetchTaskSuggestions,
    loadingTags,
    loadingSimilar,
    loadingTasks
  } = useSmartChallengeForm(newChallenge);

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/challenges');
      setChallenges(res.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
    setLoading(false);
  };

  const handlePost = async () => {
    if (!newChallenge.title || !newChallenge.description) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/challenges', {
        ...newChallenge,
        tags: newChallenge.tags.split(',').map(t => t.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewChallenge({ title: '', description: '', content: '', tags: '', urgency: 'Low', category: 'Education' });
      setShowForm(false);
      fetchChallenges();
    } catch (error) {
      console.error('Error posting challenge:', error);
      alert('Error posting challenge. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="container animate-fade-in">
      <h1 className="page-title">🎯 Challenge Board</h1>

      {token && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                background: showForm ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '1rem',
                padding: '12px 24px'
              }}
            >
              {showForm ? '❌ Cancel' : '➕ Create New Challenge'}
            </button>
          </div>

          {showForm && (
            <div className="form-container animate-fade-in">
              <h2 className="section-title">✨ New Challenge</h2>
              <input
                placeholder="Challenge Title *"
                value={newChallenge.title}
                onChange={e => setNewChallenge({ ...newChallenge, title: e.target.value })}
              />
              <textarea
                placeholder="Challenge Description *"
                value={newChallenge.description}
                onChange={e => setNewChallenge({ ...newChallenge, description: e.target.value })}
                rows={3}
              />
              <textarea
                placeholder="Detailed Content (Markdown supported)"
                value={newChallenge.content}
                onChange={e => setNewChallenge({ ...newChallenge, content: e.target.value })}
                rows={4}
              />
              <input
                placeholder="Tags (comma-separated: AI, ML, Web Dev)"
                value={newChallenge.tags}
                onChange={e => setNewChallenge({ ...newChallenge, tags: e.target.value })}
              />

              {suggestedTags.length > 0 && (
                <div>
                  <strong>🔖 Suggested Tags:</strong>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {suggestedTags.map((tag, i) => (
                      <span key={i} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {similarChallenges.length > 0 && (
                <div style={{ marginTop: '1rem', padding: '1rem', border: '1px dashed #bbb', borderRadius: '12px' }}>
                  <strong>🧠 Similar Challenges:</strong>
                  <ul>
                    {similarChallenges.map((c, i) => (
                      <li key={i}>{c.text} (score: {c.score})</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="form-row">
                <select
                  value={newChallenge.urgency}
                  onChange={e => setNewChallenge({ ...newChallenge, urgency: e.target.value })}
                >
                  <option value="Low">🟢 Low Priority</option>
                  <option value="Medium">🟡 Medium Priority</option>
                  <option value="High">🔴 High Priority</option>
                </select>

                <select
                  value={newChallenge.category}
                  onChange={e => setNewChallenge({ ...newChallenge, category: e.target.value })}
                >
                  <option value="Education">📚 Education</option>
                  <option value="Campus">🏫 Campus</option>
                  <option value="Mental Health">🧠 Mental Health</option>
                  <option value="Coding">💻 Coding</option>
                  <option value="Events">🎉 Events</option>
                </select>
              </div>

              <button
                onClick={handlePost}
                disabled={loading}
                style={{ width: '100%', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? '⏳ Posting...' : '🚀 Post Challenge'}
              </button>

              <button
                onClick={fetchTaskSuggestions}
                style={{ marginTop: '1rem', width: '100%' }}
              >
                🪄 Suggest Tasks from Description
              </button>

              {taskSuggestions.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <strong>✅ Suggested Tasks:</strong>
                  <ul>
                    {taskSuggestions.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {loading && <div className="loading-spinner"></div>}

      <div className="grid">
        {challenges.map(challenge => (
          <ChallengeCard
            key={challenge._id}
            challenge={challenge}
            onClick={() => navigate(`/challenge/${challenge._id}`)}
          />
        ))}
      </div>

      {challenges.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
          <h3>No challenges yet!</h3>
          <p>Be the first to create a challenge and inspire others.</p>
        </div>
      )}
    </div>
  );
}

export default ChallengeBoard;