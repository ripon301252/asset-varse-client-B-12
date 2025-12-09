import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [asset, setAsset] = useState({
    name: "",
    type: "Returnable",
    quantity: 1,
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [newPhoto, setNewPhoto] = useState(null);

  // ===========================
  // Fetch Asset Data
  // ===========================
  useEffect(() => {
    axiosSecure
      .get(`/assets/${id}`)
      .then((res) => setAsset(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  // ===========================
  // Input Handle
  // ===========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prev) => ({ ...prev, [name]: value }));
  };

  // ===========================
  // Image Change
  // ===========================
  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  // ===========================
  // Submit Update
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedData = { ...asset };
    let imageUrl = asset.image;

    if (newPhoto) {
      const formData = new FormData();
      formData.append("image", newPhoto);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_host_key}`,
        formData
      );

      if (imgRes.data?.data?.display_url) {
        imageUrl = imgRes.data.data.display_url;
      }
    }

    updatedData.image = imageUrl;

    console.log("Sending updatedData:", updatedData); // Debug

    try {
      const res = await axiosSecure.put(`/assets/${id}`, updatedData);
      console.log("Update response:", res.data); // Debug

      if (res.data.modifiedCount > 0) {
        alert("Asset updated successfully!");
        navigate("/assetList");
      } else {
        alert("No changes made!");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed!");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Asset</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={asset.name}
          onChange={handleChange}
          placeholder="Asset Name"
          className="input input-bordered w-full"
          required
        />

        {/* Type */}
        <select
          name="type"
          value={asset.type}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>

        {/* Quantity */}
        <input
          type="number"
          name="quantity"
          value={asset.quantity}
          onChange={handleChange}
          min={1}
          className="input input-bordered w-full"
          required
        />

        {/* Old Image Preview */}
        {asset.image && (
          <img
            src={asset.image}
            alt="Asset"
            className="w-28 h-28 object-cover border rounded mx-auto"
          />
        )}

        {/* Upload New Image */}
        <input
          type="file"
          onChange={handlePhotoChange}
          className="file-input file-input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary">
          Update Asset
        </button>
      </form>
    </div>
  );
};

export default EditAsset;
