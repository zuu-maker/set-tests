import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const MeetingEndedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Meeting Ended</h1>
          <p className="text-lg text-gray-600">
            Thank you for participating. This meeting has been concluded by the
            host.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            You can close this window or return to the dashboard.
          </p>

          <Link
            href="/learn"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Learn</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingEndedPage;
