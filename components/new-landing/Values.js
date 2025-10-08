import React from "react";
import { motion, useInView } from "framer-motion";

function Values() {
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
      id="values"
      initial={fadeInVariants.initial}
      whileInView={fadeInVariants.visible}
      transition={fadeInVariants.transition}
      viewport={viewportOptions}
    >
      <h2 className="section-title">Our Value to Society</h2>
      <p className="section-subtitle">
        Making a positive impact on education in Zambia
      </p>
      <div className="values-grid">
        <div className="value-card">
          <div className="value-icon">🌱</div>
          <div className="value-title">Accessibility</div>
          <div className="value-description">
            Providing affordable, high-quality learning resources to students
            across Zambia.
          </div>
        </div>
        <div className="value-card">
          <div className="value-icon">🚀</div>
          <div className="value-title">Innovation</div>
          <div className="value-description">
            Developing new ways to enhance exam preparation and learning
            outcomes.
          </div>
        </div>
        <div className="value-card">
          <div className="value-icon">🤝</div>
          <div className="value-title">Collaboration</div>
          <div className="value-description">
            Building a community of students and educators supporting each
            other.
          </div>
        </div>
        <div className="value-card">
          <div className="value-icon">♻️</div>
          <div className="value-title">Sustainability</div>
          <div className="value-description">
            Promoting digital learning to reduce environmental impact.
          </div>
        </div>
        <div className="value-card">
          <div className="value-icon">💡</div>
          <div className="value-title">Empowerment</div>
          <div className="value-description">
            Helping students gain skills for future success.
          </div>
        </div>
        <div className="value-card">
          <div className="value-icon">🎓</div>
          <div className="value-title">Excellence</div>
          <div className="value-description">
            Delivering high standards in exam preparation materials.
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Values;
