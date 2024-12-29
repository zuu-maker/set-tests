import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import { db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import Paginate from "@/components/Paginate";
import toast from "react-hot-toast";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(null);

  useEffect(() => {
    getusers();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const getusers = () => {
    db.collection("Users")
      .orderBy("createdAt", "desc")
      .limit(25)
      .get()
      .then((querySnapshot) => {
        let _users = [];
        querySnapshot.forEach((doc) => {
          _users.push(doc.data());
        });
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLast(lastVisible);
        setUsers(_users);
        setLoader(false);
      });
  };

  const makePartner = (id) => {
    let toastId = toast.loading("processing...");
    db.collection("Users")
      .doc(id)
      .update({
        role: "partner",
        promoCode: "",
        discount: 0,
      })
      .then(() => {
        toast.dismiss(toastId);
        toast.success("Updated successfully");
        getusers();
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toastId);
        toast.error("Update failed");
      });
  };

  const TableRow = (item) => (
    <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {item.name}
      </th>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.city}</td>
      <td className="px-6 py-4">{item.phone}</td>
      <td className="px-6 py-4 capitalize">{item.role}</td>
      <td>
        <div className="flex items-center h-full justify-center space-x-4">
          <button
            disabled={item.role === "partner" || item.role === "admin"}
            className="text-white disabled:opacity-60 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emeralds-300  font-medium rounded-md text-xs px-3 py-2 text-center"
            fill="currentColor"
            onClick={() => makePartner(item._id)}
          >
            Make Partner
          </button>
        </div>
      </td>
    </tr>
  );

  const next = () => {
    db.collection("Users")
      .orderBy("createdAt", "desc")
      .startAfter(last)
      .limit(25)
      .get()
      .then((querySnapshot) => {
        let _users = [];
        querySnapshot.forEach((doc) => {
          _users.push(doc.data());
        });
        if (_users.length > 0) {
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLast(lastVisible);
          setUsers(_users);
          setPage((prev) => prev + 1);
          setLoader(false);
        }
      });
  };

  const prev = () => {
    if (page > 1) {
      db.collection("Users")
        .orderBy("createdAt", "desc")
        .endBefore(last)
        .limit(25)
        .get()
        .then((querySnapshot) => {
          let _users = [];
          querySnapshot.forEach((doc) => {
            _users.push(doc.data());
          });
          if (_users.length > 0) {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLast(lastVisible);
            setUsers(_users);
            setPage((prev) => prev - 1);
            setLoader(false);
          }
        });
    }
  };

  return (
    <AdminAuth className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="p-4 xl:ml-80">
        <AdminNav />
        <div className="mt-12">
          {loader ? (
            <div className="h-screen w-full flex items-center justify-center">
              <FadeLoader color="#00FFFF" />
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                Users
              </h6>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{users.map((item) => TableRow(item))}</tbody>
              </table>
            </div>
          )}
          <Paginate page={page} prev={prev} next={next} />
        </div>
      </div>
    </AdminAuth>
  );
}

export default ListUsers;
