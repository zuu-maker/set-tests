import React from "react";

function ForSchoolPricing() {
  const handleEmail = () => {
    window.location.href = "mailto:someone@example.com";
  };
  return (
    <div className="">
      <div className="pt-32 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            {/* <p className="text-red-500 font-semibold text-lg mb-4">
              For Schools - 2
            </p> */}
            <h1 className="text-5xl md:text-6xl font-bold text-dark-text mb-6">
              Choose Your Growth
              <span className="italic text-primary-cyan">{" Plan"}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upgrade and grow with our scalable and affordable pricing plans.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16 mt-12">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-8 text-white shadow-2xl hover:-translate-y-2 transition-all duration-300 float-animation float-delay-1">
              <h2 className="text-3xl font-bold mb-6">
                EXAM
                <br />
                PRACTICE
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Interactive Tests</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>

                  <span>Learner analytics and progress tracker</span>
                </div>

                <div className="flex font-bold items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <span>Schools introducing digital learning</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm mb-1">→ Starting at</p>
                <p className="text-2xl font-bold">K1,500/month</p>
              </div>

              <button
                onClick={handleEmail}
                className="w-full bg-white text-slate-800 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
              >
                Contact Sales
              </button>
            </div>

            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-8 text-white shadow-2xl hover:-translate-y-2 transition-all duration-300 relative float-animation float-delay-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-cyan text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                Popular
              </div>

              <h2 className="text-3xl font-bold mb-6">REVISION PLUS</h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Everything in Exam Practice</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Adds AI Flashcards</span>
                </div>

                <div className="flex font-bold items-start gap-3">
                  <span className="text-2xl">🏫</span>
                  <span>Schools expanding into after-school support</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm mb-1">→ Starting at</p>
                <p className="text-2xl font-bold">K2,500/month</p>
              </div>

              <button
                onClick={handleEmail}
                className="w-full bg-white text-slate-800 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
              >
                Contact Sales
              </button>
            </div>

            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-8 text-white shadow-2xl hover:-translate-y-2 transition-all duration-300 float-animation float-delay-3">
              <h2 className="text-3xl font-bold mb-6">ENTERPRISE</h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Includes live clases + tutor dashboard</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Online and hybrid learning instructions</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm mb-1">→ Custom pricing</p>
              </div>

              <button
                onClick={handleEmail}
                className="w-full bg-white text-slate-800 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-dark-text mb-4">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="text-lg text-gray-600">
                Have questions about set-up, training or integration? We are
                here to help
              </p>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <a
                href="#faqs"
                className="inline-flex items-center gap-2 text-red-500 font-semibold text-lg hover:text-red-600 transition-colors mb-4"
              >
                Link to For Schools FAQs Page (below) →
              </a>

              <div className="mt-8">
                <a
                  href="https://wa.me/"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-slate-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all"
                >
                  Talk to Us
                </a>
                <p className="text-sm text-gray-500 mt-2">Link to WhatsApp →</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default ForSchoolPricing;
