import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { auth, db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import StudentAuth from "@/components/auth/StudentAuth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import PleaseSubscribe from "@/components/learn/PleaseSubscribe";
import MyCourses from "@/components/learn/MyCourses";
import firebase from "firebase";
import Link from "next/link";
import AssessmentDashboard from "@/components/assesments/AssesmentsDashboard";

function LearnPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [amount, setAmount] = useState(0);
  const [validating, setValidating] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [hidden, setHidden] = useState(true);

  let router = useRouter();

  const user = useSelector((state) => state.user);

  const handleSubscribe = () => {
    setLoading(true);

    if (user && user.activeSubscription) {
      toast.success(
        "Apologies you already havee a subscription please refresh the page"
      );
      return;
    }

    let toastId = toast.loading("Processing...");
    db.collection("Sessions")
      .add({
        email: user.email,
        phone: user.phone,
        _id: user._id,
        name: user.name,
        originalAmount: discount + amount,
        discountAmount: discount,
        amount,
        promoCode,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        db.collection("Sessions")
          .doc(docRef.id)
          .update({
            id: docRef.id,
          })
          .then(() => {
            toast.dismiss(toastId);
            toast.success("Proceed to payment");
            setLoading(false);
            router.push(`/payment/${docRef.id}`);
          });
      })
      .catch((error) => {
        toast.dismiss(toastId);
        toast.error("Can not process");
        setLoading(false);
        console.log(error);
      });
  };

  const validatePromoCode = () => {
    setValidating(true);
    let toastId = toast.loading("Validating...");
    db.collection("Users")
      .where("promoCode", "==", promoCode)
      .get()
      .then((snap) => {
        if (snap.empty) {
          toast.dismiss(toastId);
          toast.error("Invalid promo code");
          return;
        }

        const partner = snap.docs[0].data();
        setDiscount(Number(partner.discount));
        setAmount(Number(amount) - Number(partner.discount));
        toast.dismiss(toastId);
        toast.success("Valid promo code");
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(toastId);
        toast.error("Failed to validate promo code");
      });
  };

  useEffect(() => {
    db.collection("Rates")
      .get()
      .then((snap) => {
        if (!snap.empty) {
          setAmount(snap.docs[0].data().price);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to get Rate");
      });
  }, []);

  useEffect(() => {
    let unsubscribe = null;

    if (user && user._id && user.activeSubscription) {
      unsubscribe = db
        .collection("Courses")
        .where("publish", "==", true)
        .orderBy("title", "asc")
        .onSnapshot((querySnapShot) => {
          let _courses = [];
          querySnapShot.forEach((snap) => {
            _courses.push(snap.data());
          });
          setCourses(_courses);
          if (user && user.verified) {
            setHidden(false);
          }
          setLoader(false);
        });
    } else {
      unsubscribe = db
        .collection("Courses")
        .where("publish", "==", true)
        .where("free", "==", true)
        .orderBy("title", "asc")
        .onSnapshot((querySnapShot) => {
          let _courses = [];
          querySnapShot.forEach((snap) => {
            _courses.push(snap.data());
          });
          setCourses(_courses);
          if (user && user.verified) {
            setHidden(false);
          }
          setLoader(false);
        });
    }

    return () => unsubscribe();
  }, [user]);

  const handleRenew = (test) => {
    if (!test.id || !user._id) return;

    db.collection("Sessions")
      .add({
        title: test.title,
        amount: test.price,
        user: user,
        test,
      })
      .then((docRef) => {
        db.collection("Sessions")
          .doc(docRef.id)
          .update({
            id: docRef.id,
          })
          .then(() => {
            router.push(`/renew/${docRef.id}`);
          });
      })
      .catch((error) => {
        toast.error("Could not renew");
        console.log(error);
      });
  };

  const verifyEmail = () => {
    setLoading(true);
    let toastId = toast.loading("Processing...");
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        toast.dismiss(toastId);
        toast.success(`An email has been sent to ${auth.currentUser.email}`);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(toastId);
        toast.error("Could not send verification link");
      });
  };

  if (user && user._id && !user.verified) {
    return (
      <div className="h-screen flex flex-col space-y-4 justify-center items-center">
        <Link href="/">
          <img
            className="mx-auto h-16 w-auto"
            src="logo.png"
            alt="Sirus Educational Trust"
          />
        </Link>
        <p className="text-lg font-sans">You have not verfied your email.</p>
        <button
          disabled={loading}
          className="flex w-1/6 justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={verifyEmail}
        >
          Resend
        </button>
      </div>
    );
  }

  return (
    <StudentAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {loader ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <AssessmentDashboard setLoader={setLoader} />
          )}
        </div>
      </div>
    </StudentAuth>
  );
}

export default LearnPage;
