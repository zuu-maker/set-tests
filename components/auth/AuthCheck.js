import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import { db, auth } from "@/firebase";
import { ClipLoader } from "react-spinners";

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
              console.log(doc);
              dispatch(
                setUser({
                  _id: doc._id,
                  email: _user.email,
                  verified: _user.emailVerified,
                  name: doc.name,
                  role: doc.role,
                  phone: doc.phone,
                })
              );
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("error loading");
          })
          .finally(() => {
            setLoader(false);
          });
      }
      setLoader(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {loader ? (
        <div className="flex text-xl items-center justify-center h-screen w-screen">
          _ L<ClipLoader className="text-xs" />
          ading Sirus Educational Trust _
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default AuthCheck;
