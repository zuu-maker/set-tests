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
      </div>
      <Footer />
    </AuthCheck>
  );
}
