import React from 'react';
import Grainient from './Grainient';
import GlassSurface from './GlassSurface';
import './Landing.css';

export default function Landing({ onLaunch, onSecurity, onDocs, onFAQ }) {
  return (
    <div className="landing-light blur-in">
      <div className="landing-grainient-bg">
        <Grainient
          color1="#9A93A6"
          color2="#4E4B59"
          color3="#A88BFF"
          timeSpeed={0.20}
          colorBalance={0}
          warpStrength={1.8}
          warpFrequency={12}
          warpSpeed={3.5}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={300}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          contrast={1.4}
          gamma={1}
          saturation={1.4}
        />
      </div>
      <div className="landing-hands-overlay fade-in"></div>

      {/* Top Navigation Bar */}
      <nav className="landing-nav slide-up delay-1">
        <div className="nav-brand">ZISM</div>
        <div className="nav-links-wrapper">
          <GlassSurface 
            width="360px" 
            height="42px" 
            borderRadius={32}
            displace={0.2}
            brightness={110}
            opacity={0.08}
            mixBlendMode="screen"
          >
            <div className="nav-links">
              <button className="nav-pill-btn" onClick={onSecurity}>Security</button>
              <button className="nav-pill-btn" onClick={onDocs}>Docs</button>
              <button className="nav-pill-btn" onClick={onFAQ}>FAQ</button>
            </div>
          </GlassSurface>
        </div>
        <div style={{ width: '160px' }}></div>
      </nav>

      {/* Main Hero Center */}
      <div className="landing-hero slide-up delay-2">
        <h1 className="hero-heading">
          <span className="heading-light">Zero-Identity</span>
          <span className="heading-dark">Secure Messaging</span>
        </h1>
        <p className="hero-subheading">
          A privacy-first messaging backend where users connect via codes, messages are encrypted at rest, and data automatically disappears.
        </p>
        <div className="hero-cta-wrapper">
          <GlassSurface 
            width="220px" 
            height="56px" 
            borderRadius={32}
            displace={0.4}
            brightness={120}
            opacity={0.2}
            mixBlendMode="plus-lighter"
          >
            <button className="hero-cta" onClick={onLaunch}>Enter the secure space</button>
          </GlassSurface>
        </div>
      </div>

      {/* Footer Texts positioned absolutely */}
      <div className="landing-footer-left fade-in delay-3">
        Zero-Identity Protocol
      </div>
      <div className="landing-footer-center fade-in delay-3"></div>
      <div className="landing-footer-right fade-in delay-3">
        Absolute Privacy. Ephemeral Communication.
      </div>
    </div>
  );
}
