import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem 2rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        🎯 Crowd Solve
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link 
          to="/" 
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            background: isActive('/') ? 'rgba(255,255,255,0.2)' : 'transparent',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            if (!isActive('/')) {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive('/')) {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          🏠 Home
        </Link>
        
        {!token ? (
          <>
            <Link 
              to="/login" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                background: isActive('/login') ? 'rgba(255,255,255,0.2)' : 'transparent',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                if (!isActive('/login')) {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/login')) {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              🔐 Login
            </Link>
            
            <Link 
              to="/register" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                background: isActive('/register') ? 'rgba(255,255,255,0.2)' : 'transparent',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                if (!isActive('/register')) {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/register')) {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              📝 Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              color: 'white',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;