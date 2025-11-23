import React, { useState } from "react";
import Link from "next/link";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import firebase from "firebase";
import validator from "email-validator";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import { setRegister, unSetRegister } from "@/slices/registeringSlice";
import { createNewSession } from "@/utils/sessions";
import PhoneNumberInput from "@/components/PhoneNumberInput";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let router = useRouter();
  let dispatch = useDispatch();

  const getFullNumber = () => {
    return `+260${phone}`;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setRegister());

    if (getFullNumber(phone).length !== 13) {
      toast.error("invalid phone number");
      setLoading(false);

      return;
    }

    if (!validator.validate(email)) {
      toast.error("invalid email");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      const deviceId = localStorage.getItem("deviceId") || uuidv4();
      localStorage.setItem("deviceId", deviceId);

      // const idToken = await user.getIdToken();

      // const sessionResponse = await fetch("/api/auth/createsession", {
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
      // console.log("res", res);
      const isCreated = await createNewSession(
        user.uid,
        deviceId,
        navigator.userAgent
      );

      if (!isCreated) {
        // Session creation failed (probably logged in elsewhere)
        await auth.signOut();
        toast.error("Failed sign up");
        setLoading(false);
        return;
      }

      const docRef = await db.collection("Users").add({
        name,
        email,
        city,
        phone: getFullNumber(phone),
        role: "student",
        subscribedBefore: false,
        expiresOn: 0,
        verified: false,
        activeSubscription: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      await db.collection("Users").doc(docRef.id).update({
        _id: docRef.id,
      });
      await auth.currentUser.sendEmailVerification();
      toast.success(
        `A Verification email has been sent to ${email}, please verify your email.`,
        {
          duration: 7000,
        }
      );
      dispatch(
        setUser({
          _id: docRef.id,
          name,
          email,
          role: "student",
          phone: getFullNumber(phone),
          expiresOn: 0,
          activeSubscription: false,
          subscribedBefore: false,
          verified: false,
        })
      );
      router.push("/learn");

      // make if statement for pushing
    } catch (error) {
      setLoading(false);
      var errorCode = error.code;
      var errorMessage = error.message;
      toast.error(errorMessage);
    }

    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     db.collection("Users")
    //       .add({
    //         name,
    //         email,
    //         city,
    //         phone,
    //         role: "student",
    //         subscribedBefore: false,
    //         expiresOn: 0,
    //         verified: false,
    //         activeSubscription: false,
    //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //       })
    //       .then((docRef) => {
    //         db.collection("Users")
    //           .doc(docRef.id)
    //           .update({
    //             _id: docRef.id,
    //           })
    //           .then(() => {
    //             auth.currentUser.sendEmailVerification().then(() => {
    //               dispatch(
    //                 setUser({
    //                   _id: docRef.id,
    //                   name,
    //                   email,
    //                   role: "student",
    //                   phone,
    //                   activeSubscription: false,
    //                   subscribedBefore: false,
    //                   verified: false,
    //                 })
    //               );
    //               router.push("/learn");

    //               // make if statement for pushing

    //               toast.success(
    //                 `A Verification email has been sent to ${email}, please verify your email.`,
    //                 {
    //                   duration: 5000,
    //                 }
    //               );
    //             });
    //           })
    //           .catch((err) => {
    //             setLoading(false);
    //           });
    //       })
    //       .catch((error) => {
    //         setLoading(false);
    //       });
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     toast.error(errorMessage);
    //     // ..
    //   });
    dispatch(unSetRegister());
  };

  return (
    <div className="mx-auto">
      {" "}
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-6 lg:px-4 relative">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/">
            <img
              className="mx-auto h-12 w-auto"
              src="new_logo.jpg"
              alt="Sirus Educational Trust"
            />
          </Link>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow-lg">
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
              <div className="mt-2 flex items-center -space-x-8">
                <input
                  id="password"
                  name="password"
                  type={`${showPassword ? "text" : "password"}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    onClick={() => setShowPassword(false)}
                    className="size-6 z-10 text-cyan-500 cursor-pointer"
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    onClick={() => setShowPassword(true)}
                    className="size-6 z-10 text-cyan-500 cursor-pointer"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className=" text-sm font-medium leading-6 text-gray-900"
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
              <div className="mt-2">
                <PhoneNumberInput phone={phone} setPhone={setPhone} />
                {/* <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                /> */}
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
