import React from "react";
import { motion, useInView } from "framer-motion";

function About() {
  const fadeInVariants = {
    initial: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeInOut" }, // Matches CSS 'ease' (cubic-bezier(0.25, 0.1, 0.25, 1.0))
  };

  // Common viewport options (matches your observer threshold/rootMargin)
  const viewportOptions = {
    once: true, // Animate only once
    margin: "0px 0px -100px 0px",
    amount: 0.1, // 10% of the element must be visible to trigger
  };

  return (
    <motion.section
      id="about"
      className="about-section" // Your existing class
      initial={fadeInVariants.initial}
      whileInView={fadeInVariants.visible}
      transition={fadeInVariants.transition}
      viewport={viewportOptions}
    >
      <h2 className="section-title">About</h2>
      <p className="section-subtitle">
        We believe every learner can achieve greatness
      </p>
      <div className="about-content">
        <div className="about-text">
          <p>
            Sirius Smart Schools is a digital learning platform developed by
            Sirius Educational Trust. Whether preparing for the School
            Certificate, GCE, or internal assessments, our platform empowers
            learners across Zambia with innovative tools and teacher-curated
            resources that drive better learning outcomes.
          </p>
          <br />
        </div>
        <div className="about-visual">
          <div className="feature-cards">
            <div className="feature-card">
              <div className="card-icon">🎯</div>
              <div className="card-title">Tailored Preparation</div>
              <div className="card-text">
                Learning resources customized for Grade 12 and GCE students in
                Zambia
              </div>
            </div>
            <div className="feature-card">
              <div className="card-icon">🌍</div>
              <div className="card-title">Local Focus</div>
              <div className="card-text">
                Aligned with Zambian curriculum and exam standards
              </div>
            </div>
            <div className="feature-card">
              <div className="card-icon">📊</div>
              <div className="card-title">Progress Tracking</div>
              <div className="card-text">
                Tools to monitor and improve exam performance
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default About;
