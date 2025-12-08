import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const EditAsset = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [asset, setAsset] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ===========================
  //  Load existing asset safely
  // ===========================
  useEffect(() => {
    const loadAsset = async () => {
      try {
        const res = await axiosSecure.get(`/assets/${id}`);

        if (!res.data) {
          setMessage("Asset not found!");
          setLoading(false);
          return;
        }

        setAsset(res.data);
        reset(res.data); // safely reset form
      } catch (err) {
        console.error(err);
        setMessage("Failed to load asset.");
      } finally {
        setLoading(false);
      }
    };

    loadAsset();
  }, [id]); // ❗ remove axiosSecure, reset → prevent infinite loop

  if (loading) return <p>Loading...</p>;

  // ===========================
  // Handle update submit
  // ===========================
  const onSubmit = async (data) => {
    let imageUrl = asset?.image;

    try {
      // Upload new image if provided
      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const imgURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_photo_host_key
        }`;

        const imgRes = await axios.post(imgURL, formData);
        imageUrl = imgRes.data.data.display_url;
      }

      const updatedAsset = {
        name: data.name,
        type: data.type,
        quantity: Number(data.quantity),
        image: imageUrl,
      };

      const res = await axiosSecure.put(`/assets/${id}`, updatedAsset);

      if (res.data.modifiedCount > 0) {
        setMessage("Asset updated successfully!");
      } else {
        setMessage("No changes made.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Update failed. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Asset</h2>

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
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Asset Type */}
        <div>
          <label className="block mb-1 font-semibold">Asset Type</label>
          <select
            {...register("type", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-semibold">Quantity</label>
          <input
            type="number"
            {...register("quantity", { required: true, min: 1 })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block mb-1 font-semibold">Photo (Optional)</label>
          <input type="file" {...register("photo")} className="file-input w-full" />

          {/* Only show current image if exists */}
          {asset?.image && (
            <img
              src={asset.image}
              alt="Current"
              className="w-32 mt-3 rounded border"
            />
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Update Asset
        </button>
      </form>
    </div>
  );
};

export default EditAsset;
