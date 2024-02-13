import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function StudentAuth({ children }) {
  const [hidden, setHidden] = useState(true);
  const [loader, setLoader] = useState(true);
  const user = useSelector((state) => state.user);

  let router = useRouter();

  useEffect(() => {
    if (user && user._id) {
      if (user.role === "student") {
        setLoader(false);
        setHidden(false);
      } else {
        setLoader(false);
        router.push("/");
      }
    } else {
      setLoader(false);
    }
  }, [user]);

  if (hidden) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        {loader ? (
          <p>checking..</p>
        ) : (
          <p>
            Unauthorised please login{" "}
            <Link
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              href="/login"
            >
              here
            </Link>{" "}
          </p>
        )}
      </div>
    );
  }

  return <div>{children}</div>;
}

export default StudentAuth;
