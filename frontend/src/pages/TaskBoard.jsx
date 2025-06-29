import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

function TaskBoard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const token = localStorage.getItem('token');

  const fetchChallenge = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/challenges/${id}`);
      setChallenge(res.data);
    } catch (error) {
      console.error('Error fetching challenge:', error);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.dueDate) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/tasks', {
        challengeId: id,
        ...newTask,
        checklist: []
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewTask({ title: '', dueDate: '', description: '' });
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task. Please try again.');
    }
    setLoading(false);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, {
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getStatusColor = (status) => ({
    'pending': '#ffc107',
    'in-progress': '#007bff',
    'completed': '#28a745'
  }[status] || '#ffc107');

  const getStatusIcon = (status) => ({
    'pending': '⏳',
    'in-progress': '🔄',
    'completed': '✅'
  }[status] || '⏳');

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  };

  const getUrgencyStyle = (dueDate) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return { color: '#ff6b6b', fontWeight: 'bold' };
    if (days <= 2) return { color: '#ff9500', fontWeight: 'bold' };
    return { color: '#666' };
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  useEffect(() => {
    fetchChallenge();
    fetchTasks();
  }, [id]);

  return (
    <div className="container animate-fade-in">
      <button 
        onClick={() => navigate(`/challenge/${id}`)}
        style={{
          background: 'rgba(102, 126, 234, 0.1)',
          color: '#667eea',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          marginBottom: '2rem'
        }}
      >
        ← Back to Challenge
      </button>

      {challenge && (
        <div className="form-container">
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#2c3e50', marginBottom: '1rem' }}>
            📋 Action Board: {challenge.title}
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Track and manage all tasks related to solving this challenge
          </p>
        </div>
      )}

      {/* Task Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Total Tasks', count: taskStats.total, icon: '📊', color: '#667eea' },
          { label: 'Pending', count: taskStats.pending, icon: '⏳', color: '#ffc107' },
          { label: 'In Progress', count: taskStats.inProgress, icon: '🔄', color: '#007bff' },
          { label: 'Completed', count: taskStats.completed, icon: '✅', color: '#28a745' }
        ].map((stat, index) => (
          <div key={index} className="card" style={{
            textAlign: 'center',
            background: `${stat.color}10`,
            borderLeft: `4px solid ${stat.color}`
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <h3 style={{ margin: 0, color: '#2c3e50' }}>{stat.count}</h3>
            <p style={{ margin: 0, color: '#666' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'pending', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                background: filter === status ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)',
                color: filter === status ? 'white' : '#667eea',
                border: filter === status ? 'none' : '1px solid rgba(102, 126, 234, 0.3)',
                padding: '8px 16px',
                fontSize: '0.9rem',
                textTransform: 'capitalize'
              }}
            >
              {status === 'all' ? 'All Tasks' : status.replace('-', ' ')}
            </button>
          ))}
        </div>

        {token && (
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{
              background: showForm ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '1rem'
            }}
          >
            {showForm ? '❌ Cancel' : '➕ Add Task'}
          </button>
        )}
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className="form-container animate-fade-in">
          <h3 className="section-title">✨ New Task</h3>

          <input
            placeholder="Task Title *"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          />

          <textarea
            placeholder="Task Description (optional)"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            rows={3}
          />

          <input
            type="date"
            value={newTask.dueDate}
            onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />

          <button
            onClick={handleAddTask}
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '⏳ Adding...' : '🚀 Add Task'}
          </button>
        </div>
      )}

      {loading && <div className="loading-spinner"></div>}

      {/* Task List */}
      <div className="grid">
        {filteredTasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            token={token}
            onStatusChange={updateTaskStatus}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
            getUrgencyStyle={getUrgencyStyle}
            getDaysUntilDue={getDaysUntilDue}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
          <h3>No {filter !== 'all' ? filter : ''} tasks yet!</h3>
          <p>{filter === 'all'
            ? 'Start by adding your first task to break down the challenge into actionable steps.'
            : `No ${filter.replace('-', ' ')} tasks found. Try a different filter.`}
          </p>
        </div>
      )}
    </div>
  );
}

export default TaskBoard;
