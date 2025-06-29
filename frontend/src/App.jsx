import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ChallengeBoard from './pages/ChallengeBoard';
import ChallengeDetails from './pages/ChallengeDetails';
import TaskBoard from './pages/TaskBoard';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChallengeBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/challenge/:id" element={<ChallengeDetails />} />
        <Route path="/tasks/:id" element={<TaskBoard />} />
      </Routes>
    </>
  );
}

export default App;
