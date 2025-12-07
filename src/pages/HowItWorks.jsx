import React from "react";
import { FaUser, FaClipboardCheck, FaBoxOpen } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          How AssetVerse Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg sm:text-xl">
          Follow these simple steps to manage your assets efficiently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300">
            <FaUser className="text-5xl text-[#5b46b1] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Register / Login
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Create an account as Employee or HR to get started.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300">
            <FaClipboardCheck className="text-5xl text-[#5b46b1] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Manage Requests
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Employees can request assets, HR can approve or reject them.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300">
            <FaBoxOpen className="text-5xl text-[#5b46b1] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Track Assets
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Keep track of all assigned assets, requests, and approvals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
