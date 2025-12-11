import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_photo_host_key
        }`;

        axios
          .post(image_API_URL, formData)
          .then((res) => {
            const photoURL = res.data.data.url;

            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL,
            };

            axiosSecure
              .post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  toast.success("User registered successfully!");
                }
              })
              .catch((err) => {
                console.error(err);
                toast.error("Failed to save user to database.");
              });

            const userProfile = { displayName: data.name, photoURL: photoURL };
            updateUserProfile(userProfile)
              .then(() => {
                navigate(location.state || "/");
              })
              .catch((err) => {
                console.error(err);
                toast.error("Failed to update user profile.");
              });
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to upload profile image.");
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Registration failed.");
      });
  };

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="lg:ml-20 mx-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 p-6 rounded-2xl">
      <h3 className="text-center text-2xl font-bold">Welcome to Asset Verse</h3>
      <p className=" text-center my-3">Please Register</p>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500">Name is required.</p>}

          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
          />
          {errors.photo && <p className="text-red-500">Photo is required.</p>}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required.</p>}

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                className="input w-full"
                placeholder="Password"
              />
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
                <p className="text-red-500">Password must be 8 characters or longer.</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must include one uppercase, one lowercase, one number, and one special character.
                </p>
              )}
            </div>
          </div>

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>

      <GoogleLogin />

      <p className="mt-3 text-center">
        Already registered?{" "}
        <Link
          state={location.state}
          to={`/login`}
          className="text-blue-600 hover:underline font-semibold cursor-pointer"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
