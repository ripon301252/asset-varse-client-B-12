import React from "react";
import { useForm } from "react-hook-form";

const JoinEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Blockchain Developer",
    "UI/UX Designer",
    "Marketing / Community Manager",
  ];

  const onSubmit = (data) => {
    console.log("Employee Application:", data);
    alert("Application submitted successfully!");
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-24 text-center">
        <h1 className="text-5xl font-bold mb-4">Join the AssetVerse Team</h1>
        <p className="text-lg max-w-xl mx-auto">
          Be part of a cutting-edge digital asset management platform. Help companies manage their assets efficiently!
        </p>
      </section>

      {/* Job Openings */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 border-b-2 inline-block">
          Available Positions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {positions.map((pos, index) => (
            <div key={index} className="card shadow-md bg-white dark:bg-gray-800 hover:shadow-xl transition p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{pos}</h3>
              <p className=" mb-2">Department: AssetVerse Team</p>
              <p className=" mb-4">Location: Remote / Flexible</p>
              <button className="btn btn-primary w-full">Apply Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Company Culture */}
      <section className="bg-white dark:bg-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Work With Us</h2>
          <p className=" mb-4">
            Work with cutting-edge blockchain and digital asset technologies in a collaborative and innovative environment.
          </p>
          <p className=" mb-4">
            Flexible hours, remote-friendly, and ample opportunities for learning and career growth.
          </p>
          <p className="">Enjoy perks like NFT/crypto bonuses, professional development, and more.</p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Apply Now</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /.+@.+\..+/, message: "Enter a valid email" },
                })}
                className="input input-bordered w-full"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phone", { required: "Phone number required" })}
                className="input input-bordered w-full"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div>
              <select
                {...register("position", { required: "Select a position" })}
                className="select select-bordered w-full"
              >
                <option value="">Select Position</option>
                {positions.map((pos, idx) => (
                  <option key={idx} value={pos}>{pos}</option>
                ))}
              </select>
              {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
            </div>

            <div>
              <input
                type="file"
                {...register("resume", { required: "Resume is required" })}
                className="file-input file-input-bordered w-full"
              />
              {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
            </div>

            <textarea
              placeholder="Cover Letter (Optional)"
              {...register("coverLetter")}
              className="textarea textarea-bordered w-full"
            />

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("agree", { required: "You must agree before submitting" })}
                className="checkbox"
              />
              <span>I agree to the Terms & Privacy Policy</span>
            </label>
            {errors.agree && <p className="text-red-500 text-sm">{errors.agree.message}</p>}

            <button type="submit" className="btn btn-primary w-full">
              Submit Application
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>Contact HR: hr@assetverse.com</p>
          <div className="flex justify-center space-x-6 mt-3">
            <a href="#" className="hover:text-indigo-400">LinkedIn</a>
            <a href="#" className="hover:text-indigo-400">Twitter</a>
            <a href="#" className="hover:text-indigo-400">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JoinEmployee;
