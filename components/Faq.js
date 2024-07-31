import React from "react";
import FaqListItem from "./FaqListItem";

const faqs = [
  {
    q: "Pricing",
    a: "All courses, ZMW 100 per month billed ZMW 25/week",
  },
  {
    q: "Getting started",
    a: "Step 1: Create account 2: Verify email Step 3: Subscribe Step 4: Follow through the payment steps Step 5: Approve payment Step 6: Log in with registered account to access student dashboard",
  },
  {
    q: "Featured courses",
    a: [
      "Civic Education 2030/1",
      "Science 5124/1",
      "Mathematics 4024/1",
      "Biology 5090/1",
    ],
  },
  {
    q: "Payment methods",
    a: "You can easily purchase subscription using VISA card, Airtel and MTN mobile money",
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
