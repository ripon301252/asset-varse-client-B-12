// components/UpgradeSuccess.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const UpgradeSuccess = () => {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("processing"); // processing | success | error
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const session_id = query.get("session_id");
    const hrId = query.get("hrId");
    const packageType = query.get("packageType");

    const verifyPayment = async () => {
      try {
        const res = await axiosSecure.get(
          `/api/stripe/success?session_id=${session_id}&hrId=${hrId}&packageType=${packageType}`
        );

        if (res.data.success) {
          setStatus("success");
          setMessage(`Payment Successful! Package upgraded to ${res.data.packageType}`);
        } else {
          setStatus("error");
          setMessage("Payment verification failed.");
        }
      } catch (err) {
        console.log(err);
        setStatus("error");
        setMessage("Error verifying payment.");
      }
    };

    verifyPayment();
  }, [location, axiosSecure]);

  // Dynamic styles
  const statusStyles = {
    processing: "bg-yellow-100 text-yellow-800 border-yellow-300",
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-5">
      <div
        className={`max-w-md w-full border rounded-xl shadow-lg p-8 text-center transition-all duration-300 ${statusStyles[status]}`}
      >
        <h2 className="text-2xl font-bold mb-4">
          {status === "processing" ? "Processing..." : status === "success" ? "Success!" : "Failed"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        {status !== "processing" && (
          <button
            onClick={() => window.location.href = "/packageUpgrade"} // redirect to dashboard
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              status === "success" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"
            } transition-colors`}
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default UpgradeSuccess;
