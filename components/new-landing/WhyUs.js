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
      <h2 className="section-title">Why Choose Us</h2>
      <p className="section-subtitle">
        Features Tailored for Zambian Exam Success
      </p>
      <div className="features-container">
        <div className="feature-box">
          <div className="feature-icon-wrapper">🤖</div>
          <div className="feature-content">
            <h3>Interactive Exam Practice</h3>
            <p>
              Prepare with confidence using past exam papers complete with full
              solutions and explanations.
            </p>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-icon-wrapper">📱</div>
          <div className="feature-content">
            <h3>Mobile Accessibility</h3>
            <p>
              Study anytime, anywhere. The platform is optimized for Zambian
              students on mobile devices, making it easy to learn and revise on
              the go.
            </p>
          </div>
        </div>
        {/* <div className="feature-box">
          <div className="feature-icon-wrapper">🎮</div>
          <div className="feature-content">
            <h3>Engaging Practice</h3>
            <p>
              Learning made enjoyable! Experience interactive quizzes, and
              instant feedback to keep exam preparation motivating, effective,
              and rewarding.
            </p>
          </div>
        </div> */}
        <div className="feature-box">
          <div className="feature-icon-wrapper">📈</div>
          <div className="feature-content">
            <h3>Performance Insights</h3>
            <p>
              Track your progress in real time. Get personalized performance
              reports that highlight your strengths and show where to improve,
              so you can focus on what truly matters.
            </p>
          </div>
        </div>
        {/* <div className="feature-box">
          <div className="feature-icon-wrapper">🔒</div>
          <div className="feature-content">
            <h3>Secure Platform</h3>
            <p>
              Your privacy and progress matter. Our secure learning environment
              uses strong data protection standards to ensure that all your
              study sessions and results remain safe.
            </p>
          </div>
        </div> */}
        <div className="feature-box">
          <div className="feature-icon-wrapper">🌐</div>
          <div className="feature-content">
            <h3>Local Curriculum Support</h3>
            <p>
              Access resources built for Zambian learners, fully aligned with
              national education standards. Practice with relevant content that
              reflects what you’ll face in the real exam room.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default WhyUs;
