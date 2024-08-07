import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import { db, auth } from "@/firebase";
import { ClipLoader, ScaleLoader } from "react-spinners";

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((_user) => {
      if (_user) {
        db.collection("Users")
          .where("email", "==", _user.email)
          .get()
          .then((snap) => {
            if (!snap.empty) {
              let doc = snap.docs[0].data();
              if (_user.emailVerified && !doc.verified) {
                db.collection("Users").doc(doc._id).update({
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
              setLoader(false);
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("error loading");
            setLoader(false);
          });
      } else {
        dispatch(
          setUser({
            _id: "",
          })
        );
        setLoader(false);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

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
