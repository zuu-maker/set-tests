import React from "react";

function PleaseSubscribe({ user, loading, handleSubscribe }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {user && user._id.length > 0 && user.subscribedBefore ? (
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
        <p className="text-lg">
          You have not subcribed to the coursre bundle, click here to subscribe.
          <button
            disabled={user && user._id.length > 0 === null}
            onClick={handleSubscribe}
            className="disabled:opacity-75 flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 py-3 px-8 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {user && user._id.length > 0 === null
              ? "Please login to subscribe"
              : "Purchase Bundle"}
          </button>
        </p>
      )}
    </div>
  );
}

export default PleaseSubscribe;
