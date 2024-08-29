import React from "react";

function CourseInfo({ course, handleSubscribe, user, loading, date }) {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {course?.title}
        </h1>
      </div>

      {/* Options */}
      <div className="sm:mt-4 lg:row-span-3 lg:mt-0">
        <p className="text-xl tracking-tight text-gray-900">
          Price:
          <span className="font-extrabold ">
            {` ZK ${new Intl.NumberFormat().format(25)}`}
          </span>
        </p>

        <div className=" mt-5 sm:mt-5 ">
          <p>Purchase subscription for all courses valid for 7 days.</p>

          <div className="mt-1">
            <button
              disabled={(user && user._id.length === 0) || loading}
              onClick={handleSubscribe}
              className="disabled:opacity-75 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {user && user._id.length === 0
                ? "Please login to subscribe"
                : "Purchase Subscription"}
            </button>
          </div>
        </div>
      </div>

      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-4 lg:pr-8">
        {/* Description and details */}
        <div>
          <h3 className="sr-only">Description</h3>

          <div className="space-y-6">
            <p className="text-base text-gray-900">{course?.description}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

          <div className="mt-4">
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              <li className="text-gray-400">
                <span className="text-gray-600">
                  <span className="font-bold">Created On:</span>
                  {" " + date}
                </span>
              </li>
              <li className="text-gray-400">
                <span className="text-gray-600">
                  <span className="font-bold">Questions:</span>
                  {"" + course?.numberOfQuestions}
                </span>
              </li>
              <li className="text-gray-400">
                <span className="text-gray-600">
                  <span className="font-bold">Tests:</span>
                  {"" + course?.numberOfTests}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
