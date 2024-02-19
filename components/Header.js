import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "@/firebase";
import { logOutUser } from "@/slices/userSlice";
import { useRouter } from "next/router";

const navigation = [
  { name: "About", href: "/#about" },
  { name: "Offerings", href: "/#offers" },
  { name: "FAQs", href: "/#faq" },
  { name: "Enrol", href: "/browse" },
];

const navigationPhone = [{ name: "Enrol", href: "/browse" }];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let router = useRouter();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOutUser());
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isUnsubcribed = (currentValue) => currentValue.subscribed === false;

  const compareTwoArrayOfObjects = (
    first_array_of_objects,
    second_array_of_objects
  ) => {
    return (
      first_array_of_objects.length === second_array_of_objects.length &&
      first_array_of_objects.every((element_1) =>
        second_array_of_objects.some(
          (element_2) => element_1.subscribed === element_2.subscribed
        )
      )
    );
  };

  const test = async () => {
    let today = new Date();
    today.setDate(today.getDate() + 20);

    const users = await db
      .collection("Users")
      .where("activeSubscription", "==", true)
      .get();

    console.log(users.docs.length);

    users.docs.forEach((doc) => {
      console.log(doc.data().name);
      let tests = doc.data().tests;
      console.log(tests);
      tests.forEach((test) => {
        console.log(test);
        if (test.renewDate < today.getTime()) {
          console.log("IN here");

          test.subscribed = false;
        }
      });

      if (!compareTwoArrayOfObjects(tests, doc.data().tests)) {
        db.collection("Users").doc(doc.data()._id).update({
          tests,
        });
      }

      if (tests.every(isUnsubcribed)) {
        console.log("has nothing");
        db.collection("Users").doc(doc.data()._id).update({
          activeSubscription: false,
        });
      }
    });
  };

  return (
    <React.Fragment>
      <nav
        className="flex px-2 h-9 w-full items-center justify-between"
        aria-label="Global"
      >
        <div className=" lg:min-w-0 lg:flex-1" aria-label="Global">
          <Link href="/" className=" p-2 sm:-m-1.5 sm:p-1.5">
            <img className="h-14" src="/logo.png" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="sm:-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-semibold text-gray-900 hover:text-gray-900"
            >
              {item.name}
            </Link>
          ))}
          {user && user.role === "admin" && (
            <Link
              href="/admin"
              className="font-semibold text-gray-900 hover:text-gray-900"
            >
              Dashboard
            </Link>
          )}
          {user && user.role === "student" && (
            <Link
              href="/learn"
              className="font-semibold text-gray-900 hover:text-gray-900"
            >
              Learn
            </Link>
          )}
        </div>

        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
          {user ? (
            <button
              onClick={test}
              className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Log out
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel
          focus="true"
          className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
        >
          <div className="flex h-9 items-center justify-between">
            <div className="flex">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Sirius Education Trust</span>
                <img className="h-14" src="/logo.png" alt="" />
              </a>
            </div>
            <div className="flex">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigationPhone.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </React.Fragment>
  );
};

export default Header;
