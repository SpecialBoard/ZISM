import React, { useState } from 'react';
import Grainient from './Grainient';
import GlassSurface from './GlassSurface';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import './InfoPages.css';
import './Auth.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <GlassSurface width="100%" height="auto" borderRadius={16} displace={0.05} opacity={isOpen ? 0.08 : 0.04} mixBlendMode="screen">
        <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
          <div className="faq-question">
            <span>{question}</span>
            <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease', opacity: 0.6 }} />
          </div>
          <div className={`faq-expand-wrapper ${isOpen ? 'open' : ''}`}>
            <div className="faq-answer-inner">
              {answer}
            </div>
          </div>
        </div>
      </GlassSurface>
    </div>
  );
};

export default function FAQ({ onBack }) {
  const faqs = [
    {
      question: "How do I recover my password?",
      answer: "You cannot. ZISM is a Zero-PII platform. We don't have your email or phone number. If you lose your login code or password, your account and its data are permanently unreachable."
    },
    {
      question: "Will my messages actually disappear?",
      answer: "Yes. Every message has a 24-hour expiration token. Our server-side cleanup task runs continuously to purge any data that has exceeded its Time-To-Live (TTL)."
    },
    {
      question: "Is ZISM end-to-end encrypted?",
      answer: "ZISM uses 'at-rest' server-side encryption. This means we encrypt messages before storing them in our database. It's a high level of security, but the server handles the keys for the sake of simplicity and cross-device speed."
    },
    {
      question: "How do I add friends?",
      answer: "Simply exchange your 6-8 character user code with your friend. Enter their code in the dashboard, and an encrypted channel will be generated instantly."
    }
  ];

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
        <div className="info-header" style={{ marginBottom: '48px' }}>
          <h1>Common Questions</h1>
          <p>Everything you need to know about the platform.</p>
        </div>

        <div style={{ paddingBottom: '40px' }}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
}
