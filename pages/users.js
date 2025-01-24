import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import { auth, db } from "@/firebase";
import { FadeLoader } from "react-spinners";
import Paginate from "@/components/Paginate";
import toast from "react-hot-toast";
import firebase from "firebase";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState("");
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(null);

  useEffect(() => {
    getusers();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    let toastId = toast.loading("Processing...");
    db.collection("Users")
      .doc(id)
      .delete()
      .then(() => {
        toast.dismiss(toastId);
        toast.success("User deleted");
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(toastId);
        toast.success("Failed to delete user");
      });
  };

  const handleSelectChange = (e) => {
    setFilter(e.target.value);
  };

  const getusers = () => {
    setLoading(true);
    let toastId = toast.loading("Processing...");

    let queryRef = null;
    if (startDate !== "" && endDate !== "" && filter !== "") {
      const start = firebase.firestore.Timestamp.fromDate(new Date(startDate));
      const end = firebase.firestore.Timestamp.fromDate(
        new Date(endDate + "T23:59:59")
      );

      queryRef = db
        .collection("Users")
        .where("createdAt", ">=", start)
        .where("createdAt", "<=", end)
        .where(filter, "==", true)
        .limit(25);
    } else if (startDate !== "" && endDate !== "" && filter === "") {
      const start = firebase.firestore.Timestamp.fromDate(new Date(startDate));
      const end = firebase.firestore.Timestamp.fromDate(
        new Date(endDate + "T23:59:59")
      );
      queryRef = db
        .collection("Users")
        .where("createdAt", ">=", start)
        .where("createdAt", "<=", end)
        .orderBy("createdAt")
        .limit(25);
    } else if (startDate === "" && endDate === "" && filter !== "") {
      queryRef = db.collection("Users").where(filter, "==", true).limit(25);
    } else {
      queryRef = db.collection("Users").orderBy("createdAt", "desc").limit(25);
    }

    if (queryRef) {
      queryRef
        .get()
        .then((querySnapshot) => {
          let _users = [];
          querySnapshot.forEach((doc) => {
            _users.push(doc.data());
          });
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLast(lastVisible);
          setUsers(_users);

          toast.dismiss(toastId);
          toast.success("Done");
        })
        .catch(() => {
          toast.dismiss(toastId);
          toast.error("Failed to get");
        });
    }
    setLoader(false);

    setLoading(false);
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
      <td className="flex items-center mt-2 space-x-2">
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 cursor-pointer text-red-500"
          onClick={() => deleteUser(item._id)}
        >
          <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
            clipRule="evenodd"
          />
        </svg>
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

  const generateCsv = () => {
    if (users.length === 0) return;

    // Get headers from first data object
    const headers = ["name", "city", "email", "phone", "role"];

    console.log(headers);
    console.log(users[0]);
    // Create CSV content
    let csv = headers.join(",") + "\n";

    // Add data rows
    users.forEach((row) => {
      const values = headers.map((header) => {
        const value = row[header];
        if (value === null || value === undefined) return "";
        const stringValue = String(value);

        if (!isNaN(Number(stringValue)) && stringValue.length > 1) {
          // Add tab prefix to force text format
          return `\t${stringValue}`;
        }

        // Handle objects
        if (typeof value === "object") {
          return JSON.stringify(value).replace(/"/g, '""');
        }

        // Return the value as is
        return stringValue;
      });
      csv += values.join(",") + "\n";
    });

    let date = new Date();
    const filename =
      "Downloaded_users_on" + date.toISOString().split("T")[0] + ".csv";
    // Create and trigger download
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log(filter);

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
              <div className="mb-6 flex justify-between items-center w-full">
                <div>
                  <div className="mb-6 flex gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="p-2 border rounded"
                      />
                    </div>
                    <button
                      onClick={getusers}
                      disabled={loading}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                    >
                      {loading ? "Loading..." : "Filter"}
                    </button>
                  </div>
                  <div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Filter
                      </label>
                      <select
                        value={filter}
                        onChange={handleSelectChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="">None</option>
                        <option value="activeSubscription">Subscribed</option>
                        <option value="subscribedBefore">
                          Subscribed before
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  onClick={generateCsv}
                  disabled={loading}
                  className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 disabled:bg-gray-300"
                >
                  {loading ? "Loading..." : "Generate csv"}
                </button>
              </div>
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
