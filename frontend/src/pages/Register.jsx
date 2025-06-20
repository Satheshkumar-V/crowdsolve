import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = async () => {
    await axios.post('http://localhost:5000/api/auth/register', form);
    alert('Registered. Please login.');
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
