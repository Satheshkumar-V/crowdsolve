// Enhanced ChallengeBoard.jsx using Gemini for similarity check
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';

function ChallengeBoard() {
  const [challenges, setChallenges] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [similarResults, setSimilarResults] = useState([]);
  const [skipSimilarityCheck, setSkipSimilarityCheck] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);

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

  const handleSimilarityCheck = async () => {
    if (!newChallenge.title || !newChallenge.description) {
      alert('Please fill in required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/agent/check-similarity', {
        content: newChallenge.description
      });
      setSimilarResults(res.data.similar || []);
      setShowConfirmModal(true);
    } catch (error) {
      console.warn('⚠️ Similarity check failed. Proceeding without results:', error);
      setSimilarResults([]);
      setShowConfirmModal(true);
    }
    setLoading(false);
  };

  const confirmAndPostChallenge = async () => {
    setLoading(true);
    try {
      await axios.post(
        'http://localhost:5000/api/challenges?skipSimilarity=true',
        {
          ...newChallenge,
          tags: newChallenge.tags.split(',').map(t => t.trim())
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setNewChallenge({ title: '', description: '', content: '', tags: '', urgency: 'Low', category: 'Education' });
      setShowForm(false);
      setShowConfirmModal(false);
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

  useEffect(() => {
  const shouldSuggest = newChallenge.description.length > 20 || newChallenge.content.length > 20;
  if (!shouldSuggest) return;

  const fetchSuggestedTags = async () => {
    setLoadingTags(true);
    try {
      const res = await axios.post("http://localhost:8000/agent/suggest-tags", {
        content: `${newChallenge.title}\n${newChallenge.description}\n${newChallenge.content}`
      });
      if (res.data.tags) {
        setNewChallenge(prev => ({
          ...prev,
          tags: res.data.tags.join(', ')
        }));
      }
    } catch (err) {
      console.error("❌ Tag suggestion failed:", err);
    }
    setLoadingTags(false);
  };

  const debounce = setTimeout(fetchSuggestedTags, 1000); // ⏳ debounce typing
  return () => clearTimeout(debounce);
}, [newChallenge.description, newChallenge.content, newChallenge.title]);
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
  disabled={loadingTags}
/>
{loadingTags && <p style={{ fontSize: '0.8rem', color: '#888' }}>💡 Generating suggested tags...</p>}

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
                onClick={handleSimilarityCheck}
                disabled={loading}
                style={{ width: '100%', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? '🔍 Checking Similarity...' : '🚀 Check & Post Challenge'}
              </button>
            </div>
          )}
        </>
      )}

      {showConfirmModal && (
  <div className="modal">
    <h3>🧠 Similar Challenges Found</h3>

    {similarResults.length === 0 || !similarResults[0]?.similar ? (
      <p>No close matches found. Do you want to continue?</p>
    ) : (
      <>
        <ul>
          {similarResults[0].similar.map((s, i) => (
            <li key={i}>
              <p><strong>{s.text}</strong></p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Similarity Score: {s.score}</p>
            </li>
          ))}
        </ul>

        {similarResults[0].summary && (
          <div className="summary-box" style={{ marginTop: '1rem', background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
            <strong>📝 Gemini Summary:</strong>
            <p style={{ marginTop: '5px' }}>{similarResults[0].summary}</p>
          </div>
        )}
      </>
    )}

    <div style={{ marginTop: '1rem' }}>
      <button onClick={confirmAndPostChallenge}>✅ Yes, Post Challenge</button>
      <button onClick={() => setShowConfirmModal(false)} style={{ marginLeft: '1rem' }}>❌ Cancel</button>
    </div>
  </div>
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
