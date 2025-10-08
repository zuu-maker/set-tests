import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Offer from "@/components/Offer";
import Head from "next/head";
import WhyUs from "@/components/WhyUs";
import Faq from "@/components/Faq";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import AuthCheck from "@/components/auth/AuthCheck";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Navbar scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      });
    }, observerOptions);

    // Observe all sections after component mounts
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add(
        "transition-all",
        "duration-700",
        "ease-out",
        "opacity-0",
        "translate-y-8"
      );
      observer.observe(section);
    });

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleFAQClick = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <AuthCheck>
      <Head>
        <title>Sirius Educational Trust</title>
        <meta>
          Providing quality education and exam preparation services. Access
          affordable online courses and exam practice materials for Grade 12
          &amp; GCE students.
        </meta>
        <link rel="icon" href="/favicon.ico" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS}', {
            page_path: window.location.pathname,
          });`,
          }}
        />
      </Head>

      <Banner show={true} />

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 opacity-30 pointer-events-none overflow-hidden">
          <div className="absolute w-72 h-72 lg:w-96 lg:h-96 top-10 left-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute w-48 h-48 lg:w-64 lg:h-64 top-3/4 right-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="absolute w-32 h-32 lg:w-48 lg:h-48 top-1/2 left-1/2 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-24 pb-20">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left animate-fade-in-left">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-gray-900 to-cyan-600 bg-clip-text text-transparent">
                GET READY TO EXCEL.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Grade 12 &amp; GCE exam practice
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  href="/browse"
                  className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  View Courses
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-2xl text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-md">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-400 bg-clip-text text-transparent mb-1">
                    400+
                  </div>
                  <div className="text-sm text-gray-600">Learners</div>
                </div>
                <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-2xl text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-md">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-400 bg-clip-text text-transparent mb-1">
                    10
                  </div>
                  <div className="text-sm text-gray-600">Tests</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-fade-in-right mt-12 lg:mt-0">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] mx-auto">
                {/* Central Sphere */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-cyan-100/20 to-cyan-200/30 rounded-full animate-spin-slow shadow-2xl"></div>

                {/* Orbits */}
                <div className="absolute inset-0 sm:inset-8 lg:inset-12 border-2 border-cyan-200/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 sm:inset-4 lg:inset-6 border-2 border-cyan-200/30 rounded-full animate-spin-reverse"></div>

                {/* Floating Icons */}
                <div className="absolute top-8 left-8 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-xl animate-bounce animation-delay-0">
                  📖
                </div>
                <div className="absolute top-8 right-8 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-xl animate-bounce animation-delay-1000">
                  🎓
                </div>
                <div className="absolute bottom-8 left-8 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-xl animate-bounce animation-delay-2000">
                  💡
                </div>
                <div className="absolute bottom-8 right-8 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-xl animate-bounce animation-delay-3000">
                  🚀
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12"
        >
          <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-cyan-600 bg-clip-text text-transparent">
              About
            </h2>
            <p className="text-lg sm:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Assisting students in Zambia with quality exam preparation
            </p>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Our mission is to assist candidates prepare and succeed in
                  school exams while fostering a love for learning. Through
                  accessible, high-quality educational resources and supportive
                  mentorship, we help students overcome academic challenges,
                  achieve their full potential, and build the foundation for
                  future educational and career success.
                </p>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {/* Feature Cards */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl sm:text-5xl mb-3">🎯</div>
                  <div className="text-lg sm:text-xl font-semibold mb-2">
                    Tailored Preparation
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Learning resources customized for Grade 12 and GCE students
                    in Zambia
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl sm:text-5xl mb-3">🌍</div>
                  <div className="text-lg sm:text-xl font-semibold mb-2">
                    Local Focus
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Aligned with Zambian curriculum and exam standards
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl sm:text-5xl mb-3">📊</div>
                  <div className="text-lg sm:text-xl font-semibold mb-2">
                    Progress Tracking
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Tools to monitor and improve exam performance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          id="values"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-cyan-600 bg-clip-text text-transparent">
              Our Value to Society
            </h2>
            <p className="text-lg sm:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Making a positive impact on education in Zambia
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: "🌱",
                  title: "Accessibility",
                  desc: "Providing affordable, high-quality learning resources to students across Zambia.",
                },
                {
                  icon: "🚀",
                  title: "Innovation",
                  desc: "Developing new ways to enhance exam preparation and learning outcomes.",
                },
                {
                  icon: "🤝",
                  title: "Collaboration",
                  desc: "Building a community of students and educators supporting each other.",
                },
                {
                  icon: "♻️",
                  title: "Sustainability",
                  desc: "Promoting digital learning to reduce environmental impact.",
                },
                {
                  icon: "💡",
                  title: "Empowerment",
                  desc: "Helping students gain skills for future success.",
                },
                {
                  icon: "🎓",
                  title: "Excellence",
                  desc: "Delivering high standards in exam preparation materials.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="relative bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-full flex items-center justify-center text-4xl">
                    {value.icon}
                  </div>
                  <div className="text-xl font-semibold mb-3">
                    {value.title}
                  </div>
                  <div className="text-gray-600">{value.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section
          id="features"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-cyan-600 bg-clip-text text-transparent">
              Why Choose Sirius Educational Trust?
            </h2>
            <p className="text-lg sm:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Features tailored for Zambian exam success
            </p>
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  icon: "🤖",
                  title: "Comprehensive Tests",
                  desc: "Practice with exams aligned to Grade 12 and GCE syllabi, providing essential preparation.",
                },
                {
                  icon: "📱",
                  title: "Mobile Accessibility",
                  desc: "Study on any device, optimized for Zambian students on the go.",
                },
                {
                  icon: "🎮",
                  title: "Engaging Practice",
                  desc: "Interactive elements to make exam preparation motivating and effective.",
                },
                {
                  icon: "📈",
                  title: "Performance Insights",
                  desc: "Track your progress with reports to focus on areas needing improvement.",
                },
                {
                  icon: "🔒",
                  title: "Secure Platform",
                  desc: "Protecting your data with strong security measures.",
                },
                {
                  icon: "🌐",
                  title: "Local Curriculum Support",
                  desc: "Resources designed for Zambian education standards.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex gap-4 shadow-lg hover:shadow-xl hover:translate-x-2 hover:border-cyan-400 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-50 to-white rounded-3xl p-8 sm:p-12 lg:p-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 to-cyan-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-center text-gray-600 mb-12">
              Everything you need to know about Sirius Educational Trust
            </p>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white border rounded-2xl shadow-md transition-all duration-300 ${
                    activeFAQ === index
                      ? "border-cyan-400 shadow-xl"
                      : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => handleFAQClick(index)}
                    className="w-full px-6 sm:px-8 py-5 sm:py-6 flex justify-between items-center text-left hover:bg-cyan-50 transition-colors duration-200 rounded-2xl"
                  >
                    <h3 className="text-base sm:text-lg font-medium pr-4">
                      {faq.question}
                    </h3>
                    <div
                      className={`w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold transition-transform duration-300 ${
                        activeFAQ === index ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeFAQ === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 sm:px-8 pb-5 sm:pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                  About Sirius Educational Trust
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Assisting Zambian students with exam preparation and quality
                  education resources.
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-11 h-11 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-cyan-400 hover:border-transparent hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  >
                    f
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-cyan-400 hover:border-transparent hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  >
                    Tik
                  </a>
                </div>
              </div>
              <div className="col-span-1">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                  Policies
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-white/10 text-gray-400">
              <p>
                &copy; 2024 Sirius Educational Trust. All rights reserved. Made
                with 💙 for Zambian students.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AuthCheck>
  );
}
