import React, { useState } from "react";
import { motion, useInView } from "framer-motion";

const faqData = [
  {
    question:
      "What makes Sirius Educational Trust different from other exam preparation platforms?",
    answer:
      "Sirius Educational Trust focuses on Zambian Grade 12 and GCE students, offering comprehensive tests and resources tailored to the local curriculum. We provide accessible, high-quality materials with real-time feedback to help students succeed in their exams.",
  },
  {
    question: "How much does Sirius Educational Trust cost?",
    answer:
      "We offer affordable pricing plans starting from basic access. Contact us for details on subscriptions, with discounts available for students and institutions.",
  },
  {
    question: "Is Sirius Educational Trust suitable for GCE preparation?",
    answer:
      "Yes! Our platform is specifically designed for Grade 12 and GCE exam preparation, with specialized resources for Zambian students.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer customer support through email and phone during business hours, along with comprehensive guides and resources.",
  },
  {
    question: "Can I access Sirius Educational Trust on mobile devices?",
    answer:
      "Yes! Our platform is mobile-friendly, allowing students to study and practice exams anytime, anywhere.",
  },
];

function Faq() {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleFAQClick = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

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
      id="faq"
      className="faq-section"
      initial={fadeInVariants.initial}
      whileInView={fadeInVariants.visible}
      transition={fadeInVariants.transition}
      viewport={viewportOptions}
    >
      <h2 className="section-title">Frequently Asked Questions</h2>
      <p className="section-subtitle">
        Everything you need to know about Sirius Educational Trust
      </p>
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeFAQ === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => handleFAQClick(index)}>
              <h3>{faq.question}</h3>
              <div className="faq-toggle">+</div>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default Faq;
