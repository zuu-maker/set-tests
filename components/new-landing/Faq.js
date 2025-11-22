import React, { useState } from "react";
import { motion, useInView } from "framer-motion";

const faqData = [
  {
    question: "How to get started with Sirius Online Exam Practice Platform?",
    answer:
      "Sign up, verify your email, subscribe, follow through the payment steps, approve payment, log in with registered account to access student dashboard",
  },
  {
    question: "Payment methods",
    answer:
      "You can easily purchase subscription using VISA card, Airtel and MTN mobile money.",
  },
  {
    question: "What is the Sirius Online Exam Practice Platform?",
    answer:
      "It’s an interactive digital platform designed for Grade 12 and GCE students in Zambia. It offers practice tests, quizzes, and study resources aligned to the Zambian curriculum — helping students prepare effectively for their national exams.",
  },
  {
    question: " How are the practice tests designed?",
    answer:
      "The tests are developed by Zambian educators and examiners using the official Grade 12 and GCE syllabi. Each test mirrors real exam conditions and includes automatic feedback to help students understand their mistakes and improve.",
  },
  {
    question: "Can I access the platform on my phone?",
    answer:
      "Yes! The platform is mobile-friendly and optimized for low bandwidth, allowing you to study and take tests on your smartphone, tablet, or computer, anywhere and anytime.",
  },
  {
    question: "Do I need to be online to study?",
    answer:
      "You’ll need an internet connection to take the tests and track progress.",
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
