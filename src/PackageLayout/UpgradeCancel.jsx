// UpgradeCancel.jsx
import React from "react";
import { Link } from "react-router";

const UpgradeCancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  p-5">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 border border-red-300 dark:border-red-600 rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your payment was cancelled. Please try again or choose a different package.
        </p>
        <Link 
          to={`/`}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default UpgradeCancel;
