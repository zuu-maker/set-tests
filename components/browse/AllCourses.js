import React from "react";
import Link from "next/link";

function AllCourses({ courses }) {
  return (
    <div className="bg-white -mb-24">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Grade 12 & GCE
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {courses &&
            courses.length > 0 &&
            courses.map((item) => (
              <Link key={item.id} href={`/browse/${item.id}`}>
                <div className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={item.image.url}
                      alt={item.image.ref}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h2 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {item?.numberOfQuestions} questions
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
