import React from "react";
import HeroImg from "../assets/banner.jpg"; 

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10">
        
        {/* Left Text */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            AssetVerse
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg sm:text-xl">
            Connect, track, and grow your assets effortlessly.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <a
              href="/joinEmployee"
              className="px-6 py-3 bg-[#5b46b1] hover:bg-[#654dc7] text-white rounded-md transition-all duration-300 text-center"
            >
              Join as Employee
            </a>
            <a
              href="/joinHr"
              className="px-6 py-3 border border-[#5b46b1] hover:bg-[#5b46b1]   rounded-md transition-all duration-300 text-center"
            >
              Join as HR
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img src={HeroImg} alt="Hero Illustration" className="w-full max-w-md" />
        </div>

      </div>
    </section>
  );
};

export default Hero;
