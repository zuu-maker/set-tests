import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Offer from "@/components/Offer";
import Head from "next/head";
import WhyUs from "@/components/WhyUs";
import Faq from "@/components/Faq";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import AuthCheck from "@/components/auth/AuthCheck";

export default function Home() {
  return (
    <AuthCheck>
      <Head>
        <title>Sirius Educational Trust</title>
        <meta>
          Providing quality education and exam preparation services. Access
          affordable online courses and exam practice materials for Grade 12 &
          GCE students.
        </meta>
        <link rel="icon" href="/favicon.ico" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            _html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS}, {
            page_path:window.location.pathname,
          });`,
          }}
        />
      </Head>

      <Banner show={true} />

      <div className="container mx-auto">
        <Hero />
        <AboutUs />
        <Offer />
        <WhyUs />
        <Faq />
        <a
          className="z-100 fixed bottom-20 right-14"
          href="https://wa.me/972507705"
          target="_blank"
        >
          <img src="/whatsapp.svg" className=" h-14" alt="" />
        </a>
      </div>
      <Footer />
    </AuthCheck>
  );
}
