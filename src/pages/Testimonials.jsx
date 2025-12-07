import React from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "HR Manager",
    message:
      "AssetVerse made tracking our company assets so simple and organized. Highly recommended!",
  },
  {
    name: "Jane Smith",
    role: "Employee",
    message:
      "I can easily request and manage assets without any confusion. Love the smooth workflow!",
  },
  {
    name: "Michael Brown",
    role: "HR",
    message:
      "Approving requests and keeping everything documented has never been easier.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg sm:text-xl">
          Hear from people who use AssetVerse daily
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                "{testimonial.message}"
              </p>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {testimonial.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {testimonial.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
