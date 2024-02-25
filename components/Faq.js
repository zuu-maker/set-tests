import React from "react";
import FaqListItem from "./FaqListItem";

const faqs = [
  {
    q: "What is a psychometric test?",
    a: "Psychometric tests, also know as an aptitude test, are now an integral part of the job interview process.  It is used as a means to filter out large applications at the early stage of the screening process.",
  },
  {
    q: "Why do employers use psychometric tests?",
    a: "With thousands of applications received for open positions, psychometric tests are an objective, transparent, quick and easier tool to reduce applicant pool and identify suitable employees. Research has revealed that candidates that score highly in a psychometric test tend to perform well in their job. This predicative quality makes psychometric tests very attractive to employers.",
  },
  {
    q: "Why should I invest in psychometric tests?",
    a: "If you are applying for a job (especially graduate entry level and internship positions) you will mostly likely encounter some form of psychometric test as a preliminary round of the application process. They have become the standard way in which employers judge abilities – your capacity to work with numbers, words and diagrams; your attainment – what you actually know; and your personality – how you’re likely to act.",
  },
  {
    q: "How are psychometric tests administered?",
    a: "They are normally administered online and candidates are required to submit answers within the time limits. Without online practice, many applicants struggle to get past this stage.",
  },
];

const Faq = () => {
  return (
    <React.Fragment>
      <div id="faq" className="bg-white">
        <div className="container mx-auto max-w-4xl px-6 py-10">
          <h1 className="text-2xl text-cyan-500 font-semibold tracking-tight sm:text-center sm:text-4xl ">
            FAQs
          </h1>
          {faqs.map((item, i) => (
            <FaqListItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq;
