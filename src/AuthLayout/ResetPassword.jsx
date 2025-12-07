import { useRef } from "react";
import useAuth from "../Hooks/useAuth";
// import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const ResetPassword = () => {
  const { passwordReset } = useAuth()
  const emailRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const prefilledEmail = location.state?.email || "";

  const handleReset = () => {
    const email = emailRef.current.value;
    if (!email){
      return  // toast.error("Please enter your email");
    } 

    passwordReset(email)
      .then(() => {
        // toast.success("Password reset email sent! Check your Gmail.");
        navigate("/login");
      })
      .catch((err) => {
        // toast.error(err.message)
        console.log(err)
      });
  };

  return (
    <div className=" flex justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 items-center mx-6 rounded-2xl">
      <title>AssetVerse - Reset Password</title>

      <div className="card w-full max-w-md shadow-2xl border border-gray-300 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Reset Your Password
        </h2>
        <p className="text-sm mb-6">
          Enter your email address below and we’ll send you a password reset
          link.
        </p>

        <input
          ref={emailRef}
          defaultValue={prefilledEmail}
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mb-5 focus:ring-2 focus:ring-pink-400"
          required
        />

        <button
          onClick={handleReset}
          className="btn btn-primary bg-black w-full transition-all duration-300 font-semibold"
        >
          Send Reset Link
        </button>

        <div className="mt-6 text-sm">
          <p>
            Remembered your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
