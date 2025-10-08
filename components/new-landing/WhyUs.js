import React from "react";
import { motion, useInView } from "framer-motion";

function WhyUs() {
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
      id="features"
      initial={fadeInVariants.initial}
      whileInView={fadeInVariants.visible}
      transition={fadeInVariants.transition}
      viewport={viewportOptions}
    >
      <h2 className="section-title">Why Choose Sirius Educational Trust?</h2>
      <p className="section-subtitle">
        Features tailored for Zambian exam success
      </p>
      <div className="features-container">
        <div className="feature-box">
          <div className="feature-icon-wrapper">🤖</div>
          <div className="feature-content">
            <h3>Comprehensive Tests</h3>
            <p>
              Practice with exams aligned to Grade 12 and GCE syllabi, providing
              essential preparation.
            </p>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-icon-wrapper">📱</div>
          <div className="feature-content">
            <h3>Mobile Accessibility</h3>
            <p>
              Study on any device, optimized for Zambian students on the go.
            </p>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-icon-wrapper">🎮</div>
          <div className="feature-content">
            <h3>Engaging Practice</h3>
            <p>
              Interactive elements to make exam preparation motivating and
              effective.
            </p>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-icon-wrapper">📈</div>
          <div className="feature-content">
            <h3>Performance Insights</h3>
            <p>
              Track your progress with reports to focus on areas needing
              improvement.
            </p>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-icon-wrapper">🔒</div>
          <div className="feature-content">
            <h3>Secure Platform</h3>
            <p>Protecting your data with strong security measures.</p>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-icon-wrapper">🌐</div>
          <div className="feature-content">
            <h3>Local Curriculum Support</h3>
            <p>Resources designed for Zambian education standards.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default WhyUs;
