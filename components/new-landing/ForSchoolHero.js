import React from "react";

function ForSchoolHero() {
  return (
    <div>
      {" "}
      <div class="pt-32 pb-20 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="mb-12">
            <div class="bg-gray-100 rounded-2xl px-6 py-3 inline-block mb-8">
              <p class="text-gray-700 font-medium">
                Smart Schools Growth Accelerator Program
              </p>
            </div>

            <h1 class="text-5xl md:text-7xl font-bold text-slate-800 mb-6">
              Grow Your School
              <br />
              <span class="italic">with AI-Powered Learning</span>
            </h1>

            <p class="text-lg text-gray-600 max-w-4xl leading-relaxed mb-8">
              As education evolves, private schools are uniquely positioned to
              unlock new opportunities by embracing innovation, adapting to
              digital tools, and meeting the changing demands of students and
              parents. To support this transformation, Sirius Educational Trust
              has merged AI-driven study tools, personalized revision and live
              teaching features to create a powerful yet affordable AI- learning
              platform customized for local needs.
            </p>
          </div>

          <div class="bg-white rounded-3xl shadow-xl p-10 mb-12 hover:shadow-2xl transition-shadow duration-300 shadow-cyan-100/50">
            <h2 class="text-2xl font-bold text-slate-800 mb-6">
              Benefits to Your School:
            </h2>

            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <span class="text-primary-cyan text-xl mt-1">•</span>
                <span class="text-gray-700 text-lg">Attract new students</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary-cyan text-xl mt-1">•</span>
                <span class="text-gray-700 text-lg">
                  Generate additional income
                </span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary-cyan text-xl mt-1">•</span>
                <span class="text-gray-700 text-lg">Boost leaner outcome</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary-cyan text-xl mt-1">•</span>
                <span class="text-gray-700 text-lg">
                  Strengthen brand reputation
                </span>
              </li>
            </ul>
          </div>

          <div class="text-center space-y-6">
            <a
              href="#"
              class="inline-block bg-gradient-to-r from-slate-700 to-slate-800 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Book a Free Demo
            </a>

            <p class="text-gray-600 text-lg">Chat with us on WhatsApp</p>
          </div>
        </div>
      </div>
      <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div class="absolute top-20 left-10 w-64 h-64 bg-secondary-cyan/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default ForSchoolHero;
