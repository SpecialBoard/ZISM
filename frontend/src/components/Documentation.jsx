import React from 'react';
import Grainient from './Grainient';
import GlassSurface from './GlassSurface';
import { ArrowLeft } from 'lucide-react';
import './InfoPages.css';
import './Auth.css';

export default function Documentation({ onBack }) {
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
        <div className="info-header" style={{ marginBottom: '64px' }}>
          <h1>Privacy Policy</h1>
          <p>Transparent guidelines on how we treat your data.</p>
        </div>

        <GlassSurface width="100%" height="auto" borderRadius={32} displace={0.1} opacity={0.05} mixBlendMode="screen">
          <div style={{ padding: '48px' }}>
            <div className="info-card" style={{ marginBottom: '40px' }}>
              <h3>01. Zero Data Collection</h3>
              <p>
                We do not track IP addresses, browser fingerprints, or metadata. ZISM does not use cookies for tracking 
                and contains no third-party analytics. 
              </p>
            </div>

            <div className="info-card" style={{ marginBottom: '40px' }}>
              <h3>02. Ephemeral Storage</h3>
              <p>
                All content is temporary. We do not maintain long-term backups of your communications. 
                Our infrastructure is designed to forget as much as possible, as quickly as possible.
              </p>
            </div>

            <div className="info-card" style={{ marginBottom: '40px' }}>
              <h3>03. Usage Guidelines</h3>
              <p>
                As a user, you are responsible for maintaining your alphanumeric login code. 
                We cannot recover lost identities because we do not have any link to your real-world credentials.
              </p>
            </div>

            <div className="info-card">
              <h3>04. The Manifesto</h3>
              <p>
                Privacy is the default state of the universe. Communication should be as private as a whispered conversation 
                in an empty room. ZISM is the digital representation of that room.
              </p>
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}
