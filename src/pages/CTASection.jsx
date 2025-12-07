import React from "react";
import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className=" py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Simplify Asset Management?
        </h2>
        <p className="text-lg sm:text-xl mb-8">
          Join AssetVerse today and manage your assets efficiently!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/joinEmployee"
            className=" bg-[#5b46b1] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Join as Employee
          </Link>

          <Link
            to="/joinHr"
            className="border-2 border-[#5b46b1] font-semibold px-6 py-3 rounded-lg hover:bg-[#5b46b1] transition-all duration-300"
          >
            Join as HR
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
