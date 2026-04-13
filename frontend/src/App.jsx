import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Security from './components/Security';
import Documentation from './components/Documentation';
import FAQ from './components/FAQ';

function App() {
  const [view, setView] = useState('landing');
  const [token, setToken] = useState(null);
  const [userCode, setUserCode] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('zism_token');
    const savedUser = localStorage.getItem('zism_user');
    if (savedToken) {
      setToken(savedToken);
      setUserCode(savedUser || 'UNKNOWN');
      setView('dashboard');
    }
  }, []);

  const handleLogin = (code) => {
    setToken(localStorage.getItem('zism_token'));
    setUserCode(code);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('zism_token');
    localStorage.removeItem('zism_user');
    setToken(null);
    setUserCode('');
    setView('landing');
  };

  return (
    <>
      {view === 'landing' && (
        <Landing 
          onLaunch={() => setView('auth')} 
          onSecurity={() => setView('security')}
          onDocs={() => setView('docs')}
          onFAQ={() => setView('faq')}
        />
      )}
      {view === 'auth' && <Auth onLogin={handleLogin} onBack={() => setView('landing')} />}
      {view === 'dashboard' && <Dashboard userCode={userCode} onLogout={handleLogout} />}
      {view === 'security' && <Security onBack={() => setView('landing')} />}
      {view === 'docs' && <Documentation onBack={() => setView('landing')} />}
      {view === 'faq' && <FAQ onBack={() => setView('landing')} />}
    </>
  );
}

export default App;
