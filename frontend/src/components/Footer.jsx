import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">CRYPTO<span>TRACKER</span></h3>
          <p className="footer-desc"> Full-stack monitoring solution for crypto currency.</p>
        </div>
        
        <div className="footer-section">
          <h4>Stack</h4>
          <ul className="footer-links">
            <li>React & Vite</li>
            <li>Spring Boot</li>
            <li>Recharts</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Links</h4>
          <ul className="footer-links">
            <li><a href="https://github.com/valentinpashov" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CryptoTracker. Built for the Crypto Community.</p>
      </div>
    </footer>
  );
};

export default Footer;