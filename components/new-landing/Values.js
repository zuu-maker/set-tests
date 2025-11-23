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
      <h2 className="section-title">Our Promise</h2>
      <p className="section-subtitle">
        Making a positive impact on education in Zambia
      </p>
      <div className="values-grid">
        <div className="value-card">
          <div className="value-icon">💡</div>
          <div className="value-title">Accessibility</div>
          <div className="value-description">
            Every child, regardless of background, deserves quality education.
          </div>
        </div>
        {/* <div className="value-card">
          <div className="value-icon">🚀</div>
          <div className="value-title">Collaboration</div>
          <div className="value-description">
            Our model thrives on partnerships. We work collaboratively with
            schools, funders, government agencies, and technology partners to
            co-create sustainable education ecosystems.
          </div>
        </div> */}
        {/* <div className="value-card">
          <div className="value-icon">🤝</div>
          <div className="value-title">Sustainability</div>
          <div className="value-description">
            We operate as a social enterprise, reinvesting revenue from school
            partnerships into training, platform development, and outreach.
          </div>
        </div> */}
        <div className="value-card">
          <div className="value-icon">🚀</div>
          <div className="value-title">Innovation</div>
          <div className="value-description">
            Innovation is at the heart of everything we do.
          </div>
        </div>
        {/* <div className="value-card">
          <div className="value-icon">💡</div>
          <div className="value-title">Empowerment</div>
          <div className="value-description">
            Our programs strengthen institutional capacity, enhance teaching
            effectiveness, and promote student-centered learning — turning
            schools into centres of innovation and community impact.
          </div>
        </div> */}
        <div className="value-card">
          <div className="value-icon">🎓</div>
          <div className="value-title">Excellence</div>
          <div className="value-description">
            We deliver with precision, purpose and pride.
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Values;
