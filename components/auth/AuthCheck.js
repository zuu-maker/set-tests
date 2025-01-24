import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setUser } from "@/slices/userSlice";
import { db, auth } from "@/firebase";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { validateSession } from "@/utils/sessions";

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  let router = useRouter();

  const [loader, setLoader] = useState(true);
  let isRegistering = useSelector((state) => state.isRegistering);
  console.log("re ---> ", isRegistering);

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId") || uuidv4();
    localStorage.setItem("deviceId", deviceId);
    console.log(deviceId);
    const unsubscribe = auth.onAuthStateChanged(async (_user) => {
      console.log("reeee ->", isRegistering);

      if (_user) {
        try {
          // const idToken = await _user.getIdToken();
          // console.log(idToken);

          // const sessionResponse = await fetch("/api/auth/validate", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: `Bearer ${idToken}`,
          //   },
          //   body: JSON.stringify({
          //     deviceId,
          //   }),
          // });
          // const res = await sessionResponse.json();

          console.log("reeee ->", isRegistering);
          if (!isRegistering) {
            console.log("here reg");
            const isValid = await validateSession(_user.uid, deviceId);
            console.log("res ->");
            if (!isValid) {
              console.log("here reg 2");
              console.log("removing");
              // Session is invalid - force logout
              router.push("/login");
              await auth.signOut();
              dispatch(logOutUser());
              setLoader(false);
              return;
            }
          }

          const userSnap = await db
            .collection("Users")
            .where("email", "==", _user.email)
            .get();

          if (!userSnap.empty) {
            const doc = userSnap.docs[0].data();
            if (_user.emailVerified && !doc.verified) {
              await db.collection("Users").doc(doc._id).update({
                verified: true,
              });
            }
            dispatch(
              setUser({
                _id: doc._id,
                name: doc.name,
                email: _user.email,
                role: doc.role,
                phone: doc.phone,
                verified: _user.emailVerified,
                activeSubscription: doc.activeSubscription,
                subscribedBefore: doc.subscribedBefore,
              })
            );
          }
        } catch (error) {
          console.error("Auth check error:", error);
          // On error, sign out user
          toast.error("Failed authentication");
          setLoader(false);
          await auth.signOut();
          dispatch(setUser({ _id: "" }));
        }
      } else {
        dispatch(
          setUser({
            _id: "",
          })
        );
      }
      setLoader(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, [isRegistering]);

  return (
    <React.Fragment>
      {loader ? (
        <div className="flex text-xl items-center justify-center h-screen w-screen">
          _ L<ClipLoader className="text-xs" />
          ading Sirius Educational Trust _
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default AuthCheck;
