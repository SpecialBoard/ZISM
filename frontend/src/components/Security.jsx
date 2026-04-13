import React from 'react';
import Grainient from './Grainient';
import GlassSurface from './GlassSurface';
import { ArrowLeft } from 'lucide-react';
import './InfoPages.css';
import './Auth.css'; // Reusing back button pill styles

export default function Security({ onBack }) {
  return (
    <div className="info-page-container blur-in">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Grainient
          color1="#88818d"
          color2="#3d3b45"
          color3="#B19EEF"
          timeSpeed={0.25}
          zoom={0.9}
        />
      </div>

      <div className="info-back-wrapper">
        <GlassSurface width="120px" height="48px" borderRadius={32} displace={0.3} brightness={110} opacity={0.1}>
          <button className="back-btn-pill" onClick={onBack}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} />
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>BACK</span>
          </button>
        </GlassSurface>
      </div>

      <div className="info-content-wrapper">
        <div className="info-header">
          <h1>Security Manifesto</h1>
          <p>Privacy is not an option. It is the core of the ZISM protocol.</p>
        </div>

        <div className="info-stack">
          <GlassSurface width="100%" height="auto" borderRadius={24} displace={0.1} opacity={0.05} mixBlendMode="screen">
            <div className="info-card-wide" style={{ padding: '24px' }}>
              <h3>01. Zero-Identity Protocol</h3>
              <p>
                We do not collect personal data. Your identity is a randomized code, ensuring absolute anonymity.
              </p>
            </div>
          </GlassSurface>

          <GlassSurface width="100%" height="auto" borderRadius={24} displace={0.1} opacity={0.05} mixBlendMode="screen">
            <div className="info-card-wide" style={{ padding: '24px' }}>
              <h3>02. At-Rest Protection</h3>
              <p>
                Messages are rendered unreadable at-rest. Only authenticated recipients can decrypt your conversations.
              </p>
            </div>
          </GlassSurface>

          <GlassSurface width="100%" height="auto" borderRadius={24} displace={0.1} opacity={0.05} mixBlendMode="screen">
            <div className="info-card-wide" style={{ padding: '24px' }}>
              <h3>03. Automated Destruction</h3>
              <p>
                Data is ephemeral. All records are hard-deleted every 24 hours to maintain a clean digital footprint.
              </p>
            </div>
          </GlassSurface>
        </div>
      </div>
    </div>
  );
}
