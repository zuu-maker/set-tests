import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import firebase from "firebase";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";

import { db } from "@/firebase";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import CourseTests from "@/components/browse/CourseTests";
import BreadCrumb from "@/components/browse/BreadCrumb";
import CourseInfo from "@/components/browse/CourseInfo";
import Navbar from "@/components/new-landing/Navbar";
import Footer from "@/components/new-landing/Footer";

const INITIAL_STATE = {
  date: null,
  course: null,
  tests: [],
  promoCode: "",
  amount: 0,
  discount: 0,
};

function BrowseItem() {
  const [state, setState] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState({
    page: true,
    subscription: false,
    promoValidation: false,
  });

  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchCourseData();
    fetchRates();
  }, []);

  const fetchCourseData = async () => {
    try {
      const courseDoc = await db.collection("Courses").doc(id).get();
      const courseData = courseDoc.data();

      const testsSnapshot = await db
        .collection("Courses")
        .doc(id)
        .collection("Tests")
        .orderBy("year", "desc")
        .orderBy("title", "asc")
        .get();

      const testsData = testsSnapshot.docs.map((doc) => doc.data());

      setState((prev) => ({
        ...prev,
        course: courseData,
        tests: testsData,
        date: courseData.timeStamp.toDate().toISOString().split("T")[0],
      }));
    } catch (error) {
      console.error("Error fetching course data:", error);
      toast.error("Failed to fetch course data");
    } finally {
      setIsLoading((prev) => ({ ...prev, page: false }));
    }
  };

  const fetchRates = async () => {
    try {
      const ratesSnapshot = await db.collection("Rates").get();
      if (!ratesSnapshot.empty) {
        setState((prev) => ({
          ...prev,
          amount: ratesSnapshot.docs[0].data().price,
        }));
      }
    } catch (error) {
      console.error("Error fetching rates:", error);
      toast.error("Failed to fetch rates");
    }
  };

  const handleSubscribe = async () => {
    if (!state.course?.id || !user?._id) return;

    setIsLoading((prev) => ({ ...prev, subscription: true }));
    const toastId = toast.loading("Processing...");

    try {
      const sessionDoc = await db.collection("Sessions").add({
        email: user.email,
        phone: user.phone,
        _id: user._id,
        name: user.name,
        originalAmount: state.discount + state.amount,
        discountAmount: state.discount,
        amount: state.amount,
        promoCode: state.promoCode,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      await db.collection("Sessions").doc(sessionDoc.id).update({
        id: sessionDoc.id,
      });

      toast.success("Proceed to payment");
      router.push(`/payment/${sessionDoc.id}`);
    } catch (error) {
      console.error("Error processing subscription:", error);
      toast.error("Cannot process subscription");
    } finally {
      toast.dismiss(toastId);
      setIsLoading((prev) => ({ ...prev, subscription: false }));
    }
  };

  const validatePromoCode = async () => {
    setIsLoading((prev) => ({ ...prev, promoValidation: true }));
    const toastId = toast.loading("Validating...");

    try {
      const promoSnapshot = await db
        .collection("Users")
        .where("promoCode", "==", state.promoCode)
        .get();

      if (promoSnapshot.empty) {
        toast.error("Invalid promo code");
        return;
      }

      const partner = promoSnapshot.docs[0].data();
      const discountAmount = Number(partner.discount);

      setState((prev) => ({
        ...prev,
        discount: discountAmount,
        amount: Number(prev.amount) - discountAmount,
      }));

      toast.success("Valid promo code");
    } catch (error) {
      console.error("Error validating promo code:", error);
      toast.error("Failed to validate promo code");
    } finally {
      toast.dismiss(toastId);
      setIsLoading((prev) => ({ ...prev, promoValidation: false }));
    }
  };

  if (isLoading.page) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <FadeLoader color="#00FFFF" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>Browse Course</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner show={true} />

      <Navbar />
      <div className="container mx-auto">
        <div className="h-8" />

        <div>
          <div className="pt-6">
            <BreadCrumb title={state.course?.title} />

            {state.course?.id && (
              <CourseInfo
                course={state.course}
                handleSubscribe={handleSubscribe}
                user={user}
                loading={isLoading.subscription}
                date={state.date}
                promoCode={state.promoCode}
                setPromoCode={(code) =>
                  setState((prev) => ({ ...prev, promoCode: code }))
                }
                validating={isLoading.promoValidation}
                amount={state.amount}
                validatePromoCode={validatePromoCode}
              />
            )}
          </div>
        </div>

        <hr />
        {state.tests.length > 0 && <CourseTests tests={state.tests} />}
      </div>
      <Footer />
    </div>
  );
}

export default BrowseItem;
