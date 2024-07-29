import React, { useState } from "react";
import Link from "next/link";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import firebase from "firebase";
import validator from "email-validator";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  let router = useRouter();
  let dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validator.validate(email)) {
      toast.error("invalid email");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("Users")
          .add({
            name,
            email,
            city,
            phone,
            role: "student",
            subscribedBefore: false,
            expiresOn: 0,
            verified: false,
            activeSubscription: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((docRef) => {
            db.collection("Users")
              .doc(docRef.id)
              .update({
                _id: docRef.id,
              })
              .then(() => {
                auth.currentUser.sendEmailVerification().then(() => {
                  dispatch(
                    setUser({
                      _id: docRef.id,
                      name,
                      email,
                      role: "student",
                      phone,
                      activeSubscription: false,
                      subscribedBefore: false,
                      verified: false,
                    })
                  );
                  router.push("/learn");

                  // make if statement for pushing

                  toast.success(
                    `A Verification email has been sent to ${email}, please verify your email.`,
                    {
                      duration: 5000,
                    }
                  );
                });
              })
              .catch((err) => {
                setLoading(false);
              });
          })
          .catch((error) => {
            setLoading(false);
          });
      })
      .catch((error) => {
        setLoading(false);
        var errorCode = error.code;
        var errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };

  return (
    <div>
      {" "}
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-6 lg:px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-12 w-auto"
            src="logo.png"
            alt="Sirus Educational Trust"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleRegister}
                disabled={!name || !email || !password || !city || !phone}
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
