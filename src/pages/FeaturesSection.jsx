import React from "react";
import { FaUserTie, FaUsers, FaClipboardList } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Why Choose AssetVerse?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg sm:text-xl">
          AssetVerse simplifies asset management for employees and HR professionals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300">
            <FaUserTie className="text-4xl text-[#5b46b1] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Employee Friendly
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Employees can easily request, track, and manage their assets.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300">
            <FaUsers className="text-4xl text-[#5b46b1] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              HR Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              HR can manage teams, track assets, and approve requests efficiently.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300">
            <FaClipboardList className="text-4xl text-[#5b46b1] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Organized Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Keep a clear record of all assets, requests, and approvals in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

