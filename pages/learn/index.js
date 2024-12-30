import React, { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import StudentAuth from "@/components/auth/StudentAuth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import PleaseSubscribe from "@/components/learn/PleaseSubscribe";
import MyCourses from "@/components/learn/MyCourses";

function LearnPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [amount, setAmount] = useState("25");
  const [validating, setValidating] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  let router = useRouter();

  const user = useSelector((state) => state.user);

  const handleSubscribe = () => {
    setLoading(true);
    let toastId = toast.loading("Processing...");
    db.collection("Sessions")
      .add({
        email: user.email,
        phone: user.phone,
        _id: user._id,
        name: user.name,
        amount,
        promoCode,
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
    let unsubscribe = db
      .collection("Courses")
      .where("publish", "==", true)
      .orderBy("title", "asc")
      .onSnapshot((querySnapShot) => {
        let _courses = [];
        querySnapShot.forEach((snap) => {
          _courses.push(snap.data());
        });
        setCourses(_courses);
        setLoader(false);
      });

    return () => unsubscribe();
  }, []);

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
            <div>
              {user && user._id && user.activeSubscription ? (
                <MyCourses courses={courses} />
              ) : (
                <PleaseSubscribe
                  validating={validating}
                  validatePromoCode={validatePromoCode}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  amount={amount}
                  setAmount={setAmount}
                  handleSubscribe={handleSubscribe}
                  user={user}
                  loading={loading}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </StudentAuth>
  );
}

export default LearnPage;
