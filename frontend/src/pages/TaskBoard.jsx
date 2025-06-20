import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TaskBoard() {
  const { id } = useParams(); // challengeId
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '' });
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
    setTasks(res.data);
  };

  const handleAddTask = async () => {
    await axios.post('http://localhost:5000/api/tasks', {
      challengeId: id,
      title: newTask.title,
      dueDate: newTask.dueDate,
      checklist: []
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewTask({ title: '', dueDate: '' });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Action Board (Tasks)</h2>
      <input placeholder="Task Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
      <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />
      <button onClick={handleAddTask}>Add Task</button>
      {tasks.map(task => (
        <div key={task._id} style={{ marginTop: 10, padding: 10, border: '1px solid gray' }}>
          <h4>{task.title}</h4>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskBoard;
