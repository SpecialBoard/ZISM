import { useState, useEffect, useRef } from 'react';
import { api } from '../utils/api';
import { Send, UserPlus, LogOut, MessageSquare } from 'lucide-react';
import './Dashboard.css';
import GlassSurface from './GlassSurface';
import Grainient from './Grainient';

export default function Dashboard({ userCode, onLogout }) {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [friendCode, setFriendCode] = useState('');
  const [error, setError] = useState('');
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    let interval;
    if (activeChannel) {
      fetchMessages();
      interval = setInterval(fetchMessages, 3000);
    }
    return () => clearInterval(interval);
  }, [activeChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchChannels = async () => {
    try {
      const data = await api.getChannels();
      setChannels(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    if (!activeChannel) return;
    try {
      const data = await api.getMessages(activeChannel.id);
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.addFriend(friendCode);
      setFriendCode('');
      fetchChannels();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    try {
      await api.sendMessage(activeChannel.id, messageText);
      setMessageText('');
      fetchMessages();
    } catch (err) {
      console.error(err);
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
      <div className="dashboard" style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
        <div className="sidebar">
        <div className="sidebar-header">
          <h2>ZISM</h2>
          <div className="my-code">My Code: <span>{userCode}</span></div>
        </div>

        <form className="add-friend-form" onSubmit={handleAddFriend}>
          <input 
            type="text" 
            placeholder="Friend Code" 
            value={friendCode}
            onChange={(e) => setFriendCode(e.target.value.toUpperCase())}
          />
          <GlassSurface 
            width={40} 
            height={40} 
            borderRadius={20}
            displace={0.5}
            brightness={90}
            opacity={0.1}
            mixBlendMode="screen"
            className="flex-shrink-0"
          >
            <button type="submit" title="Add Friend" style={{ background: 'transparent', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: 'none', padding: 0 }}>
              <UserPlus size={18} />
            </button>
          </GlassSurface>
        </form>
        {error && <div className="error-text">{error}</div>}

        <div className="channels-list">
          {channels.length === 0 ? (
            <div className="empty-state">No friends yet.</div>
          ) : (
            channels.map(ch => (
              <div 
                key={ch.id} 
                className={`channel-item ${activeChannel?.id === ch.id ? 'active' : ''}`}
                onClick={() => setActiveChannel(ch)}
              >
                <MessageSquare size={16} />
                <span>Channel</span>
              </div>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <GlassSurface 
            width="100%" 
            height={44} 
            borderRadius={22}
            displace={0.5}
            distortionScale={-180}
            brightness={90}
            opacity={0.1}
            mixBlendMode="screen"
          >
            <button className="logout-btn" onClick={onLogout} style={{ background: 'transparent', border: 'none', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#fff', padding: 0 }}>
              <LogOut size={16} /> Logout
            </button>
          </GlassSurface>
        </div>
      </div>

      <div className="chat-area">
        {activeChannel ? (
          <>
            <div className="chat-header">
              <h3>Secure Channel</h3>
            </div>
            
            <div className="messages-container">
              {messages.length === 0 ? (
                <div className="empty-chat">Say hello! Messages expire in 24 hours.</div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="message-bubble received fade-in" title={new Date(msg.created_at).toLocaleString()}>
                    <div className="msg-text">{msg.text}</div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                placeholder="Type a secure message..." 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <GlassSurface 
                width={48} 
                height={46} 
                borderRadius={23}
                displace={0.5}
                brightness={90}
                opacity={0.1}
                mixBlendMode="screen"
              >
                <button type="submit" title="Send encrypted" style={{ background: 'transparent', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: 'none', padding: 0 }}>
                  <Send size={18} />
                </button>
              </GlassSurface>
            </form>
          </>
        ) : (
          <div className="no-channel-selected fade-in">
            <MessageSquare size={48} opacity={0.2} />
            <p>Select a channel or add a friend to start chatting</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
