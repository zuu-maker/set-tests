import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">GET READY TO EXCEL.</h1>
          <p className="hero-subtitle">Grade 12 &amp; GCE exam practice</p>
          <div className="hero-buttons">
            <Link href="/browse" className="primary-button">
              View Courses
            </Link>
          </div>
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">400+</div>
              <div className="stat-label">Learners</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10</div>
              <div className="stat-label">Tests</div>
            </div>
            {/* <div className="stat-card">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Satisfaction</div>
                </div> */}
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-container">
            <div className="central-sphere"></div>
            <div className="orbit orbit-1">
              <div className="orbit-dot"></div>
            </div>
            <div className="orbit orbit-2">
              <div className="orbit-dot"></div>
            </div>
            <div className="floating-icon">📖</div>
            <div className="floating-icon">🎓</div>
            <div className="floating-icon">💡</div>
            <div className="floating-icon">🚀</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
