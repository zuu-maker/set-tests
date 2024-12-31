import AdminNav from "@/components/AdminNav";
import AdminStats from "@/components/AdminStats";
import Paginate from "@/components/Paginate";
import Sidebar from "@/components/Sidebar";
import AdminAuth from "@/components/auth/AdminPage";
import { db } from "@/firebase";
import { getTestInVerify } from "@/utils/test";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import firebase from "firebase";
import { FadeLoader } from "react-spinners";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ReportsPage() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loader, setLoader] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState({});
  const [searchCode, setSearchCode] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const generatePDF = () => {
    setLoading(true);
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Transaction Report", 14, 20);
    if (searchCode !== "") {
      doc.text(`Promo code used: ${searchCode}`, 14, 30);
    }

    if (startDate !== "" && endDate !== "") {
      doc.text(`Period: ${startDate} to ${endDate}`, 14, 40);
    }
    // Add date range
    doc.setFontSize(12);

    // Add total
    doc.text(`Total Amount: ZMK ${totalAmount.toFixed(2)}`, 14, 50);

    // Create table
    const tableColumn = ["Date", "Student", "Amount", "Status"];
    const tableRows = transactions.map((transaction) => {
      const timestamp = transaction.createdAt;
      const date = timestamp.toDate();
      const dateString = date.toLocaleDateString();

      return [
        dateString,
        transaction.user.name,
        `ZMK ${transaction.amount.toFixed(2)}`,
        transaction.status,
      ];
    });

    doc.autoTable({
      startY: 55,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 1,
        overflow: "linebreak",
      },
      columnStyles: {
        0: { cellWidth: 35 }, // Date
        2: { cellWidth: 40 }, // Student
        3: { cellWidth: 25 }, // Amount
        4: { cellWidth: 25 }, // Status
      },
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Generated on ${format(
          new Date(),
          "yyyy-MM-dd HH:mm:ss"
        )} - Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }

    // Save the PDF
    doc.save(`transaction-report-${startDate}-to-${endDate}.pdf`);
    setLoading(false);
  };

  const fetchTransactions = () => {
    if (startDate !== "" && endDate !== "" && searchCode !== "") {
      const start = firebase.firestore.Timestamp.fromDate(new Date(startDate));
      const end = firebase.firestore.Timestamp.fromDate(
        new Date(endDate + "T23:59:59")
      );

      db.collection("Transactions")
        .where("status", "==", "Paid")
        .where("createdAt", ">=", start)
        .where("createdAt", "<=", end)
        .where("promoCodeUsed", "==", searchCode)
        .limit(25)
        .get()
        .then((querySnapshot) => {
          console.log(start);
          console.log(end);
          let _transactions = [];
          let total = 0;
          querySnapshot.forEach((doc) => {
            _transactions.push(doc.data());
            total += Number(doc.data().amount);
          });
          setTotalAmount(total);
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLast(lastVisible);
          setTransactions(_transactions);
          setLoader(false);
        });
    } else if (startDate !== "" && endDate !== "" && searchCode === "") {
      const start = firebase.firestore.Timestamp.fromDate(new Date(startDate));
      const end = firebase.firestore.Timestamp.fromDate(
        new Date(endDate + "T23:59:59")
      );

      db.collection("Transactions")
        .where("status", "==", "Paid")
        .where("createdAt", ">=", start)
        .where("createdAt", "<=", end)
        .limit(25)
        .get()
        .then((querySnapshot) => {
          console.log(start);
          console.log(end);
          let _transactions = [];
          let total = 0;
          querySnapshot.forEach((doc) => {
            _transactions.push(doc.data());
            total += Number(doc.data().amount);
          });
          setTotalAmount(total);
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLast(lastVisible);
          setTransactions(_transactions);
          setLoader(false);
        });
    } else if (startDate === "" && endDate === "" && searchCode !== "") {
      db.collection("Transactions")
        .orderBy("createdAt", "desc")
        .where("promoCodeUsed", "==", searchCode)
        .where("status", "==", "Paid")
        .limit(25)
        .get()
        .then((querySnapshot) => {
          let _transactions = [];
          let total = 0;
          querySnapshot.forEach((doc) => {
            _transactions.push(doc.data());
            total += Number(doc.data().amount);
          });
          setTotalAmount(total);
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLast(lastVisible);
          setTransactions(_transactions);
          setLoader(false);
        });
    } else {
      db.collection("Transactions")
        .orderBy("createdAt", "desc")
        .where("status", "==", "Paid")
        .limit(25)
        .get()
        .then((querySnapshot) => {
          let _transactions = [];
          let total = 0;
          querySnapshot.forEach((doc) => {
            _transactions.push(doc.data());
            total += Number(doc.data().amount);
          });
          setTotalAmount(total);
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLast(lastVisible);
          setTransactions(_transactions);
          setLoader(false);
        });
    }
  };

  const next = () => {
    db.collection("Transactions")
      .orderBy("createdAt", "desc")
      .startAfter(last)
      .limit(25)
      .get()
      .then((querySnapshot) => {
        let _transactions = [];
        querySnapshot.forEach((doc) => {
          _transactions.push(doc.data());
        });
        if (_transactions.length > 0) {
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLast(lastVisible);
          setTransactions(_transactions);
          setPage((prev) => prev + 1);
          setLoader(false);
        }
      });
  };

  const prev = () => {
    if (page > 1) {
      db.collection("Transactions")
        .orderBy("createdAt", "desc")
        .endBefore(last)
        .limit(25)
        .get()
        .then((querySnapshot) => {
          let _transactions = [];
          querySnapshot.forEach((doc) => {
            _transactions.push(doc.data());
          });
          if (_transactions.length > 0) {
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLast(lastVisible);
            setTransactions(_transactions);
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
            <div>
              <div className="relative overflow-x-auto">
                <div>
                  <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                    Transcation reports
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
                          onClick={fetchTransactions}
                          disabled={loading}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                        >
                          {loading ? "Loading..." : "Filter"}
                        </button>
                      </div>
                      <div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">
                            Promo Code
                          </label>
                          <input
                            type="text"
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                            placeholder="Enter promo code"
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={generatePDF}
                      disabled={loading}
                      className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 disabled:bg-gray-300"
                    >
                      {loading ? "Loading..." : "Generate report"}
                    </button>
                  </div>
                  <div>
                    <p>Results: {transactions.length + " Transactions"}</p>
                  </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Promo code
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((item) => (
                      <tr key={item.id} className="bg-white border-b">
                        {/* <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.test.title}
                        </th> */}
                        <td className="px-6 py-4">{item.user.name}</td>
                        <td className="px-6 py-4">{item.user.email}</td>
                        <td className="px-6 py-4">{item.user.phone}</td>
                        <td className="px-6 py-4">
                          {item.createdAt.toDate().toISOString().split("T")[0]}
                        </td>
                        <td className="px-6 py-4">
                          {`ZMW ${new Intl.NumberFormat().format(item.amount)}`}
                        </td>
                        <td className="px-6 py-4">
                          {item && item.promoCodeUsed
                            ? item.promoCodeUsed
                            : "None"}
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`${
                              item.status === "Paid"
                                ? "bg-green-200"
                                : "bg-yellow-200"
                            } px-6 py-0 w-fit`}
                          >
                            {item.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Paginate page={page} prev={prev} next={next} />
            </div>
          )}
        </div>
      </div>
    </AdminAuth>
  );
}

export default ReportsPage;
