import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: 10, background: '#eee' }}>
      <Link to="/">🏠 Home</Link> | 
      <Link to="/login">🔐 Login</Link> | 
      <Link to="/register">📝 Register</Link>
    </nav>
  );
}

export default Navbar;
