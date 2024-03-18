import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function StudentAuth({ children }) {
  const [hidden, setHidden] = useState(true);
  const [loader, setLoader] = useState(true);
  const [checked, setChecked] = useState(false);
  const user = useSelector((state) => state.user);

  let router = useRouter();

  useEffect(() => {
    if (user) {
      if (user._id.length > 0 && user.role === "student") {
        setLoader(false);
        setHidden(false);
      } else if (user._id.length > 0 && user.role !== "student") {
        router.push("/");
      } else if (user._id.length === 0) {
        setLoader(false);
      }
    }
  }, [user]);

  // useEffect(() => {
  //   if (checked) {
  //     setLoader(false);
  //   }
  // }, [checked]);

  if (hidden) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        {loader ? (
          <p>Verifying..</p>
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
