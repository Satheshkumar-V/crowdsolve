import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ChallengeDetails() {
  const { id } = useParams(); // challengeId
  const [solutions, setSolutions] = useState([]);
  const [newSol, setNewSol] = useState('');
  const [aiSolution, setAiSolution] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState([]);

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

  const handleGenerateTasks = async () => {
    const res = await axios.post(
      `http://localhost:5000/api/tasks/auto-generate`,
      {
        challengeId: id,
        solutionText: aiSolution
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setGeneratedTasks(res.data.tasks || []);
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  return (
    <div>
      <h2>Solutions for Challenge</h2>
      
      <textarea
        value={newSol}
        onChange={(e) => setNewSol(e.target.value)}
        placeholder="Submit your solution here"
      />
      <button onClick={handleAddSolution}>Submit Solution</button>

      {solutions.map((sol) => (
        <div key={sol._id} style={{ marginTop: 10, padding: 10, border: '1px dashed gray' }}>
          {sol.content}
        </div>
      ))}

      <hr />
      <h3>🧠 Auto-Generate Tasks from Solution</h3>
      <textarea
        value={aiSolution}
        onChange={(e) => setAiSolution(e.target.value)}
        placeholder="Paste your solution here to extract tasks"
        rows={5}
        style={{ width: '100%' }}
      />
      <button onClick={handleGenerateTasks}>🪄 Generate Action Tasks</button>

      {generatedTasks.length > 0 && (
        <div>
          <h4>✅ Generated Tasks</h4>
          <ul>
            {generatedTasks.map((task, index) => (
              <li key={index}>
                <strong>{task.title}</strong> – Due: {new Date(task.dueDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChallengeDetails;
