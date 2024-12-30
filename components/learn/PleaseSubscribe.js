import React from "react";

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
    <div className="flex h-full w-full items-center justify-center">
      {user && user._id && user._id.length > 0 && user.subscribedBefore ? (
        <p className="text-lg">
          Your subcription has expired click here to renew.
          <button
            disabled={user === null && loading}
            onClick={handleSubscribe}
            className="disabled:opacity-75 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {user === null ? "Please login to subscribe" : "Renew Subscription"}
          </button>
        </p>
      ) : (
        <p className="text-xl">
          You are not subscribed, please purchase a subscription to start
          learning.
          <p className="text-xl tracking-tight text-gray-900 mt-2">
            Price:
            <span className="font-extrabold ">{" " + amount + " ZMW"}</span>
          </p>
          <div>
            <div>
              <label
                htmlFor="promoCode"
                className="block text-sm font-bold leading-6 text-gray-900 "
              >
                Enter promo code
              </label>
              <div className="flex space-x-2">
                <input
                  id="promoCode"
                  name="promoCode"
                  type="text"
                  onChange={(e) => setPromoCode(e.target.value)}
                  value={promoCode}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              type="button"
              disabled={promoCode.length === 0 || validating}
              className="disabled:opacity-75 mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-2 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={validatePromoCode}
            >
              Apply promo code
            </button>
          </div>
          <button
            disabled={(user && user._id.length > 0 === null) || loading}
            onClick={handleSubscribe}
            className="disabled:opacity-75 mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 py-3 px-8 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {user && user._id.length > 0 === null
              ? "Please login to subscribe"
              : "Purchase subscription"}
          </button>
        </p>
      )}
    </div>
  );
}

export default PleaseSubscribe;
