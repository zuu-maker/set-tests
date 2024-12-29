import React, { useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { db } from "@/firebase";
import toast from "react-hot-toast";

const PromoCodeModal = ({
  visible,
  setVisible,
  current,
  setCurrent,
  getPartners,
}) => {
  const cancelButtonRef = useRef(null);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (current && current._id) {
      setPromoCode(current.promoCode);
      setDiscount(current.discount);
    }
  }, [current]);

  // TODO: Fix question and explanation call

  const updatePromoCode = () => {
    let toastId = toast.loading("Processing...");
    db.collection("Users")
      .doc(current._id)
      .update({
        discount: Number(discount),
        promoCode: promoCode.toLowerCase(),
      })
      .then(() => {
        toast.dismiss(toastId);
        toast.success("Promo code saved");
        setVisible(false);
        setCurrent({});
        getPartners();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Promo code failed");
      });
  };

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setVisible(false);
          setCurrent({});
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Promo Code
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="px-10">
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Promo Code
                      </label>
                      <div className="mt-2">
                        <input
                          id="promoCode"
                          name="promoCode"
                          type="text"
                          onChange={(e) => setPromoCode(e.target.value)}
                          value={promoCode}
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
                        Discount
                      </label>
                      <div className="mt-2">
                        <input
                          id="discount"
                          name="discount"
                          type="number"
                          autoComplete="text"
                          onChange={(e) => setDiscount(e.target.value)}
                          value={discount}
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="bg-gray-50 px-4 pb-3 mt-12 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex disabled:opacity-60 w-full justify-center rounded-md border border-transparent text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-4 py-2 text-base font-medium shadow-sm hover:bg-gradient-to-br focus:outline-none focus:ring-teal-300 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={updatePromoCode}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setVisible(false);
                      setCurrent({});
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PromoCodeModal;
