import { useForm } from "react-hook-form";
import { useState } from "react";

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const RequestAsset = () => {
  const { user } = useAuth(); // get logged in user info
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const newRequest = {
      assetName: data.assetName,
      quantity: Number(data.quantity),
      reason: data.reason,
      status: "pending",
      createdAt: new Date(),
      userName: user?.displayName || "Anonymous",
      email: user?.email || "unknown",
    };

    try {
      const res = await axiosSecure.post("/asset_requests", newRequest);
      if (res.data.insertedId) {
        setMessage("Request submitted successfully!");
        reset();
      } else {
        setMessage("Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Request Asset</h2>

      {message && (
        <div className="mb-4 p-2 rounded bg-green-200 text-green-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Asset Name */}
        <div>
          <label className="block mb-1 font-semibold">Asset Name</label>
          <input
            type="text"
            placeholder="Enter asset name"
            className={`input input-bordered w-full ${errors.assetName && "border-red-500"}`}
            {...register("assetName", { required: "Asset name is required" })}
          />
          {errors.assetName && (
            <p className="text-red-500 mt-1">{errors.assetName.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-semibold">Quantity</label>
          <input
            type="number"
            className={`input input-bordered w-full ${errors.quantity && "border-red-500"}`}
            {...register("quantity", { required: "Quantity is required", min: 1 })}
          />
          {errors.quantity && (
            <p className="text-red-500 mt-1">{errors.quantity.message}</p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block mb-1 font-semibold">Reason / Note</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Optional reason"
            {...register("reason")}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestAsset;
