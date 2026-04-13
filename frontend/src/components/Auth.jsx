import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { api } from '../utils/api';
import './Auth.css';
import Grainient from './Grainient';
import GlassSurface from './GlassSurface';

export default function Auth({ onLogin, onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const data = await api.login(code, password);
        localStorage.setItem('zism_token', data.access_token);
        localStorage.setItem('zism_user', code);
        onLogin(code);
      } else {
        const data = await api.register(password);
        setGeneratedCode(data.user_code);
        setCode(data.user_code);
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }} className="fade-in">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Grainient
          color1="#88818d"
          color2="#3d3b45"
          color3="#B19EEF"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1.95}
          warpFrequency={10.8}
          warpSpeed={4.1}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1.55}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div className="auth-back-wrapper">
        <GlassSurface 
          width="120px" 
          height="48px" 
          borderRadius={32} 
          displace={0.3} 
          brightness={110} 
          opacity={0.1}
          mixBlendMode="screen"
        >
          <button className="back-btn-pill" onClick={onBack}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} />
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>BACK</span>
          </button>
        </GlassSurface>
      </div>

      <div className="auth-container blur-in" style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <GlassSurface 
          width="400px" 
          height="auto" 
          borderRadius={24} 
          displace={0.15} 
          brightness={110} 
          opacity={0.08}
          mixBlendMode="screen"
        >
          <div className="auth-card">
            <h1>ZISM</h1>
            <p className="subtitle">Zero-Identity Secure Messaging</p>
            
            {generatedCode && (
              <div className="success-banner slide-up">
                Your Code is: <strong>{generatedCode}</strong><br/>
                Save this somewhere safe! You need it to login.
              </div>
            )}

            {error && <div className="error-banner slide-up">{error}</div>}

            <form onSubmit={handleSubmit}>
              {isLogin && (
                <div className="input-group">
                  <label>User Code</label>
                  <input 
                    type="text" 
                    placeholder="e.g. X7K9P2" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    required
                  />
                </div>
              )}
              
              <div className="input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginTop: '24px' }}>
                <GlassSurface 
                  width="100%" 
                  height={48} 
                  borderRadius={50}
                  displace={0.5}
                  distortionScale={-180}
                  brightness={90}
                  opacity={0.1}
                  mixBlendMode="screen"
                >
                  <button 
                    type="submit" 
                    disabled={loading} 
                    style={{ background: 'transparent', width: '100%', height: '100%', fontWeight: 500, letterSpacing: '0.5px', color: '#fff', padding: 0, border: 'none' }}>
                    {loading ? 'Wait...' : isLogin ? 'Login' : 'Generate Identity'}
                  </button>
                </GlassSurface>
              </div>
            </form>

            <div className="toggle-auth">
              {isLogin ? "Don't have an identity? " : "Already have a code? "}
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create one' : 'Login'}
              </span>
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}
