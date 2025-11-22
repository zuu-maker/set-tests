// SubscriptionModal.js
import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { db } from "@/firebase";
import firebase from "firebase";
import { useRouter } from "next/router";

function SubscriptionModal({ visible, setVisible, setCurrent }) {
  const cancelButtonRef = useRef(null);

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
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  const handleSubscribe = () => {
    setLoading(true);

    if (user && user.activeSubscription) {
      toast.success(
        "Apologies you already have a subscription please refresh the page"
      );
      setLoading(true);

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
          setValidating(false);
          return;
        }

        const partner = snap.docs[0].data();
        setDiscount(Number(partner.discount));
        setAmount(Number(amount) - Number(partner.discount));
        toast.dismiss(toastId);
        toast.success("Valid promo code");
        setValidating(false);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(toastId);
        toast.error("Failed to validate promo code");
        setValidating(false);
      });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setVisible(false)}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-8">
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-white"
                >
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                  <path
                    fillRule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Subscribe Now</h3>
                <p className="text-cyan-100 text-sm mt-1">
                  Get Full Access to All Subjects
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
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
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
              onClick={() => setVisible(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionModal;

// PleaseSubscribe.js
function PleaseSubscribe({
  user,
  loading,
  handleSubscribe,
  promoCode,
  setPromoCode,
  validatePromoCode,
  validating,
  amount,
}) {
  return (
    <div className="space-y-6">
      {user && user._id && user._id.length > 0 && user.subscribedBefore ? (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-amber-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 text-lg">
                  Subscription Expired
                </h4>
                <p className="text-amber-700 mt-1">
                  Your subscription has expired. Renew now to continue learning.
                </p>
              </div>
            </div>
          </div>

          <EnterPromoCode
            amount={amount}
            promoCode={promoCode}
            validatePromoCode={validatePromoCode}
            setPromoCode={setPromoCode}
            validating={validating}
          />

          <button
            disabled={user === null || loading}
            onClick={handleSubscribe}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>
                {user === null
                  ? "Please login to subscribe"
                  : "Renew Subscription"}
              </span>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-cyan-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-900 text-lg">
                  No Active Subscription
                </h4>
                <p className="text-cyan-700 mt-1">
                  Purchase a subscription to unlock all subjects and start your
                  learning journey.
                </p>
              </div>
            </div>
          </div>

          <EnterPromoCode
            amount={amount}
            promoCode={promoCode}
            validatePromoCode={validatePromoCode}
            setPromoCode={setPromoCode}
            validating={validating}
          />

          <button
            disabled={
              (user && user._id && user._id.length > 0 === null) || loading
            }
            onClick={handleSubscribe}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>
                {user && user._id && user._id.length > 0 === null
                  ? "Please login to subscribe"
                  : "Purchase Subscription"}
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

const EnterPromoCode = ({
  amount,
  promoCode,
  validatePromoCode,
  setPromoCode,
  validating,
}) => {
  return (
    <div className="space-y-4">
      {/* Price Display */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Weekly Pricing Plan</span>
          <div className="text-right">
            <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {amount}
            </span>
            <span className="text-lg font-semibold text-gray-600 ml-1">
              ZMW
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <label
          htmlFor="promoCode"
          className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-cyan-600"
          >
            <path
              fillRule="evenodd"
              d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Have a promo code?</span>
        </label>

        <div className="space-y-3">
          <input
            id="promoCode"
            name="promoCode"
            type="text"
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            value={promoCode}
            placeholder="Enter promo code"
            className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-colors text-gray-900 placeholder:text-gray-400 font-medium uppercase"
          />

          <button
            type="button"
            disabled={promoCode.length === 0 || validating}
            onClick={validatePromoCode}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {validating ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Validating...</span>
              </>
            ) : (
              <span>Apply Promo Code</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
