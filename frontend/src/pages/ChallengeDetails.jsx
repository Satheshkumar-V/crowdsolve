// ChallengeDetails.jsx with solution submission, voting, and AI task generation
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ChallengeDetails() {
  const { id } = useParams();
  const [solutions, setSolutions] = useState([]);
  const [newSol, setNewSol] = useState('');
  const [suggestedTasks, setSuggestedTasks] = useState([]);
  const token = localStorage.getItem('token');

  const fetchSolutions = async () => {
    const res = await axios.get(`http://localhost:5000/api/solutions/${id}`);
    setSolutions(res.data);
  };

  const handleAddSolution = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/solutions',
        { challengeId: id, content: newSol },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewSol('');
      fetchSolutions();
    } catch (err) {
      alert(err.response?.data?.reason || err.response?.data?.error || 'Failed to submit solution');
    }
  };

  const handleVote = async (solutionId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/votes',
        { solutionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSolutions();
    } catch (err) {
      alert('You may have already voted.');
    }
  };

  const handleGenerateTasks = async (solutionText) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/tasks/auto-generate',
        { challengeId: id, solutionText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuggestedTasks(res.data.tasks || []);
    } catch (err) {
      alert('Failed to generate tasks');
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  return (
    <div className="container">
      <h2 className="section-title">📝 Solutions</h2>

      <textarea
        value={newSol}
        onChange={(e) => setNewSol(e.target.value)}
        placeholder="Submit your solution here"
        rows={4}
      />
      <button onClick={handleAddSolution}>Submit Solution</button>

      <div style={{ marginTop: '2rem' }}>
        {solutions.map((sol) => (
          <div key={sol._id} style={{ padding: 10, border: '1px dashed #ccc', marginBottom: '1rem' }}>
            <p>{sol.content}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>👍 {sol.votes || 0} votes</span>
              {token && (
                <>
                  <button onClick={() => handleVote(sol._id)}>⬆️ Vote</button>
                  <button onClick={() => handleGenerateTasks(sol.content)} style={{ marginLeft: '1rem' }}>🪄 Generate Tasks</button>
                </>
              )}
            </div>
          </div>
        ))}

        {suggestedTasks.length > 0 && (
          <div style={{ marginTop: '1.5rem', background: '#f0f0f0', padding: '1rem', borderRadius: '10px' }}>
            <h4>✅ Suggested Tasks</h4>
            <ul>
              {suggestedTasks.map((task, i) => (
                <li key={i}>{task.title || task}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to={`/tasks/${id}`}>📋 View Task Board</Link>
      </div>
    </div>
  );
}

export default ChallengeDetails;
