import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ChallengeDetails() {
  const { id } = useParams();
  const [solutions, setSolutions] = useState([]);
  const [newSol, setNewSol] = useState('');
  const token = localStorage.getItem('token');

  const fetchSolutions = async () => {
    const res = await axios.get(`http://localhost:5000/api/solutions/${id}`);
    setSolutions(res.data);
  };

  const handleAddSolution = async () => {
    await axios.post('http://localhost:5000/api/solutions', {
      challengeId: id,
      content: newSol
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewSol('');
    fetchSolutions();
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  return (
    <div>
      <h2>Solutions for Challenge</h2>
      <textarea value={newSol} onChange={e => setNewSol(e.target.value)} />
      <button onClick={handleAddSolution}>Add Solution</button>
      {solutions.map(sol => (
        <div key={sol._id} style={{ marginTop: 10, padding: 10, border: '1px dashed gray' }}>
          {sol.content}
        </div>
      ))}
    </div>
  );
}

export default ChallengeDetails;
