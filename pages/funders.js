import Footer from "@/components/new-landing/Footer";
import Navbar from "@/components/new-landing/Navbar";
import React from "react";

function Funders() {
  return (
    <div>
      {/* <p>hello</p> */}
      <Navbar />

      <div className="pb-16 px-6 pt-32">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-white to-pale-cyan/30 rounded-3xl shadow-2xl p-10 md:p-16 border border-primary-cyan/20">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The
              <span className="font-semibold text-primary-cyan">
                {" "}
                Scaling Access Project{" "}
              </span>
              by Sirius Educational Trust is an education innovation initiative
              dedicated to expanding access to quality, technology-enabled
              learning across Zambia.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold">Our mission is clear:</span> To
              bridge the digital divide and ensure every learner, regardless of
              school type or location, can access world-class learning
              opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              The Challenge
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              While Zambia has made significant progress in education access,
              learning inequality remains a persistent challenge. Public,
              community, and faith-based schools serve the majority of learners
              — yet they often face:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl">
                <span className="text-red-500 text-2xl flex-shrink-0">⚠️</span>
                <p className="text-gray-700">
                  Limited digital infrastructure and internet access
                </p>
              </div>
              <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl">
                <span className="text-red-500 text-2xl flex-shrink-0">⚠️</span>
                <p className="text-gray-700">
                  Shortages of qualified teachers and teaching resources
                </p>
              </div>
              <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl">
                <span className="text-red-500 text-2xl flex-shrink-0">⚠️</span>
                <p className="text-gray-700">
                  Overcrowded classrooms and limited individualized support
                </p>
              </div>
              <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl">
                <span className="text-red-500 text-2xl flex-shrink-0">⚠️</span>
                <p className="text-gray-700">
                  Inadequate funding for technology integration
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mt-8 font-semibold">
              Without targeted investment, these schools risk being left behind
              in the digital transformation of education.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-primary-cyan/5 to-secondary-cyan/5 rounded-3xl shadow-xl p-10 md:p-12 border-2 border-primary-cyan/30">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Our Solution
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The Scaling Access Project delivers a proven, locally adaptable
              model that strengthens schools and empowers learners through
              EdTech:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <span className="hidden lg:flex lg:flex-shrink-0 text-3xl">
                    ✅
                  </span>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-2">
                      AI-Driven Learning Platform
                    </h3>
                    <p className="text-gray-600">
                      Offers curriculum-aligned digital lessons, practice tests,
                      and flashcards tailored to Zambian and Cambridge syllabi.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <span className="hidden lg:flex lg:flex-shrink-0 text-3xl">
                    ✅
                  </span>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-2">
                      Teacher Empowerment
                    </h3>
                    <p className="text-gray-600">
                      Provides continuous training in digital pedagogy, enabling
                      teachers to blend traditional and technology-based
                      instruction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <span className="hidden lg:flex lg:flex-shrink-0 text-3xl">
                    ✅
                  </span>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-2">
                      School Enablement
                    </h3>
                    <p className="text-gray-600">
                      Supports public, community, and faith-based schools to
                      create tuition and after-school programs that enhance
                      learning and generate sustainability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <span className="hidden lg:flex lg:flex-shrink-0 text-3xl">
                    ✅
                  </span>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-2">
                      Equitable Access Model
                    </h3>
                    <p className="text-gray-600">
                      Uses cross-subsidies from private sector partnerships to
                      provide free or subsidized access for under-resourced
                      schools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mt-8 font-semibold text-center">
              This model ensures both educational impact and financial
              sustainability.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Why Fund This Project
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              By funding the Scaling Access Project, you will:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-gradient-to-r from-primary-cyan/10 to-secondary-cyan/10 p-5 rounded-xl border-l-4 border-primary-cyan">
                <span className="text-primary-cyan text-2xl flex-shrink-0">
                  💡
                </span>
                <p className="text-gray-700 font-medium">
                  Equip underserved schools with digital learning
                  infrastructure.
                </p>
              </div>
              <div className="flex items-start gap-4 bg-gradient-to-r from-primary-cyan/10 to-secondary-cyan/10 p-5 rounded-xl border-l-4 border-primary-cyan">
                <span className="text-primary-cyan text-2xl flex-shrink-0">
                  🚀
                </span>
                <p className="text-gray-700 font-medium">
                  Expand access to AI-powered education for marginalized
                  learners.
                </p>
              </div>
              <div className="flex items-start gap-4 bg-gradient-to-r from-primary-cyan/10 to-secondary-cyan/10 p-5 rounded-xl border-l-4 border-primary-cyan">
                <span className="text-primary-cyan text-2xl flex-shrink-0">
                  🎓
                </span>
                <p className="text-gray-700 font-medium">
                  Build teacher capacity to deliver engaging, effective
                  instruction.
                </p>
              </div>
              <div className="flex items-start gap-4 bg-gradient-to-r from-primary-cyan/10 to-secondary-cyan/10 p-5 rounded-xl border-l-4 border-primary-cyan">
                <span className="text-primary-cyan text-2xl flex-shrink-0">
                  🌱
                </span>
                <p className="text-gray-700 font-medium">
                  Create pathways for sustainable local ownership of EdTech
                  solutions.
                </p>
              </div>
            </div>

            <div className="mt-10 bg-gradient-to-r from-primary-cyan to-secondary-cyan p-8 rounded-2xl text-white text-center">
              <p className="text-xl font-semibold">
                Every contribution accelerates the inclusion of public,
                community, and faith-based schools in Zambia's digital learning
                revolution.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl shadow-2xl p-10 md:p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Funding Pathways</h2>
            <p className="text-lg leading-relaxed mb-10">
              We welcome philanthropic foundations, bilateral donors, corporate
              CSR programmes, and impact investors to join us in scaling this
              transformative model.
            </p>

            <h3 className="text-2xl font-bold mb-6">Funding Tiers:</h3>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl hidden lg:block">💡</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">
                      Innovation Partner
                    </h4>
                    <p>
                      Support R&D, platform localization, and AI content
                      optimization for Zambia's curriculum.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl hidden lg:block">🏫</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Access Partner</h4>
                    <p>
                      Fund deployment of digital learning in public, community,
                      and faith-based schools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl hidden lg:block">🌱</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Equity Partner</h4>
                    <p>
                      Sponsor free or low-cost access for vulnerable learners
                      and rural schools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-4xl hidden lg:block">🔗</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">
                      Strategic Partner
                    </h4>
                    <p>
                      Collaborate on data-driven impact measurement, policy
                      integration, and scaling across provinces.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed mt-10 bg-white/10 p-6 rounded-xl">
              All partnerships include transparent impact reporting, co-branding
              opportunities, and visibility in national education campaigns.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 text-center">
              Projected Impact (2026–2028)
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              <div className="bg-gradient-to-br from-primary-cyan/10 to-secondary-cyan/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-5xl font-bold text-primary-cyan mb-2">
                  300+
                </div>
                <p className="text-gray-700 font-medium">Schools Connected</p>
                <p className="text-sm text-gray-600 mt-2">
                  Public, community, and faith-based
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-cyan/10 to-secondary-cyan/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-5xl font-bold text-primary-cyan mb-2">
                  80,000
                </div>
                <p className="text-gray-700 font-medium">Learners</p>
                <p className="text-sm text-gray-600 mt-2">
                  Accessing digital learning
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-cyan/10 to-secondary-cyan/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-5xl font-bold text-primary-cyan mb-2">
                  2,000
                </div>
                <p className="text-gray-700 font-medium">Teachers Trained</p>
                <p className="text-sm text-gray-600 mt-2">
                  In digital pedagogy
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-cyan/10 to-secondary-cyan/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-5xl font-bold text-primary-cyan mb-2">
                  30,000
                </div>
                <p className="text-gray-700 font-medium">Vulnerable Learners</p>
                <p className="text-sm text-gray-600 mt-2">
                  Benefiting from free access
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-cyan/10 to-secondary-cyan/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                <div className="text-5xl font-bold text-primary-cyan mb-2">
                  60%
                </div>
                <p className="text-gray-700 font-medium">Improvement</p>
                <p className="text-sm text-gray-600 mt-2">
                  In learning outcomes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-cyan to-secondary-cyan rounded-3xl shadow-2xl p-10 md:p-16 text-white text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us</h2>
            <p className="text-lg leading-relaxed mb-8">
              Help us make digital learning a public good for every child in
              Zambia. Your support can unlock innovation in classrooms that need
              it most — from faith-based schools in rural communities to public
              schools in townships and peri-urban areas.
            </p>
            <p className="text-xl font-semibold mb-10">
              Partner with Sirius Educational Trust to transform education, one
              school at a time.
            </p>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 inline-block">
              <p className="text-2xl font-bold mb-4">📩 Contact Us:</p>
              <div className="space-y-3 text-left">
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <a
                    href="mailto:partnerships@set.edu.zm"
                    className="hover:underline font-medium"
                  >
                    info@set.edu.zm
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary-cyan/10 rounded-full blur-3xl float-animation"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl float-animation"
          style="animation-delay: 2s"
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-80 h-80 bg-pale-cyan/20 rounded-full blur-3xl float-animation"
          style="animation-delay: 4s"
        ></div>
      </div> */}
    </div>
  );
}

export default Funders;
