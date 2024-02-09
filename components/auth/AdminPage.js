import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function AdminAuth({ children }) {
  const [hidden, setHidden] = useState(true);
  const [loader, setLoader] = useState(true);
  const user = useSelector((state) => state.user);

  let router = useRouter();

  useEffect(() => {
    if (user && user._id) {
      if (user.role === "admin") {
        setHidden(false);
      } else {
        router.push("/");
      }
    }
  }, [user]);

  if (hidden) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        {loader ? <p>checking..</p> : <p>Unauthorised</p>}
      </div>
    );
  }

  return <div>{children}</div>;
}

export default AdminAuth;
