import { useRouter } from "next/router";

const BannedPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>

          <p className="text-gray-600 mb-6">
            You have been removed from this meeting and cannot rejoin. Please
            contact the meeting host if you believe this was a mistake.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/learn")}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Return to Learn
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          If you need assistance, please contact support.
        </p>
      </div>
    </div>
  );
};

export default BannedPage;
