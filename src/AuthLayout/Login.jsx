import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import { useLocation } from "react-router";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  // console.log('in the login page', location);

  const [showPassword, setShowPassword] = useState(false);

  

  const handleLogin = (data) => {
    console.log("after Login", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="lg:ml-20  border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 p-6 rounded-2xl">
      <h3 className="text-center text-2xl font-bold">Welcome back</h3>
      <p className=" text-center my-3">Please Login</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                 type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                className="input w-full"
                placeholder="Password"
              />

              {/* password hide & show */}
              <button
                type="button"
                onClick={handleTogglePasswordShow}
                className="absolute top-2.5 right-3 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <IoEyeOff className="text-2xl text-green-600" />
                ) : (
                  <IoEye className="text-2xl text-red-600" />
                )}
              </button>

              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 8 characters or longer.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must be include one uppercase, one lowercase, one
                  number, and one special character.
                </p>
              )}
            </div>
          </div>

          <div>
            <Link
              to={`/resetPassword`}
              className="link link-hover cursor-pointer text-gray-500"
            >
              Forgot password?
            </Link>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
      <GoogleLogin />
      <p className="mt-3 text-center">
        New to Asset Verse Please !{" "}
        <Link
          state={location.state}
          to={`/register`}
          className="text-blue-600 hover:underline font-semibold cursor-pointer"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
