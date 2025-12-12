import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast"; // ✅ Import toast

const RequestAsset = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [assets, setAssets] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Load assets for dropdown
  useEffect(() => {
    axiosSecure
      .get("/assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  const onSubmit = async (data) => {
    const newRequest = {
      assetId: data.assetId,
      quantity: Number(data.quantity),
      reason: data.reason,
      userName: user?.displayName || "Anonymous",
      email: user?.email || "unknown",
    };

    try {
      const res = await axiosSecure.post("/asset_requests", newRequest);
      if (res.data.insertedId) {
        toast.success("Request submitted successfully!"); // ✅ toast success
        reset();
      } else {
        toast.error("Failed to submit request."); // ✅ toast error
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again."); // ✅ toast error
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Request Asset</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Asset Dropdown */}
        <div>
          <label className="block mb-1 font-semibold">Select Asset</label>
          <select
            className={`input input-bordered w-full ${
              errors.assetId && "border-red-500"
            }`}
            {...register("assetId", { required: "Asset is required" })}
          >
            <option value="">-- Select Asset --</option>
            {assets.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name} (Available: {a.quantity})
              </option>
            ))}
          </select>
          {errors.assetId && (
            <p className="text-red-500 mt-1">{errors.assetId.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-semibold">Quantity</label>
          <input
            type="number"
            className={`input input-bordered w-full ${
              errors.quantity && "border-red-500"
            }`}
            {...register("quantity", {
              required: "Quantity is required",
              min: 1,
            })}
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
