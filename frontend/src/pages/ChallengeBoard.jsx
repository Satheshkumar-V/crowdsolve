import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChallengeBoard() {
  const [challenges, setChallenges] = useState([]);
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
    const res = await axios.get('http://localhost:5000/api/challenges');
    setChallenges(res.data);
  };

  const handlePost = async () => {
    await axios.post('http://localhost:5000/api/challenges', {
      ...newChallenge,
      tags: newChallenge.tags.split(',').map(t => t.trim())
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewChallenge({ title: '', description: '', content: '', tags: '', urgency: 'Low', category: 'Education' });
    fetchChallenges();
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div>
      <h2>Challenge Board</h2>

      <input placeholder="Title" value={newChallenge.title} onChange={e => setNewChallenge({ ...newChallenge, title: e.target.value })} />
      <textarea placeholder="Description" value={newChallenge.description} onChange={e => setNewChallenge({ ...newChallenge, description: e.target.value })} />
      <textarea placeholder="Markdown Content" value={newChallenge.content} onChange={e => setNewChallenge({ ...newChallenge, content: e.target.value })} />
      <input placeholder="Tags (comma-separated)" value={newChallenge.tags} onChange={e => setNewChallenge({ ...newChallenge, tags: e.target.value })} />
      <select onChange={e => setNewChallenge({ ...newChallenge, urgency: e.target.value })}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <select onChange={e => setNewChallenge({ ...newChallenge, category: e.target.value })}>
        <option>Education</option><option>Campus</option><option>Mental Health</option><option>Coding</option><option>Events</option>
      </select>
      <button onClick={handlePost}>Post Challenge</button>

      <div>
        {challenges.map(ch => (
          <div key={ch._id} onClick={() => navigate(`/challenge/${ch._id}`)} style={{ border: '1px solid black', padding: 10, marginTop: 10 }}>
            <h3>{ch.title}</h3>
            <p>{ch.description}</p>
            <p><b>Tags:</b> {ch.tags.join(', ')}</p>
            <p><b>Urgency:</b> {ch.urgency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChallengeBoard;
